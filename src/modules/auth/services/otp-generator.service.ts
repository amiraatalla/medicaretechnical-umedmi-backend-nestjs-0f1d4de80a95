import { Otp } from '../models/otp';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnvEnum } from '../../shared/enums/app-env.enum';

@Injectable()
export class OtpGeneratorService {
  constructor(private config: ConfigService) {}

  generate(type: string): Otp {
    const otp = new Otp();

    otp.type = type;
    otp.createdAt = new Date();
    otp.code =
      this.config.get('APP_ENV') === AppEnvEnum.PRODUCTION
        ? Math.floor(1000 + Math.random() * 9000).toString()
        : '1234';

    return otp;
  }
}
