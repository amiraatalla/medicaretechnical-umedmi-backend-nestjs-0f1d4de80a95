import { Types } from 'mongoose';

export class BaseModel {
  _id: Types.ObjectId;
  get id() {
    return this._id.toString();
  }
}
