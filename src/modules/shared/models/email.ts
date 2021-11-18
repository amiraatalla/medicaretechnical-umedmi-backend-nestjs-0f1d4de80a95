import { prop } from '@typegoose/typegoose';
import { EmailTypesEnum } from '../enums/email.enum';

export class Email {
  @prop({ type: String, enum: EmailTypesEnum })
  emailType: string;

  @prop({ type: String })
  email: string;
}
