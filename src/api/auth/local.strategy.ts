import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * 本地身份验证策略，这个只验证你的账号密码正确性，要返回token还需要JWT策略
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // 默认使用username和password，但是可以改
    // http://www.passportjs.org/docs/username-password/#parameters
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return await this.authService.validateUser({ username, password });
  }
}
