import { Body, Controller, Post, Get, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { createPrefix } from '../../../../helpers/prefix.helper';
import { AppsEnum } from '../../../../enums/apps.enum';
import { JwtAuthGuard } from 'src/modules/api/guards/jwt-auth.guard';
import { LoggedInUser } from 'src/modules/api/decorators/logged-in-user.decorator';
import { Auth } from 'src/modules/auth/models/auth';
import { GetChatsWithFiltersDto } from '../../../../../chat/dtos/get-chats-with-filters.dto';
import { LikeFavDto } from '../../../../../chat/dtos/like-fav.dto';
import { MakeUserAdminDto } from '../../../../../chat/dtos/make-user-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConversationService } from 'src/modules/conversation/services/conversation.service';
import { SendMessageDto } from 'src/modules/conversation/dtos/send-message.dto';
import { MuteDeleteJoinDto } from 'src/modules/conversation/dtos/mute-delete-join.dto';
import { GetMessagesDto } from 'src/modules/conversation/dtos/get-messages.dto';
import { UpdateStatusDto } from 'src/modules/conversation/dtos/update-status.dto';
import { ReplyMessageDto } from 'src/modules/conversation/dtos/reply-to-message.dto';
import { EditMessageDto } from 'src/modules/conversation/dtos/edit-message.dto';
import { CreateConversationDto } from 'src/modules/conversation/dtos/create-conversation.dto';
import { GetUsersDto } from 'src/modules/conversation/dtos/get-users.dto';
import { ScheduleDto } from 'src/modules/conversation/dtos/schedule.dto';
import { UserFilterDto } from 'src/modules/conversation/dtos/user-filters.dto';
import { MessagesFilterDto } from 'src/modules/conversation/dtos/message-filter.dto';
import { GetConversationsDto } from 'src/modules/conversation/dtos/get-conversation.dto';
// get chats-get users dtos are same
@ApiTags('Chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'chat'))
export class ChatController {
  constructor(private conversationService: ConversationService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create-message')
  async addMessage(@Body() body: SendMessageDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.sendMessage({ ...body }, user.id);
  }
  @Post('/mute-Conversation')
  async muteConversation(@Body() body: MuteDeleteJoinDto, @LoggedInUser() user: Auth) {
    await this.conversationService.muteConversation({ ...body }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/reply')
  async reply(@Body() body: ReplyMessageDto, @LoggedInUser() user: Auth) {
    await this.conversationService.reply({ ...body }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/edit-message')
  async edit(@Body() body: EditMessageDto, @LoggedInUser() user: Auth) {
    await this.conversationService.editMessage({ ...body }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/create-group')
  async createGroupChat(@Body() body: CreateConversationDto, @LoggedInUser() user: Auth) {
    await this.conversationService.createConversation({ ...body }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/un-mute-Conversation')
  async unMuteConversation(@Query() query: MuteDeleteJoinDto, @LoggedInUser() user: Auth) {
    await this.conversationService.unMuteConversation({ ...query }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/leave-Conversation')
  async leaveConversation(@Query() query: MuteDeleteJoinDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.deleteConversation({ ...query }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/join-Conversation')
  async joinConversation(@Body() body: MuteDeleteJoinDto, @LoggedInUser() user: Auth) {
    await this.conversationService.joinConversation({ ...body }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/update-message-status')
  async updateMessageStatus(@Body() body: UpdateStatusDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.updateMessageStatus({ ...body }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/like-message')
  async likeMessage(@Body() body: LikeFavDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.likeMessage({ ...body }, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/un-like-message')
  async unLikeMessage(@Query() query: LikeFavDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.unLikeMessage({ ...query }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/fav-message')
  async favMessage(@Body() body: LikeFavDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.favMessage({ ...body }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/make-admin')
  async makeAdmin(@Body() body: MakeUserAdminDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.makeUserAdmin({ ...body }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/add-user')
  async addUserToGroup(@Body() body: MakeUserAdminDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.addUserToGroup({ ...body }, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Delete('/remove-user')
  async removeUserFromGroup(@Query() query: MakeUserAdminDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.removeUser({ ...query }, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Delete('/remove-users')
  async deleteAllUsers(@Query() query: MuteDeleteJoinDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.removeUsers({ ...query }, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Put('/pin-message')
  async pinMessage(@Body() body: LikeFavDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.pinMessage({ ...body }, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Delete('/un-fav-message')
  async unFavMessage(@Query() query: LikeFavDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.unFavMessage({ ...query }, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/get-users-of-chats')
  async getUsersChats(@Query() query: GetConversationsDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.getChats({ ...query }, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/get-users-with-filters')
  async getAllUsersWithFilters(@Query() query: UserFilterDto) {
    return await this.conversationService.getUsersWithFilters({ ...query });
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/get-users')
  async getAllusers(@Query() query: GetUsersDto) {
    return await this.conversationService.getUsers({ ...query });
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/get-messages-with-filter')
  async getMessagesWithFilter(@Query() query: MessagesFilterDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.getUsersWithFilters({ ...query });
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/get-messages')
  async getMessages(@Query() query: MessagesFilterDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.getMessages;
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/get-Conversation')
  async getChats(@Query() query: GetConversationsDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.getChats({ ...query }, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/get-chats-with-filters')
  async getChatsWithFilters(@Query() query: GetChatsWithFiltersDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.getChatsWithFilters({ ...query }, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Post('/schedule')
  async schedule(@Body() body: ScheduleDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.schedule({ ...body }, user.id);
  }
}
