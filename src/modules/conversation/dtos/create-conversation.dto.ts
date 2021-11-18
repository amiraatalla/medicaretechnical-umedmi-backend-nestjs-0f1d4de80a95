import { ActiveUsers } from './active-users.dto';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ConversationStatus } from '../enums/conversation-status.enum';

export class CreateConversationDto {
  @IsNotEmpty()
  recieversIds: string[];
  @IsEnum(ConversationStatus)
  status: ConversationStatus;
  isGroup: boolean;
  conversationName?: string;
}

export class ConversationDto {
  _id?: string;
  activeUsers: string[];
  @IsEnum(ConversationStatus)
  status: ConversationStatus;
  isGroup: boolean;
  conversationName?: string;
}
