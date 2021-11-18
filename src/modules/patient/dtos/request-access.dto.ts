import { IsEnum } from 'class-validator';
import { PatientPermessionEnum } from '../enums/patient-permession.enum';

export class PatientAccessRequestDto {
  @IsEnum(PatientPermessionEnum, { each: true })
  permessions: PatientPermessionEnum[];
}
