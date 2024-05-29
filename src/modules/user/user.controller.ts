import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDtoReq } from './dto/user-register-dto.req';
import { UserService } from './user.service';
import { SETTINGS } from '../../app.utils';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async doUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE) userRegisterReq: UserRegisterDtoReq,
  ): Promise<User> {
    return await this.userService.register(userRegisterReq);
  }
}
