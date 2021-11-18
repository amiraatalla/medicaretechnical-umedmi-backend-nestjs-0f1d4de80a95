import { prop } from '@typegoose/typegoose';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ValidityTypesEnum, LicensureMedicalFacilityTypesEnum } from '../enums/business.enum';
import { FacilityBranch } from './facility-branch';

export class LicensureMedicalFacility {
  @prop({ type: String })
  facilityName: string;

  @prop({ items: String, default: [] })
  licensureFacilityImages: Array<string>;

  @prop({ type: String })
  dateEstablished: Date;

  @prop({ type: String })
  branchName: string;

  @prop({ type: String })
  documentType: string;

  @prop({ type: String })
  documentName: string;

  @prop({ type: String })
  issueOrganization: string;

  @prop({ type: String, enum: ValidityTypesEnum })
  validity: string;

  @prop({ type: Date })
  acquireDate: Date;

  @prop({ type: Date })
  expiryDate: Date;

  @prop({ type: Boolean, default: true })
  share: boolean;
}
