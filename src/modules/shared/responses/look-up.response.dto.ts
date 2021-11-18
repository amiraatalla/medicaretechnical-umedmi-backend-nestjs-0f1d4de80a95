import { LookUp } from 'src/modules/lookup/models/lookup';
import { BaseHttpResponse } from '../classes/base-http.response';

export class LookUpResponse extends BaseHttpResponse<LookUp> {
  data: LookUp;

  constructor(lookUp: LookUp) {
    super();
    this.data = lookUp;
  }
}

export class LookUpArrayResponse extends BaseHttpResponse<Array<LookUp>> {
  data: Array<LookUp>;

  constructor(lookups: Array<LookUp>) {
    super();
    this.data = lookups;
  }
}
