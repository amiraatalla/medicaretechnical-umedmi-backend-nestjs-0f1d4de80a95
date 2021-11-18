import { BaseRepository } from '../../shared/repositories/base-repository';
import { ModelRepository } from '../../shared/decorators/model-repository';
import { Institute } from '../models/institue';

@ModelRepository(Institute)
export class InstituteRepository extends BaseRepository<Institute> {}
