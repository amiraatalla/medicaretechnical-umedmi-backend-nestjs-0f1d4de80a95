import { FcmMessageNotification } from './fcm-message-notification.interface';

export interface FcmMessage {
  to?: string;
  collapse_key?: string;
  notification?: FcmMessageNotification;
  data?: any;
}
