import { ModelRepository } from '../../shared/decorators/model-repository';
import { BaseRepository } from '../../shared/repositories/base-repository';
import { Patient } from '../models/patient';

@ModelRepository(Patient)
export class PatientRepository extends BaseRepository<Patient> {}
