import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { AuthRepository } from 'src/modules/auth/repositories/auth.repository';
import { OtpGeneratorService } from 'src/modules/auth/services/otp-generator.service';
import { HashService } from 'src/modules/shared/services/hash.service';
import { OtpTypesEnum } from 'src/modules/auth/enums/otp-types.enum';
import { CodeGeneratorService } from 'src/modules/shared/services/code-generator.service';
import { MandrillService } from '../../shared/services/communicators/email/mandrill.service';
import { DeactivateActivateDto } from '../dtos/deactivate-activate.dto';
import { RegisterDto } from 'src/modules/auth/dtos/register.dto';
import { Auth } from 'src/modules/auth/models/auth';
import { EditUserDto } from '../dtos/edit-user.dto';
import { ListBusinessDto } from '../dtos/list-business.dto';
import { BusinessRepository } from 'src/modules/business/repositories/business.repository';
import { ApprovalTypesEnum } from 'src/modules/business/enums/business.enum';
import { PaginationDto } from '../../shared/dtos/pagination.dto';
import { PaginateResult } from 'mongoose';
import { ReviewBusinessDto } from '../../shared/requests/review-business.dto';
import { AddAdminDto } from '../../shared/requests/add-admin.dto';
import { AuthRolesEnum } from '../../auth/enums/auth-roles.enum';
import { UpdateUserDto } from '../../shared/requests/update-user.dto';
@Injectable()
export class SuperAdminService {
  constructor(
    private mandrillService: MandrillService,
    private authRepo: AuthRepository,
    private otpGeneratorService: OtpGeneratorService,
    private hashService: HashService,
    private codeGeneratorService: CodeGeneratorService,
    private businessRepo: BusinessRepository,
  ) {}

  async seed(superAdmin) {
    const userExist = await this.authRepo.findOne({ email: superAdmin.email });
    if (userExist) return Promise.resolve(null);
    const otp = this.otpGeneratorService.generate(OtpTypesEnum.PHONE);
    const password = await this.hashService.hash(superAdmin.password);
    const quickLoginPassword = await this.hashService.hash(superAdmin.quickLoginPassword);
    const codes = await this.authRepo.findInvitaionCodes();
    const invitationCode = await this.codeGeneratorService.createUniqueInvitationCode(codes);

    return Promise.resolve(
      await this.authRepo.save({
        ...superAdmin,
        otp,
        password,
        quickLoginPassword,
        invitationCode,
        linkedAccounts: [superAdmin.socialAccount],
      }),
    );
  }

  async addUser(userData: RegisterDto): Promise<Auth> {
    const userExist = await this.authRepo.findOne({ email: userData.email });
    if (userExist) throw new ForbiddenException('Forbidden', 'This user has already been added');
    const otp = this.otpGeneratorService.generate(OtpTypesEnum.PHONE);
    const quickLoginPassword = await this.hashService.hash(userData.quickLoginPassword);
    const codes = await this.authRepo.findInvitaionCodes();
    const invitationCode = await this.codeGeneratorService.createUniqueInvitationCode(codes);
    const randomstring = Math.random()
      .toString(36)
      .slice(-8);
    const password = await this.hashService.hash(randomstring);

    await this.mandrillService.send({
      to: userData.email,
      subject: 'UmedMi Invitation',
      text: `Dr ${userData.username} I have invited you to join our admin outstanding
      Health providers On UmedMi board with email ${userData.email} password ${randomstring} `,
    });
    return await this.authRepo.save({
      ...userData,
      otp,
      password,
      quickLoginPassword,
      invitationCode,
      isPhoneVerified: true,
      isEmailVerified: true,
      isVerified: true,
    });
  }
  async deactivateActivateBusinessType(superAdmin: DeactivateActivateDto) {
    return await this.authRepo.findByIdAndUpdate(superAdmin.id, { isActive: superAdmin.isActive });
  }
  async getUsers(filter: any = {}, pagination: PaginationDto): Promise<PaginateResult<Auth>> {
    return await this.authRepo.paginate(filter, { limit: pagination.limit, page: pagination.page });
  }
  async editUser(id: string, updates: EditUserDto): Promise<Auth> {
    if (updates.password) updates.password = await this.hashService.hash(updates.password);
    if (updates.quickLoginPassword)
      updates.quickLoginPassword = await this.hashService.hash(updates.quickLoginPassword);
    return await this.authRepo.findByIdAndUpdate(id, updates);
  }

  async reviewUserProfile(_id: string, reviewDto: ReviewBusinessDto) {
    return await this.businessRepo.update(
      {
        _id,
      },
      reviewDto,
    );
  }

  async listProfiles(filter: any = {}, pagination: PaginationDto = { page: 1, limit: 10 }) {
    return await this.businessRepo.paginate(
      {
        // isApproved: { $nin: [ApprovalTypesEnum.APPROVED, ApprovalTypesEnum.REJECTED] },
        ...filter,
      },
      { ...pagination },
    );
  }

  async addAdmin(body: AddAdminDto) {
    const otp = this.otpGeneratorService.generate(OtpTypesEnum.PHONE);
    const codes = await this.authRepo.findInvitaionCodes();
    const invitationCode = await this.codeGeneratorService.createUniqueInvitationCode(codes);
    const randomstring = Math.random()
      .toString(36)
      .slice(-8);
    const password = await this.hashService.hash(randomstring);

    await this.mandrillService.send({
      to: body.email,
      subject: 'UmedMi Invitation',
      text: `Dr ${body.name} I have invited you to join our admin outstanding
      Health providers On UmedMi board with email ${body.email} password ${randomstring} `,
    });
    if (!body.username) {
      body.username = body.email;
    }
    return await this.authRepo.save({
      ...body,
      otp,
      password,
      permissions: body.permissions,
      invitationCode,
      isPhoneVerified: false,
      isEmailVerified: true,
      isVerified: true,
      role: AuthRolesEnum.ADMIN,
    });
  }
  async updateUser(adminId: string, update: UpdateUserDto) {
    return this.authRepo.updateOneById(adminId, update);
  }
}
