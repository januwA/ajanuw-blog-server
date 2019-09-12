import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { DatabaseNames } from '~src/databases-names';
import { User } from '~src/user/interfaces/user.interface';
import { UserLoginDto } from '~src/user/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(DatabaseNames.users) private readonly userModel: Model<User>,
  ) {}

  /**
   * 用户登录，验证用户的账号密码是否正确
   * @param userLogin
   */
  async validateUser(userLogin: UserLoginDto): Promise<any> {
    const user: User = await this.findUser(userLogin);
    if (!user) {
      throw new UnauthorizedException('账号错误');
    }
    const isValidatePassword = await bcrypt.compare(
      userLogin.password,
      user.password,
    );
    if (!isValidatePassword) {
      throw new UnauthorizedException('密码错误');
    }

    // 不能直接操作document对象
    const { password, ...result } = user.toObject();
    return result;
  }

  private async findUser(userLogin): Promise<User> {
    return await this.userModel.findOne({
      username: userLogin.username,
    });
  }

  /**
   * 用户账号密码验证成功后，调用login，返回token字段
   * @param user
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
