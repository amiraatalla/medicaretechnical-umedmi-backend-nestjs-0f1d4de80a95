import { prop } from '@typegoose/typegoose';
import { BaseModel } from 'src/modules/shared/models/base-model';

export class Drug extends BaseModel {
  @prop({ type: String, required: true })
  TradeName: string;

  @prop({ items: String, required: true })
  ActiveIngredients: Array<string>;

  @prop({ type: String, required: true })
  DrugGroup: string;

  @prop({ type: String, required: true })
  MainGroup: string;

  @prop({ type: String, required: true })
  AdvisedDose: string;

  @prop({ type: String, required: true })
  Form: string;

  @prop({ type: String, required: true })
  PackContent: string;

  @prop({ items: String, required: true })
  DrugCompany: Array<string>;

  @prop({ type: Number, required: true })
  Price: number;

  @prop({ type: String, required: true })
  PictureNumber: string;

  @prop({ type: String, required: true })
  Picture: string;

  @prop({ items: String, required: true })
  SimilarProductNames: Array<string>;

  @prop({ type: String, required: true })
  Country: string;
}
