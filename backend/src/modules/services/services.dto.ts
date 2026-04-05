import { z } from 'zod'

export const createServiceSchema = z.object({
  titulo: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  descricao: z.string().optional(),
  endereco: z.object({
    rua: z.string(),
    numero: z.string(),
    cidade: z.string(),
    estado: z.string(),
    cep: z.string(),
    complemento: z.string().optional(),
  }).optional(),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  prazo: z.string().optional(),
  valor: z.number().positive().optional(),
  observacoes: z.string().optional(),
})

export const updateServiceSchema = z.object({
  titulo: z.string().min(3).optional(),
  descricao: z.string().optional(),
  endereco: z.any().optional(),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  prazo: z.string().optional(),
  valor: z.number().positive().optional(),
  observacoes: z.string().optional(),
  status: z.enum(['pendente', 'em_execucao', 'finalizado', 'cancelado']).optional(),
})

export const inviteMontadorSchema = z.object({
  montadorProfileId: z.string(),
  tipo: z.enum(['servico', 'time_fixo']).default('servico'),
  mensagem: z.string().optional(),
})

export type CreateServiceInput = z.infer<typeof createServiceSchema>
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>
export type InviteMontadorInput = z.infer<typeof inviteMontadorSchema>
