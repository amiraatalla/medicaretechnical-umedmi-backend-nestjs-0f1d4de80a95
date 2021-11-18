import { prop } from '@typegoose/typegoose';
import { FacilityTypesEnum } from '../enums/business.enum';

export class PersonalMedicalFacilityName {
  @prop({ type: String })
  facilityName: string;

  @prop({ type: Number })
  branchNumber: number;

  @prop({ type: String, enum: FacilityTypesEnum })
  facilityType: string;

  @prop({ type: String })
  arabicFacilityName: string;
}
