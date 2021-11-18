import { prop } from '@typegoose/typegoose';
import { EmployeeTypesEnum } from '../enums/business.enum';
import { Residence } from '../../shared/models/residence';
import { Speciality } from '../../speciality/models/speciality';

export class ProfessionalExperience {
  @prop({ type: String })
  title: string;
  @prop({ type: String })
  country: string;
  @prop({ type: String })
  city: string;

  @prop({ type: String, enum: EmployeeTypesEnum })
  employeeType: string;

  @prop({ type: String })
  primaryPractice: string;

  @prop({ type: String })
  mainSpeciality: string;

  @prop({ type: String })
  subSpeciality: string;

  @prop({ type: String })
  company: string;

  @prop({ type: Residence })
  residence: Residence;

  @prop({ type: String })
  startYear: string;

  @prop({ type: Date })
  endYear: Date;

  @prop({ type: Boolean, default: true })
  updateHeadline: boolean;

  @prop({ type: Boolean, default: true })
  updatePosition: boolean;

  @prop({ type: Boolean, default: true })
  currentlyWorkThere: boolean;
}
