import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { TOKEN_SERVICE } from '../auth/interfaces/token-service.interface';
import { JwtTokenService } from '../auth/services/jwt-token.service';
import { MongoDriverErrorFilter } from '../shared/filters/mongo-driver-error.filter';
import { UdeUser } from './models/ude-user';
import { UdeUserRepository } from './repositories/ude-user.respository';
import { UdeUserService } from './services/ude-user.service';

@Module({
  imports: [
    TypegooseModule.forFeature([UdeUser]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
        };
      },
    }),
  ],
  providers: [
    UdeUserRepository,
    UdeUserService,
    { provide: TOKEN_SERVICE, useClass: JwtTokenService },
    {
      provide: APP_FILTER,
      useClass: MongoDriverErrorFilter,
    },
    JwtTokenService,
  ],
  exports: [UdeUserService, JwtTokenService],
})
export class UdeUserModule {}
