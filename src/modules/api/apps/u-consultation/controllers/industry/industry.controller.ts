import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { createPrefix } from '../../../../helpers/prefix.helper';
import { AppsEnum } from '../../../../enums/apps.enum';
import { IndustryService } from 'src/modules/industry/services/industry.service';
import { IndustryResponse, IndustryArrayResponse } from '../../../../../shared/responses/industry.response.dto';
import { IndustryRequest } from '../../../../../shared/requests/industry.request';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Industry')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'industry'))
export class IndustryController {
  constructor(private industryService: IndustryService) {}

  @Post()
  async createIndustry(@Body() body: IndustryRequest): Promise<IndustryResponse> {
    const industry = await this.industryService.execute({ ...body });
    return new IndustryResponse(industry);
  }

  @Get()
  async findIndustries(): Promise<IndustryArrayResponse> {
    const industries = await this.industryService.getAll();
    return new IndustryArrayResponse(industries);
  }
  @Get('paginate')
  async paginateIndustries(@Query() paginateQuery) {
    const industries = await this.industryService.paginate({}, {});
    return industries;
  }
}
