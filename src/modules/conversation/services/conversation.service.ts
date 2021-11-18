import { ForbiddenException, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { MessageRepository } from '../repositories/message.repository';
import { ScheduleRepository } from '../repositories/schedule.repository';
import { UpdateStatusDto } from '../dtos/update-status.dto';
import { LikeFavDto } from '../dtos/like-fav.dto';
import { MessagesFilterDto } from '../dtos/message-filter.dto';
import { GetMessagesDto } from '../dtos/get-messages.dto';
import { MakeUserAdminDto } from '../dtos/make-user-admin.dto';
import { Types } from 'mongoose';
import { MuteDeleteJoinDto } from '../dtos/mute-delete-join.dto';
import { EditMessageDto } from '../dtos/edit-message.dto';
import { ConversationRepository } from '../repositories/conversation.repository';
import { AuthRepository } from '../../auth/repositories/auth.repository';
import { ConversationUserStatus } from '../enums/conversation-user-status.enum';
import { AddMessageToConversationDto } from '../dtos/add-message-to-conversation.dto';
import { PaginateOptions } from 'mongoose';
import { ReplyMessageDto } from '../dtos/reply-to-message.dto';
import { GetConversationsDto } from '../dtos/get-conversation.dto';
import { ConversationsFilterDto } from '../dtos/conversation-filters.dto';
import { UserFilterDto } from '../dtos/user-filters.dto';
import { GetUsersDto } from '../dtos/get-users.dto';
import { SendMessageDto } from '../dtos/send-message.dto';
import { ConversationDto, CreateConversationDto } from '../dtos/create-conversation.dto';
import { ScheduleDto } from '../dtos/schedule.dto';
import { FcmService } from '../../utils/firebase/fcm/fcm.service';
import { NotificationService } from '../../utils/notification/notification.service';
import { SendNotificationDto } from '../../utils/notification/dtos/send-notification.dto';
import { Conversation } from '../models/conversation';
import { types } from '@hapi/joi';
import { isValidObjectId } from 'mongoose';
import { Auth } from 'src/modules/auth/models/auth';
import { RealtimeConversationRepository } from '../repositories/realtime-conversation.repository';

@Injectable()
export class ConversationService {
  getUsersWithFilters(arg0: {
    page: number;
    limit: number;
    businessType?: string;
    speciality?: string;
    subSpeciality?: string;
    username?: string;
  }) {
    throw new Error('Method not implemented.');
  }

  getChatsWithFilters(arg0: any, id: string) {
    throw new Error('Method not implemented.');
  }

  getChats(arg0: { page: number; limit: number }, id: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private messageRepo: MessageRepository,
    private scheduleRepository: ScheduleRepository,
    private conversationRepo: ConversationRepository,
    private authRepo: AuthRepository,
    private readonly notificationService: NotificationService,
    private realtimeConversationRepository: RealtimeConversationRepository,
  ) {}

  async sendMessage(messageDto: SendMessageDto, senderId: string) {
    let conversationId, messageId;

    if (messageDto.conversationId) {
      const { conversationId, recieversIds, ...addMessage } = messageDto;
      messageId = await this.addMessageToConversation(conversationId, {
        ...addMessage,
        senderId,
      });
      return await this.conversationRepo.findByIdAndUpdate(conversationId, {
        $set: { lastMessage: messageId },
      });
    }
    const { recieversIds, isGroup, status, ...addMessage } = messageDto;
    for (let i = 0; i < messageDto.recieversIds.length; i++) {
      conversationId = await this.findConversationIdWithUsers([messageDto.recieversIds[i], senderId]);
      if (!conversationId) {
        let conversationCreated = await this.createConversation(
          {
            recieversIds: [messageDto.recieversIds[i]],
            isGroup: false,
            status,
          },
          senderId,
        );
        conversationId = conversationCreated._id;
      }
      messageId = await this.addMessageToConversation(conversationId, {
        ...addMessage,
        senderId,
      });
    }
    return messageId;
  }

  async reply(ReplyMessageDto: ReplyMessageDto, senderId: string) {
    const saved = await this.messageRepo.save({
      conversationId: ReplyMessageDto.conversationId,
      content: ReplyMessageDto.content,
      type: ReplyMessageDto.type,
      senderId: Types.ObjectId(senderId),
      isReply: true,
      replyTo: Types.ObjectId(ReplyMessageDto.replyTo),
      isForward: ReplyMessageDto.isForward,
    });
    if (saved) {
      const repliedMessage = await this.messageRepo.findById(ReplyMessageDto.replyTo, { senderId: 1 });
      const notificationMsg: SendNotificationDto = {
        notification: {
          title: 'Message replied',
          body: ReplyMessageDto.content,
        },
        data: {
          model: 'Message',
          isReply: '1',
          replyTo: ReplyMessageDto.replyTo,
          type: ReplyMessageDto.type,
        },
      };
      await this.realtimeConversationRepository.updateLastUpdatedAt(saved.conversationId.toString(), saved.updatedAt);
      await this.notificationService.notifyUserId(notificationMsg, repliedMessage.senderId.toString());
    }
    return saved;
  }

  async editMessage(editMessageDto: EditMessageDto, userId: string) {
    const message = await this.messageRepo.findOneAndUpdate(
      { _id: editMessageDto.messageId, senderId: userId },
      {
        $push: {
          editHistory: {
            content: editMessageDto.content,
            timeStamp: new Date(),
          },
        },
        $set: { isEditted: true },
      },
    );
    await this.realtimeConversationRepository.updateLastUpdatedAt(message.conversationId.toString(), message.updatedAt);
    return message;
  }

  async createConversation(
    createConversation: CreateConversationDto,
    senderId: string,
  ): Promise<ConversationDto | Conversation> {
    const activeUsers = [];
    for (let i = 0; i < createConversation.recieversIds.length; i++)
      activeUsers.push({
        userId: createConversation.recieversIds[i],
        isAdmin: false,
      });
    activeUsers.push({
      userId: senderId,
      isAdmin: true,
    });

    const conversation = new Conversation({
      isGroup: createConversation.isGroup,
      status: createConversation.status,
      activeUsers: activeUsers,
      conversationName: createConversation.conversationName,
    });

    await this.realtimeConversationRepository.createConversation(conversation);

    return this.conversationRepo.save(conversation);
  }

  async findConversationIdWithUsers(users: string[]) {
    return await this.conversationRepo.findIdOfOne({
      'activeUsers.userId': { $all: users },
      activeUsers: { $size: users.length },
    });
  }

  async getConversations(filterOptions: ConversationsFilterDto, userId: string) {
    const {
      page,
      limit,
      username,
      speciality,
      subSpeciality,
      date,
      startDate,
      endDate,
      activeUsers,
      after,
      ...conversationFields
    } = filterOptions;
    let users = null;
    if (username || speciality || subSpeciality) {
      users = await this.filterUsers({
        username,
        speciality,
        subSpeciality,
        page: 1,
        limit: 100,
      });
    }
    let dateFilter = {};

    if (date) dateFilter['updatedAt'] = new Date(date);
    if (startDate && endDate)
      dateFilter['updatedAt'] = {
        $gte: new Date(filterOptions.startDate),
        $lte: new Date(filterOptions.endDate),
      };

    const conversationFilters: any[] = [{ 'activeUsers.userId': userId }];
    if (dateFilter['updatedAt']) {
      conversationFilters.push(dateFilter);
    }
    if (users) {
      conversationFilters.push({ 'activeUsers.userId': users.usersIds });
    }
    if (activeUsers) {
      conversationFilters.push({
        'activeUsers.userId': activeUsers.split(',').map(userId => Types.ObjectId(userId)),
      });
    }

    if (after) {
      conversationFilters.push({ updatedAt: { $gte: after } });
    }
    return await this.conversationRepo.paginate(
      {
        ...conversationFields,
        $and: conversationFilters,
      },
      {
        limit: filterOptions.limit,
        page: filterOptions.page,
        // select: 'isGroup conversationName lastMessage',
        sort: { updatedAt: -1 },
        populate: [
          {
            path: 'lastMessage',
            populate: {
              path: 'senderId',
              select: 'id username profileURL',
            },
          },
          {
            path: 'activeUsers.userId',
            select: 'id username profileURL',
          },
        ],
      },
    );
  }

  async schedule(request: ScheduleDto, userId: string) {
    return await this.scheduleRepository.save({
      userId: Types.ObjectId(userId),
      messageId: Types.ObjectId(request.messageId),
      date: new Date(request.date),
    });
  }

  async addMessageToConversation(conversationId: string, addMessageDto: AddMessageToConversationDto) {
    const conversationDoc = await this.conversationRepo.findById(conversationId);
    if (!conversationDoc) {
      throw new UnprocessableEntityException({
        path: conversationId,
        message: 'Conversation not found',
        value: conversationId,
      });
    }
    const saved = await this.messageRepo.save({
      conversationId: conversationId,
      content: addMessageDto.content,
      senderId: Types.ObjectId(addMessageDto.senderId),
      type: addMessageDto.type,
      isForward: addMessageDto.isForward,
    });
    if (saved) {
      conversationDoc.lastMessage = saved._id;
      await this.conversationRepo.save(conversationDoc);
      await this.realtimeConversationRepository.updateLastUpdatedAt(
        conversationDoc._id.toString(),
        conversationDoc.updatedAt,
      );
      await this.notificationService.notifyUsersByIds(
        {
          notification: {
            title: 'New Message',
            body: addMessageDto.content,
          },
          data: {
            type: addMessageDto.type,
          },
        },
        conversationDoc.activeUsers
          .filter(user => user.userId.toString() !== addMessageDto.senderId.toString())
          .map(user => user.userId.toString()),
      );
    }
    return saved;
  }

  async muteConversation(requset: MuteDeleteJoinDto, userId: string) {
    return await this.conversationRepo.findOneAndUpdate(
      {
        _id: requset.conversationId,
        'activeUsers.userId': userId,
        actions: { $not: { $elemMatch: { userId: userId } } },
      },
      {
        $push: {
          actions: { status: ConversationUserStatus.Muted, userId: userId },
        },
      },
    );
  }

  async unMuteConversation(requset: MuteDeleteJoinDto, userId: string) {
    return await this.conversationRepo.findOneAndUpdate(
      {
        _id: requset.conversationId,
        'activeUsers.userId': userId,
      },
      {
        $pull: {
          actions: { status: ConversationUserStatus.Muted, userId: userId },
        },
      },
    );
  }

  async deleteConversation(request: MuteDeleteJoinDto, userId: string) {
    return await this.conversationRepo.findOneAndUpdate(
      { _id: request.conversationId, 'activeUsers.userId': userId },
      { $pull: { activeUsers: { userId: userId } } },
    );
  }

  async joinConversation(request: MuteDeleteJoinDto, userId: string) {
    return await this.conversationRepo.findOneAndUpdate(
      {
        _id: request.conversationId,
        activeUsers: { $not: { $elemMatch: { userId: userId } } },
      },
      { $push: { activeUsers: { userId: userId } } },
    );
  }

  async addUserToGroup(request: MakeUserAdminDto, adminId: string) {
    const conversation = await this.conversationRepo.findOne({
      _id: request.conversationId,
      'activeUsers.userId': adminId,
      'activeUsers.isAdmin': true,
    });

    if (conversation) {
      const usersIds = conversation.activeUsers
        .filter(a => a.userId.toString() !== request.userId)
        .map(a => a.userId.toString())
        .concat([request.userId]);
      await this.realtimeConversationRepository.updateReceiversIds(request.conversationId, usersIds);
      return await this.conversationRepo.findOneAndUpdate(
        {
          _id: request.conversationId,
          activeUsers: { $not: { $elemMatch: { userId: request.userId } } },
        },
        { $push: { activeUsers: { userId: request.userId, isAdmin: false } } },
      );
    }

    return false;
  }

  async removeUser(request: MakeUserAdminDto, adminId: string) {
    const conversation = await this.conversationRepo.findOne({
      _id: request.conversationId,
      'activeUsers.userId': adminId,
      'activeUsers.isAdmin': true,
    });
    if (conversation) {
      const usersIds = conversation.activeUsers
        .filter(a => a.userId.toString() !== request.userId)
        .map(a => a.userId.toString());
      await this.realtimeConversationRepository.updateReceiversIds(request.conversationId, usersIds);
      return await this.conversationRepo.update(
        {
          _id: request.conversationId,
          'activeUsers.userId': request.userId,
        },
        { $pull: { activeUsers: { userId: request.userId, isAdmin: false } } },
      );
    }
    return false;
  }

  async removeUsers(request: MuteDeleteJoinDto, adminId: string) {
    if (
      await this.conversationRepo.findOne({
        _id: request.conversationId,
        'activeUsers.userId': adminId,
        'activeUsers.isAdmin': true,
      })
    )
      return await this.conversationRepo.updateOneById(request.conversationId, {
        $set: { activeUsers: [] },
      });
    return 0;
  }

  async makeUserAdmin(request: MakeUserAdminDto, adminId: string) {
    if (
      await this.conversationRepo.findOne({
        _id: request.conversationId,
        'activeUsers.userId': adminId,
        'activeUsers.isAdmin': true,
      })
    )
      return await this.conversationRepo.update(
        {
          _id: request.conversationId,
          'activeUsers.userId': request.userId,
        },
        { $set: { 'activeUsers.$.isAdmin': true } },
      );
  }

  async updateMessageStatus(request: UpdateStatusDto, userId: string) {
    const message = await this.messageRepo.findOneAndUpdate(
      {
        _id: request.messageId,
        conversationId: request.conversationId,
        senderId: {
          $ne: userId,
        },
        reciversStatus: {
          $not: { $elemMatch: { user: userId, status: request.status } },
        },
      },
      { $push: { reciversStatus: { status: request.status, user: userId } } },
    );
    await this.realtimeConversationRepository.updateLastUpdatedAt(request.conversationId, message.updatedAt);
    return message;
  }

  async likeMessage(request: LikeFavDto, userId: string) {
    if (
      await this.conversationRepo.findOne({
        _id: request.conversationId,
        'activeUsers.userId': userId,
      })
    ) {
      const message = await this.messageRepo.findOneAndUpdate(
        {
          _id: request.messageId,
          conversationId: request.conversationId,
          likes: { $nin: [userId] },
        },
        { $push: { likes: userId } },
      );
      await this.realtimeConversationRepository.updateLastUpdatedAt(request.conversationId, message.updatedAt);
      return message;
    }
  }

  async unLikeMessage(request: LikeFavDto, userId: string) {
    if (
      await this.conversationRepo.findOne({
        _id: request.conversationId,
        'activeUsers.userId': userId,
      })
    ) {
      const message = await this.messageRepo.findOneAndUpdate(
        { _id: request.messageId, conversationId: request.conversationId },
        { $pull: { likes: userId } },
      );
      await this.realtimeConversationRepository.updateLastUpdatedAt(request.conversationId, message.updatedAt);
      return message;
    }
  }

  async favMessage(request: LikeFavDto, userId: string) {
    if (
      await this.conversationRepo.findOne({
        _id: request.conversationId,
        'activeUsers.userId': userId,
      })
    ) {
      const message = await this.messageRepo.findOneAndUpdate(
        {
          _id: request.messageId,
          conversationId: request.conversationId,
          stars: { $nin: userId },
        },
        { $push: { stars: userId } },
      );
      await this.realtimeConversationRepository.updateLastUpdatedAt(request.conversationId, message.updatedAt);
      return message;
    } else {
      throw new ForbiddenException('Only allowed in your conversations');
    }
  }

  async pinMessage(request: LikeFavDto, userId: string) {
    const message = await this.conversationRepo.findOneAndUpdate(
      { _id: request.conversationId, 'activeUsers.userId': userId },
      {
        pinMessage: request.messageId,
      },
    );
    await this.realtimeConversationRepository.updateLastUpdatedAt(request.conversationId, message.updatedAt);
    return message;
  }

  async unFavMessage(request: LikeFavDto, userId: string) {
    if (
      await this.conversationRepo.findOne({
        _id: request.conversationId,
        'activeUsers.userId': userId,
      })
    ) {
      const message = await this.messageRepo.findOneAndUpdate(
        { _id: request.messageId, conversationId: request.conversationId },
        { $pull: { stars: userId } },
      );
      await this.realtimeConversationRepository.updateLastUpdatedAt(request.conversationId, message.updatedAt);
      return message;
    }
  }

  async getUsersOfConversations(request: GetConversationsDto, userId: string) {
    return await this.conversationRepo.paginate(
      { 'activeUsers.userId': Types.ObjectId(userId) },
      {
        limit: request.limit,
        page: request.page,
        select: 'activeUsers',
        populate: {
          select: 'id username profileURL',
          path: 'activeUsers.userId',
        },
      },
    );
  }

  async getUsers(requset: GetUsersDto) {
    return await this.authRepo.paginate(
      {},
      {
        limit: requset.limit,
        page: requset.page,
        select: { username: 1, profileURL: 1 },
      },
    );
  }

  async filterUsers(userFilter: UserFilterDto) {
    const filter = {};
    const usernameFilter = {};
    let auth;
    if (userFilter.username) usernameFilter['username'] = userFilter.username;
    if (!userFilter.speciality && !userFilter.businessType && !userFilter.subSpeciality)
      auth = await this.authRepo.paginate(usernameFilter, {
        limit: userFilter.limit,
        page: userFilter.page,
        select: { username: 1, profileURL: 1 },
      });
    if (userFilter.businessType) filter['professionalExperienceSpeciality.businessType'] = userFilter.businessType;
    if (userFilter.subSpeciality) filter['professionalExperienceSpeciality.subSpeciality'] = userFilter.subSpeciality;
    if (userFilter.speciality) filter['professionalExperienceSpeciality.speciality'] = userFilter.speciality;
    auth = await this.authRepo.paginate(usernameFilter, {
      limit: userFilter.limit,
      page: userFilter.page,
      select: { username: 1, profileURL: 1 },
      populate: { path: 'businessId', match: { ...filter }, select: '_id' },
    });
    const users = [];
    const usersIds = [];
    auth.docs.map(user => {
      users.push(user);
      usersIds.push(user.id);
      // if (user.businessId != null) {
      //   users.push(user);
      //   usersIds.push(user.id);
      // }
    });
    auth.docs = users;
    return { auth, usersIds };
  }

  // async getMessages(request: GetMessagesDto) {
  //   const { conversationId, createdAt } = request;
  //   const paginateFilter = {
  //     conversationId,
  //     [request.createdAt ? 'createdAt' : null]: request.createdAt ? { $gte: new Date(request.createdAt) } : null,
  //   };

  //   return await this.messageRepo.paginate(
  //     { ...paginateFilter },
  //     {
  //       sort: { createdAt: -1 },
  //       populate: [{ path: 'replyTo', match: {}, select: ['type', 'content'] }],
  //     },
  //   );
  // }
  async getMessages(request: MessagesFilterDto, user: Auth) {
    const userConversationsIds = (
      await this.conversationRepo.find({ activeUsers: { $elemMatch: { userId: user.id } } }, { _id: 1 }, {})
    ).map(doc => doc._id.toString());

    if (request.conversationId) {
      if (!userConversationsIds.includes(request.conversationId)) {
        throw new ForbiddenException({
          path: 'conversationId',
          message: 'Not In user conversations',
          userConversationsIds,
        });
      }
    }
    return await this.messageRepo.paginate(
      {
        conversationId: request.conversationId ? request.conversationId : { $in: userConversationsIds },
        ...(request.search ? { content: { $regex: request.search, $options: 'i' } } : {}),
        ...(request.type ? { type: request.type } : {}),
        ...(request.createdAt ? { createdAt: { $gte: new Date(request.createdAt) } } : {}),
        ...(request._id ? { _id: request._id } : {}),
        ...(request.isStar !== null ? { stars: Types.ObjectId(user.id) } : {}),
        ...(request.updatedAfter ? { updatedAt: { $gte: request.updatedAfter } } : {}),
      },
      {
        sort: { createdAt: -1 },
        limit: request.limit,
        page: request.page,
        populate: {
          path: 'senderId',
          select: 'id username profileURL',
        },
      },
    );
  }

  async getUserConversations(userId: string | Types.ObjectId, paginateOptions?: PaginateOptions) {
    return this.conversationRepo.paginate({ activeUsers: { $elemMatch: { userId: userId } } }, paginateOptions);
  }
}
