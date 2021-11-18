import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { FacilityTypesEnum } from '../enums/business.enum';

export class PersonalMedicalFacilityNameDTO extends PartialConstructor<PersonalMedicalFacilityNameDTO> {
  @IsString()
  @IsOptional()
  facilityName: string;

  @IsOptional()
  branchNumber: number;

  @IsEnum(FacilityTypesEnum)
  @IsOptional()
  facilityType: string;

  @IsString()
  @IsOptional()
  arabicFacilityName: string;
}
