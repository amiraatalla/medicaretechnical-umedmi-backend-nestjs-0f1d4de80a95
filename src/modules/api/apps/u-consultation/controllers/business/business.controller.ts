import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  NotFoundException,
  ForbiddenException,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { createPrefix } from '../../../../helpers/prefix.helper';
import { AppsEnum } from '../../../../enums/apps.enum';
import { BusinessResponse } from '../../../../../shared/responses/business.response.dto';
import { BusinessRequest } from '../../../../../shared/requests/business.request';
import { BusinessService } from 'src/modules/business/services/business.service';
import { JwtAuthGuard } from '../../../../guards/jwt-auth.guard';
import { threadId } from 'worker_threads';
import { use } from 'passport';
import { LoggedInUser } from '../../../../decorators/logged-in-user.decorator';
import { Auth } from '../../../../../auth/models/auth';
import { DeleteImageFieldDto } from '../../../../../business/dtos/delete-image-field.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Business')
@ApiBearerAuth()
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'complete-profile'))
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: BusinessRequest, @Req() req): Promise<BusinessResponse> {
    const userId = req.user.id;
    if (await this.businessService.isSubmitted(userId))
      throw new ForbiddenException('Forbidden', 'This form has already been submitted');
    else {
      const data: any = body;
      data.userId = userId;
      const cleanData = this.businessService.cleanRequest(data);
      const result = await this.businessService.execute({ ...cleanData }, userId);
      return new BusinessResponse(await this.businessService.cleanResponse(cleanData));
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Req() req): Promise<BusinessResponse> {
    const userId = req.user.id;
    const data = await this.businessService.get(userId);
    if (data) return new BusinessResponse(await this.businessService.cleanResponse(data));
    throw new NotFoundException('NotFound', "This user doesn't have form history");
  }
  @UseGuards(JwtAuthGuard)
  @Delete('image-field')
  async deleteImageField(@Query() deleteImageDto: DeleteImageFieldDto, @LoggedInUser() user: Auth) {
    const data = await this.businessService.deleteImageField(user.id, deleteImageDto);
    return data;
  }
}
