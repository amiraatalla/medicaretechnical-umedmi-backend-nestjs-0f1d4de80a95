import { prop } from '@typegoose/typegoose';

export class Speciality {
  @prop({ type: String })
  mainSpeciality: string;

  @prop({ items: String })
  subSpeciality: Array<string>;

  @prop({ type: String })
  businessType: string;
}
