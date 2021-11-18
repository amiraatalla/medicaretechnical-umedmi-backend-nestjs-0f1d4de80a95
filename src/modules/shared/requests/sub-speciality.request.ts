import { IsArray } from 'class-validator';
import { LocalizedField } from '../models/localizedfield';

export class SubSpecialityRequest {
  @IsArray()
  subSpeciality: Array<LocalizedField>;
}
