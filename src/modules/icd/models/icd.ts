import { prop } from '@typegoose/typegoose';
import { BaseModel } from 'src/modules/shared/models/base-model';

export class Icd extends BaseModel {
  @prop({ type: String, required: true })
  ICDVersion: string;

  @prop({ type: String, required: true })
  ID: string;

  @prop({ type: String, required: true })
  Organ: string;

  @prop({ type: String, required: true })
  diagnosis: string;

  @prop({ type: String, required: true })
  GeneralSymptoms: string;

  @prop({ type: String, required: true })
  SpecificSymptoms: string;

  @prop({ type: String, required: true })
  SymptomsSeeDoctor: string;

  @prop({ items: String, required: true })
  AgeGroup: Array<string>;

  @prop({ type: String, required: true })
  Pregnancy: string;

  @prop({ items: String, required: true })
  RelatedConditions: Array<string>;
}
