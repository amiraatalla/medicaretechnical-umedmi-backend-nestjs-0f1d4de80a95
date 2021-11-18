import { Auth } from '../models/auth';

export const TOKEN_SERVICE = 'TOKEN_SERVICE';

export interface TokenServiceInterface {
  generate(auth: Partial<Auth>): Promise<string> | string;
}
