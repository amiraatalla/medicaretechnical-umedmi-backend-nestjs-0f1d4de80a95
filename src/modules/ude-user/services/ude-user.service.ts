import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UdeUser } from '../models/ude-user';
import { UdeUserDto } from '../dtos/ude-user.dto';
import { UdeUserRepository } from '../repositories/ude-user.respository';
import { JwtTokenService } from 'src/modules/auth/services/jwt-token.service';
import { UdeLoginDto } from '../dtos/ude-login.dto';
import { BaseHttpResponse } from 'src/modules/shared/classes/base-http.response';
import { UdeUserResetPinDto } from '../dtos/ude-user-reset-pin.dto';

@Injectable()
export class UdeUserService {
  constructor(public repo: UdeUserRepository, protected readonly jwtService: JwtTokenService) {}

  async getAll(): Promise<Array<UdeUser>> {
    return await this.repo.findAll();
  }

  async execute(request: UdeUserDto): Promise<UdeUser> {
    return await this.repo.save({ ...request });
  }

  async register(request: UdeUserDto) {
    let isNew = true,
      user = null;
    const foundUser = await this.repo.findOne({ username: request.username });
    user = await this.repo.save({ ...request });
    return new BaseHttpResponse<string>(this.jwtService.generate(user));
  }
  async resetPinCode(request: UdeUserResetPinDto) {
    const foundUser = await this.repo.findOne({ username: request.username });
    if (!foundUser) {
      throw new NotFoundException('user not found');
    }
    foundUser.pinCode = request.pinCode;
    const user = await this.repo.save({ ...foundUser }, false);
    return new BaseHttpResponse<string>(
      this.jwtService.generate({ _id: user._id, username: user.username, isVerified: user.isVerified }),
    );
  }
  async login(loginDto: UdeLoginDto) {
    const user = await this.repo.findOne({ $or: [{ username: loginDto.username }, { phone: loginDto.username }] });
    if (!user) {
      throw new UnauthorizedException({ statusCode: 404, message: ['username not found'], error: 'Not found' });
    }
    if (user.pinCode !== loginDto.pinCode && user.phone !== loginDto.pinCode) {
      throw new UnauthorizedException({ statusCode: 400, message: ['invalid pinCode'], error: 'Bad Request' });
    }
    return new BaseHttpResponse<string>(await this.jwtService.generate(user));
  }
}
