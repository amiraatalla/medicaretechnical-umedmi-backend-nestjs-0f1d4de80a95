import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggedInUser } from '../../../decorators/logged-in-user.decorator';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { Auth } from '../../../../auth/models/auth';
import { AddUserRateDto } from '../../../../user-rate/dtos/add-user-rate.dto';
import { UserRateService } from '../../../../user-rate/user-rate.service';
import { RolesGuard } from '../../../guards/roles.guard';
import { AuthRolesEnum } from '../../../../auth/enums/auth-roles.enum';
import { Roles } from '../../../decorators/roles.decorator';
import { PaginationDto } from '../../../../shared/dtos/pagination.dto';
import { FilterUserRatesDto } from '../../../../user-rate/dtos/filter-user-rates.dto';
import { IsEnum } from 'class-validator';

@ApiTags('UserRate')
@Controller('rate')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserRateController {
  constructor(private _service: UserRateService) {}
  @Post('')
  addRate(@Body() rate: AddUserRateDto, @LoggedInUser() user: Auth) {
    return this._service.addRate({ ...rate, userId: user.id });
  }
  /**
   *
   * @param filter : filter by rate
   * Only allowed for admin, super admin users
   */
  @Get('')
  @UseGuards(RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin, AuthRolesEnum.ADMIN)
  getRates(@Query() filter: FilterUserRatesDto) {
    return this._service.getRates(
      { ...(filter.rate ? { rate: filter.rate } : {}) },
      { page: filter.page, limit: filter.limit },
    );
  }
}
