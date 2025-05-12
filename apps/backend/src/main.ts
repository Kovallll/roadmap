import { join } from 'path';

import { AppModule } from './app/app.module';

import { AllExceptionsFilter } from '@/filters/AllExceptionsFilter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Roadmap API')
    .setDescription('API документация для Roadmap приложения')
    .setVersion('1.0')
    .addTag('users')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  const port = process.env.PORT || 5000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${process.env.VITE_BACK_HOST}`);
}

bootstrap();
