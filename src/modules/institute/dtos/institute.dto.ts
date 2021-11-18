import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsOptional, IsString } from 'class-validator';

export class InstituteDto extends PartialConstructor<InstituteDto> {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  countryId: string;
}
