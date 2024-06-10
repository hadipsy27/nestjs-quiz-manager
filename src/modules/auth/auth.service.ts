import {
  BadRequestException,
  forwardRef,
  Inject,
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
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserCreds(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new BadRequestException('User Not Found!');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Incorrect password!');
    console.log(isMatch);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUserCreds(email, password);
    const token = this.generateToken(user);
    const result: { data: typeof token; statusCode: 200 } = {
      data: token,
      statusCode: 200,
    };
    return result;
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
          secret: this.configService.get('APP_SECRET'),
        },
      ),
    };
  }
}
