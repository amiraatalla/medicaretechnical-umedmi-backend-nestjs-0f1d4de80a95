import { Business } from '../models/business';
import { BaseRepository } from '../../shared/repositories/base-repository';
import { ModelRepository } from '../../shared/decorators/model-repository';

@ModelRepository(Business)
export class BusinessRepository extends BaseRepository<Business> {}
