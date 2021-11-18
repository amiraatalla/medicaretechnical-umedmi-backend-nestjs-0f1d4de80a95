import { IsString } from 'class-validator';

export class TranslateDto {
  @IsString()
  Text: string;
}
