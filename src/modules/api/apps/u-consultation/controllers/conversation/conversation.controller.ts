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
// @ApiTags('Chat')
@ApiTags('Conversation')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'conversation'))
export class ConversationController {
  constructor(private conversationService: ConversationService) {}
  // @Get('/get-conversations')
  // async getConversations(@Query() query: GetConversationsDto, @LoggedInUser() user: Auth) {
  //   return await this.conversationService.getConversations({ ...query }, user.id);
  // }
  // @UseGuards(JwtAuthGuard)
  @Get('')
  async getConversations(@Query() query: ConversationsFilterDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.getConversations(query, user.id);
  }
  @Post('/mute')
  async muteConversation(@Body() body: MuteDeleteJoinDto, @LoggedInUser() user: Auth) {
    await this.conversationService.muteConversation({ ...body }, user.id);
  }
  @Post('/group')
  async createGroupConversation(@Body() body: CreateConversationDto, @LoggedInUser() user: Auth): Promise<any> {
    return await this.conversationService.createConversation({ ...body }, user.id);
  }
  @Delete('/unmute')
  async unMuteConversation(@Query() query: MuteDeleteJoinDto, @LoggedInUser() user: Auth) {
    await this.conversationService.unMuteConversation({ ...query }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/leave')
  async leaveConversation(@Query() query: MuteDeleteJoinDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.deleteConversation({ ...query }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/join')
  async joinConversation(@Body() body: MuteDeleteJoinDto, @LoggedInUser() user: Auth) {
    await this.conversationService.joinConversation({ ...body }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/make-admin')
  async makeAdmin(@Body() body: MakeUserAdminDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.makeUserAdmin({ ...body }, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/user')
  async addUserToGroup(@Body() body: MakeUserAdminDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.addUserToGroup({ ...body }, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Delete('/user')
  async removeUserFromGroup(@Query() query: MakeUserAdminDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.removeUser({ ...query }, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Delete('/users')
  async deleteAllUsers(@Query() query: MuteDeleteJoinDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.removeUsers({ ...query }, user.id);
  }
  @Get('/users')
  async getUsersConversations(@Query() query: ConversationsFilterDto, @LoggedInUser() user: Auth) {
    return await this.conversationService.getConversations(query, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/filter-users')
  async getAllUsersWithFilters(@Query() query: UserFilterDto) {
    return (await this.conversationService.filterUsers({ ...query })).auth;
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/get-users')
  async getAllusers(@Query() query: GetUsersDto) {
    return await this.conversationService.getUsers({ ...query });
  }
}
