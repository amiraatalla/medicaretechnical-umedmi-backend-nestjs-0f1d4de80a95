import { Type } from 'class-transformer';

export class BaseHttpResponse<Type> {
  data: Type;
  statusCode = 200;
  constructor(data?: Type) {
    this.data = data;
    return this;
  }
}
