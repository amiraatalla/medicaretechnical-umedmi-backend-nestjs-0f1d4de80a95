import { MessageType } from '../enums/message-type.enum';

export class AddMessageToConversationDto {
  content: string;
  senderId: string;
  type: MessageType;
  isForward: boolean;
}
