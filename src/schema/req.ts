import { z } from 'zod'

export const indexQuerySchema = z.object({
    limit: z.coerce.number().positive().min(1).max(100),
})

export const articleBodySchema = z.object({
    userId: z.coerce.number().positive(),
    title: z.string().min(1).max(100),
})