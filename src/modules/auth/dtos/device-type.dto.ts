import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsString, IsEnum } from 'class-validator';
import { DeviceTypesEnums } from '../enums/device-types.enum';

export class DeviceTypeDto extends PartialConstructor<DeviceTypeDto> {
  @IsString()
  @IsEnum(DeviceTypesEnums)
  type: string;
}
