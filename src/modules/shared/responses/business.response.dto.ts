import { BaseHttpResponse } from '../classes/base-http.response';
import { Business } from 'src/modules/business/models/business';

export class BusinessResponse extends BaseHttpResponse<object> {
  data: object;

  constructor(completeProfile: Business) {
    super();
    this.data = completeProfile;
  }
}
