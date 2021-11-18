import { Country } from '../models/country';
import { Injectable } from '@nestjs/common';
import { CountryRepository } from '../repositories/country.repository';
import { CountryDto } from '../dtos/country.dto';

@Injectable()
export class CountryService {
  constructor(private repo: CountryRepository) {}

  async seed(countries: Array<CountryDto>) {
    await this.repo.remove({});
    return await this.repo.insertMany(countries);
  }

  async getAll(): Promise<Array<Country>> {
    return await this.repo.findAll();
  }
}
