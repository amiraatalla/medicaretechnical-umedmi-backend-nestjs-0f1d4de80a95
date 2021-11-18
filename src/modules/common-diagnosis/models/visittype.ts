import { prop } from '@typegoose/typegoose';

export class VisitType {
  @prop({ type: Number })
  new: number;

  @prop({ type: Number })
  followup: number;
}
