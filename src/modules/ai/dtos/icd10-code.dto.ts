import { IsString } from 'class-validator';

export class ICD10CodeDto {
  @IsString()
  Code: string;
}
