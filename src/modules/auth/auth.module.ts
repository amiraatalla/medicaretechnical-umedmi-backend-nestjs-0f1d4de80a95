import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Auth } from './models/auth';
import { RegisterService } from './services/register.service';
import { AuthRepository } from './repositories/auth.repository';
import { OtpGeneratorService } from './services/otp-generator.service';
import { AUTH_PHONE_OTP } from './constants/otp.constant';
import { PhoneOtpService } from './services/phone-otp.service';
import { ResendPhoneOtpService } from './services/resend-phone-otp.service';
import { TOKEN_SERVICE } from './interfaces/token-service.interface';
import { JwtTokenService } from './services/jwt-token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginService } from './services/login.service';
import { LoginTypesEnum } from './enums/login-types.enum';
import { OtpLoginStrategyService } from './services/login-strategies/otp-login.strategy.service';
import { ChangePasswordService } from './services/change-password.service';
import { PasswordLoginStrategyService } from './services/login-strategies/password-login.strategy.service';
import { FacebookStrategyService } from './services/login-strategies/facebook.strategy.service';
import { LinkedInStrategyService } from './services/login-strategies/linked-in.strategy.service';
import { GoogleStrategyService } from './services/login-strategies/google.strategy.service';
import { MandrillService } from '../shared/services/communicators/email/mandrill.service';
import { DeviceService } from './services/device.service';
import { AuthService } from './services/auth.service';
import { Business } from '../business/models/business';
import { BusinessRepository } from '../business/repositories/business.repository';

@Module({
  imports: [
    TypegooseModule.forFeature([Auth, Business]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
        };
      },
    }),
  ],
  providers: [
    MandrillService,
    RegisterService,
    AuthRepository,
    DeviceService,
    OtpGeneratorService,
    { provide: AUTH_PHONE_OTP, useClass: PhoneOtpService },
    { provide: TOKEN_SERVICE, useClass: JwtTokenService },
    { provide: LoginTypesEnum.OTP, useClass: OtpLoginStrategyService },
    { provide: LoginTypesEnum.PASSWORD, useClass: PasswordLoginStrategyService },
    { provide: LoginTypesEnum.FACEBOOK, useClass: FacebookStrategyService },
    { provide: LoginTypesEnum.LINKED_IN, useClass: LinkedInStrategyService },
    { provide: LoginTypesEnum.GOOGLE, useClass: GoogleStrategyService },
    ResendPhoneOtpService,
    JwtTokenService,
    LoginService,
    ChangePasswordService,
    AuthService,
    BusinessRepository,
  ],
  exports: [
    RegisterService,
    ResendPhoneOtpService,
    JwtTokenService,
    LoginService,
    ChangePasswordService,
    DeviceService,
    AuthRepository,
    RegisterService,
    AuthRepository,
    OtpGeneratorService,
    { provide: AUTH_PHONE_OTP, useClass: PhoneOtpService },
    { provide: TOKEN_SERVICE, useClass: JwtTokenService },
    { provide: LoginTypesEnum.OTP, useClass: OtpLoginStrategyService },
    { provide: LoginTypesEnum.PASSWORD, useClass: PasswordLoginStrategyService },
    { provide: LoginTypesEnum.FACEBOOK, useClass: FacebookStrategyService },
    { provide: LoginTypesEnum.LINKED_IN, useClass: LinkedInStrategyService },
    { provide: LoginTypesEnum.GOOGLE, useClass: GoogleStrategyService },
    ResendPhoneOtpService,
    JwtTokenService,
    LoginService,
    ChangePasswordService,
    AuthService,
  ],
})
export class AuthModule {}
