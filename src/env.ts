import { z } from "zod";

export const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    // Toda variável de ambiente é uma String, por isso o uso do 'coerce'
    PORT: z.coerce.number().optional().default(3000) 
})

export type Env = z.infer<typeof envSchema>