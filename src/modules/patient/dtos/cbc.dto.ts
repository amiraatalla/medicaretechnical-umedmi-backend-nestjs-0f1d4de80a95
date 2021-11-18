import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString } from 'class-validator';

export class CBCDto extends PartialConstructor<CBCDto> {
  @IsString()
  cbc: string;
}
