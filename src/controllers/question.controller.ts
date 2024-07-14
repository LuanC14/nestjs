import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class QuestionController {

    @Post('/create')
    async createQuestion() {
        return {
            hello_world : "Hello World",
            message : "Hello World"
        }
    }
}