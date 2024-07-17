import { ZodValidationPipe } from "src/pipes/zod-validation.pipe"
import { z } from "zod"

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
})

const createQuestionBodyValidate = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>
export {
    createQuestionBodySchema,
    createQuestionBodyValidate,
    CreateQuestionBodySchema
}
