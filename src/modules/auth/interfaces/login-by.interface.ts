import { LoginByEnum } from '../enums/login-by.enum';
import { LoginRequestInterface } from './login-request.interface';

export interface LoginByInterface extends LoginRequestInterface {
  loginBy?: LoginByEnum;
}
