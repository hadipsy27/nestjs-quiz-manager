import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDtoReq } from './dto/user-register-dto.req';
import { UserService } from './user.service';
import { SETTINGS } from '../../app.utils';
import { RegisterResponseDto } from './dto/register-response.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async doUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE) userRegisterReq: UserRegisterDtoReq,
  ): Promise<{ data: any; statusCode: number; message: string }> {
    try {
      const result = await this.userService.register(userRegisterReq);
      return new RegisterResponseDto(result, 200, 'User created successfully');
    } catch (err) {
      return new RegisterResponseDto(null, 400, err.message);
    }
  }
}
