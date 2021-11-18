import { Body, Controller, Patch, Post, UseGuards, Get, Param, Query, Put, Delete, Logger } from '@nestjs/common';
import { createPrefix } from '../../../../helpers/prefix.helper';
import { AppsEnum } from '../../../../enums/apps.enum';
import { RegisterDto } from '../../../../../shared/requests/register.dto';
import { RegisterService } from '../../../../../auth/services/register.service';
import { I18nLang } from 'nestjs-i18n';
import { RegisterResponse } from './responses/register.response.dto';
import { ResendPhoneOtpService } from '../../../../../auth/services/resend-phone-otp.service';
import { ResendOtpRequest } from './requests/resend-otp.request';
import { LoginDto } from './requests/login.dto';
import { LoginService } from '../../../../../auth/services/login.service';
import { DeviceService } from '../../../../../auth/services/device.service';

import { LoginResponse } from './responses/login.response.dto';
import { JwtAdminGuard, JwtAuthGuard } from '../../../../guards/jwt-auth.guard';
import { LoggedInUser } from '../../../../decorators/logged-in-user.decorator';
import { Auth } from '../../../../../auth/models/auth';
import { ChangePasswordRequest } from './requests/change-password.request';
import { ChangePasswordService } from '../../../../../auth/services/change-password.service';
import { DeviceDto } from 'src/modules/auth/dtos/device.dto';
import { use } from 'passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserResponse } from 'src/modules/shared/responses/user.response.dto';
import { LoginTypesEnum } from '../../../../../auth/enums/login-types.enum';
import { UpdateProfileDto } from '../../../../../auth/dtos/update-profile.dto';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Roles } from '../../../../decorators/roles.decorator';
import { AuthRolesEnum } from '../../../../../auth/enums/auth-roles.enum';
import { RolesGuard } from '../../../../guards/roles.guard';

@ApiTags('Auth')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'auth'))
export class AuthController {
  constructor(
    private registerService: RegisterService,
    private resendPhoneOtpService: ResendPhoneOtpService,
    private loginService: LoginService,
    private changePasswordService: ChangePasswordService,
    private deviceService: DeviceService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto, @I18nLang() language: string): Promise<RegisterResponse> {
    const auth = await this.registerService.execute({ ...body, language });
    return new RegisterResponse(auth);
  }

  @Post('resend-phone-otp')
  async resendOtp(@Body() body: ResendOtpRequest) {
    await this.resendPhoneOtpService.execute(body.phoneNumber);
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    const token = await this.loginService.execute(body);
    return new LoginResponse(token);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('device')
  async device(@Body() body: DeviceDto, @LoggedInUser() user: Auth) {
    return await this.deviceService.execute(body, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(@Body() body: ChangePasswordRequest, @LoggedInUser() user: Auth) {
    await this.changePasswordService.execute({ password: body.password, id: user.id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@LoggedInUser() auth: Auth): Promise<UserResponse> {
    const user = await this.registerService.find(auth.id);
    user.business = await this.authService.getBusiness(auth.id);
    return new UserResponse(user);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('')
  async updateMe(@LoggedInUser() auth: Auth, @Body() update: UpdateProfileDto): Promise<UserResponse> {
    const user = await this.authService.updateUser(auth.id, update);
    return new UserResponse(user);
  }
  @ApiBearerAuth()
  //
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.ADMIN, AuthRolesEnum.SuperAdmin)
  @Delete(':userId')
  async removeUser(@Param('userId') userId: string, @LoggedInUser() auth: Auth) {
    return await this.authService.deleteUser(userId);
  }
}
