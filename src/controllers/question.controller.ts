import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/modules/auth/current-user.decorator";
import { UserByTokenPayload } from "src/modules/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";
import { createQuestionBodyValidate, CreateQuestionBodySchema } from './validators/create-question-body-schema';

@UseGuards(AuthGuard('jwt'))
@Controller('/questions')
export class QuestionController {

    constructor(private prismaService: PrismaService) { }

    @Post('/create')
    async createQuestion(
        @Body(createQuestionBodyValidate) body: CreateQuestionBodySchema,
        @CurrentUser() user: UserByTokenPayload) {

        const { title, content } = body
        const userId = user.sub

        console.log(title)

        const slug = this.convertToSlug(title)

        const entity = await this.prismaService.question.create({
            data: {
                authorId: userId,
                title,
                content,
                slug,
            },
        })

        return {
            data: entity
        }
    }

    private convertToSlug(title: string): string {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
    }
}