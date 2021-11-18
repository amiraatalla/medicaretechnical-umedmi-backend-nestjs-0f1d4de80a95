import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddUserComplaintDto {
  @IsString()
  comment: string;
  @IsString()
  speciality: string;
  @IsString({ each: true })
  @IsOptional()
  attachemnts: string[];
  @IsOptional()
  @IsString({ each: true })
  images: string[];
}
