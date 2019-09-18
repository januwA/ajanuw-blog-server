import * as fs from 'fs';
import * as os from 'os';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { UserModule } from './user/user.module';
import { TypesModule } from './types/types.module';
import { EssaysModule } from './essays/essays.module';

async function bootstrap() {

  // 简单的设置下开发模式和生产模式
  if (os.platform() === 'linux') {
    process.env.NODE_ENV = 'producation';
  } else {
    // } else if (os.platform() === 'win32') {
    process.env.NODE_ENV = 'development';
  }

  let hostname = '0.0.0.0';
  let nestApplicationOptions;
  if (process.env.NODE_ENV === 'producation') {
    hostname = '0.0.0.0';
    // nestApplicationOptions = {
    //   httpsOptions: {
    //     key: fs.readFileSync('/etc/letsencrypt/live/ajanuw.xyz/privkey.pem'),
    //     cert: fs.readFileSync('/etc/letsencrypt/live/ajanuw.xyz/cert.pem'),
    //   },
    // };
  } else {
    hostname = '127.0.0.1';
    // nestApplicationOptions = {
    //   httpsOptions: {
    //     key: fs.readFileSync('D:\\localhost_ssl\\dev.ajanuw.com.key'),
    //     cert: fs.readFileSync('D:\\localhost_ssl\\dev.ajanuw.com.crt'),
    //   },
    // };
  }
  const app = await NestFactory.create(AppModule, nestApplicationOptions);

  // dto
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false, // 不显示错误信息
      whitelist: true, // 开启过滤,过滤掉发送来的多于字段
    }),
  );

  // swagger
  const options = new DocumentBuilder()
    .setTitle('Ajanuw blog')
    .setDescription('ajanuw blog api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup('api', app, document);

  // user
  const userOptions = new DocumentBuilder()
    .setTitle('User Route')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const UserDocument = SwaggerModule.createDocument(app, userOptions, {
    include: [UserModule],
  });
  SwaggerModule.setup('api/user', app, UserDocument);

  //types
  const typesOptions = new DocumentBuilder()
    .setTitle('types Route')
    .setDescription('The types API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup(
    'api/types',
    app,
    SwaggerModule.createDocument(app, typesOptions, {
      include: [TypesModule],
    }),
  );

  //essays
  const essaysOptions = new DocumentBuilder()
    .setTitle('essays Route')
    .setDescription('The essays API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup(
    'api/essays',
    app,
    SwaggerModule.createDocument(app, essaysOptions, {
      include: [EssaysModule],
    }),
  );

  app.enableCors();
  await app.listen(5000, hostname);
}
bootstrap();
