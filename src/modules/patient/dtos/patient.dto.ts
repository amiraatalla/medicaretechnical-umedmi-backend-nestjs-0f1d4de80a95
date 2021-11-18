import { DocumentType } from '@typegoose/typegoose';
import { IsOptional } from 'class-validator';
import { Auth } from '../../auth/models/auth';
import { Patient, PatientPersonalInfoModel } from '../models/patient';
import { PatientAccessRequest } from '../models/patient-access-request';
import { PatientPersonalInfoDto } from './patient-personal-info.dto';

export class PatientDto {
  _id: string;
  personalInfo: PatientPersonalInfoDto;
  specialities?: any;
  SN: string;
  EMR: string;
  createdBy: Auth | string;
  accessRequests: PatientAccessRequest[];
}
