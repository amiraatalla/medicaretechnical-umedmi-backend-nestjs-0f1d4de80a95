import { prop } from '@typegoose/typegoose';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';

export class Speciality {
  @prop({ type: LocalizedField, required: true })
  mainSpeciality: LocalizedField;

  @prop({ type: LocalizedField, required: true })
  businessType: LocalizedField;

  @prop({ items: LocalizedField })
  subSpeciality: Array<LocalizedField>;

  @prop({ type: String, required: false })
  icon: string;
}
