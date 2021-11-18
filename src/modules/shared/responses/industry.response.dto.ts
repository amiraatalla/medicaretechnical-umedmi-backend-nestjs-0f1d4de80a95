import { BaseHttpResponse } from '../classes/base-http.response';
import { Industry } from 'src/modules/industry/models/industry';

export class IndustryResponse extends BaseHttpResponse<Industry> {
  data: Industry;

  constructor(industry: Industry) {
    super();
    this.data = industry;
  }
}

export class IndustryArrayResponse extends BaseHttpResponse<Array<Industry>> {
  data: Array<Industry>;

  constructor(industryArray: Array<Industry>) {
    super();
    this.data = industryArray;
  }
}
