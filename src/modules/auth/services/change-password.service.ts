import { Injectable } from '@nestjs/common';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { AuthRepository } from '../repositories/auth.repository';
import { HashService } from '../../shared/services/hash.service';

@Injectable()
export class ChangePasswordService {
  constructor(private repo: AuthRepository, private hashService: HashService) {}

  async execute(options: ChangePasswordDto): Promise<boolean> {
    return this.repo.updateOneById(options.id, { password: await this.hashService.hash(options.password) });
  }
}
