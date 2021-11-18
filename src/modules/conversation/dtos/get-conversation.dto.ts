import { IsDate, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetConversationsDto {
  @IsNotEmpty()
  @IsNumberString()
  page: number = 1;

  @IsNumberString()
  @IsNotEmpty()
  limit: number = 10;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAfter: Date;
}
