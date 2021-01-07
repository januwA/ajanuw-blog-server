import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOkResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from '~api/auth/auth.service';
import { JwtAuthGuard } from '~api/auth/jwt-auth.guard';
import { LocalAuthGuard } from '~api/auth/local-auth.guard';
import { UserLoginDto } from './dto/user-login.dto';

export const routeName = 'api/users';

@ApiTags(routeName)
@Controller(routeName)
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 用户登录返回token
   * @param req
   */
  @UseGuards(LocalAuthGuard) // 启用本地验证
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  @ApiOkResponse({ description: '返回token' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * 提供token,获取用户信息
   * @param req
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: '返回用户信息',
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
