import { Controller, Get } from '@nestjs/common';
import { createPrefix } from '../../../../helpers/prefix.helper';
import { AppsEnum } from '../../../../enums/apps.enum';
import { CountryService } from 'src/modules/country/services/country.service';
import { CountryArrayResponse } from '../../../../../shared/responses/country.response.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Country')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'country'))
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get()
  async findAll(): Promise<CountryArrayResponse> {
    const countries = await this.countryService.getAll();
    return new CountryArrayResponse(countries);
  }
}
