import { IsString } from 'class-validator';

export class LikeFavDto {
  @IsString()
  conversationId: string;
  @IsString()
  messageId: string;
}
