import { IFile } from './file.interface';
import { Types } from 'mongoose';
export interface IFileResponse extends IFile {
  id?: string;
  route: string;
  uploadedBy?: string;
}
