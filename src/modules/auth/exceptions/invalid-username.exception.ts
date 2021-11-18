import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

export class InvalidUsernameException extends UnprocessableEntityException {
  constructor() {
    super({ message: 'Invalid username', error: 'invalid-username', statusCode: HttpStatus.UNPROCESSABLE_ENTITY });
  }
}
