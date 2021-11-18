import { PartialConstructor } from '../classes/partial-constructor';
import { IsOptional, IsString } from 'class-validator';

export class LocalizedFieldDto extends PartialConstructor<LocalizedFieldDto> {
  @IsOptional()
  @IsString()
  ar: string;

  @IsOptional()
  @IsString()
  en: string;
}
