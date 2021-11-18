import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { VisitTypeDto } from '../dtos/visittype.dto';
import { Type } from 'class-transformer';
import { VisitType } from '../models/visittype';
import { GenderDto } from './gender.dto';
import { Gender } from '../models/gender';
import { Country } from '../models/country';
import { AgeGroup } from '../models/agegroup';
import { AgeGroupDto } from './agegroup.dto';
import { CountryTypeDto } from './country.dto';
import { CommonDiagonsisSpecialityDto } from './speciality.dto';

export class CommonDiagnosisDto extends PartialConstructor<CommonDiagnosisDto> {
  @IsNotEmpty()
  @IsString()
  CodeVersion: string;

  @IsNotEmpty()
  @IsString()
  ICDCode: string;

  @IsNotEmpty()
  @IsString()
  Diagnosis: string;

  @IsOptional()
  @Type(() => VisitTypeDto)
  VisitType?: Array<VisitType>;

  @IsOptional()
  @Type(() => GenderDto)
  Gender?: Array<Gender>;

  // TODO: update Specialities here
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CommonDiagonsisSpecialityDto)
  Specialities?: Array<CommonDiagonsisSpecialityDto>;

  @IsOptional()
  @Type(() => CountryTypeDto)
  Countries?: Array<Country>;

  @IsOptional()
  @Type(() => AgeGroupDto)
  AgeGroup?: Array<AgeGroup>;
}
