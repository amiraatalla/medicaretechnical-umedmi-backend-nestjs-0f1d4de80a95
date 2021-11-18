import { prop } from '@typegoose/typegoose';
import { Country } from 'src/modules/country/models/country';

export class Institute {
  @prop({ type: String })
  name: string;

  @prop({ type: String, ref: Country })
  countryId: string;
}
