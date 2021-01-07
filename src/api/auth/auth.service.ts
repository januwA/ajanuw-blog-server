import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserLoginDto } from '~api/users/dto/user-login.dto';
import { User, UserDocument } from '~api/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * 用户登录，验证用户的账号密码是否正确
   * @param userLogin
   */
  async validateUser(userLogin: UserLoginDto): Promise<any> {
    const user: User = await this.userModel.findOne({
      username: userLogin.username,
    });

    if (!user) throw new UnauthorizedException('账号错误');
    const isValidatePassword = await bcrypt.compare(
      userLogin.password,
      user.password,
    );
    if (!isValidatePassword) throw new UnauthorizedException('密码错误');

    // 不能直接操作document对象
    // 过滤掉password属性
    const { password, ...result } = user;
    return result;
  }

  /**
   * 用户账号密码验证成功后，调用login，返回token字段
   * @param user
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
