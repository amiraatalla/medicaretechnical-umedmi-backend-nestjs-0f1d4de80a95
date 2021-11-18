import { HttpModule, HttpService, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5 * 60 * 1000, //5 minutes
      maxRedirects: 5,
    }),
  ],
  providers: [ConfigService, AiService],
  controllers: [AiController],
})
export class AiModule {}
