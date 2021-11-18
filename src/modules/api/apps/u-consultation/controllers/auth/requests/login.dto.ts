import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { LoginByEnum } from '../../../../../../auth/enums/login-by.enum';
import { LoginTypesEnum } from '../../../../../../auth/enums/login-types.enum';
import { LoginByInterface } from '../../../../../../auth/interfaces/login-by.interface';

export class LoginDto implements LoginByInterface {
  /**
   * Login Type
   * @example PASSWORD
   */
  @IsEnum(LoginTypesEnum)
  type: LoginTypesEnum;

  // @ApiProperty({ type: String, description: 'Login Type,username field:\nPASSWORD:email,\nOTP:phone' })
  /**
   * @example Login Type,username field:
   * Login Type,username field:
   * PASSWORD:email
   * OTP:phone
   */
  @IsNotEmpty()
  username: string;
  /**
   * type: password value
   * PASSWORD: password
   * OTP: otp code
   */
  @IsNotEmpty()
  password: string;
}
