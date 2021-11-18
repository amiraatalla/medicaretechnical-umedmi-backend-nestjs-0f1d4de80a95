import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsOptional, IsString, IsArray } from 'class-validator';
export class SpecialityDto extends PartialConstructor<SpecialityDto> {
  @IsOptional()
  @IsString()
  mainSpeciality: string;

  @IsOptional()
  @IsArray()
  subSpeciality: Array<string>;

  @IsOptional()
  @IsString()
  businessType: string;
}
