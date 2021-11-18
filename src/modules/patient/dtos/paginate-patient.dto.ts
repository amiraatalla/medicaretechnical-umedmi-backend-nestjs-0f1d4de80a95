import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../shared/dtos/pagination.dto';
import { PatientPermessionStatusEnum } from '../enums/patient-parmession-status.enum';

export class PaginatePatientDto extends PaginationDto {
  @IsEnum(PatientPermessionStatusEnum)
  @IsOptional()
  status?: PatientPermessionStatusEnum;
}
