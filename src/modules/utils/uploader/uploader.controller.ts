import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Logger,
  UseGuards,
  HttpException,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createPrefix } from '../../api/helpers/prefix.helper';
import { AppsEnum } from '../../api/enums/apps.enum';
import { UploaderService } from './uploader.service';
import { IFileResponse } from './interfaces/fileResponse.interface';
import { JwtAuthGuard } from '../../api/guards/jwt-auth.guard';
import { Auth } from '../../auth/models/auth';
import { LoggedInUser } from '../../api/decorators/logged-in-user.decorator';
import { StaticFileInterceptor } from './interceptors/static-file.interceptor';
import { ImageService } from '../image/services/image.service';
import { IDeleteFileResponse } from './interfaces/delete-file.interface';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiFile } from '../../shared/decorators/swagger-schema.decorator';
@ApiTags('Uploader')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'uploader'))
export class UploaderController {
  constructor(private _service: UploaderService, private imageService: ImageService) {}
  @Post('')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads/',
      storage: UploaderService.fileStorage(),
      fileFilter: UploaderService.fileFilter(),
    }),
    new StaticFileInterceptor(),
  )
  uploadFile(@UploadedFile() file, @LoggedInUser() user: Auth): IFileResponse {
    if (!file) {
      throw new HttpException('File is required!!', HttpStatus.BAD_REQUEST);
    }
    return file;
  }
  @UseGuards(JwtAuthGuard)
  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiFile('image')
  @UseInterceptors(
    FileInterceptor('image', { storage: UploaderService.imageStorage(), fileFilter: UploaderService.imageFilter() }),
  )
  async uploadImage(@UploadedFile() image, @LoggedInUser() user: Auth): Promise<IFileResponse> {
    if (!image) {
      throw new HttpException('Image is required!!', HttpStatus.BAD_REQUEST);
    }
    return await this._service.uploadImage(image, user.id);
  }

  @Delete(':image')
  async deleteImage(@Param('image') imageName): Promise<IDeleteFileResponse> {
    return await this._service.deleteImage(imageName);
  }
}
