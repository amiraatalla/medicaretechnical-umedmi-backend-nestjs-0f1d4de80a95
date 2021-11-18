import { BaseHttpResponse } from '../classes/base-http.response';
import { Icd } from 'src/modules/icd/models/icd';
export class IcdResponse extends BaseHttpResponse<Icd> {
  data: Icd;
  constructor(icd: Icd) {
    super();
    this.data = icd;
  }
}

export class IcdArrayResponse extends BaseHttpResponse<Array<Icd>> {
  data: Array<Icd>;

  constructor(icdArray: Array<Icd>) {
    super();
    this.data = icdArray;
  }
}
