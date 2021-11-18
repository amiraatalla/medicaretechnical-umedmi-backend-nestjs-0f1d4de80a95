import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsString, IsArray, ValidateNested, IsOptional, IsEnum } from 'class-validator';
import { DeviceTypesEnums } from '../enums/device-types.enum';
import { ApiProperty } from '@nestjs/swagger';
export class DeviceDto extends PartialConstructor<DeviceDto> {
  @ApiProperty()
  @IsString()
  imie: string;

  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty({ enum: DeviceTypesEnums })
  @IsEnum(DeviceTypesEnums)
  deviceType: DeviceTypesEnums;
}
