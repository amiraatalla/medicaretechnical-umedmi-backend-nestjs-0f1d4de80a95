import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { ImageRepository } from '../image/repositories/image.repository';
import { ImageService } from '../image/services/image.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Image } from '../image/models/image.model';
@Module({
  imports: [TypegooseModule.forFeature([Image])],
  providers: [UploaderService, ImageService, ImageRepository],
  controllers: [UploaderController],
  exports: [UploaderService],
})
export class UploaderModule {}
