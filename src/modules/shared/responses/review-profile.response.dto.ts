import { BaseHttpResponse } from '../classes/base-http.response';
import { Business } from 'src/modules/business/models/business';

export class ReviewProfileResponse extends BaseHttpResponse<string> {
  data: string;

  constructor(isApproved: string) {
    super();
    this.data = `This profile is successfully ${isApproved}`;
  }
}

export class ListProfilesResponse extends BaseHttpResponse<Array<Business>> {
  data: Array<Business>;

  constructor(profiles: Array<Business>) {
    super();
    this.data = profiles;
  }
}
