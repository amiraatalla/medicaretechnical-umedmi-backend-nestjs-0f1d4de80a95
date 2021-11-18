import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SuperAdminService } from './services/superAdmin.service';
import { Auth } from '../auth/models/auth';
import { AuthRepository } from '../auth/repositories/auth.repository';
import { OtpGeneratorService } from '../auth/services/otp-generator.service';
import { HashService } from '../shared/services/hash.service';
import { CodeGeneratorService } from '../shared/services/code-generator.service';
import { MandrillService } from '../shared/services/communicators/email/mandrill.service';
import { BusinessRepository } from '../business/repositories/business.repository';
import { Business } from '../business/models/business';

@Module({
  imports: [TypegooseModule.forFeature([Auth, Business])],
  providers: [
    SuperAdminService,
    AuthRepository,
    OtpGeneratorService,
    HashService,
    CodeGeneratorService,
    MandrillService,
    BusinessRepository,
  ],
  exports: [MandrillService, SuperAdminService, AuthRepository, BusinessRepository],
})
export class SuperAdminModule {}
