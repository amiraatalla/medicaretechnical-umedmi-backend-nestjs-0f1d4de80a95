import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppsEnum } from 'src/modules/api/enums/apps.enum';
import { createPrefix } from 'src/modules/api/helpers/prefix.helper';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CommonDiagnosisRequest } from '../../../../../shared/requests/common-diagnosis.request';
import {
  CommonDiagnosisPaginatedResponse,
  CommonDiagnosisResponse,
} from '../../../../../shared/responses/common-diagnosis.response.dto';
import { JwtAuthGuard } from 'src/modules/api/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/api/guards/roles.guard';
import { Roles } from 'src/modules/api/decorators/roles.decorator';
import { AuthRolesEnum } from 'src/modules/auth/enums/auth-roles.enum';
import { CommonDiagnosisService } from 'src/modules/common-diagnosis/services/common-diagnosis.service';
import { CommonDiagnosisfilterDto } from 'src/modules/common-diagnosis/dtos/filter-common-diagnosis.dto';
import { ApiFile } from 'src/modules/shared/decorators/swagger-schema.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoggedInUser } from 'src/modules/api/decorators/logged-in-user.decorator';
import { UdeUser } from 'src/modules/ude-user/models/ude-user';
import { CommonDiagnosisSeachIcd10Dto } from './dtos/common-diagnosis-seach-icd10.dto';

@ApiTags('CommonDiagnosis')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'commondiagnosis'))
@ApiBearerAuth()
export class CommonDiagnosisController {
  constructor(private commondiagnosisService: CommonDiagnosisService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AuthRolesEnum.SuperAdmin)
  @Post()
  async create(@Body() body: CommonDiagnosisRequest): Promise<CommonDiagnosisResponse> {
    const data = await this.commondiagnosisService.create({ ...body });
    return new CommonDiagnosisResponse(data);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CommonDiagnosisResponse> {
    const getdata = await this.commondiagnosisService.findOne(id);
    return new CommonDiagnosisResponse(getdata);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Put(':id')
  async edit(@Param('id') id: string, @Body() body: CommonDiagnosisRequest): Promise<CommonDiagnosisResponse> {
    const edited = await this.commondiagnosisService.edit(id, { ...body });
    return new CommonDiagnosisResponse(edited);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CommonDiagnosisResponse> {
    const deleted = await this.commondiagnosisService.delete(id);
    return new CommonDiagnosisResponse(deleted);
  }

  @Get('commomdiagnosis/search')
  async search(@Query() filter: CommonDiagnosisfilterDto): Promise<CommonDiagnosisPaginatedResponse> {
    return this.commondiagnosisService.search(filter);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('search/icdCode')
  async searchCount(@Query() searchDto: CommonDiagnosisSeachIcd10Dto, @LoggedInUser() user: UdeUser) {
    return this.commondiagnosisService.searchIcdCode(searchDto, user._id);
  }

  @Post('import')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async import(@UploadedFile() file): Promise<void> {
    this.commondiagnosisService.import(file);
  }
}
