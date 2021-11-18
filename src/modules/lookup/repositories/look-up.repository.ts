import { LookUp } from '../models/lookup';
import { BaseRepository } from '../../shared/repositories/base-repository';
import { ModelRepository } from '../../shared/decorators/model-repository';

@ModelRepository(LookUp)
export class LookUpRepository extends BaseRepository<LookUp> {
  async getAll(type: string): Promise<Array<LookUp>> {
    return await this.findAllWithProjection({ type }, { name: 1 });
  }
}
