import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/modules/auth/current-user.decorator";
import { UserByTokenPayload } from "src/modules/auth/jwt.strategy";

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class QuestionController {

    @Post('/create')
    async createQuestion(@CurrentUser() user: UserByTokenPayload) {
    
        return {
            message : "Hello World",
            user_id: user.sub
        }
    }
}