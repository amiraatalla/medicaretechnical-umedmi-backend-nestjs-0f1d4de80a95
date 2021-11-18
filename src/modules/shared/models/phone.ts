import { prop } from '@typegoose/typegoose';

export class Phone {
  @prop({ type: String })
  phoneNumber: string;

  @prop({ type: String })
  phoneType: string;
}
