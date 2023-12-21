import { IS_PUBLIC_KEY } from "@/common/decorators/setMetaData.pipe";
import { ResponseUtils } from "@/common/utils/response.utils";
import { ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) {
            return true
        }
        return super.canActivate(context)
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw err || new UnauthorizedException(
                ResponseUtils.serverResponse(false, HttpStatus.UNAUTHORIZED, 'Unauthorised user')
            )
        }

        return user
    }
}