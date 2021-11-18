import { Catch, HttpException, ArgumentsHost, HttpStatus, Logger, ExceptionFilter } from '@nestjs/common';
import { ExecException } from 'child_process';
import { Response } from 'express';
@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    return exception;
  }
}
