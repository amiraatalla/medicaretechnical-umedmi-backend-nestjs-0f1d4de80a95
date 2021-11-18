import { BaseHttpResponse } from '../classes/base-http.response';
import { Auth } from 'src/modules/auth/models/auth';

export class ListUsersResponse extends BaseHttpResponse<Array<Auth>> {
  data: Array<Auth>;

  constructor(users: Array<Auth>) {
    super();
    this.data = users;
  }
}
