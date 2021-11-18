import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggedInUser } from 'src/modules/api/decorators/logged-in-user.decorator';
import { AppsEnum } from 'src/modules/api/enums/apps.enum';
import { JwtAuthGuard } from 'src/modules/api/guards/jwt-auth.guard';
import { createPrefix } from 'src/modules/api/helpers/prefix.helper';
import { BaseHttpResponse } from 'src/modules/shared/classes/base-http.response';
import { UdeLoginDto } from 'src/modules/ude-user/dtos/ude-login.dto';
import { UdeUserResetPinDto } from 'src/modules/ude-user/dtos/ude-user-reset-pin.dto';
import { UdeUserDto } from 'src/modules/ude-user/dtos/ude-user.dto';
import { UdeUser } from 'src/modules/ude-user/models/ude-user';
import { UdeUserService } from 'src/modules/ude-user/services/ude-user.service';

@ApiTags('UdeUser')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'ude-user'))
export class UdeUserController {
  constructor(private _service: UdeUserService) {}
  @Post('register')
  async register(@Body() data: UdeUserDto): Promise<BaseHttpResponse<string>> {
    return this._service.register(data);
  }
  @Post('reset-pin')
  async restPinCode(@Body() data: UdeUserResetPinDto): Promise<BaseHttpResponse<string>> {
    return this._service.resetPinCode(data);
  }

  @Post('login')
  async login(@Body() data: UdeLoginDto): Promise<BaseHttpResponse<string>> {
    return this._service.login(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@LoggedInUser() auth: UdeUser): Promise<any> {
    return await this._service.repo.findById(<any>auth._id, {}, [{ path: 'speciality' }]);
  }
}
