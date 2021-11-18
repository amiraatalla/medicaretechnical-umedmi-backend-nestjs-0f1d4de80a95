import { ValidateNested } from 'class-validator';
import { FcmMessageNotification } from '../../firebase/fcm/interfaces/fcm-message-notification.interface';
import { FcmMessage } from '../../firebase/fcm/interfaces/fcm-message.interface';

export class SendNotificationDto implements FcmMessage {
  collapse_key?: string;
  @ValidateNested()
  notification?: FcmMessageNotification;
  data?: any;
}
