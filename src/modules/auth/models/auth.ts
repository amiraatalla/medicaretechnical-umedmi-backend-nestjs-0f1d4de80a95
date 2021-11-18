import { Index, index, ModelOptions, prop } from '@typegoose/typegoose';
import { LinkedAccount } from './linked-account';
import { BaseModel } from '../../shared/models/base-model';
import { Types } from 'mongoose';
import { Business } from '../../business/models/business';
import { AuthRolesEnum } from '../enums/auth-roles.enum';
import { Otp } from './otp';
import { Device } from './device';
import { Permissions } from './permissions';

@ModelOptions({
  schemaOptions: {
    collection: 'auth',
  },
})
@Index(
  { username: 1 },
  {
    unique: true,
    partialFilterExpression: {
      username: { $exists: true, $gt: '', $ne: null },
    },
  },
)
@Index(
  { phoneNumber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      phoneNumber: { $exists: true, $gt: '', $ne: null },
    },
  },
)
export class Auth extends BaseModel {
  @prop({ items: Device, _id: false, required: false, default: [] })
  devices: Array<Device>;

  @prop({ type: String })
  name: string;

  @prop({ type: String, unique: true, sparse: true })
  username: string;

  @prop({ type: String })
  type: string;

  @prop({ type: String, unique: true })
  email: string;

  @prop({ type: String, unique: true, sparse: true })
  phoneNumber: string;

  @prop({ type: String })
  password: string;

  @prop({ type: Otp, default: null })
  otp: Otp;

  @prop({ type: Boolean, default: false })
  isPhoneVerified: boolean;

  @prop({ type: Boolean, default: false })
  isEmailVerified: boolean;

  @prop({ type: String })
  quickLoginPassword: string;

  @prop({ type: String, enum: AuthRolesEnum })
  role: string;

  @prop({ ref: Business, localField: 'businessId', foreignField: '_id' })
  business?: Business;

  @prop({ type: Types.ObjectId })
  businessId?: Types.ObjectId;

  @prop({ type: Types.ObjectId })
  patientId?: Types.ObjectId;

  @prop({ type: Types.ObjectId })
  agentId?: Types.ObjectId;

  @prop({ items: LinkedAccount, _id: false, default: [] })
  linkedAccounts: Array<LinkedAccount>;

  @prop({ type: String })
  language: string;

  @prop({ type: Boolean, default: false })
  isVerified: boolean;

  @prop({ type: Number, default: 0 })
  loginAttempts: number;

  @prop({ type: String })
  currentPackageId: string;
  //
  @prop({ type: Date })
  currentPackageStartingDate: Date;

  @prop({ type: Date })
  currentPackageEndDate: Date;

  @prop({ type: String })
  invitationCode: string;

  @prop({ type: Number, default: 0 })
  sentInvitationsCount: number;

  @prop({ type: Boolean, default: false })
  sentInvitationsCountLimited: boolean;

  @prop({ type: Boolean, default: false })
  hasAppliedInviationCode: boolean;

  @prop({ type: Number, default: 0 })
  appliedInviationCode: number;

  set businessType(businessType: string) {
    if (businessType === AuthRolesEnum.AGENT) {
      this.role = AuthRolesEnum.AGENT;
      this.agentId = Types.ObjectId();
    } else if (businessType === AuthRolesEnum.PATIENT) {
      this.role = AuthRolesEnum.PATIENT;
      this.patientId = Types.ObjectId();
    } else {
      this.role = businessType;
      this.businessId = Types.ObjectId();
    }
  }
  @prop({ type: String })
  profileURL: string;

  @prop({ type: String })
  paymentImage: string;

  @prop({ type: Boolean })
  isActive: boolean;

  @prop({ type: Boolean })
  isNewAdmin: boolean;

  @prop({
    ref: Permissions,
    localField: 'id',
    foreignField: 'key',
    _id: false,
    default: [],
    items: String,
  })
  permissions: Array<string>;

  @prop({ type: String })
  subscriptionComment: string;
}
