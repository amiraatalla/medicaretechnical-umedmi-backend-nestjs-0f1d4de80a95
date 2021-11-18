import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class filterDto extends PartialConstructor<filterDto> {
  @IsOptional()
  @IsString()
  ICDVersion?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;
}
