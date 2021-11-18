import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Country } from './models/country';
import { CountryService } from './services/country.service';
import { CountryRepository } from './repositories/country.repository';

@Module({
  imports: [TypegooseModule.forFeature([Country])],
  providers: [CountryService, CountryRepository],
  exports: [CountryService],
})
export class CountryModule {}
