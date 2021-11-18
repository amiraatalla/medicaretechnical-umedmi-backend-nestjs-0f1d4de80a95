import { Inject, Injectable } from '@nestjs/common';
import { AuthOtp } from '../interfaces/auth-otp';
import { SMS_PROVIDER } from '../../shared/services/communicators/sms/sms.constants';
import { SmsProviderInterface } from '../../shared/services/communicators/sms/sms-provider.interface';
import { ConfigService } from '@nestjs/config';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { SendOtpOptions } from '../interfaces/send-otp-options';

@Injectable()
export class PhoneOtpService implements AuthOtp {
  constructor(
    @Inject(SMS_PROVIDER) private smsService: SmsProviderInterface,
    private configService: ConfigService,
    private i18n: I18nRequestScopeService,
  ) {}

  async send(options: SendOtpOptions): Promise<boolean> {
    const otpMessage = await this.i18n.translate('auth.otp', { args: { code: options.code } });
    return this.smsService.send({ phone: options.recipient, message: otpMessage, language: options.language });
  }
}
