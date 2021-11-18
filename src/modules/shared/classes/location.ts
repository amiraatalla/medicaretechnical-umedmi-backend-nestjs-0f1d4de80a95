import { prop } from '@typegoose/typegoose';

export class MapLocation {
  @prop({ type: String, default: 'Point' })
  type: string;

  @prop({ items: Number, default: [0, 0] })
  coordinates: Array<number>;
}
