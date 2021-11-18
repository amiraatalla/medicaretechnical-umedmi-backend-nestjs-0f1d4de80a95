import { UnauthorizedException } from '@nestjs/common';

export class InvalidOtpException extends UnauthorizedException {
  constructor(desciption: any = {}) {
    super('Invalid Otp', desciption);
  }
}
