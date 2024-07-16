import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { z } from "zod";

const pageQueryParamSchema = z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1))

const pageQueryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

export {
    pageQueryParamSchema,
    pageQueryValidationPipe,
    PageQueryParamSchema
}