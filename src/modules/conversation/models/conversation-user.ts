import { ConversationUserStatus } from '../enums/conversation-user-status.enum';
import { prop, Ref } from '@typegoose/typegoose';
import { Auth } from '../../auth/models/auth';

export class ConversationUser {
  @prop({ ref: 'Auth' })
  userId?: Ref<Auth>;

  @prop({ type: String, enum: ConversationUserStatus })
  status: string;

  @prop({ type: Date, default: new Date() })
  timeStamp: Date;
}
