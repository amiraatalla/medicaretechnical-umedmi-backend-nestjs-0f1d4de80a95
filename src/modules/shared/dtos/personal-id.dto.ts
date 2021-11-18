import { PartialConstructor } from '../classes/partial-constructor';
import { IsOptional, IsString } from 'class-validator';

export class PersonalIdDto extends PartialConstructor<PersonalIdDto> {
  @IsOptional()
  @IsString()
  idType: string;

  @IsOptional()
  @IsString()
  idData: string;
}
