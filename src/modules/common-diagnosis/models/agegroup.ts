import { prop } from '@typegoose/typegoose';

export class AgeGroup {
  @prop({ type: Number })
  y0_5: number;

  @prop({ type: Number })
  y5_15: number;

  @prop({ type: Number })
  y15_25: number;

  @prop({ type: Number })
  y25_45: number;

  @prop({ type: Number })
  y45_65: number;

  @prop({ type: Number })
  above65y: number;
}
