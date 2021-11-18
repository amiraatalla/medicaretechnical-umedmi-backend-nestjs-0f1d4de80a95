import { PartialConstructor } from '../classes/partial-constructor';
import { IsOptional, IsString } from 'class-validator';

export class FullNameDto extends PartialConstructor<FullNameDto> {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
