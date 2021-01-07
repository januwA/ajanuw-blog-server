import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('api文档')
        .addBearerAuth() // 需要身份验证
        .build(),
    ),
  );

  app.enableCors();
  await app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
}
bootstrap();
