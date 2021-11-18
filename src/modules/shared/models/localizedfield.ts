import { prop } from '@typegoose/typegoose';

export class LocalizedField {
  @prop({ type: String })
  ar: string;

  @prop({ type: String })
  en: string;
}
