import { prop } from '@typegoose/typegoose';
import { IdTypesEnum } from '../enums/id.enum';

export class PersonalId {
  @prop({ type: String, enum: IdTypesEnum })
  idType: string;

  @prop({ type: String })
  idData: string;
}
