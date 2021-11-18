import { ModelOptions, prop } from '@typegoose/typegoose';
import { OtpTypesEnum } from '../enums/otp-types.enum';

@ModelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class Otp {
  @prop({ type: String })
  code: string;

  @prop({ type: String, enum: OtpTypesEnum })
  type: string;

  @prop({ type: Date, default: Date.now })
  createdAt: Date;

  @prop({ type: Boolean, default: false })
  hasUsed: boolean;
}
