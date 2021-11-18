import { BaseRepository } from '../../shared/repositories/base-repository';
import { ModelRepository } from '../../shared/decorators/model-repository';
import { UdeUser } from '../models/ude-user';

@ModelRepository(UdeUser)
export class UdeUserRepository extends BaseRepository<UdeUser> {}
