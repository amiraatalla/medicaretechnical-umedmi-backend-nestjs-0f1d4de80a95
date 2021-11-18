import { Body, Controller, Post, Get, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { AppsEnum } from 'src/modules/api/enums/apps.enum';
import { createPrefix } from 'src/modules/api/helpers/prefix.helper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IcdService } from 'src/modules/icd/services/icd.service';
import { IcdRequest } from '../../../../../shared/requests/icd.request';
import { IcdResponse, IcdArrayResponse } from '../../../../../shared/responses/icd.response.dto';
import { JwtAuthGuard } from 'src/modules/api/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/api/guards/roles.guard';
import { Roles } from 'src/modules/api/decorators/roles.decorator';
import { AuthRolesEnum } from 'src/modules/auth/enums/auth-roles.enum';
import { filterDto } from 'src/modules/icd/dtos/filter.dto';

@ApiTags('Icd')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'icd'))
@ApiBearerAuth()
export class IcdController {
  constructor(private icdService: IcdService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Post()
  async createe(@Body() body: IcdRequest): Promise<IcdResponse> {
    const data = await this.icdService.create({ ...body });
    return new IcdResponse(data);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IcdResponse> {
    const getdata = await this.icdService.findOne(id);
    return new IcdResponse(getdata);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Put(':id')
  async edit(@Param('id') id: string, @Body() body: IcdRequest): Promise<IcdResponse> {
    const edited = await this.icdService.edit(id, { ...body });
    return new IcdResponse(edited);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IcdResponse> {
    const deleted = await this.icdService.delete(id);
    return new IcdResponse(deleted);
  }

  @Get('icd/search')
  async search(@Query() filte: filterDto): Promise<any> {
    const data = await this.icdService.getFilter(filte);
    return data.map(getData => {
      return {
        diagnosis: getData.diagnosis,
        ID: getData.ID,
        ICDVersion: getData.ICDVersion,
        RelatedConditions: getData.RelatedConditions,
        SpecificSymptoms: getData.SpecificSymptoms,
        SymptomsSeeDoctor: getData.SymptomsSeeDoctor,
        Organ: getData.Organ,
      };
    });
  }
}
