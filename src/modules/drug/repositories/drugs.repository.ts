import { ModelRepository } from 'src/modules/shared/decorators/model-repository';
import { BaseRepository } from 'src/modules/shared/repositories/base-repository';
import { Drug } from '../models/drugs';

@ModelRepository(Drug)
export class DrugRepository extends BaseRepository<Drug> {}
