import { BaseHttpResponse } from '../classes/base-http.response';
import { Auth } from 'src/modules/auth/models/auth';

export class UserResponse extends BaseHttpResponse<Auth> {
  data: Auth;

  constructor(auth: Auth) {
    super();
    this.data = auth;
  }
}
