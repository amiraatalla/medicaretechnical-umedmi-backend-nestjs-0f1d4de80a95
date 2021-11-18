import { IsString } from 'class-validator';

export class MakeUserAdminDto {
  @IsString()
  userId: string;
  @IsString()
  conversationId: string;
}
