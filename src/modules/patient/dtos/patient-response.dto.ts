import { PatientPersonalInfoDto } from './patient-personal-info.dto';

export class PatientResponseDto extends PatientPersonalInfoDto {
  _id: string;
  SN?: string;
  EMR?: string;
  createdBy?: string;
}
