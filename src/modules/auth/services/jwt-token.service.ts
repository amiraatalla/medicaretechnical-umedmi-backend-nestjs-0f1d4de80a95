import { Injectable } from '@nestjs/common';
import { Auth } from '../models/auth';
import { TokenServiceInterface } from '../interfaces/token-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements TokenServiceInterface {
  constructor(private jwtService: JwtService) {}

  generate(auth: Partial<Auth>): string {
    return this.jwtService.sign(auth);
  }
}
