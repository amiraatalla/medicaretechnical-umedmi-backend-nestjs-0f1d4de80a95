import { MessageType } from '../enums/message-type.enum';

export class ReplyMessageDto {
  conversationId: string;
  content: string;
  senderId?: string;
  type: MessageType;
  replyTo: string;
  isForward: boolean;
}
