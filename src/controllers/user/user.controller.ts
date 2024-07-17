import { Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Body } from "@nestjs/common";
import { ConflictException } from "@nestjs/common";
import { hash } from 'bcryptjs'
import { CreateAccountBodySchema, createAccountBodyValidate } from "./create-account-body-schema";

@Controller('/users')
export class UserController {

    constructor(private prismaService: PrismaService) { }

    @Post('/accounts/create')
    @HttpCode(201)
    async createAccount(@Body(createAccountBodyValidate) body: CreateAccountBodySchema) {

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