import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOkResponse,
  ApiImplicitBody,
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from '~auth/auth.service';
import { userLoginJwt } from '~auth/jwt-names';
import { UserLoginDto } from './dto/user-login.dto';

export const routeName = 'user';
@ApiUseTags(routeName)
@Controller(routeName)
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiImplicitBody({ name: '', type: UserLoginDto })
  @ApiOkResponse({ description: 'result Token' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @UseGuards(AuthGuard(userLoginJwt))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'result user info',
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
