import { Types } from 'mongoose';
import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { MessageType } from '../enums/message-type.enum';
import { Auth } from '../../auth/models/auth';
import { Conversation } from './conversation';
import { MessageSentStatus } from '../enums/message-sent-status.enum';
import { MessageRecieverStatus } from './message-reciever-status';
import { editHistory } from './edit-history';
import { boolean } from '@hapi/joi';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Message {
  @prop({ ref: 'Conversation' })
  conversationId: Ref<Conversation>;

  @prop({ type: Date, default: new Date() })
  createdAt: Date;

  @prop({ type: Date })
  updatedAt: Date;

  @prop({ type: String, index: true, text: true })
  content: string;

  @prop({ ref: 'Auth' })
  senderId: Ref<Auth>;

  @prop({ type: String, enum: MessageType })
  type: MessageType;

  @prop({ type: Boolean })
  isReply: boolean;

  @prop({ type: Types.ObjectId, default: null, ref: Message })
  replyTo: Types.ObjectId | Message;

  @prop({ items: Types.ObjectId, default: [], ref: Auth })
  stars: Types.ObjectId[] | Auth[];

  @prop({ items: Types.ObjectId, ref: Auth })
  likes: Types.ObjectId[] | Auth[];

  @prop({ type: Boolean, default: false })
  isEditted: boolean;

  @prop({ items: editHistory, default: [] })
  editHistory: Array<editHistory>;

  @prop({ type: String, enum: MessageSentStatus })
  sentStatus: string;

  @prop({ items: MessageRecieverStatus })
  reciversStatus: MessageRecieverStatus[];

  @prop({ type: Boolean, default: false })
  isForward: boolean;
}
