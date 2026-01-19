
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/helpers/util';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, CodeAuthDto } from './dto/create-auth.dto';
import { emitWarning } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) return null;
    const isValidPassword = await comparePasswordHelper(pass, user.password);

    if (!isValidPassword) return null;
    return user;


  }
  async login(user: any) {
    const payload = { sub: user._id, username: user.email };
    return {
      user: {
        email: user.email,
        _id: user.id,
        name: user.name
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  handleRegister = async (registerDto: CreateAuthDto) => {
    return await this.usersService.handleRegister(registerDto);
  }

  checkCode = async (data: CodeAuthDto) => {
    return await this.usersService.handleActive(data);
  }

  retryActive = async (data: string) => {
    return await this.usersService.retryActive(data);
  }
}
