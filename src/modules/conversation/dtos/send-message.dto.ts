import { MessageType } from '../enums/message-type.enum';
import { IsArray, IsBoolean, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ConversationStatus } from '../enums/conversation-status.enum';
export class SendMessageDto {
  @IsOptional()
  conversationId?: string;
  @IsString({})
  content: string;
  // @IsString()
  // @IsOptional()
  // senderId: string;
  @IsEnum(MessageType)
  type: MessageType;
  @IsArray({})
  @IsString({ each: true })
  @IsOptional()
  recieversIds?: string[];

  @IsBoolean({})
  @IsOptional()
  isForward: boolean;
  @IsBoolean({})
  @IsOptional()
  isGroup?: boolean;
  @IsOptional()
  @IsEnum(ConversationStatus)
  status: ConversationStatus;
}
