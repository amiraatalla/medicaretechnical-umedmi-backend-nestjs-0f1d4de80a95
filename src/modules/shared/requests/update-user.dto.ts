import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AuthRolesEnum } from '../../auth/enums/auth-roles.enum';
import { StringToBoolean } from '../helpers/transform-boolean.helper';

export class UpdateUserDto {
  name?: string;

  type?: string;

  @IsEnum(AuthRolesEnum)
  role: AuthRolesEnum;

  businessId?: string;

  patientId?: string;

  agentId?: string;

  language?: string;

  @Transform(StringToBoolean)
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  currentPackageId?: string;

  @IsDate()
  @IsOptional()
  currentPackageStartingDate?: Date;

  @IsDate()
  @IsOptional()
  currentPackageEndDate?: Date;

  invitationCode?: string;

  @IsNumber()
  @IsOptional()
  sentInvitationsCount?: number;

  @Transform(StringToBoolean)
  @IsBoolean()
  @IsOptional()
  sentInvitationsCountLimited: boolean;

  @IsNumber()
  @IsOptional()
  appliedInviationCode: number;

  @Transform(StringToBoolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @Transform(StringToBoolean)
  @IsBoolean()
  @IsOptional()
  isNewAdmin?: boolean;

  @IsString({ each: true })
  @IsOptional()
  permissions?: Array<string>;
}
