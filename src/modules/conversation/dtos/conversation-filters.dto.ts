import { ParseBoolPipe } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class ConversationsFilterDto {
  @IsNotEmpty()
  @IsNumberString()
  page: number = 1;

  @IsNumberString()
  @IsNotEmpty()
  limit: number = 10;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  activeUsers?: string;

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

  @IsString()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  startDate?: Date;

  @IsString()
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  conversationName?: string;

  @Transform(value => {
    return value.toString() == 'true';
  })
  @IsBoolean()
  @IsOptional()
  isGroup?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  after: Date;
}
