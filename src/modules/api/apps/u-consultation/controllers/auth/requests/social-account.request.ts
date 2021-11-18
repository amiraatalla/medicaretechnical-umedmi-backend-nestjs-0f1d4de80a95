import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { SocialAccountTypesEnum } from '../../../../../../auth/enums/social-account-types.enum';
import { Unique } from '../../../../../validators/unique-mongo.validator';
import { Auth } from '../../../../../../auth/models/auth';

export class SocialAccountRequest {
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(SocialAccountTypesEnum))
  type: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @Unique({ modelName: Auth.name, field: 'linkedAccounts.accountId' })
  @IsString()
  @IsNotEmpty()
  accountId: string;
}
