


import { LoginStrategyInterface } from '../../interfaces/login-strategy.interface';
import { Auth } from '../../models/auth';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../repositories/auth.repository';
import { LoginRequestInterface } from '../../interfaces/login-request.interface';
import { InvalidUsernameException } from '../../exceptions/invalid-username.exception';
import { OtpTypesEnum } from '../../enums/otp-types.enum';
import { InvalidOtpException } from '../../exceptions/invalid-otp.exception';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class OtpLoginStrategyService implements LoginStrategyInterface {
  constructor(private repo: AuthRepository, private configService: ConfigService) {}

  async login(request: LoginRequestInterface): Promise<Auth> {
    const auth = await this.repo.findByPhone(request.username);

    if (this.isValid(auth, request)) {
      await this.verify(auth);
      return auth;
    }
  }

  private isValid(auth: Auth, request: LoginRequestInterface) {
    if (!auth) {
      throw new InvalidUsernameException();
    }

    if (
      auth.otp.type !== OtpTypesEnum.PHONE ||
      auth.otp.code !== request.password ||
      auth.otp.hasUsed ||
      (new Date().getTime() - auth.otp.createdAt.getTime()) / 1000 > Number(this.configService.get('OTP_VALID_SECONDS'))
    ) {
      const path =
        auth.otp.type !== OtpTypesEnum.PHONE
          ? 'OtpType'
          : auth.otp.code !== request.password
          ? 'Password'
          : auth.otp.hasUsed
          ? 'otpUsed'
          : (new Date().getTime() - auth.otp.createdAt.getTime()) / 1000 >
            Number(this.configService.get('OTP_VALID_SECONDS'))
          ? 'OtpExpired'
          : 'unkown';

      throw new InvalidOtpException({ description: path });
    }

    return true;
  }

  private verify(auth: Auth) {
    auth.otp.hasUsed = true;
    auth.isVerified = true;
    auth.isPhoneVerified = true;
    return this.repo.save(auth);
  }
}
