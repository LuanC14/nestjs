import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthenticateBodySchema, authenticateBodyValidate } from "./authenticate-body-schema";

@Controller('/auth')
export class AuthController {

    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService) { }

    @Post()
    async authenticate(@Body(authenticateBodyValidate) body: AuthenticateBodySchema) {
        const { email, password } = body

        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado')
        }

        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais incorretas')
        }

        const acessToken = this.jwtService.sign({ sub: user.id })

        return {
            access_token: acessToken
        }
    }
}