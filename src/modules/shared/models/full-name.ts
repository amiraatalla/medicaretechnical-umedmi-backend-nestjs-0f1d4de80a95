import { prop } from '@typegoose/typegoose';

export class FullName {
  @prop({ type: String })
  firstName: string;

  @prop({ type: String })
  middleName: string;

  @prop({ type: String })
  lastName: string;
}
