import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocalizedFieldDto } from 'src/modules/shared/dtos/localizedfield.dto';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';
import { ResidenceDto } from 'src/modules/shared/dtos/residence.dto';
import { Residence } from 'src/modules/shared/models/residence';
import { PhoneDto } from 'src/modules/shared/dtos/phone.dto';
import { Phone } from 'src/modules/shared/models/phone';

export class FacilityBranchDto extends PartialConstructor<FacilityBranchDto> {
  // @IsOptional()
  // @ValidateNested()
  // @Type(() => LocalizedFieldDto)
  // name: LocalizedField;

  @IsString()
  @IsOptional()
  taxIdNumber: string;
  @IsString()
  @IsOptional()
  branchName: string;

  @IsString()
  @IsOptional()
  arabicBranchName: string;

  @IsString()
  @IsOptional()
  city: string;
  @IsString()
  @IsOptional()
  country: string;
  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  facilityName: string;
  @IsOptional()
  dateEstablished: Date;

  @IsString()
  @IsOptional()
  commercialRegisterId: string;
  @IsString({ each: true })
  @IsOptional()
  branchImages: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ResidenceDto)
  branchLocation: Residence;

  @IsString()
  @IsOptional()
  facilityType: string;
  @IsOptional()
  phoneNumber: string;
  @IsOptional()
  phoneType: string;
}
