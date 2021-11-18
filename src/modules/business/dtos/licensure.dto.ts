import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsOptional, ValidateNested, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { LocalizedFieldDto } from 'src/modules/shared/dtos/localizedfield.dto';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';
import { FullNameDto } from 'src/modules/shared/dtos/full-name.dto';
import { FullName } from 'src/modules/shared/models/full-name';
import { LicensureTypesEnum } from '../enums/business.enum';
import { PhoneDto } from 'src/modules/shared/dtos/phone.dto';
import { Phone } from 'src/modules/shared/models/phone';
import { ResidenceDto } from 'src/modules/shared/dtos/residence.dto';
import { Residence } from 'src/modules/shared/models/residence';

export class LicensureDto extends PartialConstructor<LicensureDto> {
  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedFieldDto)
  fullName: LocalizedField;

  @IsOptional()
  @ValidateNested()
  @Type(() => FullNameDto)
  name: FullName;

  @IsOptional()
  @IsEnum(LicensureTypesEnum)
  licensureType: string;

  @IsString()
  @IsOptional()
  documentName: string;

  @IsString()
  @IsOptional()
  arabicFullName: string;

  @IsString()
  @IsOptional()
  issueOrganization: string;

  @IsString()
  @IsOptional()
  type: string;
  @IsString({ each: true })
  @IsOptional()
  licensureImages: string[];

  @IsString()
  @IsOptional()
  validity: string;

  @IsOptional()
  issueDate: Date;

  @IsOptional()
  expiryDate: Date;

  @IsString()
  @IsOptional()
  role: string;

  @IsOptional()
  @IsString()
  arabicPersonnelName: string;
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  phoneType: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => ResidenceDto)
  residence: Residence;

  @IsBoolean()
  @IsOptional()
  share: boolean;

  @IsString()
  @IsOptional()
  firstName: string;
  @IsString()
  @IsOptional()
  lastName: string;
  @IsString()
  @IsOptional()
  middleName: string;
}
