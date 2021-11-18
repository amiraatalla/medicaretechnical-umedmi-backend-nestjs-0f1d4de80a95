import { Injectable, Logger } from '@nestjs/common';
import { ImageRepository } from '../repositories/image.repository';
import { IFileResponse } from '../../uploader/interfaces/fileResponse.interface';
import { Image } from '../models/image.model';

@Injectable()
export class ImageService {
  constructor(private repo: ImageRepository) {}
  saveImage(image: IFileResponse) {
    return this.repo.save({ ...image });
  }
  deleteOne(filter: any) {
    return this.repo.deleteOne(filter);
  }
  async getImages(filter: any, projection, pagination): Promise<Array<Image>> {
    return await this.repo.findAllWithProjection(filter, projection);
  }
}
