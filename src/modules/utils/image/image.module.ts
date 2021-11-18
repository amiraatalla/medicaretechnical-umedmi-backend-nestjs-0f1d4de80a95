import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Image } from './models/image.model';
import { ImageRepository } from './repositories/image.repository';
import { ImageService } from './services/image.service';
import { ImageController } from './image.controller';

@Module({
  imports: [TypegooseModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService, ImageRepository],
  exports: [ImageRepository, ImageService],
})
export class ImageModule {}
