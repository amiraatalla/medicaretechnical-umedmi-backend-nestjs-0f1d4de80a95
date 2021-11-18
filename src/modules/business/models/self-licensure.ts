import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: false,
    timestamps: false,
  },
})
export class SelfLicensure {
  @prop({ type: String })
  documentName: string;
  @prop({ type: String })
  issueOrganization: string;
  @prop({ type: String })
  type: string;
  @prop({ type: String })
  validity: string;
  @prop({ type: String })
  issueDate: Date;
  @prop({ type: String })
  expiryDate: Date;
  @prop({ type: String })
  vadility: string;
  @prop({ type: Boolean })
  shareInterests: boolean;
  @prop({ type: Boolean })
  showHeadlines: boolean;
  @prop({ type: String })
  title: string;
}
