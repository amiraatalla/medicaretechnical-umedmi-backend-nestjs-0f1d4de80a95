import { ModelRepository } from '../../shared/decorators/model-repository';
import { BaseRepository } from '../../shared/repositories/base-repository';
import { UserRate } from '../models/user-rate.model';

@ModelRepository(UserRate)
export class UserRateRepository extends BaseRepository<UserRate> {}
