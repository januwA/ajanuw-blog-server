import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
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
  async validateUser(userLogin: any) {
    const user: UserDocument = await this.userModel.findOne({
      username: userLogin.username,
    });

    if (!user) throw new BadRequestException('账号错误');
    const isValidatePassword = await bcrypt.compare(
      userLogin.password,
      user.password,
    );
    if (!isValidatePassword) throw new BadRequestException('密码错误');

    // 过滤掉password属性
    const { password, ...result } = user.toJSON();
    return result;
  }

  /**
   * 用户账号密码验证成功后，调用login，返回token字段
   * @param user
   */
  async login(user: any) {
    return {
      token: this.jwtService.sign(user), // 会调用jwt的validate
    };
  }
}
