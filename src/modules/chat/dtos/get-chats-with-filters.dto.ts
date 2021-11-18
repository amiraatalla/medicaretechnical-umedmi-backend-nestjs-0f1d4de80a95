import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetChatsWithFiltersDto {
  @IsNotEmpty()
  @IsNumberString()
  page = 1;

  @IsNumberString()
  @IsNotEmpty()
  limit = 10;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  businessType: string;

  @IsString()
  @IsOptional()
  speciality: string;

  @IsString()
  @IsOptional()
  subSpeciality: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  date: Date;

  @IsString()
  @IsOptional()
  startDate: Date;

  @IsString()
  @IsOptional()
  endDate: Date;
}
