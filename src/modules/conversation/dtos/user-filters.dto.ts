import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UserFilterDto {
  @IsNumberString()
  @IsNotEmpty()
  page: number;

  @IsNumberString()
  @IsNotEmpty()
  limit: number;

  @IsString()
  @IsOptional()
  businessType?: string;

  @IsString()
  @IsOptional()
  speciality?: string;

  @IsString()
  @IsOptional()
  subSpeciality?: string;

  @IsString()
  @IsOptional()
  username?: string;
}
