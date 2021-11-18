import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsOptional, IsString, ValidateNested, IsBoolean, IsArray, IsEnum, IsNumber } from 'class-validator';
import { ContactInfo } from '../models/contact-info';
import { Email } from '../../shared/models/email';
import { PersonalId } from '../../shared/models/personal-id';
import { Phone } from '../../shared/models/phone';
import { FacilityBranch } from '../models/facility-branch';
import { Education } from '../models/education';
import { LicensureMedicalFacility } from '../models/licensureMedicalFacility';
import { Speciality } from '../models/speciality';
import { ProfessionalExperience } from '../models/professionalExperience';
import { Residence } from '../../shared/models/residence';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';
import { FullName } from '../../shared/models/full-name';
import { Type } from 'class-transformer';
import { ResidenceDto } from 'src/modules/shared/dtos/residence.dto';
import { ContactInfoDto } from './contact-info.dto';
import { LocalizedFieldDto } from 'src/modules/shared/dtos/localizedfield.dto';
import { FullNameDto } from 'src/modules/shared/dtos/full-name.dto';
import { GenderTypesEnum, ApprovalTypesEnum } from '../enums/business.enum';
import { EmailDto } from 'src/modules/shared/dtos/email.dto';
import { PersonalIdDto } from 'src/modules/shared/dtos/personal-id.dto';
import { PhoneDto } from 'src/modules/shared/dtos/phone.dto';
import { FacilityBranchDto } from './facility-bracnh.dto';
import { EducationDto } from './education.dto';
import { LicensureDto } from './licensure.dto';
import { LicensureMedicalFacilityDto } from './licensureMedicalFacility.dto';
import { SpecialityDto } from '../dtos/speciality.dto';
import { ProfessionalExperienceDto } from './professionalExperience.dto';
import { PersonalMedicalFacilityNameDTO } from './personalMedicalFacilityName.dto';
import { PersonalMedicalFacilityName } from '../models/personalMedicalFacilityName';
import { SelfLicensureDto } from './self-licensure.dto';
export class BusinessDto extends PartialConstructor<BusinessDto> {
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  headline: string;
  @IsOptional()
  @IsString()
  arabicFullName: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  primaryPractice: string;

  @IsOptional()
  @IsString()
  recentEducation: string;

  @IsOptional()
  @IsString()
  educationType: string;

  @IsOptional()
  @IsBoolean()
  showHeadlines: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => ResidenceDto)
  residence: Residence;

  @IsOptional()
  @IsString()
  industry: string;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => ContactInfoDto)
  contactInfo: Array<ContactInfo>;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  personalImage: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedFieldDto)
  fullName: LocalizedField;

  @IsOptional()
  @ValidateNested()
  @Type(() => FullNameDto)
  name: FullName;

  @IsOptional()
  // @IsDateString() //#
  dateOfBirth: Date;

  @IsOptional()
  @IsEnum(GenderTypesEnum)
  gender: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => EmailDto)
  emails: Array<Email>;

  @IsOptional()
  @ValidateNested()
  @Type(() => PersonalIdDto)
  personalInfoId: PersonalId;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => PhoneDto)
  personalInfoPhones: Array<Phone>;

  @IsOptional()
  @IsString()
  interests: string;

  @IsOptional()
  @IsString()
  professionalInterests: string;

  @IsOptional()
  @IsBoolean()
  shareInterests: boolean;

  @IsOptional()
  @IsNumber()
  numberOfBranches: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => FacilityBranchDto)
  personalMedicalFacilityBranch: Array<FacilityBranchDto>;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => EducationDto)
  education: Array<Education>;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => LicensureDto)
  personnelLicensure: Array<LicensureDto>;
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => SelfLicensureDto)
  selfLicensure: Array<SelfLicensureDto>;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => LicensureMedicalFacilityDto)
  licensureMedicalFacility: Array<LicensureMedicalFacilityDto>;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => PersonalMedicalFacilityNameDTO)
  personalMedicalFacilityName: Array<PersonalMedicalFacilityName>;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => SpecialityDto)
  professionalExperienceSpeciality: Array<Speciality>;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => ProfessionalExperienceDto)
  professionalExperience: Array<ProfessionalExperience>;

  @IsOptional()
  @IsBoolean()
  isSubmitted: boolean;

  @IsOptional()
  @IsEnum(ApprovalTypesEnum)
  isApproved: ApprovalTypesEnum;
}
