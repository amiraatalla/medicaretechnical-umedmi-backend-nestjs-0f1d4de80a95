import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UdeUserDto } from './ude-user.dto';

export class UdeUserResetPinDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  pinCode: string;

  @IsString()
  @IsOptional()
  countryCode: string;
}
