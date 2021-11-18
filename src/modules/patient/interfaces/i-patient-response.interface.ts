import { IPatientRequest } from './i-patient-request.interface';

export interface IPatientResponse extends IPatientRequest {
  createdBy: string;
  EMR: string;
  SN: string;
  createdAt: string;
}
