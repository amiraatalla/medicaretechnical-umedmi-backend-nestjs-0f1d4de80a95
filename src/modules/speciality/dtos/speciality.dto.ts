import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsOptional, IsString, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';
import { Type } from 'class-transformer';

export class SpecialityDto extends PartialConstructor<SpecialityDto> {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedField)
  mainSpeciality: LocalizedField;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedField)
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

export class SubSpecialityDto extends PartialConstructor<SpecialityDto> {
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => LocalizedField)
  subSpeciality: Array<LocalizedField>;
}
