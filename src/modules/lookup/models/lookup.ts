import { prop } from '@typegoose/typegoose';
import { BaseModel } from 'src/modules/shared/models/base-model';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';
import { LookUpTypesEnum } from '../enums/look-up.enum';

export class LookUp extends BaseModel {
  @prop({ type: String, enum: LookUpTypesEnum })
  type: string;

  @prop({ type: LocalizedField })
  name: LocalizedField;
}
