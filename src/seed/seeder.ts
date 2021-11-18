import { Injectable } from '@nestjs/common';
import { SubscriptionService } from 'src/modules/subscription/services/subscription.service';
import { SpecialityService } from 'src/modules/speciality/services/speciality.service';
import { DoctorSpecialitiesData } from './specialities/doctorSpecialitiesData';
import { MedicalCenterSpecialitiesData } from './specialities/medicalCenterSpecialitiesData';
import { CountryService } from 'src/modules/country/services/country.service';
import { CountriesData } from './countries/data';
import { SuperAdminService } from 'src/modules/superAdmin/services/superAdmin.service';
import { SuperAdminData } from './superAdmin/data';
@Injectable()
export class Seeder {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly specialityService: SpecialityService,
    private readonly countryService: CountryService,
    private readonly superAdminService: SuperAdminService,
  ) {}

  async seed() {
    // await this.subscriptions();
    await this.specialities();
    // await this.countries();
    // await this.superAdmin();
  }

  async subscriptions() {
    return await Promise.all(this.subscriptionService.seed());
  }

  async specialities() {
    await this.specialityService.seed(DoctorSpecialitiesData);
    await this.specialityService.seed(MedicalCenterSpecialitiesData);
  }

  async countries() {
    await this.countryService.seed(CountriesData);
  }

  async superAdmin() {
    await this.superAdminService.seed(SuperAdminData);
  }
}
