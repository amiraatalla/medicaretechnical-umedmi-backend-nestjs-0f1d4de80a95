import { BaseHttpResponse } from '../classes/base-http.response';
import { Subscription } from 'src/modules/subscription/models/subscription';
import { Auth } from 'src/modules/auth/models/auth';

export class SubscriptionDateResponse extends BaseHttpResponse<Date> {
  data: Date;

  constructor(subscriptionStartingDate: Date) {
    super();
    this.data = subscriptionStartingDate;
  }
}

export class SubscriptionResponse extends BaseHttpResponse<Subscription> {
  data: Subscription;

  constructor(subscription: Subscription) {
    super();
    this.data = subscription;
  }
}

export class SendInvitationResponse extends BaseHttpResponse<string> {
  data: string;

  constructor(email: string) {
    super();
    this.data = `Invitaion sent successfully to ${email}`;
  }
}
export class UpdatePaymentImageResponse extends BaseHttpResponse<string> {
  data: string;

  constructor() {
    super();
    this.data = 'Image Updated Succesfully';
  }
}

export class SubscriptionArrayResponse extends BaseHttpResponse<Array<Subscription>> {
  data: Array<Subscription>;

  constructor(subscriptionArray: Array<Subscription>) {
    super();
    this.data = subscriptionArray;
  }
}

export class VerifyCodeResponse extends BaseHttpResponse<string> {
  data: string;

  constructor(msg: string) {
    super();
    this.data = msg;
  }
}
