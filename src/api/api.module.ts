import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';
import { EssaysModule } from './essays/essays.module';
import { TypesModule } from './types/types.module';
import { UsersModule } from './users/user.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [UsersModule, AuthModule, EssaysModule, TypesModule],
})
export class ApiModule {}
