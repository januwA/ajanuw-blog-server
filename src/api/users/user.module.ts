import { Module } from '@nestjs/common';
import { AuthModule } from '~api/auth/auth.module';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
