import { prop, Ref } from '@typegoose/typegoose';
import { Speciality } from 'src/modules/business/models/speciality';
import { CountryCodeEnum } from 'src/modules/shared/enums/country-code.enum';
import { BaseModel } from 'src/modules/shared/models/base-model';

export class UdeUser extends BaseModel {
  @prop({ type: String, required: true, unique: true })
  username: string;

  @prop({ type: String, required: true, unique: true })
  phone: string;

  @prop({ ref: () => Speciality })
  speciality?: string | Ref<Speciality> | Speciality;

  @prop({ type: String, required: true })
  pinCode: string;

  @prop({ type: Boolean, required: true, default: true })
  isVerified: boolean;

  @prop({ type: String, enum: Object.values(CountryCodeEnum), default: CountryCodeEnum.SA })
  countryCode: CountryCodeEnum;
}


