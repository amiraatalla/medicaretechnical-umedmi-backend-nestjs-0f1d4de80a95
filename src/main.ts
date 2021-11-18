import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { setupSwagger } from './viveo-swagger';
import { mongoose } from '@typegoose/typegoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: true } });
  const configService = app.get(ConfigService);
  setupSwagger(app, configService.get('NODE_ENV'));
  const port = configService.get('PORT');
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // mongoose.set('debug', true);
  await app.listen(port);
  mongoose.set('debug', true);
  Logger.log(`app started on port: ${port}`, 'Main');
}
bootstrap();
