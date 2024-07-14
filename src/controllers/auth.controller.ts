import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";


const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/auth')
export class AuthController {

    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService) { }

    @Post()
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    async authenticate(@Body() body: AuthenticateBodySchema) {
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
            acess_token: acessToken
        }
    }
}