import { Auth } from '../../../../../../auth/models/auth';
import { BaseHttpResponse } from '../../../../../../shared/classes/base-http.response';

export class RegisterResponse extends BaseHttpResponse<string> {
  data: string;

  constructor(auth: Auth) {
    super();
    this.data = auth.id;
  }
}
