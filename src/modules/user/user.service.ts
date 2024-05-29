import { Injectable } from '@nestjs/common';
import { UserRegisterDtoReq } from './dto/user-register-dto.req';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async register(userRegisterReq: UserRegisterDtoReq): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userRegisterReq.password, salt);

    const user = new User();
    user.name = userRegisterReq.name;
    user.email = userRegisterReq.email;
    user.password = password;

    return await user.save();
  }
}
