import { number } from '@hapi/joi';
import { Transform } from 'class-transformer';
import { IsInt, IsNumberString } from 'class-validator';
import { IPaginateRequest } from '../interfaces/i-paginate-request.interface';

export class PaginationDto implements IPaginateRequest {
  @Transform(value => parseInt(value))
  @IsInt()
  limit = 10;
  @Transform(value => parseInt(value))
  @IsInt()
  page = 1;
}
