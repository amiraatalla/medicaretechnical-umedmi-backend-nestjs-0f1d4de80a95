import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class CommonDiagonsisSpecialityDto {
  @IsString()
  speciality: string;
  @IsNumber()
  count: number;
}
