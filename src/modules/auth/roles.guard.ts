import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.info('roles', roles);

    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      const { id } = request.user;
      const user = await this.userService.getUserById(id);
      console.log(user);
      // return user.role === UserRoles.ADMIN;
      return roles.includes(user.role);
    }

    return false;
  }
}
