import { Injectable, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { StorageEngine, diskStorage } from 'multer';
import { extname, basename } from 'path';
import { UploaderConstants } from './enums/uploader-enum';
import { IFile } from './interfaces/file.interface';
import * as fs from 'fs';
import * as path from 'path';
import { FILE_ALLOWED_EXTESIONS } from './enums/file-allowed-extenstions';
import { IMAGE_ALLOWED_EXTESIONS } from './enums/image-allowed-extenstions';
import { IFileResponse } from './interfaces/fileResponse.interface';
import { ImageService } from '../image/services/image.service';
import { IDeleteFileResponse } from './interfaces/delete-file.interface';
@Injectable()
export class UploaderService {
  constructor(private imageService: ImageService) {}
  static getFilesFolder(): string {
    return UploaderConstants.UPLOADS_ROOT_FOLDER + UploaderConstants.FILES_FOLDER;
  }
  static getImagesFolder(): string {
    const dir = UploaderConstants.UPLOADS_ROOT_FOLDER + UploaderConstants.IMAGES_FOLDER;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    return dir;
  }
  static getImageRoute(imageName: string): string {
    return UploaderConstants.IMAGES_ROUTE + imageName;
  }
  static getFileRoute(fileName: string): string {
    return UploaderConstants.FILES_ROUTE + fileName;
  }
  static getImageUrl(): string {
    return UploaderConstants.UPLOADS_ROOT_FOLDER + UploaderConstants.IMAGES_FOLDER;
  }
  static fileStorage(): StorageEngine {
    return diskStorage({
      destination: UploaderService.getFilesFolder(),
      filename: function(req, file: IFile, cb) {
        cb(
          null,
          basename(file.originalname, extname(file.originalname)) +
            '-' +
            Date.now() +
            Math.floor(Math.random() * 10000000) +
            extname(file.originalname),
        );
      },
    });
  }
  static fileFilter(): (req: any, file: IFile, cb: (error: Error | null, acceptFile: boolean) => void) => void {
    return function(req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      const found =
        FILE_ALLOWED_EXTESIONS.find(extAllowed => extAllowed == fileExtension) || FILE_ALLOWED_EXTESIONS.includes('*');
      if (!found) {
        return cb(new HttpException(`File extension: ${fileExtension} not allowed`, HttpStatus.BAD_REQUEST), false);
      } else {
        cb(null, true);
      }
    };
  }
  static imageFilter(): (req: any, file: IFile, cb: (error: Error | null, acceptFile: boolean) => void) => void {
    return function(req, file, cb) {
      const fileExtension = path.extname(file.originalname).toLocaleLowerCase();
      const found = IMAGE_ALLOWED_EXTESIONS.find(extAllowed => extAllowed == fileExtension);
      if (!found) {
        return cb(new HttpException(`File extension: ${fileExtension} not allowed`, HttpStatus.BAD_REQUEST), false);
      } else {
        cb(null, true);
      }
    };
  }
  static imageStorage(): StorageEngine {
    return diskStorage({
      destination: UploaderService.getImagesFolder(),
      filename: function(req, file: IFile, cb) {
        cb(
          null,
          basename(file.originalname, extname(file.originalname)) +
            '-' +
            Date.now() +
            Math.floor(Math.random() * 10000000) +
            extname(file.originalname),
        );
      },
    });
  }
  async uploadImage(image: IFile, userId: string): Promise<IFileResponse> {
    const fileResponse = {
      ...image,
      route: UploaderService.getImageRoute(image.filename),
      uploadedBy: userId,
    };
    const saveResult = await this.imageService.saveImage(fileResponse);
    return saveResult;
  }
  async deleteImage(imageName: string): Promise<IDeleteFileResponse> {
    const deleteRes = await this.imageService.deleteOne({ filename: imageName });
    const fullPath = path.join(UploaderService.getImagesFolder(), imageName);
    let fileDeleted = false,
      fileFound = false;

    if (fs.existsSync(fullPath)) {
      fileFound = true;
      await fs.unlinkSync(fullPath);
      fileDeleted = true;
    }

    return {
      fileFound: fileFound,
      isFileDeleted: fileDeleted,
      dbDeleteResponse: deleteRes,
    };
  }
}
