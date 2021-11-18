import { prop, Ref } from '@typegoose/typegoose';
import { Message } from 'src/modules/conversation/models/message';
import { Auth } from '../../auth/models/auth';

export class Schedule {
  @prop({ ref: 'Auth' })
  userId: Ref<Auth>;

  @prop({ type: Date, default: new Date() })
  date: Date;

  @prop({ ref: 'Message' })
  messageId: Ref<Message>;
}
