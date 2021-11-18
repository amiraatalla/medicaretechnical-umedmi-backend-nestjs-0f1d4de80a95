import { prop } from '@typegoose/typegoose';
import { ContactInfoTypesEnum } from '../enums/business.enum';

export class ContactInfo {
  @prop({ type: String, enum: ContactInfoTypesEnum })
  contactInfoType: string;

  @prop({ type: String })
  contactInfoLink: string;
}
