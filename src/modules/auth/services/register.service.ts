import { Auth } from '../models/auth';
import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { OtpTypesEnum } from '../enums/otp-types.enum';
import { OtpGeneratorService } from './otp-generator.service';
import { AuthRepository } from '../repositories/auth.repository';
import { HashService } from '../../shared/services/hash.service';
import { AUTH_PHONE_OTP } from '../constants/otp.constant';
import { AuthOtp } from '../interfaces/auth-otp';
import { CodeGeneratorService } from 'src/modules/shared/services/code-generator.service';

@Injectable()
export class RegisterService {
  constructor(
    private repo: AuthRepository,
    private hashService: HashService,
    private otpGeneratorService: OtpGeneratorService,
    @Inject(AUTH_PHONE_OTP) private otpService: AuthOtp,
    private codeGeneratorService: CodeGeneratorService,
  ) {}

  async execute(request: RegisterDto): Promise<Auth> {
    const otp = this.otpGeneratorService.generate(OtpTypesEnum.PHONE);
    const { password, quickLoginPassword, ...restRequest } = request;
    // console.log(request, 'request register');
    const passwordHashed = await this.hashService.hash(password);
    const quickLoginPasswordHashed = await this.hashService.hash(quickLoginPassword);
    const codes = await this.repo.findInvitaionCodes();
    const invitationCode = await this.codeGeneratorService.createUniqueInvitationCode(codes);

    const auth = await this.repo.save({
      ...restRequest,
      otp,
      password: passwordHashed,
      quickLoginPassword: quickLoginPasswordHashed,
      invitationCode,
    });
    await this.otpService.send({ code: otp.code, language: request.language, recipient: request.phoneNumber });
    return auth;
  }

  async find(userId: string): Promise<Auth> {
    return await this.repo.findById(userId);
  }
}
