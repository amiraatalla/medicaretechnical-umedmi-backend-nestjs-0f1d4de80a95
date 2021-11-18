import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { LocalizedField } from '../models/localizedfield';
import { Type } from 'class-transformer';

export class MainSpecialityRequest {
  @ValidateNested()
  @Type(() => LocalizedField)
  @IsNotEmpty()
  mainSpeciality: LocalizedField;

  @ValidateNested()
  @Type(() => LocalizedField)
  @IsNotEmpty()
  businessType: LocalizedField;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => LocalizedField)
  subSpeciality: Array<LocalizedField>;

  @IsNotEmpty()
  @ValidateNested()
  @IsString()
  icon: string;
}
