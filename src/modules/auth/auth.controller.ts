import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.gurad';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserLoginReq } from './dto/user-login.req';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: UserLoginReq): Promise<any> {
    const token = await this.authService.login(user.email, user.password);
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Request() req): Promise<any> {
    return this.userService.getUserById(req.user.id);
  }
}
