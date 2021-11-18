import { prop } from '@typegoose/typegoose';
import { BaseModel } from 'src/modules/shared/models/base-model';
import { AgeGroup } from './agegroup';
import { CommonDiagnosisSpeciality } from './common-diagnosis-speciality.entity';
import { Country } from './country';
import { Gender } from './gender';
import { VisitType } from './visittype';

export class CommonDiagnosis extends BaseModel {
  @prop({ type: String, required: true })
  CodeVersion: string;

  @prop({ type: String, required: true })
  ICDCode: string;

  @prop({ type: String, required: true })
  Diagnosis: string;

  @prop({ items: VisitType, _id: false, default: [] })
  VisitType: Array<VisitType>;

  @prop({ items: Gender, _id: false, default: [] })
  Gender: Array<Gender>;

  @prop({ items: CommonDiagnosisSpeciality, default: [] })
  Specialities: Array<CommonDiagnosisSpeciality>;

  @prop({ type: Country, _id: false, default: [] })
  Countries: Array<Country>;

  @prop({ items: AgeGroup, _id: false, default: [] })
  AgeGroup: Array<AgeGroup>;
}
