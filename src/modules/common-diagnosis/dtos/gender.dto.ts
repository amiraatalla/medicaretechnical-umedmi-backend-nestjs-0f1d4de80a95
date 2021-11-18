import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';

export class GenderDto extends PartialConstructor<GenderDto> {
  @IsOptional()
  @IsString()
  male?: string;

  @IsOptional()
  @IsString()
  female?: string;
}
