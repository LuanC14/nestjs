import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserByTokenPayload } from "./jwt.strategy";

export const CurrentUser = createParamDecorator(
    (_: never, context: ExecutionContext): UserByTokenPayload => {
        const request = context.switchToHttp().getRequest()
        return request.user as UserByTokenPayload
    }
)