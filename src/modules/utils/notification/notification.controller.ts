import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { AppsEnum } from '../../api/enums/apps.enum';
import { createPrefix } from '../../api/helpers/prefix.helper';
import { SendNotificationDto } from './dtos/send-notification.dto';
import { NotificationService } from './notification.service';
@ApiTags('Notification')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'notification'))
export class NotificationController {
  constructor(private readonly _service: NotificationService) {}
  @Post(':user_id')
  async sendNotification(@Param('user_id') userId: string, @Body() message: SendNotificationDto) {
    return await this._service.notifyUserId(message, userId);
  }
}
