import { prop } from '@typegoose/typegoose';
import { City } from 'src/modules/country/models/city';
import { MapLocation } from 'src/modules/shared/classes/location';
import { Country } from 'src/modules/country/models/country';

export class Residence {
  @prop({ type: String, ref: Country })
  countryId: string;

  @prop({ type: String, ref: City })
  cityId: string;

  @prop({ type: MapLocation })
  mapLocation: MapLocation;
}
