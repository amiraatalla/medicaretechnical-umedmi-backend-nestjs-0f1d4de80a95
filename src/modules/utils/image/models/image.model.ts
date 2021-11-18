import { BaseModel } from '../../../shared/models/base-model';
import { IFileResponse } from '../../uploader/interfaces/fileResponse.interface';
import { prop } from '@typegoose/typegoose';

export class Image extends BaseModel implements IFileResponse {
  @prop({ type: String })
  route: string;

  @prop({ type: String })
  uploadedBy?: string;

  @prop({ type: String })
  fieldname: string;

  @prop({ type: String })
  originalname: string;

  @prop({ type: String })
  encoding: string;

  @prop({ type: String })
  mimetype: string;

  @prop({ type: String })
  destination: string;

  @prop({ type: String })
  filename: string;

  @prop({ type: String, unique: true })
  path: string;

  @prop({ type: Number })
  size: number;
}
