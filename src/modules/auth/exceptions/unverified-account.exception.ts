import { UnauthorizedException } from '@nestjs/common';

export class UnverifiedAccountException extends UnauthorizedException {
  constructor() {
    super('User not verified yet');
  }
}
