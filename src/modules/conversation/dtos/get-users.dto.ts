import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetUsersDto {
  @IsNumberString()
  @IsNotEmpty()
  page: number;

  @IsNumberString()
  @IsNotEmpty()
  limit: number;
}
