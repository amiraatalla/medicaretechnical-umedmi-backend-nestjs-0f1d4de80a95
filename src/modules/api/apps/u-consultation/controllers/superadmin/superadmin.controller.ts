import { Controller, Post, Body, Put, Param, UseGuards, ForbiddenException, Get, Req, Query } from '@nestjs/common';
import { createPrefix } from '../../../../helpers/prefix.helper';
import { AppsEnum } from '../../../../enums/apps.enum';
import { SuperAdminService } from 'src/modules/superAdmin/services/superAdmin.service';
import { RegisterDto } from '../../../../../shared/requests/register.dto';
import { I18nLang } from 'nestjs-i18n';
import { AddUserResponse } from 'src/modules/shared/responses/superadmin.response.dto';
import { Auth } from 'src/modules/auth/models/auth';
import { DeactivateActivateDto } from 'src/modules/superAdmin/dtos/deactivate-activate.dto';
import { ListBusinessDto } from 'src/modules/superAdmin/dtos/list-business.dto';
import { JwtAuthGuard } from 'src/modules/api/guards/jwt-auth.guard';
import { LoggedInUser } from 'src/modules/api/decorators/logged-in-user.decorator';
import { ReviewBusinessDto } from 'src/modules/shared/requests/review-business.dto';
import { ReviewProfileResponse, ListProfilesResponse } from 'src/modules/shared/responses/review-profile.response.dto';
import { AddAdminDto } from 'src/modules/shared/requests/add-admin.dto';
import { UserResponse } from 'src/modules/shared/responses/user.response.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../../../../shared/dtos/pagination.dto';
import { RolesGuard } from '../../../../guards/roles.guard';
import { Roles } from '../../../../decorators/roles.decorator';
import { AuthRolesEnum } from '../../../../../auth/enums/auth-roles.enum';
import { AuthPaginateResponseDto } from '../../../../../auth/dtos/auth-paginte-response.dto';
import { filter } from 'rxjs/operators';
import { BusinessFilterDto } from '../../../../../shared/requests/business-filter.dto';
import { GetUsersFilterDto } from '../../../../../shared/requests/get-users-filter.dto';
import { UpdateUserDto } from '../../../../../shared/requests/update-user.dto';
@ApiTags('superadmin')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'superadmin'))
export class SuperAdminController {
  constructor(private superAdminService: SuperAdminService) {}

  @Roles(AuthRolesEnum.SuperAdmin)
  @Post('add/user')
  async addUser(
    @LoggedInUser() user: Auth,
    @Body() body: RegisterDto,
    @I18nLang() language: string,
  ): Promise<AddUserResponse> {
    const newUser = await this.superAdminService.addUser({ ...body, language });
    return new AddUserResponse(newUser);
  }
  @Roles(AuthRolesEnum.SuperAdmin)
  @Put('user/:id')
  async editUser(
    @LoggedInUser() user: Auth,
    @Param('id') id: string,
    @Body() body,
    @I18nLang() language: string,
  ): Promise<AddUserResponse> {
    const newUser = await this.superAdminService.editUser(id, { ...body, language });
    return new AddUserResponse(newUser);
  }

  // @UseGuards(JwtAuthGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Post('switch/user')
  async deactivateActivate(@LoggedInUser() auth: Auth, @Body() body: DeactivateActivateDto): Promise<UserResponse> {
    if (auth.role !== 'super_admin') throw new ForbiddenException();
    const user = await this.superAdminService.deactivateActivateBusinessType(body);
    return new UserResponse(user);
  }
  @Roles(AuthRolesEnum.SuperAdmin)
  @Get('list/users')
  // @ApiResponse({ type: AuthPaginateResponseDto, description: 'Sucsses response' })
  async getListBusinessType(
    @Query() pagination: GetUsersFilterDto,
    @LoggedInUser() user: Auth,
  ): Promise<AuthPaginateResponseDto> {
    const { page, limit, ...filter } = pagination;
    const pages = await this.superAdminService.getUsers(filter, { page, limit });
    return pages;
  }
  @Roles(AuthRolesEnum.SuperAdmin)
  @Put('/reviewProfile/:id')
  async reviewProfile(
    @LoggedInUser() user: Auth,
    @Param('id') id: string,
    @Body() body: ReviewBusinessDto,
  ): Promise<ReviewProfileResponse> {
    const reviewed = await this.superAdminService.reviewUserProfile(id, { ...body });
    if (!reviewed) throw new ForbiddenException('Forbidden', 'Fail to review profile');
    return new ReviewProfileResponse(body.isApproved);
  }
  @Roles(AuthRolesEnum.SuperAdmin)
  @Get('profiles')
  async getPfrofiles(@Query() listProfilesQueryDto: BusinessFilterDto) {
    const { page, limit, ...filter } = listProfilesQueryDto;
    return this.superAdminService.listProfiles({ ...filter }, { page, limit });
  }
  @Roles(AuthRolesEnum.SuperAdmin)
  @Post('add/admin')
  async addAdmin(@Body() body: AddAdminDto, @LoggedInUser() user: Auth) {
    const newAdmin = await this.superAdminService.addAdmin(body);
    return newAdmin;
  }
  @Roles(AuthRolesEnum.SuperAdmin)
  @Put('/user/:userId')
  async updateUser(@Param('userId') userId: string, @Body() body: UpdateUserDto, @LoggedInUser() user: Auth) {
    const newAdmin = await this.superAdminService.updateUser(userId, body);
    return newAdmin;
  }
}
