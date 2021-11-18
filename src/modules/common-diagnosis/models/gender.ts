import { prop } from '@typegoose/typegoose';

export class Gender {
  @prop({ type: Number })
  male: number;

  @prop({ type: Number })
  female: number;
}
