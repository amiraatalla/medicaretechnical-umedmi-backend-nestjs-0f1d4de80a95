import { prop } from '@typegoose/typegoose';
import { BaseModel } from '../../shared/models/base-model';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';

export class Country extends BaseModel {
  @prop({ type: String })
  countryCode: string;

  @prop({ type: LocalizedField })
  name: LocalizedField;

  @prop({ type: String })
  phoneCode: string;

  @prop({ type: String })
  flagPath: string;

  @prop({ items: String })
  cities: Array<string>;
}
