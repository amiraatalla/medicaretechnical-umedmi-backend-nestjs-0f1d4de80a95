import { BaseHttpResponse } from '../classes/base-http.response';
import { Drug } from 'src/modules/drug/models/drugs';
export class DrugResponse extends BaseHttpResponse<Drug> {
  data: Drug;
  constructor(drug: Drug) {
    super();
    this.data = drug;
  }
}

export class DrugArrayResponse extends BaseHttpResponse<Array<Drug>> {
  data: Array<Drug>;

  constructor(drugArray: Array<Drug>) {
    super();
    this.data = drugArray;
  }
}
