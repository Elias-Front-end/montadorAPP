import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  fotoPerfil: z.string().url().optional(),
  habilidades: z.array(z.string()).optional(),
})

export const updateMontadorSchema = z.object({
  cpf: z.string().optional(),
  bio: z.string().optional(),
  fotoPerfil: z.string().url().optional(),
  habilidades: z.array(z.string()).optional(),
  disponibilidade: z.any().optional(),
  qualificacoes: z.array(z.object({
    nome: z.string(),
    instituicao: z.string(),
    ano: z.number().optional(),
    certificadoUrl: z.string().url().optional(),
  })).optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type UpdateMontadorInput = z.infer<typeof updateMontadorSchema>
