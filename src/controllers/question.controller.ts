import { Body, Controller, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/modules/auth/current-user.decorator";
import { UserByTokenPayload } from "src/modules/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";
import { createQuestionBodyValidate, CreateQuestionBodySchema } from './validators/create-question-body-schema';
import { pageQueryValidationPipe } from "src/core/validators/page-query-param-schema";

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

        const entity = await this.prismaService.question.create({
            data: {
                authorId: userId,
                title,
                content,
                slug: this.convertToSlug(title),
            },
        })

        return { data: entity }
    }

    async fetchRecentQuestions(@Query('page', pageQueryValidationPipe) page: number) {

        const itemsPerPage = 1

        const questions = await this.prismaService.question.findMany({
            take: itemsPerPage,
            skip: (page - 1) * itemsPerPage,
            orderBy: {
                createdAt: 'desc',
            },
        })

        return { questions }
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