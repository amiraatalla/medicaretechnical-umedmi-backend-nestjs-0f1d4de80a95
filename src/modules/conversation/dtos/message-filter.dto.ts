import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsString,
  IsNumberString,
  IsNotEmpty,
  IsOptional,
  IsEmpty,
  IsEnum,
  IsBoolean,
  IsBooleanString,
  IsDate,
} from 'class-validator';
import { MessageType } from '../enums/message-type.enum';

export class MessagesFilterDto {
  @IsOptional()
  @IsString()
  _id?: string;
  @IsOptional()
  @Transform(value => value as Boolean, {
    toPlainOnly: true,
  })
  @IsBooleanString()
  isStar?: boolean;
  @Transform(value => (value as Date).toISOString(), {
    toPlainOnly: true,
  })
  @IsDateString()
  @IsOptional()
  createdAt?: Date;
  @IsString()
  @IsOptional()
  search?: string;
  @IsString()
  @IsOptional()
  conversationId?: string;
  @IsEnum(MessageType)
  @IsOptional()
  type?: MessageType;
  @IsNumberString()
  limit = 10;
  @IsNumberString()
  page: number = 1;
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAfter: Date;
}
