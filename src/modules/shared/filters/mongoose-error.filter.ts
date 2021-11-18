import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { STATUS_CODES } from 'http';
import { MongoError } from 'mongodb';
import { PathErrorDto } from '../dtos/path-error.dto';
import * as mongoose from 'mongoose';
import { MongoErrorCodes } from '../consts/mongo-error-codes';

@Catch(mongoose.Error)
export class MongooseErrorFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: mongoose.Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      statusCode: status,
      type: exception.name,
      message: exception.message,
      errors: this.parseError(exception),
    });
  }
  parseError(error) {
    return error.errors ? error.errors : error;
    // return Object.keys(error.errors).map(errPath => {
    //   const err = error.errors[errPath];
    //   return {
    //     status: HttpStatus.BAD_REQUEST,
    //     message: err.name,
    //     path: err.path,
    //     code: err.kind,
    //   };
    // });
  }
}
