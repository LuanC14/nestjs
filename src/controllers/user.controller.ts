import { Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { Body } from "@nestjs/common";
import { ConflictException } from "@nestjs/common";
import { hash } from 'bcryptjs'
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/users')
export class UserController {

    constructor(private prismaService: PrismaService) { }

    @Post('/accounts/create')
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async createAccount(@Body() body: CreateAccountBodySchema) {

        const { name, email, password } = body


        const verifyUserSameEmailExists = await this.prismaService.user.findUnique({
            where: { email }
        })

        if (verifyUserSameEmailExists) {
            throw new ConflictException('Já há um usuário cadastrado com este email!')
        }

        const hashedPassword = await hash(password, 8)


        const entity = await this.prismaService.user.create({
            data: { name, email, password: hashedPassword }
        })

        return {
            messagem: "Usuário criado com sucesso",
            usuario: {
                nome: entity.name,
                email
            }
        }
    }
}