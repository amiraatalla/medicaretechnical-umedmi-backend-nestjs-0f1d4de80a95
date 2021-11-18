import { prop } from '@typegoose/typegoose';
import { Residence } from '../../shared/models/residence';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';
import { FacilityTypesEnum } from '../enums/business.enum';
import { Phone } from '../../shared/models/phone';

export class FacilityBranch {
  @prop({ type: LocalizedField })
  name: LocalizedField;

  @prop({ items: String, default: [] })
  branchImages: Array<string>;

  @prop({ type: String })
  facilityName: string;

  @prop({ type: String })
  taxIdNumber: string;

  @prop({ type: Date })
  dateEstablished: Date;

  @prop({ type: String }) //# taxID?
  commercialRegisterId: string;
  @prop({ type: String })
  address: string;
  @prop({ type: String }) //# taxID?
  city: string;
  @prop({ type: String }) //# taxID?
  country: string;

  @prop({ type: Residence })
  branchLocation: Residence;

  @prop({ type: String, enum: FacilityTypesEnum })
  facilityType: string;

  @prop({ type: Phone })
  phone: Phone;
}
