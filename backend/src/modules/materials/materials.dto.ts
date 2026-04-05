import { z } from 'zod'

export const createMaterialSchema = z.object({
  serviceId: z.string(),
  tipo: z.enum(['material', 'peca']),
  descricao: z.string().min(3, 'Descrição obrigatória'),
  fotoUrl: z.string().url().optional(),
})

export const updateMaterialSchema = z.object({
  tipo: z.enum(['material', 'peca']).optional(),
  descricao: z.string().min(3).optional(),
  fotoUrl: z.string().url().optional(),
  status: z.enum(['pendente', 'aprovado', 'rejeitado', 'comprado']).optional(),
})

export type CreateMaterialInput = z.infer<typeof createMaterialSchema>
export type UpdateMaterialInput = z.infer<typeof updateMaterialSchema>
