import { BaseModel } from 'src/modules/shared/models/base-model';
import { prop } from '@typegoose/typegoose';

export class City extends BaseModel {
  @prop({ type: String })
  name: string;
}
