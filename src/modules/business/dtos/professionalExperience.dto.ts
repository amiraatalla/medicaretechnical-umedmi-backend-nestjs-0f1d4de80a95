import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsOptional, IsBoolean, IsEnum, ValidateNested } from 'class-validator';
import { EmployeeTypesEnum } from '../enums/business.enum';
import { Type } from 'class-transformer';
import { ResidenceDto } from 'src/modules/shared/dtos/residence.dto';
import { Residence } from 'src/modules/shared/models/residence';

export class ProfessionalExperienceDto extends PartialConstructor<ProfessionalExperienceDto> {
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  country: string;
  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  dateEstablished: Date;

  @IsString()
  @IsOptional()
  branchName: string;

  @IsEnum(EmployeeTypesEnum)
  @IsOptional()
  employeeType: string;

  @IsString()
  @IsOptional()
  primaryPractice: string;

  @IsString()
  @IsOptional()
  mainSpeciality: string;

  @IsString()
  @IsOptional()
  subSpeciality: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ResidenceDto)
  residence: Residence;

  @IsOptional()
  startYear: Date;

  @IsOptional()
  endYear: Date;

  @IsBoolean()
  @IsOptional()
  updateHeadline: boolean;

  @IsBoolean()
  @IsOptional()
  updatePosition: boolean;

  @IsBoolean()
  @IsOptional()
  currentlyWorkThere: boolean;
}
