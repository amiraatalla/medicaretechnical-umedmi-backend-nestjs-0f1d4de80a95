import { Body, Controller, Post, Get } from '@nestjs/common';
import { createPrefix } from '../../../../helpers/prefix.helper';
import { AppsEnum } from '../../../../enums/apps.enum';
import { InstituteService } from 'src/modules/institute/services/institute.service';
import { InstitueRequest } from 'src/modules/shared/requests/institute.request';
import { InstituteResponse, InstituteArrayResponse } from 'src/modules/shared/responses/institute.response.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Institute')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'institute'))
export class InstituteController {
  constructor(private instituteService: InstituteService) {}

  @Post()
  async crateInstitute(@Body() body: InstitueRequest): Promise<InstituteResponse> {
    const institute = await this.instituteService.execute({ ...body });
    return new InstituteResponse(institute);
  }

  @Get()
  async findInstitues(): Promise<InstituteArrayResponse> {
    const institues = await this.instituteService.getAll();
    return new InstituteArrayResponse(institues);
  }
}
