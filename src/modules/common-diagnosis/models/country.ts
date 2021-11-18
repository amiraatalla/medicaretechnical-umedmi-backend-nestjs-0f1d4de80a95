import { prop } from '@typegoose/typegoose';

export class Country {
  @prop({ type: String })
  countryCode: string;

  @prop({ type: Number })
  count: number;
}
