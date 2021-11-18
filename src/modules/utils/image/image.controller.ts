import { Controller, Get } from '@nestjs/common';
import { ImageService } from './services/image.service';
import { AppsEnum } from '../../api/enums/apps.enum';
import { createPrefix } from '../../api/helpers/prefix.helper';
import { Image } from './models/image.model';
import { BaseHttpResponse } from '../../shared/classes/base-http.response';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Image')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'image'))
export class ImageController {
  constructor(private service: ImageService) {}
  @Get('')
  async getImages(): Promise<BaseHttpResponse<Array<Image>>> {
    const data = await this.service.getImages({}, {}, {});
    return new BaseHttpResponse<Array<Image>>(data);
  }
}
