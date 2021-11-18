import { UnprocessableEntityException } from '@nestjs/common';

export class OtpIsNotExpiredException extends UnprocessableEntityException {
  constructor() {
    super('Otp has not expired yet.');
  }
}
