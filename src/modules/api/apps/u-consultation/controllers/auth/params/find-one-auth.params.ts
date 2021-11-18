import { Exists } from '../../../../../validators/exists-mongo.validator';
import { Auth } from '../../../../../../auth/models/auth';
import { NotFoundException } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export class FindOneAuthParams {
  @IsNotEmpty()
  @Exists({ modelName: Auth.name, field: '_id', error: new NotFoundException('Auth not found') })
  id: string;
}
