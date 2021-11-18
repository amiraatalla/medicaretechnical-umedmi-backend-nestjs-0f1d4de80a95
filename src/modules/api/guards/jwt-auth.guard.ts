import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnverifiedAccountException } from '../../auth/exceptions/unverified-account.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any): TUser {
    // console.log(err, user, 'err user log');

    if (!user.isVerified) {
      throw new UnverifiedAccountException();
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
Injectable();
export class JwtAdminGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
