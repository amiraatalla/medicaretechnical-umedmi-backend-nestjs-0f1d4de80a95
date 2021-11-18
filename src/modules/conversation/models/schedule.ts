import { prop, Ref } from '@typegoose/typegoose';
import { Auth } from '../../auth/models/auth';
import { Message } from './message';

export class Schedule {
  @prop({ ref: 'Auth' })
  userId: Ref<Auth>;

  @prop({ type: Date, default: new Date() })
  date: Date;

  @prop({ ref: 'Message' })
  messageId: Ref<Message>;
}
