import { prop } from '@typegoose/typegoose';

export class Industry {
  @prop({ type: String })
  name: string;
}
