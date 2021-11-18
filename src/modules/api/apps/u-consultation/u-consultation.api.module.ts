import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthModule } from '../../../auth/auth.module';
import { BusinessController } from './controllers/business/business.controller';
import { BusinessModule } from '../../../business/business.module';
import { CountryModule } from 'src/modules/country/country.module';
import { IndustryModule } from 'src/modules/industry/industry.module';
import { CountryController } from './controllers/country/country.controller';
import { LookUpModule } from 'src/modules/lookup/lookup.module';
import { LookUpSController } from './controllers/look-up/look-up.controller';
import { IndustryController } from './controllers/industry/industry.controller';
import { SpecialityModule } from 'src/modules/speciality/speciality.module';
import { SpecialityController } from './controllers/speciality/speciality.controller';
import { InstituteModule } from 'src/modules/institute/institute.module';
import { InstituteController } from './controllers/institute/institute.controller';
import { SubscriptionModule } from 'src/modules/subscription/subscription.module';
import { SubscriptionController } from './controllers/subscription/subscription.controller';
import { SuperAdminModule } from 'src/modules/superAdmin/superAdmin.module';
import { PatientModule } from '../../../patient/patient.module';
import { PatientController } from './controllers/patient.controller';
import { ConversationModule } from '../../../conversation/conversation.module';
import { SuperAdminController } from './controllers/superadmin/superadmin.controller';
import { UserRateController } from './controllers/user-rate.controller';
import { UserRateModule } from '../../../user-rate/user-rate.module';
import { UserSuggestModule } from '../../../user-suggest/user-suggest.module';
import { UserSuggestController } from './controllers/user-suggest.controller';
import { UserComplaintModule } from '../../../user-complaint/user-complaint.module';
import { UserComplaintController } from './controllers/user-complaint.controller';
import { ConversationController } from './controllers/conversation/conversation.controller';
import { MessageController } from './controllers/conversation/message.controller';
import { UdeUserController } from './controllers/ude-user.controller';
import { UdeUserModule } from 'src/modules/ude-user/ude-user.module';
import { JwtTokenService } from 'src/modules/auth/services/jwt-token.service';
import { IcdController } from './controllers/icd/icd.controller';
import { IcdModule } from 'src/modules/icd/icd.module';
import { CommonDiagnosisController } from './controllers/common-diagnosis/common-diagnosis.controller';
import { CommonDiagnosisModule } from 'src/modules/common-diagnosis/common-diagnosis.module';
import { DrugController } from './controllers/drug/drug.controller';
import { DrugModule } from 'src/modules/drug/drugs.module';
@Module({
  imports: [
    AuthModule,
    BusinessModule,
    CountryModule,
    LookUpModule,
    IndustryModule,
    SpecialityModule,
    InstituteModule,
    SubscriptionModule,
    SuperAdminModule,
    PatientModule,
    ConversationModule,
    UserRateModule,
    UserSuggestModule,
    UserComplaintModule,
    IcdModule,
    UdeUserModule,
    CommonDiagnosisModule,
    DrugModule,
  ],
  controllers: [
    AuthController,
    UdeUserController,
    ConversationController,
    MessageController,
    PatientController,
    BusinessController,
    CountryController,
    LookUpSController,
    IndustryController,
    SpecialityController,
    InstituteController,
    SubscriptionController,
    SuperAdminController,
    UserRateController,
    UserSuggestController,
    UserComplaintController,
    IcdController,
    CommonDiagnosisController,
    DrugController,
  ],
  providers: [],
})
export class UConsultationApiModule {}
