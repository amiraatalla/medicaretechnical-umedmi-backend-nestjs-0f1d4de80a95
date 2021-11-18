import { string } from '@hapi/joi';
import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { Unique } from '../../api/validators/unique-mongo.validator';
import { Auth } from '../../auth/models/auth';
import { PatientPermessionStatusEnum } from '../enums/patient-parmession-status.enum';
import { PatientAccessRequest } from './patient-access-request';
import { DocumentEnum } from '../enums/document.enum';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    _id: false,
  },
})
export class PatientPersonalInfoModel {
  @prop({ type: String, unique: true, required: true })
  phoneNumber: string;
  @prop({ type: String })
  emergencyPhoneNumber: string;
  @prop({ type: String })
  husbandNameArabic: string;
  @prop({ type: String })
  husbandNameEnglish: string;
  @prop({ type: String })
  ethnicGroup: string;
  @prop({ type: String })
  bmi: string;
  @prop({ type: String })
  height: string;
  @prop({ type: String })
  weight: string;
  @prop({ type: String })
  blood: string;
  @prop({ type: String })
  bloodPressure: string;
  @prop({ type: String })
  insurance: string;
  @prop({ type: String })
  heartRate: string;
  @prop({ type: String })
  temprature: string;
  @prop({ type: String })
  respiratoryRate: string;
  @prop({ type: String })
  email: string;
  @prop({ type: String })
  address: string;
  @prop({ type: Date, required: true })
  birthDate: Date;
  @prop({ type: String })
  cityArabic: string;
  @prop({ type: String })
  cityEnglish: string;
  @prop({ type: String })
  encryption: string;
  @prop({ type: String })
  fullNameArabic: string;
  @prop({ type: String })
  fullNameEnglish: string;
  @prop({ type: String })
  genderArabic: string;
  @prop({ type: String })
  genderEnglish: string;
  @prop({ type: String })
  id: string;
  @prop({ type: String })
  idCardExpiration: string;
  @prop({ type: String })
  idValidity: string;
  @prop({ type: String })
  jobArabic: string;
  @prop({ type: String })
  jobEnglish: string;
  @prop({ type: String })
  mainBirthPlaceArabic: string;
  @prop({ type: String })
  mainBirthPlaceEnglish: string;
  @prop({ type: String })
  maritalStatusArabic: string;
  @prop({ type: String })
  maritalStatusEnglish: string;
  @prop({ type: String })
  nationality: string;
  @prop({ type: String })
  profileImage: string;
  @prop({ type: String })
  religionArabic: string;
  @prop({ type: String })
  religionEnglish: string;
  @prop({ type: String })
  ssn: string;
  @prop({ type: String })
  diagnosis: string;
  @prop({ type: String })
  age: string;
}
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    _id: false,
  },
})
export class HashtagModel {
  @prop({ type: String, required: true })
  hashtag: string;
}

export class LinkModel {
  @prop({ type: String, required: true })
  link: string;
}

export class ShareModel {
  @prop({ type: String, required: true })
  share_with: string;
}
export class CBCModel {
  @prop({ type: String })
  cbc: string;
}
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    _id: false,
  },
})
export class SpecialitiesModel {}
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
})
export class Patient {
  @prop({ type: PatientPersonalInfoModel })
  personalInfo: PatientPersonalInfoModel;
  @prop({ type: SpecialitiesModel })
  specialities: any;
  @prop({ type: HashtagModel })
  HashtagInfo: HashtagModel;
  @prop({ type: LinkModel })
  LinkInfo: LinkModel;
  @prop({ type: ShareModel })
  ShareInfo: ShareModel;
  @prop({ type: CBCModel })
  CBCInfo: CBCModel;
  @prop({ type: String, unique: true })
  SN: string;
  @prop({ type: String, unique: true })
  EMR: string;
  @prop({ ref: 'Auth', required: true })
  createdBy: Ref<Auth> | string;
  @prop({ type: String, enum: Object.values(DocumentEnum), required: true })
  document: DocumentEnum;
  @prop({ items: PatientAccessRequest, required: false })
  accessRequests: PatientAccessRequest[];
  _id: string;
  @prop({ type: String })
  id: string;
}
