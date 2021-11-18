import { string } from '@hapi/joi';
import { ParseBoolPipe } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsBooleanString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { BusinessDto } from '../../business/dtos/business.dto';
import { ApprovalTypesEnum } from '../../business/enums/business.enum';
import { PartialConstructor } from '../classes/partial-constructor';
import { PaginationDto } from '../dtos/pagination.dto';

export class BusinessFilterDto extends PaginationDto {
  // @Transform(value => parseInt(value))
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isSubmitted?: boolean = false;

  @IsOptional()
  @IsEnum(ApprovalTypesEnum)
  isApproved?: ApprovalTypesEnum = ApprovalTypesEnum.UNDER_REVIEW;
}
