import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUserCreds(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new BadRequestException('User Not Found!');

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (isMatch === false) throw new UnauthorizedException('Password salah!');
    console.log(isMatch);
    return user;
  }

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign(
        {
          name: user.name,
          sub: user.id,
        },
        {
          expiresIn: '15m',
          secret: this.configService.get('JWT_SECRET'),
        },
      ),
    };
  }
}
