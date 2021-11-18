import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PatientPersonalInfoDto } from './patient-personal-info.dto';
import { UpdatePatientPersonalInfoDto } from './update-patient-personal-info.dto';

export class UpdatePatientDto {
  // @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePatientPersonalInfoDto)
  personalInfo: UpdatePatientPersonalInfoDto;
}
