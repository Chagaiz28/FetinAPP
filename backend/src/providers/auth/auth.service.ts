import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/resources/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserMetaData } from 'src/common/types/request';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.verifyPassword(password, user.password);

    return user;
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  public getCookieWithJwtToken(user: UserMetaData) {
    const payload = { ...user, sub: user._id };
    const acessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('jwt.expiresIn'),
    });
    return {
      cookie: `Authentication=${acessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get('jwt.expiresIn')}`,
      acessToken,
    };
  }
}
