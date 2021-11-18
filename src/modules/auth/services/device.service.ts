import { DeviceDto } from '../dtos/device.dto';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { Auth } from '../models/auth';

@Injectable()
export class DeviceService {
  constructor(private repo: AuthRepository) {}

  async execute(request: DeviceDto, userId: string): Promise<Auth> {
    if (!(await this.repo.findOne({ _id: userId, 'devices.imie': request.imie })))
      return await this.repo.findByIdAndUpdate(userId, { $addToSet: { devices: request } });
    else
      return await this.repo.findOneAndUpdate(
        { _id: userId, 'devices.imie': request.imie },
        { $set: { 'devices.$.token': request.token } },
      );
  }
}
