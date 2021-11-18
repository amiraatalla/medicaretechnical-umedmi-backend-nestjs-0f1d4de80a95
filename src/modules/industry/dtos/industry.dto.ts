import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsOptional, IsString } from 'class-validator';

export class IndustryDto extends PartialConstructor<IndustryDto> {
  @IsOptional()
  @IsString()
  name: string;
}
