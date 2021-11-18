import { Transform } from 'class-transformer';
import { IsDateString, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Unique } from '../../api/validators/unique-mongo.validator';
import { Patient } from '../models/patient';
export class PatientPersonalInfoDto {
  // @IsOptional()
  @IsString()
  @Unique({ modelName: 'Patient', field: 'personalInfo.phoneNumber' })
  phoneNumber: string;
  @IsOptional()
  @IsString()
  emergencyPhoneNumber: string;
  @IsOptional()
  @IsString()
  husbandNameArabic: string;
  @IsOptional()
  @IsString()
  husbandNameEnglish: string;
  @IsOptional()
  @IsString()
  ethnicGroup: string;
  @IsOptional()
  @IsString()
  bmi: string;
  @IsOptional()
  @IsString()
  height: string;
  @IsOptional()
  @IsString()
  weight: string;
  @IsOptional()
  @IsString()
  blood: string;
  @IsOptional()
  @IsString()
  bloodPressure: string;
  @IsOptional()
  @IsString()
  insurance: string;
  @IsOptional()
  @IsString()
  heartRate: string;
  @IsOptional()
  @IsString()
  temprature: string;
  @IsOptional()
  @IsString()
  respiratoryRate: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  address?: string;

  @IsDateString()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  cityArabic?: string;

  @IsOptional()
  @IsString()
  cityEnglish?: string;

  @IsOptional()
  @IsString()
  encryption?: string;

  @IsOptional()
  @IsString()
  fullNameArabic?: string;

  @IsOptional()
  @IsString()
  fullNameEnglish?: string;

  @IsOptional()
  @IsString()
  genderArabic?: string;

  @IsOptional()
  @IsString()
  genderEnglish?: string;

  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  idCardExpiration?: string;

  @IsOptional()
  @IsString()
  idValidity?: string;

  @IsOptional()
  @IsString()
  jobArabic?: string;

  @IsOptional()
  @IsString()
  jobEnglish?: string;

  @IsOptional()
  @IsString()
  mainBirthPlaceArabic?: string;

  @IsOptional()
  @IsString()
  mainBirthPlaceEnglish?: string;

  @IsOptional()
  @IsString()
  maritalStatusArabic?: string;

  @IsOptional()
  @IsString()
  maritalStatusEnglish?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  religionArabic?: string;

  @IsOptional()
  @IsString()
  religionEnglish?: string;

  @Unique({ modelName: 'Patient', field: 'personalInfo.ssn', customPropertyName: 'user ID' })
  @IsString()
  ssn?: string;
  @IsOptional()
  @IsString()
  diagnosis?: string;
  @Transform(value => value as number, {
    toPlainOnly: true,
  })
  @IsOptional()
  @IsString()
  age?: string;
}
