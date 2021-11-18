import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { SubscriptionTypesEnum, UserTypesEnum } from '../../subscription/enums/subscription.enum';
import { PaginationDto } from '../dtos/pagination.dto';
import { StringToBoolean } from '../helpers/transform-boolean.helper';

export class SubscriptionFilterDto extends PaginationDto {
  @IsEnum(UserTypesEnum)
  @IsOptional()
  userType?: UserTypesEnum;
  @IsEnum(SubscriptionTypesEnum)
  @IsOptional()
  type?: SubscriptionTypesEnum;
  @Transform(StringToBoolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
