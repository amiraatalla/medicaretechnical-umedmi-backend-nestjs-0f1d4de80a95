import { prop, Ref, types } from '@typegoose/typegoose';
import { BaseModel } from '../../shared/models/base-model';
import { ContactInfo } from './contact-info';
import { Email } from '../../shared/models/email';
import { PersonalId } from '../../shared/models/personal-id';
import { Phone } from '../../shared/models/phone';
import { FacilityBranch } from './facility-branch';
import { Education } from './education';
import { Licensure } from './licensure';
import { LicensureMedicalFacility } from './licensureMedicalFacility';
import { Speciality } from '../models/speciality';
import { ProfessionalExperience } from './professionalExperience';
import { Residence } from '../../shared/models/residence';
import { GenderTypesEnum, ApprovalTypesEnum } from '../enums/business.enum';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';
import { FullName } from '../../shared/models/full-name';
import { PersonalMedicalFacilityName } from '../models/personalMedicalFacilityName';
import { Auth } from 'src/modules/auth/models/auth';
import { ReviewComment } from './review-comment';
import { SelfLicensure } from './self-licensure';

export class Business extends BaseModel {
  @prop({ ref: 'Auth', type: String })
  userId: string | Auth;

  @prop({ type: String })
  headline: string;

  @prop({ type: String })
  primaryPractice: string;

  @prop({ type: String })
  recentEducation: string;

  @prop({ type: String })
  educationType: string;

  @prop({ type: Boolean, default: true })
  showHeadlines: boolean;

  @prop({ type: Residence, default: {} })
  residence: Residence;

  @prop({ type: String })
  industry: string;

  @prop({ type: String })
  personalImage: string;

  @prop({ items: ContactInfo, _id: false, default: [] })
  contactInfo: Array<ContactInfo>;

  @prop({ type: String })
  title: string;

  @prop({ type: LocalizedField })
  fullName: LocalizedField;

  @prop({ type: FullName })
  name: FullName;

  @prop({ type: Date })
  dateOfBirth: Date;

  @prop({ type: String, enum: GenderTypesEnum })
  gender: string;

  @prop({ items: Email, _id: false, default: [] })
  emails: Array<Email>;

  @prop({ type: PersonalId, _id: false })
  personalInfoId: PersonalId;

  @prop({ items: Phone, _id: false, default: [] })
  personalInfoPhones: Array<Phone>;

  @prop({ type: String })
  interests: string;

  @prop({ type: String })
  professionalInterests: string;

  @prop({ type: Boolean, default: true })
  shareInterests: boolean;

  @prop({ type: Number })
  numberOfBranches: number;

  @prop({ items: FacilityBranch, _id: false, default: [] })
  personalMedicalFacilityBranch: Array<FacilityBranch>;

  @prop({ items: Education, _id: false, default: [] })
  education: Array<Education>;

  @prop({ items: Licensure, _id: false, default: [] })
  personnelLicensure: Array<Licensure>;
  @prop({ items: SelfLicensure, _id: false, default: [] })
  selfLicensure: Array<SelfLicensure>;

  @prop({ items: LicensureMedicalFacility, _id: false, default: [] })
  licensureMedicalFacility: Array<LicensureMedicalFacility>;

  @prop({ items: PersonalMedicalFacilityName, _id: false, default: [] })
  personalMedicalFacilityName: Array<PersonalMedicalFacilityName>;

  @prop({ items: Speciality, _id: false, default: [] })
  professionalExperienceSpeciality: Array<Speciality>;

  @prop({ items: ProfessionalExperience, _id: false, default: [] })
  professionalExperience: Array<ProfessionalExperience>;

  @prop({ type: Boolean, default: false })
  isSubmitted: boolean;

  @prop({ type: String, enum: ApprovalTypesEnum, default: ApprovalTypesEnum.UNDER_REVIEW })
  isApproved: ApprovalTypesEnum;

  @prop({ type: ReviewComment })
  comments: ReviewComment;
}
