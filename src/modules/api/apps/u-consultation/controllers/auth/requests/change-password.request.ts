import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordRequest {
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
