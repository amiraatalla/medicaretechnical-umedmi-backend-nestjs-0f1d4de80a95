import { IsString } from 'class-validator';

export class MuteDeleteJoinDto {
  @IsString()
  conversationId: string;
}
