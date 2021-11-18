import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggedInUser } from '../../../decorators/logged-in-user.decorator';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { Auth } from '../../../../auth/models/auth';
import { AddUserComplaintDto } from '../../../../user-complaint/dtos/add-user-complaint.dto';
import { UserComplaintService } from '../../../../user-complaint/user-complaint.service';
import { RolesGuard } from '../../../guards/roles.guard';
import { AuthRolesEnum } from '../../../../auth/enums/auth-roles.enum';
import { Roles } from '../../../decorators/roles.decorator';
import { FilterUserComplaintsDto } from '../../../../user-complaint/dtos/filter-user-complaint.dto';

@ApiTags('UserComplaint')
@Controller('complaint')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserComplaintController {
  constructor(private _service: UserComplaintService) {}
  @Post('')
  addComplaint(@Body() complaint: AddUserComplaintDto, @LoggedInUser() user: Auth) {
    return this._service.addComplaint({ ...complaint, userId: user.id });
  }
  /**
   *
   * @param filter : filter by complaint
   * Only allowed for admin, super admin users
   */
  @Get('')
  @UseGuards(RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin, AuthRolesEnum.ADMIN)
  getComplaints(@Query() filter: FilterUserComplaintsDto) {
    return this._service.getComplaints({}, { page: filter.page, limit: filter.limit });
  }
}
