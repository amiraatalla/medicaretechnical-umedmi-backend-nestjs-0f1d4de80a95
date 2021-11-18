import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Auth } from '../../auth/models/auth';
import { AuthRepository } from '../../auth/repositories/auth.repository';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [TypegooseModule.forFeature([Auth])],
  providers: [NotificationService, AuthRepository],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
