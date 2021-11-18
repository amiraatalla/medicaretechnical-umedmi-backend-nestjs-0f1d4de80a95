import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Business } from './models/business';
import { BusinessService } from './services/business.service';
import { BusinessRepository } from './repositories/business.repository';
import { CountryRepository } from '../country/repositories/country.repository';
import { AuthRepository } from '../auth/repositories/auth.repository';
import { Country } from '../country/models/country';
import { CountryService } from '../country/services/country.service';
import { Auth } from '../auth/models/auth';

import { UploaderService } from '../utils/uploader/uploader.service';
import { ImageService } from '../utils/image/services/image.service';
import { UploaderModule } from '../utils/uploader/uploader.module';
import { ImageRepository } from '../utils/image/repositories/image.repository';
import { Image } from '../utils/image/models/image.model';

@Module({
  imports: [TypegooseModule.forFeature([Business, Country, Image, Auth])],

  providers: [
    BusinessService,
    BusinessRepository,
    CountryRepository,
    CountryService,
    UploaderService,
    ImageService,
    ImageRepository,
    AuthRepository,
  ],
  exports: [BusinessService, CountryService],
})
export class BusinessModule {}
