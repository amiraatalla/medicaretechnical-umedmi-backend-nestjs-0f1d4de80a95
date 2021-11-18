import { Auth } from '../models/auth';
import { LoginRequestInterface } from './login-request.interface';

export interface LoginStrategyInterface {
  login(request: LoginRequestInterface): Promise<Auth>;
}
