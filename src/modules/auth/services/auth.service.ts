import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { BusinessRepository } from '../../business/repositories/business.repository';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { AuthRolesEnum } from '../enums/auth-roles.enum';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly _repo: AuthRepository, private readonly business_repo: BusinessRepository) {}
  updateUser(userId: string, update: UpdateProfileDto) {
    return this._repo.findByIdAndUpdate(userId, update);
  }
  async deleteUser(userId: string) {
    const user = await this._repo.findById(userId);
    //validate user
    if (!user) {
      throw new NotFoundException({ userId: 'NOT_FOUND' });
    }
    if (user.role == AuthRolesEnum.SuperAdmin) {
      throw new ForbiddenException("SuperAdminCan't be removed");
    }
    return this._repo.remove({ _id: userId });
  }
  async getBusiness(userId) {
    return this.business_repo.findOne({ userId }, { isApproved: 1, isSubmitted: 1 });
  }
}
