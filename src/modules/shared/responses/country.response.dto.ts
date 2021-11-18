import { Country } from '../../country/models/country';
import { BaseHttpResponse } from '../classes/base-http.response';

export class CountryResponse extends BaseHttpResponse<object> {
  data: object;

  constructor(country: Country) {
    super();
    this.data = country;
  }
}

export class CountryArrayResponse extends BaseHttpResponse<Array<Country>> {
  data: Array<Country>;

  constructor(countries: Array<Country>) {
    super();
    this.data = countries;
  }
}
