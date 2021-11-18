import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  InternalServerErrorException,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AppsEnum } from 'src/modules/api/enums/apps.enum';
import { createPrefix } from 'src/modules/api/helpers/prefix.helper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DrugService } from 'src/modules/drug/services/drugs.service';
import { DrugRequest } from '../../../../../shared/requests/drug.request';
import { DrugResponse, DrugArrayResponse } from '../../../../../shared/responses/drug.response.dto';
import { DrugDto } from 'src/modules/drug/dtos/drugs.dto';
import { JwtAuthGuard } from 'src/modules/api/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/api/guards/roles.guard';
import { Roles } from 'src/modules/api/decorators/roles.decorator';
import { AuthRolesEnum } from 'src/modules/auth/enums/auth-roles.enum';
import { filterDrugDto } from 'src/modules/drug/dtos/filter.dto';

@ApiTags('Drug')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'drug'))
// @ApiBearerAuth()
export class DrugController {
  constructor(private drugService: DrugService) {}
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AuthRolesEnum.SuperAdmin)
  @Post()
  async createe(@Body() body: DrugRequest): Promise<DrugResponse> {
    const data = await this.drugService.create({ ...body });
    return new DrugResponse(data);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<DrugResponse> {
    const getdata = await this.drugService.findOne(id);
    return new DrugResponse(getdata);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AuthRolesEnum.SuperAdmin)
  @Put(':id')
  async edit(@Param('id') id: string, @Body() body: DrugDto): Promise<DrugResponse> {
    const edited = await this.drugService.edit(id, { ...body });
    return new DrugResponse(edited);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(AuthRolesEnum.SuperAdmin)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DrugResponse> {
    const deleted = await this.drugService.delete(id);
    return new DrugResponse(deleted);
  }
  @Get('drug/search')
  async search(@Query() filter: filterDrugDto): Promise<any> {
    const data = await this.drugService.getFilter(filter);
    return data.map(getData => {
      return {
        TradeName: getData.TradeName,
        ActiveIngredients: getData.ActiveIngredients,
        DrugGroup: getData.DrugGroup,
        MainGroup: getData.MainGroup,
        AdvisedDose: getData.AdvisedDose,
        DrugCompany: getData.DrugCompany,
        Price: getData.Price,
        SimilarProductNames: getData.SimilarProductNames,
        Country: getData.Country,
      };
    });
  }
}
