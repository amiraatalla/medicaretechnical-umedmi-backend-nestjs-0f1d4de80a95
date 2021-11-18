import { Module } from '@nestjs/common';
import { UConsultationApiModule } from './apps/u-consultation/u-consultation.api.module';
import { JwtStrategy } from './passport-strategies/jwt-startegy';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [UConsultationApiModule, UtilsModule],
  providers: [JwtStrategy],
})
export class ApiModule {}
