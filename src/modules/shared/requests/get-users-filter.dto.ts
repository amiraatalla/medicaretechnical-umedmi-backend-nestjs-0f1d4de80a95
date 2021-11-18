import { ParseBoolPipe } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsBoolean, IsBooleanString, IsEnum, isEnum, IsOptional, IsString } from 'class-validator';
import { AuthRolesEnum } from '../../auth/enums/auth-roles.enum';
import { PaginationDto } from '../dtos/pagination.dto';
import { StringToBoolean } from '../helpers/transform-boolean.helper';
import { IPaginateRequest } from '../interfaces/i-paginate-request.interface';

export class GetUsersFilterDto extends PaginationDto {
  @IsEnum(AuthRolesEnum)
  role: AuthRolesEnum;
  @IsString()
  @IsOptional()
  language?: string;
  @Transform(StringToBoolean)
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
  businessId?: string;
}
