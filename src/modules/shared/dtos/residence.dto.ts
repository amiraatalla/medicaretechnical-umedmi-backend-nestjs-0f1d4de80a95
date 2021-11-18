import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { MapLocation } from '../classes/location';
import { IsOptional, IsString } from 'class-validator';

export class ResidenceDto extends PartialConstructor<ResidenceDto> {
  @IsOptional()
  @IsString()
  countryId: string;

  @IsOptional()
  @IsString()
  cityId: string;

  @IsOptional()
  mapLocation: MapLocation;
}
