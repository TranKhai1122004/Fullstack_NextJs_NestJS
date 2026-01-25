import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        // Không yêu cầu role → cho qua
        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log('REQ.USER >>>', user);
        console.log('REQUIRED ROLES >>>', requiredRoles);

        // ❌ QUAN TRỌNG: nếu không có user / role → CHẶN
        if (!user || !user.role) {
            return false;
        }

        return requiredRoles.includes(user.role);
    }
}
