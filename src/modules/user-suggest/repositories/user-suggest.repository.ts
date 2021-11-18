import { ModelRepository } from '../../shared/decorators/model-repository';
import { BaseRepository } from '../../shared/repositories/base-repository';
import { UserSuggest } from '../models/user-suggest.model';

@ModelRepository(UserSuggest)
export class UserSuggestRepository extends BaseRepository<UserSuggest> {}
