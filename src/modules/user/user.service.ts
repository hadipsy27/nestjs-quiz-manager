import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRegisterDtoReq } from './dto/user-register-dto.req';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { UserRoles } from './enum/user.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  async register(
    userRegisterReq: UserRegisterDtoReq,
    userRole: UserRoles,
  ): Promise<{ access_token: string }> {
    const user = new User();
    user.name = userRegisterReq.name;
    user.email = userRegisterReq.email;
    user.password = userRegisterReq.password;
    user.role = userRole;

    const existingUser = await this.getUserByEmail(userRegisterReq.email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const saveUser = await user.save();
    return this.authService.generateToken(saveUser);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }
}
