import { prop } from '@typegoose/typegoose';
import { LicensureTypesEnum } from '../enums/business.enum';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';
import { Residence } from '../../shared/models/residence';
import { FullName } from '../../shared/models/full-name';
import { Phone } from '../../shared/models/phone';

export class Licensure {
  @prop({ type: LocalizedField })
  fullName: LocalizedField;

  @prop({ type: FullName })
  name: FullName;

  @prop({ items: String, default: [] })
  licensureImages: Array<string>;

  @prop({ type: String, enum: LicensureTypesEnum })
  licensureType: string;

  @prop({ type: String })
  documentName: string;
  @prop({ type: String })
  arabicFullName: string;

  @prop({ type: String })
  issueOrganization: string;

  @prop({ type: String })
  type: string;

  @prop({ type: String })
  validity: string;

  @prop({ type: Date })
  issueDate: Date;

  @prop({ type: Date })
  expiryDate: Date;

  @prop({ type: String })
  role: string;

  @prop({ type: Phone })
  phone: Phone;

  @prop({ type: Residence })
  residence: Residence;

  @prop({ type: Boolean, default: true })
  share: boolean;
}
