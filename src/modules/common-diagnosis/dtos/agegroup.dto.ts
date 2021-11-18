import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsOptional, IsString } from 'class-validator';

export class AgeGroupDto extends PartialConstructor<AgeGroupDto> {
  @IsOptional()
  @IsString()
  y0_5?: string;

  @IsOptional()
  @IsString()
  y5_15?: string;

  @IsOptional()
  @IsString()
  y15_25?: string;

  @IsOptional()
  @IsString()
  y25_45?: string;

  @IsOptional()
  @IsString()
  y45_65?: string;

  @IsOptional()
  @IsString()
  above65y?: string;
}
