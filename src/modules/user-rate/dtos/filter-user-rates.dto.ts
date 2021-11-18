import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../shared/dtos/pagination.dto';
import { UserRateEnum } from '../enums/user-rate.enum';

export class FilterUserRatesDto extends PaginationDto {
  @IsEnum(UserRateEnum)
  @IsOptional()
  rate?: UserRateEnum;
}
