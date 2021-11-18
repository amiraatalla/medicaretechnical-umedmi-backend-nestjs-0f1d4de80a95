import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class filterDrugDto extends PartialConstructor<filterDrugDto> {
  @IsOptional()
  @IsString()
  TradeName?: string;

  @IsOptional()
  @IsString()
  Country?: string;
}
