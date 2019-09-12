import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypesModule } from './types/types.module';
import { EssaysModule } from './essays/essays.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/ajanuw_blog', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    TypesModule,
    EssaysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
