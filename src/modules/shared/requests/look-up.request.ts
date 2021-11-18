import { IsString } from 'class-validator';
import { LookUptDto } from 'src/modules/lookup/dtos/look-up.dto';

export class LookUpRequest extends LookUptDto {}

export class OptionRequest {
  @IsString()
  value: string;
}
