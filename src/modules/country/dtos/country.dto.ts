import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';

export class CountryDto extends PartialConstructor<CountryDto> {
  countryCode: string;
  name: LocalizedField;
  phoneCode: string;
  flagPath: string;
  cities: Array<string>;
}
