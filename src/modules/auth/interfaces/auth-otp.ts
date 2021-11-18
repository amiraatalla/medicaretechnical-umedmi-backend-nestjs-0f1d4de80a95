import { SendOtpOptions } from './send-otp-options';

export interface AuthOtp {
  send(options: SendOtpOptions): Promise<boolean>;
}
