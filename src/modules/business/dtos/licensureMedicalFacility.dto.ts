import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { ValidityTypesEnum, LicensureMedicalFacilityTypesEnum } from '../enums/business.enum';

export class LicensureMedicalFacilityDto extends PartialConstructor<LicensureMedicalFacilityDto> {
  @IsString()
  @IsOptional()
  branchName: string;

  @IsString()
  @IsOptional()
  facilityName: string;
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(LicensureMedicalFacilityTypesEnum)
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  documentName: string;
  @IsString()
  @IsOptional()
  documentType: string;

  @IsString()
  @IsOptional()
  issueOrganization: string;

  @IsEnum(ValidityTypesEnum)
  @IsOptional()
  validity: string;

  @IsString()
  @IsOptional()
  issueDate: Date;

  @IsString()
  @IsOptional()
  expiryDate: Date;

  @IsBoolean()
  @IsOptional()
  share: boolean;

  @IsString({ each: true })
  @IsOptional()
  licensureFacilityImages: string[];
}
