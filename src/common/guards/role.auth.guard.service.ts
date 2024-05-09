import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const requiredRoleLevel = this.reflector.get<number>(
      'roleAuth',
      context.getHandler(),
    );
    console.log(requiredRoleLevel);
    if (!requiredRoleLevel) {
      return true;
    }

    const request = context.switchToHttp().getRequest().user;
    if (request.userRole >= requiredRoleLevel) {
      return true;
    } else {
      throw new HttpException('角色权限不足', HttpStatus.FORBIDDEN);
    }
  }
}
