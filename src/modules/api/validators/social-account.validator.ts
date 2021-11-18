import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ModuleRef } from '@nestjs/core';
import { SocialNetworkServiceInterface } from '../../shared/interfaces/social-network.service.interface';
import { Logger } from '@nestjs/common';
import { SocialAccountRequest } from '../apps/u-consultation/controllers/auth/requests/social-account.request';

@ValidatorConstraint({ name: 'social-account', async: true })
export class SocialAccountValidator implements ValidatorConstraintInterface {
  constructor(private moduleRef: ModuleRef) {}

  async validate(value: SocialAccountRequest) {
    const socialNetworkService: SocialNetworkServiceInterface = this.moduleRef.get(value.type + '_SERVICE');

    try {
      const account = await socialNetworkService.getProfile(value.accessToken);
      return value.accountId === account.id;
    } catch (e) {
      Logger.log(e.message, SocialAccountValidator.name);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not valid`;
  }
}
