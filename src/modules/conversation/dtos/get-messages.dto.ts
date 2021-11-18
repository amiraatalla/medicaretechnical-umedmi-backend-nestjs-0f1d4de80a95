import { Transform } from 'class-transformer';
import { IsDateString, IsString, IsNumberString, IsOptional, IsEmpty } from 'class-validator';

export class GetMessagesDto {
  @Transform(value => (value as Date).toISOString(), {
    toPlainOnly: true,
  })
  @IsOptional()
  createdAt?: Date;
  @IsString()
  conversationId: string;
  @IsNumberString()
  limit = 10;
  @IsNumberString()
  page = 1;
}
