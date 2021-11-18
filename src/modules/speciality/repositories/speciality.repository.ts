import { BaseRepository } from '../../shared/repositories/base-repository';
import { ModelRepository } from '../../shared/decorators/model-repository';
import { Speciality } from '../models/speciality';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';

@ModelRepository(Speciality)
export class SpecialityRepository extends BaseRepository<Speciality> {
  async addSubSpeciality(id: string, subSpeciality: Array<LocalizedField>): Promise<Speciality> {
    return await this.findByIdAndUpdate(id, {
      $addToSet: { subSpeciality },
    });
  }
}
