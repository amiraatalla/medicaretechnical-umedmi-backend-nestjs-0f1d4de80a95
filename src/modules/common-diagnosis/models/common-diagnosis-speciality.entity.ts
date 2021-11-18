import { prop } from '@typegoose/typegoose';

export class CommonDiagnosisSpeciality {
  @prop({ type: String })
  speciality: string;
  @prop({ type: Number })
  count: number;
}
