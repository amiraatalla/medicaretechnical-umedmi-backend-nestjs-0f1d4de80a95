import { BaseHttpResponse } from '../classes/base-http.response';
import { Auth } from 'src/modules/auth/models/auth';

export class AddUserResponse extends BaseHttpResponse<Auth> {
  data: Auth;

  constructor(addedUser: Auth) {
    super();
    this.data = addedUser;
  }
}
