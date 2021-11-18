import { prop, Ref, ModelOptions } from '@typegoose/typegoose';
import { ConversationUser } from './conversation-user';
import { ConversationStatus } from '../enums/conversation-status.enum';
import { Message } from './message';
import { ActiveUser } from './active-users';
import { Types } from 'mongoose';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Conversation {
  @prop({ type: String })
  countryCode: string;

  @prop({ items: ConversationUser })
  actions: Array<ConversationUser>;

  @prop({ items: ActiveUser })
  activeUsers: ActiveUser[];

  @prop({ enum: ConversationStatus, type: String })
  status: string;

  @prop({ ref: 'Message' })
  lastMessage?: Ref<Message>;

  @prop({ ref: 'Message' })
  pinMessage?: Ref<Message>;

  @prop({ type: String })
  conversationName?: string;

  @prop({ type: Boolean, default: false })
  isGroup: boolean;

  @prop({ type: Date })
  updatedAt: Date;

  _id?: string;

  constructor(partial: Partial<Conversation>) {
    Object.assign(this, { ...partial, _id: Types.ObjectId() });
  }
}
