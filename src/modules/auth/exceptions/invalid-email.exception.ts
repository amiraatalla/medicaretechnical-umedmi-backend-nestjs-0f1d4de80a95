import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

export class InvalidEmailException extends UnprocessableEntityException {
  constructor() {
    super({ message: 'Invalid email', error: 'invalid-email', statusCode: HttpStatus.UNPROCESSABLE_ENTITY });
  }
}
