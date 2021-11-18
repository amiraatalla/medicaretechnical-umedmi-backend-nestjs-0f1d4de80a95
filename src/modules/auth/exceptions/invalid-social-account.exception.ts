import { UnauthorizedException } from '@nestjs/common';

export class InvalidSocialAccountException extends UnauthorizedException {
  constructor(objectOrError?: string | object | any, description?: string) {
    if (!objectOrError) {
      objectOrError = 'Invalid social account';
    }
    super(objectOrError);
  }
}
