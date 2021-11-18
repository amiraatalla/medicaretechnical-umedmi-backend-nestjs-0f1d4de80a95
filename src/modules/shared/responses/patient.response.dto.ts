import { BaseHttpResponse } from '../classes/base-http.response';
import { Patient } from 'src/modules/patient/models/patient';
export class PatientResponse extends BaseHttpResponse<Patient> {
  data: Patient;
  constructor(patient: Patient) {
    super();
    this.data = patient;
  }
}
