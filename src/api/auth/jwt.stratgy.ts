import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request
      // 在header中提取token
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      jwtFromRequest: (req: Request) => {
        const KEY = 'token';
        req.cookies ??= {};
        const token =
          req.headers[KEY] ??
          req.body[KEY] ??
          req.query[KEY] ??
          req.cookies[KEY] ??
          req.headers['authorization']?.replace(/Bearer\s/i, '');
        return token;
      },

      ignoreExpiration: false,
      secretOrKey: process.env.jwt_secret,
    });
  }

  /**
   * jwt验证成功后，返回的数据写入req.user的数据
   * @param payload
   */
  async validate(payload: any) {
    const { exp, iat, ...result } = payload;
    return result;
  }
}
