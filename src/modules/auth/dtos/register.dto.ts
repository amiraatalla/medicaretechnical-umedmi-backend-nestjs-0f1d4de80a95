import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsOptional, IsString } from 'class-validator';

export class RegisterDto extends PartialConstructor<RegisterDto> {
  type: string;
  username: string;
  email: string;
  password: string;
  quickLoginPassword: string;
  phoneNumber: string;
  language: string;
  accountId?: string;
  accessToken?: string;
  accountType?: string;
}
