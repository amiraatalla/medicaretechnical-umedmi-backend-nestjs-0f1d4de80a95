import { IsEnum, IsOptional, IsString } from 'class-validator';

import { CountryTypesEnum } from '../enums/common-diagnosis.enum';
import { PaginationDto } from 'src/modules/shared/dtos/pagination.dto';

export class CommonDiagnosisfilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  CodeVersion?: string;

  @IsOptional()
  @IsString()
  Diagnosis?: string;

  @IsOptional()
  @IsString()
  Specialty?: string;

  @IsOptional()
  @IsEnum(CountryTypesEnum)
  Country?: CountryTypesEnum;
}
