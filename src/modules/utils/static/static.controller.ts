import { Controller, Res, Param, Get, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UploaderService } from '../uploader/uploader.service';
import { logger } from '@typegoose/typegoose/lib/logSettings';
import { existsSync } from 'fs';
import { join } from 'path';
import { AppsEnum } from '../../api/enums/apps.enum';
import { createPrefix } from '../../api/helpers/prefix.helper';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Static')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'static'))
export class StaticController {
  @Get('images/:imageName')
  async serveImage(@Param('imageName') imageId: string, @Res() res): Promise<any> {
    if (!existsSync(join(UploaderService.getImagesFolder(), imageId))) {
      throw new HttpException('File Not Found!!', HttpStatus.NOT_FOUND);
    }
    res.sendFile(imageId, { root: UploaderService.getImagesFolder() });
  }
  @Get('files/:fileName')
  async serveFile(@Param('fileName') fileName: string, @Res() res): Promise<any> {
    if (!existsSync(join(UploaderService.getFilesFolder(), fileName))) {
      throw new HttpException('File Not Found!!', HttpStatus.NOT_FOUND);
    }
    res.download(join(UploaderService.getFilesFolder(), fileName));
  }
}
