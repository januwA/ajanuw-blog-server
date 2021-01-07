import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ApiModule, // 使用ajanuw_blog库
    MongooseModule.forRoot('mongodb://localhost/ajanuw_blog', {
      connectionFactory: (connection) => {
        connection.plugin(require('@meanie/mongoose-to-json'));
        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
