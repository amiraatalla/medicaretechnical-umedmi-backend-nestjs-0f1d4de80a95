import { Injectable } from '@nestjs/common';
import { logger } from '@typegoose/typegoose/lib/logSettings';
import { Auth } from '../../auth/models/auth';
import { AuthRepository } from '../../auth/repositories/auth.repository';
import { FcmService } from '../firebase/fcm/fcm.service';
import { SendNotificationDto } from './dtos/send-notification.dto';

@Injectable()
export class NotificationService {
  private notifier: FcmService;
  constructor(private readonly authRepo: AuthRepository) {
    this.notifier = FcmService.getInstance();
  }
  async notifyUser(message: SendNotificationDto, user: Auth) {
    try {
      for (const device of user.devices) {
        const res = device && device.token;
        if (res) {
          return this.notifier.send({
            to: device.token,
            ...message,
          });
        } else {
          return null;
        }
      }
    } catch (error) {
      logger.log(error);
    }
  }
  async notifyUserId(message: SendNotificationDto, userId: string) {
    try {
      return this.notifyUser(message, await this.authRepo.findById(userId, { devices: 1 }));
    } catch (error) {
      logger.log(error);
    }
  }

  async notifyUsers(message: SendNotificationDto, users: Auth[]) {
    try {
      const msg = await users.map(user => this.notifyUser(message, user));
      return Promise.all(msg);
    } catch (error) {
      logger.log(error);
    }
  }
  async notifyUsersByIds(message: SendNotificationDto, usersIds: string[]) {
    try {
      return this.notifyUsers(
        message,
        await this.authRepo.find(
          {
            _id: { $in: usersIds },
          },
          { devices: 1 },
          {},
        ),
      );
    } catch (error) {
      logger.log(error);
    }
  }
}
