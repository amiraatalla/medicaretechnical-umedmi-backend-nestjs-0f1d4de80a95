import { Types } from 'mongoose';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Auth } from '../../auth/models/auth';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
  options: {},
})
export class ActiveUser {
  @prop({ ref: 'Auth' })
  userId: Ref<Auth>;

  @prop({ type: Boolean, default: false })
  isAdmin: boolean;

  @prop({ type: Date, default: Date.now })
  joinDate?: Date;
}
