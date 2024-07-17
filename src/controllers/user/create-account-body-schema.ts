import { ZodValidationPipe } from "src/pipes/zod-validation.pipe"
import { z } from "zod"

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

const createAccountBodyValidate = new ZodValidationPipe(createAccountBodySchema)

export {
    createAccountBodySchema,
    CreateAccountBodySchema,
    createAccountBodyValidate
}