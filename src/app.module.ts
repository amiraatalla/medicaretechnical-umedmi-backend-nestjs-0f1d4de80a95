import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './modules/api/api.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { SharedModule } from './modules/shared/shared.module';
import { AcceptLanguageResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { FirebaseModule } from './modules/utils/firebase/firebase.module';
import { AiModule } from './modules/ai/ai.module';
import { MongoDriverErrorFilter } from './modules/shared/filters/mongo-driver-error.filter';
import { APP_FILTER } from '@nestjs/core';
import { MongooseErrorFilter } from './modules/shared/filters/mongoose-error.filter';
@Module({
  imports: [
    ConfigModule.forRoot({                                                                                
      isGlobal: true,
      expandVariables: true,
    }),
    TypegooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get('DATABASE_URL'),
        };
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '../i18n/'),
      },
      resolvers: [AcceptLanguageResolver],
    }),
    ApiModule,
    AiModule,
    SharedModule,
    FirebaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongoDriverErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: MongooseErrorFilter,
    },
  ],
})
export class AppModule {}
