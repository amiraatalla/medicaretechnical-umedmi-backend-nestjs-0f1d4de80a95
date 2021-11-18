import { string } from '@hapi/joi';
import { modelOptions, ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { Auth } from '../../auth/models/auth';
import { PatientPermessionStatusEnum } from '../enums/patient-parmession-status.enum';
import { PatientPermessionEnum } from '../enums/patient-permession.enum';
@modelOptions({
  schemaOptions: {
    _id: true,
    timestamps: true,
  },
})
export class PatientAccessRequest {
  @prop({ ref: 'Auth', required: true })
  requestedBy: Ref<Auth> | string;
  @prop({
    items: String,
  })
  permessions: PatientPermessionEnum[];

  @prop({
    type: String,
    required: true,
  })
  status: PatientPermessionStatusEnum;
}
