import { Inject, Injectable } from '@nestjs/common';
import { AUTH_PHONE_OTP } from '../constants/otp.constant';
import { AuthOtp } from '../interfaces/auth-otp';
import { AuthRepository } from '../repositories/auth.repository';
import { Otp } from '../models/otp';
import { OtpTypesEnum } from '../enums/otp-types.enum';
import { ConfigService } from '@nestjs/config';
import { OtpGeneratorService } from './otp-generator.service';
import { OtpIsNotExpiredException } from '../exceptions/otp-is-not-expired.exception';
import { Auth } from '../models/auth';

@Injectable()
export class ResendPhoneOtpService {
  constructor(
    @Inject(AUTH_PHONE_OTP) private otpService: AuthOtp,
    private authRepository: AuthRepository,
    private configService: ConfigService,
    private otpGeneratorService: OtpGeneratorService,
  ) {}

  async execute(phoneNumber: string) {
    const auth = await this.authRepository.findByPhone(phoneNumber);

    if (this.canResend(auth.otp)) {
      await this.resend(auth);
      return true;
    }

    throw new OtpIsNotExpiredException();
  }

  private async resend(auth: Auth) {
    auth.otp = this.otpGeneratorService.generate(OtpTypesEnum.PHONE);
    await this.authRepository.save(auth);
    await this.otpService.send({ recipient: auth.phoneNumber, language: auth.language, code: auth.otp.code });
  }

  private canResend(otp: Otp) {
    const seconds = parseInt(this.configService.get('OTP_VALID_SECONDS'));
    return otp.type !== OtpTypesEnum.PHONE || otp.createdAt.addSeconds(seconds) < new Date() || otp.hasUsed;
  }
}
