import { prop } from '@typegoose/typegoose';

export class ReviewComment {
  @prop({ type: String })
  bio: string;
  @prop({ type: String })
  information: string;
  @prop({ type: String })
  education: string;
  @prop({ type: String })
  licensure: string;
  @prop({ type: String })
  experience: string;
}
