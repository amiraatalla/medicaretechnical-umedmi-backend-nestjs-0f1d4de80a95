import { prop } from '@typegoose/typegoose';

export class editHistory {
  @prop({ type: String })
  content: string;

  @prop({ type: Date })
  timeStamp: Date;
}
