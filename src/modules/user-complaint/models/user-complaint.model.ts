import { string } from '@hapi/joi';
import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { Auth } from '../../auth/models/auth';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
})
export class UserComplaint {
  @prop({ ref: 'Auth', required: true })
  userId: Ref<Auth> | string;
  @prop({ type: String })
  comment: string;
  @prop({ type: String })
  speciality: string;
  @prop({ items: String, default: [] })
  attachemnts: string[];
  @prop({ items: String, default: [] })
  images: string[];

  id: string;
}
