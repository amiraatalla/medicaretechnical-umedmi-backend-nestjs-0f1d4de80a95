import { MessageRecievedStatus } from '../enums/message-recieved-status.enum';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class MuteDeleteDto {
  @IsString()
  userId: string;
  @IsString()
  conversationId: string;
}

export class UpdateStatusDto {
  @IsString()
  userId: string;
  @IsString()
  conversationId: string;
  @IsEnum(MessageRecievedStatus)
  status: MessageRecievedStatus;
  @IsString()
  messageId: string;
}

export class LikeFavDto {
  @IsString()
  conversationId: string;
  @IsString()
  userId: string;
  @IsString()
  messageId: string;
}

export class MakeUserAdminDto {
  @IsString()
  adminId: string;
  @IsString()
  userId: string;
  @IsString()
  conversationId: string;
}

export class DeleteGroupDto {
  @IsString()
  adminId: string;
  @IsString()
  conversationId: string;
}

export class GetMessagesDto {
  @IsDateString()
  @IsOptional()
  createdAt: Date;
  @IsString()
  @IsOptional()
  search: string;
  @IsString()
  conversationId: string;
  limit = 10;
  page = 1;
}
