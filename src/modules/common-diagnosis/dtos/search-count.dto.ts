import { IsNotEmpty, IsString } from 'class-validator';

export class SearchCountDto {
  @IsString()
  @IsNotEmpty()
  ICDCode: string;
}
