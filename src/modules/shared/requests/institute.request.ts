import { IsString } from 'class-validator';

export class InstitueRequest {
  @IsString()
  name: string;

  @IsString()
  countryId: string;
}
