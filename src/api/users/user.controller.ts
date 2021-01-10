import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { AuthService } from '~api/auth/auth.service';
import { JwtAuthGuard } from '~api/auth/jwt-auth.guard';
import { LocalAuthGuard } from '~api/auth/local-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 用户登录返回token
   * @param req
   */
  @UseGuards(LocalAuthGuard) // 启用本地验证
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * 提供token,获取用户信息
   * @param req
   */
  @Get('info')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
