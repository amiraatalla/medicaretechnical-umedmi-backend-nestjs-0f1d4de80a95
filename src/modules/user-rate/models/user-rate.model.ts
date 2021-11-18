import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { Auth } from '../../auth/models/auth';
import { UserRateEnum } from '../enums/user-rate.enum';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
})
export class UserRate {
  @prop({ ref: 'Auth', required: true, unique: true })
  userId: Ref<Auth> | string;
  @prop({ type: String, enum: Object.values(UserRateEnum), required: true })
  rate: UserRateEnum;
  @prop({ type: String })
  comment: string;
  id: string;
}
