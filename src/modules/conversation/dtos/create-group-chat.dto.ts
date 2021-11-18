import { ActiveUsers } from './active-users.dto';
import { IsEnum } from 'class-validator';
import { ConversationStatus } from '../enums/conversation-status.enum';

export class CreateGroupDto {
  activeUsers: ActiveUsers[];
  @IsEnum(ConversationStatus)
  status: string;
  isGroup: boolean;
  conversationName: string;
}
