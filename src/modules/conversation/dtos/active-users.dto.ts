import { Types } from 'mongoose';

export class ActiveUsers {
  userId: Types.ObjectId;
  isAdmin: boolean;
}
