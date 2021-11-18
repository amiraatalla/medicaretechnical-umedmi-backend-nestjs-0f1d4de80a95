import { Country } from '../models/country';
import { BaseRepository } from '../../shared/repositories/base-repository';
import { ModelRepository } from '../../shared/decorators/model-repository';

@ModelRepository(Country)
export class CountryRepository extends BaseRepository<Country> {}
