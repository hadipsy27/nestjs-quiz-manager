import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDtoReq } from './dto/user-register-dto.req';
import { UserService } from './user.service';
import { SETTINGS } from '../../app.utils';
import { RegisterResponseDto } from './dto/register-response.dto';
import {
  ApiAcceptedResponse,
  ApiBadGatewayResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiAcceptedResponse({
    description: 'User created successfully',
    type: User,
  })
  @ApiBadGatewayResponse({
    description: 'User creation failed',
    type: RegisterResponseDto,
  })
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
