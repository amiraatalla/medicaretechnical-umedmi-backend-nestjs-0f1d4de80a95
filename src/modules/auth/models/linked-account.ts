import { prop } from '@typegoose/typegoose';
import { SocialAccountTypesEnum } from '../enums/social-account-types.enum';

export class LinkedAccount {
  @prop({ type: String })
  accountId: string;

  @prop({ type: String })
  accessToken: string;

  @prop({ type: String, enum: SocialAccountTypesEnum })
  type: string;
}
