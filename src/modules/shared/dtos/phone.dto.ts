import { PartialConstructor } from '../classes/partial-constructor';
import { IsOptional, IsString } from 'class-validator';

export class PhoneDto extends PartialConstructor<PhoneDto> {
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  phoneType: string;
}
