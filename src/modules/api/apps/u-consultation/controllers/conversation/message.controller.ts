import { Body, Controller, Post, Get, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { createPrefix } from '../../../../helpers/prefix.helper';
import { AppsEnum } from '../../../../enums/apps.enum';
import { ConversationService } from 'src/modules/conversation/services/conversation.service';
import { JwtAuthGuard } from 'src/modules/api/guards/jwt-auth.guard';
import { LoggedInUser } from 'src/modules/api/decorators/logged-in-user.decorator';
import { Auth } from 'src/modules/auth/models/auth';
import { SendMessageDto } from '../../../../../conversation/dtos/send-message.dto';
import { GetConversationsDto } from '../../../../../conversation/dtos/get-conversation.dto';
import { ConversationsFilterDto } from '../../../../../conversation/dtos/conversation-filters.dto';
import { MuteDeleteJoinDto } from '../../../../../conversation/dtos/mute-delete-join.dto';
import { GetMessagesDto } from '../../../../../conversation/dtos/get-messages.dto';
import { MessagesFilterDto } from '../../../../../conversation/dtos/message-filter.dto';
import { LikeFavDto } from '../../../../../conversation/dtos/like-fav.dto';
import { UpdateStatusDto } from '../../../../../conversation/dtos/update-status.dto';
import { MakeUserAdminDto } from '../../../../../conversation/dtos/make-user-admin.dto';
import { ReplyMessageDto } from 'src/modules/conversation/dtos/reply-to-message.dto';
import { EditMessageDto } from 'src/modules/conversation/dtos/edit-message.dto';
import { ConversationDto, CreateConversationDto } from 'src/modules/conversation/dtos/create-conversation.dto';
import { UserFilterDto } from 'src/modules/conversation/dtos/user-filters.dto';
import { GetUsersDto } from 'src/modules/conversation/dtos/get-users.dto';
import { ScheduleDto } from 'src/modules/conversation/dtos/schedule.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// get conversations-get users dtos are same
@ApiTags('Message')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'message'))
export class MessageController {
  constructor(private conversationService: ConversationService) {}
  @UseGuards(JwtAuthGuard)
  /**
   * Creates message, new conversation if recieversIds not found.
   * @isGroup : specify  conersation type
   *
   */
  @Post('')
  async addMessage(@Body() body: SendMessageDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.sendMessage({ ...body }, user.id);
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
  @Get('')
  async getMessages(@Query() query: MessagesFilterDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.getMessages(query, user);
  }
  // @UseGuards(JwtAuthGuard)
  @Post('/schedule')
  async schedule(@Body() body: ScheduleDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.schedule({ ...body }, user.id);
  }
}
