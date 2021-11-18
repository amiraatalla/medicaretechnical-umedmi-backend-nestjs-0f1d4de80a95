import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Seeder } from './seeder';
import { SubscriptionModule } from '../modules/subscription/subscription.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { SpecialityModule } from 'src/modules/speciality/speciality.module';
import { CountryModule } from 'src/modules/country/country.module';
import { SuperAdminModule } from 'src/modules/superAdmin/superAdmin.module';
import { IcdModule } from 'src/modules/icd/icd.module';
import { CommonDiagnosisModule } from 'src/modules/common-diagnosis/common-diagnosis.module';

@Module({
  imports: [
    SubscriptionModule,
    SpecialityModule,
    CountryModule,
    SuperAdminModule,
    IcdModule,
    CommonDiagnosisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    TypegooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get('DATABASE_URL'),
          options: {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 100000,
            poolSize: 100,
            bufferMaxEntries: 0,
            useUnifiedTopology: true,
          },
        };
      },
    }),
  ],
  providers: [Seeder],
})
export class SeederModule {}
