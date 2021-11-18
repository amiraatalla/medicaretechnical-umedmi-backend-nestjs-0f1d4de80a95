import { prop } from '@typegoose/typegoose';
import { DeviceTypesEnums } from '../enums/device-types.enum';

export class DeviceType {
  @prop({ type: String, enum: DeviceTypesEnums })
  type: string;
}
