import { ZodValidationPipe } from "src/pipes/zod-validation.pipe"
import { z } from "zod"

const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

const authenticateBodyValidate = new ZodValidationPipe(authenticateBodySchema)

export {
    authenticateBodySchema,
    AuthenticateBodySchema,
    authenticateBodyValidate
}