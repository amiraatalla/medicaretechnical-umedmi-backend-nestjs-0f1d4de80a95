import { Body, Controller, Post, Get, Param, Put, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AppsEnum } from 'src/modules/api/enums/apps.enum';
import { createPrefix } from 'src/modules/api/helpers/prefix.helper';
import { LookUpService } from 'src/modules/lookup/services/look-up.service';
import { LookUpRequest } from '../../../../../shared/requests/look-up.request';
import { LookUpResponse, LookUpArrayResponse } from 'src/modules/shared/responses/look-up.response.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/api/guards/jwt-auth.guard';
import { LoggedInUser } from 'src/modules/api/decorators/logged-in-user.decorator';
@ApiTags('Lookup')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'lookup'))
export class LookUpSController {
  constructor(private lookUpService: LookUpService) {}

  @Post()
  async create(@Body() body: LookUpRequest): Promise<LookUpResponse> {
    const option = await this.lookUpService.execute({ ...body });
    return new LookUpResponse(option);
  }

  @Get(':type')
  async get(@Param() params): Promise<LookUpArrayResponse> {
    const options = await this.lookUpService.getAll(params.type);
    return new LookUpArrayResponse(options);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async edit(@LoggedInUser() user, @Param() params, @Body() body: LookUpRequest): Promise<LookUpResponse> {
    if (user.role !== 'super_admin') throw new UnauthorizedException();
    const option = await this.lookUpService.edit(params.id, { ...body });
    return new LookUpResponse(option);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@LoggedInUser() user, @Param() params): Promise<LookUpResponse> {
    if (user.role !== 'super_admin') throw new UnauthorizedException();
    const deleted = await this.lookUpService.delete(params.id);
    return new LookUpResponse(deleted);
  }
}
