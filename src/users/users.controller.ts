import { Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Post('login')
  async login(@Req() request: Request, @Res() response: Response) {
    const accessToken = await this.usersService.login(
      request.body.login,
      request.body.password,
    );

    if (accessToken)
      return response.status(200).json({ status: 200, accessToken });
    response.status(404).json({ status: 404 });
  }

  @Post('newUser')
  async newUser(@Req() request: Request, @Res() response: Response) {
    const createdUser = await this.usersService.newUser(request.body);
    if (createdUser) return response.status(200).json({ status: 200 });
    response.status(500).json({ status: 500 });
  }

  @Post('getUserInfos')
  getUserInfos(@Req() request: Request, @Res() response: Response) {
    this.usersService.getUserInfos();
  }

  @Post('updateUserInfos')
  updateUserInfos(@Req() request: Request, @Res() response: Response) {
    this.usersService.updateUserInfos();
  }
}
