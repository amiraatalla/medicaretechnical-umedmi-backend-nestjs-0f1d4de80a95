import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsOptional, IsString } from 'class-validator';

export class VisitTypeDto extends PartialConstructor<VisitTypeDto> {
  @IsOptional()
  @IsString()
  new?: string;

  @IsOptional()
  @IsString()
  folowup?: string;
}
