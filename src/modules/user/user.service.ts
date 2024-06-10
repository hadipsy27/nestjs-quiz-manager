import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserRegisterDtoReq } from './dto/user-register-dto.req';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  async register(
    userRegisterReq: UserRegisterDtoReq,
  ): Promise<{ data: any; statusCode: number }> {
    const user = new User();
    user.name = userRegisterReq.name;
    user.email = userRegisterReq.email;
    user.password = userRegisterReq.password;

    const saveUser = await user.save();
    const token = this.authService.generateToken(saveUser);
    const data = { data: token, statusCode: 200 };
    return data;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }
}
