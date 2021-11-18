import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { EducationTypesEnum, GradeTypesEnum } from '../enums/business.enum';

export class EducationDto extends PartialConstructor<EducationDto> {
  @IsString()
  @IsOptional()
  educationInstitute: string;

  @IsString()
  @IsOptional()
  @IsEnum(EducationTypesEnum)
  educationType: string;

  @IsString()
  @IsOptional()
  info: string;

  @IsString()
  @IsOptional()
  educationCountry: string;

  @IsString()
  @IsOptional()
  degree: string;

  @IsString()
  @IsOptional()
  fieldOfStudy: string;

  @IsString()
  @IsOptional()
  @IsEnum(GradeTypesEnum)
  grade: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;

  @IsString()
  @IsOptional()
  activities: string;

  @IsString()
  @IsOptional()
  otherNotes: string;

  @IsBoolean()
  @IsOptional()
  shareEducation: boolean;

  @IsOptional()
  @IsString({ each: true })
  certificateImages: string[];
}
