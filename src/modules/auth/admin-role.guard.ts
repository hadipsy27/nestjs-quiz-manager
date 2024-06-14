import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    // const request = context.switchToHttp().getRequest();

    // if (request?.user) {
    //   const { id } = request.user;
    //   const user = await this.userService.getUserById(id);
    //   console.log(user);
    //   return user.role === UserRoles.ADMIN;
    // }

    return false;
  }
}
