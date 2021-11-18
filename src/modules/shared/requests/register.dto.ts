import { BusinessTypesEnum } from 'src/modules/business/enums/business.enum';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { SocialAccountRequest } from '../../api/apps/u-consultation/controllers/auth/requests/social-account.request';
import { Type } from 'class-transformer';
import { SocialAccountValidator } from '../../api/validators/social-account.validator';
import { AccountType } from 'src/modules/auth/enums/account-type.enum';
import { Unique } from 'src/modules/api/validators/unique-mongo.validator';
import { Auth } from 'src/modules/auth/models/auth';
import { SocialAccountTypesEnum } from 'src/modules/auth/enums/social-account-types.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(AccountType)
  type: AccountType;

  @IsString()
  @IsOptional()
  @IsEnum(BusinessTypesEnum)
  businessType: BusinessTypesEnum;

  @IsString()
  @IsNotEmpty()
  @Unique({ modelName: Auth.name, field: 'username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('EG')
  @Unique({ modelName: Auth.name, field: 'phoneNumber' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Unique({ modelName: Auth.name, field: 'email' })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  quickLoginPassword: string;

  // @IsNotEmpty()
  // @IsBoolean()
  // @IsIn([true])
  // agreedToTerms: boolean;

  @IsString()
  @IsOptional()
  @IsEnum(SocialAccountTypesEnum)
  accountType?: SocialAccountTypesEnum;

  @IsString()
  @IsOptional()
  accessToken?: string;

  @Unique({ modelName: Auth.name, field: 'linkedAccounts.accountId' })
  @IsString()
  @IsOptional()
  accountId?: string;
}
