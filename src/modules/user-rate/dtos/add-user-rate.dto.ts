import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRateEnum } from '../enums/user-rate.enum';

export class AddUserRateDto {
  @IsEnum(UserRateEnum)
  @IsNotEmpty()
  rate: UserRateEnum;
  @IsString()
  @IsOptional()
  comment?: string;
}
