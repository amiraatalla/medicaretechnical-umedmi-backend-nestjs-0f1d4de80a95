import { Body, Controller, Post, Get, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { createPrefix } from '../../../../helpers/prefix.helper';
import { AppsEnum } from '../../../../enums/apps.enum';
import { SpecialityService } from 'src/modules/speciality/services/speciality.service';
import { MainSpecialityRequest } from 'src/modules/shared/requests/main-speciality.request';
import {
  SpecialityResponse,
  SpecialityArrayResponse,
  SubSpecialityArrayResponse,
} from 'src/modules/shared/responses/speciality.response.dto';
import { SubSpecialityRequest } from 'src/modules/shared/requests/sub-speciality.request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/api/guards/jwt-auth.guard';
import { LoggedInUser } from 'src/modules/api/decorators/logged-in-user.decorator';
@ApiTags('Speciality')
@ApiBearerAuth()
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'speciality'))
export class SpecialityController {
  constructor(private specialityService: SpecialityService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMainSpeciality(@Body() body: MainSpecialityRequest): Promise<SpecialityResponse> {
    const mainSpeciality = await this.specialityService.addMainSpeciality({ ...body });
    return new SpecialityResponse(mainSpeciality);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/sub-speciality')
  async createSubSpeciality(@Param() params, @Body() body: SubSpecialityRequest): Promise<SpecialityResponse> {
    const mainSpeciality = await this.specialityService.addSubSpeciality(params.id, { ...body });
    return new SpecialityResponse(mainSpeciality);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAllMainSpeciality(): Promise<SpecialityArrayResponse> {
    const mainSpeciality = await this.specialityService.getAllMainSpeciality();
    return new SpecialityArrayResponse(mainSpeciality);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':bussienssType')
  async findMainSpeciality(@Param() params): Promise<SpecialityArrayResponse> {
    const mainSpeciality = await this.specialityService.getMainSpeciality(params.bussienssType);
    return new SpecialityArrayResponse(mainSpeciality);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id/sub-speciality')
  async findSubSpeciality(@Param() params): Promise<SubSpecialityArrayResponse> {
    const subSpeciality = await this.specialityService.getSubSpeciality(params.id);
    return new SubSpecialityArrayResponse(subSpeciality);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@LoggedInUser() user, @Param() params): Promise<SpecialityResponse> {
    if (user.role !== 'super_admin') throw new UnauthorizedException();
    const deleted = await this.specialityService.delete(params.id);
    return new SpecialityResponse(deleted);
  }
}
