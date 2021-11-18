import { MessageRecievedStatus } from '../enums/message-recieved-status.enum';
import { IsEnum, IsString } from 'class-validator';

export class UpdateStatusDto {
  @IsString()
  conversationId: string;
  @IsEnum(MessageRecievedStatus)
  status: MessageRecievedStatus;
  @IsString()
  messageId: string;
}
