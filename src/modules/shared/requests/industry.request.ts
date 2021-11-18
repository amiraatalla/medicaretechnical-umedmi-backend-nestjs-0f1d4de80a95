import { IsString } from 'class-validator';

export class IndustryRequest {
  @IsString()
  name: string;
}
