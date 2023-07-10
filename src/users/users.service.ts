import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Users } from './users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}

  async login(login: string, password: string) {
    const user = await this.usersModel.findOne({
      login,
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = jwt.sign(
        { login: user.login, password: user.password, id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
      );

      return accessToken;
    }

    return null;
  }

  async newUser(userInfos: Users) {
    return await new this.usersModel({
      ...userInfos,
      password: bcrypt.hashSync(userInfos.password, 10),
    }).save();
  }

  getUserInfos() {
    return;
  }

  updateUserInfos() {
    return;
  }
}
