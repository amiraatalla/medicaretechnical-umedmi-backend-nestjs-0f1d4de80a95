import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  language: string;
  @IsOptional()
  @IsString()
  currentPackageId: string;
  @IsOptional()
  @IsString()
  profileURL: string;
  @IsOptional()
  @IsString()
  paymentImage: string;
}
