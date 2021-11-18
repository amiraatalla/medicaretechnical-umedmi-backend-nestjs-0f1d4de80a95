import { Inject, Injectable } from '@nestjs/common';
import { TOKEN_SERVICE, TokenServiceInterface } from '../interfaces/token-service.interface';
import { ModuleRef } from '@nestjs/core';
import { LoginDto } from '../../api/apps/u-consultation/controllers/auth/requests/login.dto';
import { LoginStrategyInterface } from '../interfaces/login-strategy.interface';
import { SerializerService } from './serializer.service';
import { LoginTypesEnum } from '../enums/login-types.enum';

@Injectable()
export class LoginService {
  constructor(@Inject(TOKEN_SERVICE) private tokenService: TokenServiceInterface, private moduleRef: ModuleRef) {}
  async execute(request: LoginDto): Promise<string> {
    const loginStrategy: LoginStrategyInterface = this.moduleRef.get(request.type);
    const auth = await loginStrategy.login(request);
    const authSerialized = SerializerService.serialize(auth);
    return this.tokenService.generate(authSerialized);
  }
}
