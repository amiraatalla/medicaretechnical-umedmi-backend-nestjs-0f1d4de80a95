import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CountryTypeDto extends PartialConstructor<CountryTypeDto> {
  @IsOptional()
  @IsString()
  countyCode?: string;

  @IsOptional()
  @IsNumber()
  count?: number;
}
