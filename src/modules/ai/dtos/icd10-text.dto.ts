import { IsString } from 'class-validator';

export class ICD10TextDto {
  @IsString()
  Text: string;
}
