import { ModelRepository } from 'src/modules/shared/decorators/model-repository';
import { BaseRepository } from 'src/modules/shared/repositories/base-repository';
import { Icd } from '../models/icd';

@ModelRepository(Icd)
export class IcdRepository extends BaseRepository<Icd> {}
