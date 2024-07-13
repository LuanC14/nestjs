import { Controller, HttpCode, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { Body } from "@nestjs/common";
import { ConflictException } from "@nestjs/common";
import { hash } from 'bcryptjs'

@Controller('/users')
export class UserController {

    constructor(private prismaService: PrismaService) { }

    @Post('/accounts/create')
    @HttpCode(201)
    async createAccount(@Body() body: Prisma.UserCreateInput) {

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