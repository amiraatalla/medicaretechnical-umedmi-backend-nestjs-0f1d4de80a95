import { Global, Module, OnModuleInit } from '@nestjs/common';
import { initDateHelpers } from './date.helper';

@Global()
@Module({})
export class HelpersModule implements OnModuleInit {
  onModuleInit(): any {
    initDateHelpers();
  }
}
