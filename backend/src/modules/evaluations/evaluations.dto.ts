import { z } from 'zod'

export const createEvaluationSchema = z.object({
  serviceId: z.string(),
  montadorId: z.string(),
  nota: z.number().min(1).max(5),
  comentario: z.string().optional(),
})

export type CreateEvaluationInput = z.infer<typeof createEvaluationSchema>
