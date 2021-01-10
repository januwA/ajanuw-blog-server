import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.mongodb_uri, {
      connectionFactory: (connection) => {
        connection.plugin(require('@meanie/mongoose-to-json'));
        return connection;
      },
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
