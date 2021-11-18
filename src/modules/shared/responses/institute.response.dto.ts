import { BaseHttpResponse } from '../classes/base-http.response';
import { Institute } from 'src/modules/institute/models/institue';

export class InstituteResponse extends BaseHttpResponse<Institute> {
  data: Institute;

  constructor(institute: Institute) {
    super();
    this.data = institute;
  }
}

export class InstituteArrayResponse extends BaseHttpResponse<Array<Institute>> {
  data: Array<Institute>;

  constructor(instituteArray: Array<Institute>) {
    super();
    this.data = instituteArray;
  }
}
