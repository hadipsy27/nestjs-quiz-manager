import { Injectable } from '@nestjs/common';
import { UserRegisterDtoReq } from './dto/user-register-dto.req';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async register(userRegisterReq: UserRegisterDtoReq): Promise<User> {
    const user = new User();
    user.name = userRegisterReq.name;
    user.email = userRegisterReq.email;
    user.password = userRegisterReq.password;

    return await user.save();
  }
}
