import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggedInUser } from '../../../decorators/logged-in-user.decorator';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { Auth } from '../../../../auth/models/auth';
import { AddUserSuggestDto } from '../../../../user-suggest/dtos/add-user-suggest.dto';
import { UserSuggestService } from '../../../../user-suggest/user-suggest.service';
import { RolesGuard } from '../../../guards/roles.guard';
import { AuthRolesEnum } from '../../../../auth/enums/auth-roles.enum';
import { Roles } from '../../../decorators/roles.decorator';
import { FilterUserSuggestsDto } from '../../../../user-suggest/dtos/filter-user-suggest.dto';

@ApiTags('UserSuggest')
@Controller('suggest')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserSuggestController {
  constructor(private _service: UserSuggestService) {}
  @Post('')
  addSuggest(@Body() suggest: AddUserSuggestDto, @LoggedInUser() user: Auth) {
    return this._service.addSuggest({ ...suggest, userId: user.id });
  }
  /**
   *
   * @param filter : filter by suggest
   * Only allowed for admin, super admin users
   */
  @Get('')
  @UseGuards(RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin, AuthRolesEnum.ADMIN)
  getSuggests(@Query() filter: FilterUserSuggestsDto) {
    return this._service.getSuggests({}, { page: filter.page, limit: filter.limit });
  }
}
