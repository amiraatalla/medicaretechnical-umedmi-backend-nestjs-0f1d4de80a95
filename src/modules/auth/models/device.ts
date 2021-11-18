import { prop } from '@typegoose/typegoose';
import { DeviceTypesEnums } from '../enums/device-types.enum';

export class Device {
  @prop({ type: String })
  imie: string;

  @prop({ type: String, required: true })
  token: string;

  @prop({ type: String, enum: DeviceTypesEnums })
  deviceType: DeviceTypesEnums;
}
