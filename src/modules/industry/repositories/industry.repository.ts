import { BaseRepository } from '../../shared/repositories/base-repository';
import { ModelRepository } from '../../shared/decorators/model-repository';
import { Industry } from '../models/industry';

@ModelRepository(Industry)
export class IndustryRepository extends BaseRepository<Industry> {}
