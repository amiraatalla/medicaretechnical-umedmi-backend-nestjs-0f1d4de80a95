import { BaseHttpResponse } from '../../../../../../shared/classes/base-http.response';

export class LoginResponse extends BaseHttpResponse<string> {
  data: string;

  constructor(token: string) {
    super();
    this.data = token;
  }
}
