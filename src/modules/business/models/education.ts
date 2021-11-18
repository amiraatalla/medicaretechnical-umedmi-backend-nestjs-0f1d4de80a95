import { prop } from '@typegoose/typegoose';
import { GradeTypesEnum, EducationTypesEnum } from '../enums/business.enum';
import { Institute } from 'src/modules/institute/models/institue';

export class Education {
  @prop({ type: String }) //, ref: Institute, localField: 'educationInstitute', foreignField: '_id' })
  educationInstitute: string;

  @prop({ items: String, default: [] })
  certificateImages: Array<string>;

  @prop({ type: String, enum: EducationTypesEnum })
  educationType: string;

  @prop({ type: String })
  info: string;

  @prop({ type: String })
  educationCountry: string;

  @prop({ type: String })
  degree: string;

  @prop({ type: String })
  fieldOfStudy: string;

  @prop({ type: String, enum: GradeTypesEnum })
  grade: string;

  @prop({ type: Date })
  startDate: Date;

  @prop({ type: Date })
  endDate: Date;

  @prop({ type: String })
  activities: string;

  @prop({ type: String })
  otherNotes: string;

  @prop({ type: Boolean, default: true })
  shareEducation: boolean;
}
