import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocalizedFieldDto } from 'src/modules/shared/dtos/localizedfield.dto';
export class LookUptDto extends PartialConstructor<LookUptDto> {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedFieldDto)
  name: LocalizedField;
}
