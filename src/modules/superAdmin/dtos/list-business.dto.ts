import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class ListBusinessDto {
  @IsNotEmpty()
  @IsNumberString()
  page = 1;

  @IsNumberString()
  @IsNotEmpty()
  limit = 10;
}
