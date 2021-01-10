import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useStaticAssets(path.join(__dirname, '..', process.env.public_path), {
    prefix: process.env.public_path,
  });
  app.enableCors();
  await app.listen(process.env.port, () => {
    console.log(`http://localhost:${process.env.port}`);
  });
}
bootstrap();
