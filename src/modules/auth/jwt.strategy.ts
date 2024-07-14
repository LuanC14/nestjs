import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Env } from "src/env";
import { z } from "zod";

const userByTokenPayloadSchema = z.object({
    sub: z.string().uuid()
})

export type UserByTokenPayload = z.infer<typeof userByTokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private config: ConfigService<Env, true>) {
        const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true })

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(publicKey, 'base64'),
            algorithms: ['RS256']
        })
    }

    async validate(payload: UserByTokenPayload) {
        return userByTokenPayloadSchema.parse(payload)
    }
}