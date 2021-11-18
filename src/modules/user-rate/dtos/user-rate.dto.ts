import { UserRateEnum } from '../enums/user-rate.enum';

export class UserRateDto {
  _id?: string;
  userId: string;
  rate: UserRateEnum;
  comment?: string;
  id?: string;
}
