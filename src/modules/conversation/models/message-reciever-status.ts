import { Types } from 'mongoose';
import { prop } from '@typegoose/typegoose';
import { Auth } from '../../auth/models/auth';
import { MessageRecievedStatus } from '../enums/message-recieved-status.enum';

export class MessageRecieverStatus {
  @prop({ type: Types.ObjectId, ref: Auth })
  user: Types.ObjectId | Auth;

  @prop({ type: String, enum: MessageRecievedStatus })
  status: string;

  @prop({ type: Date, default: new Date() })
  statusAt: Date;
}
