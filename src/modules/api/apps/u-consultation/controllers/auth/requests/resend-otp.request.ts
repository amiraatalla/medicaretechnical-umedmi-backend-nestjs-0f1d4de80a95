import { IsNotEmpty } from 'class-validator';
import { Exists } from '../../../../../validators/exists-mongo.validator';
import { Auth } from '../../../../../../auth/models/auth';
import { NotFoundException } from '@nestjs/common';

export class ResendOtpRequest {
  @IsNotEmpty()
  @Exists({ modelName: Auth.name, field: 'phoneNumber', error: new NotFoundException('Phone number is not found') })
  phoneNumber: string;
}
