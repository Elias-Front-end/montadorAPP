import { z } from 'zod'

export const createCalendarSchema = z.object({
  data: z.string(),
  horaInicio: z.string().optional(),
  horaFim: z.string().optional(),
  tipo: z.enum(['agendamento', 'disponivel', 'feriado']).default('agendamento'),
  titulo: z.string().optional(),
  descricao: z.string().optional(),
})

export const updateCalendarSchema = z.object({
  data: z.string().optional(),
  horaInicio: z.string().optional(),
  horaFim: z.string().optional(),
  tipo: z.enum(['agendamento', 'disponivel', 'feriado']).optional(),
  titulo: z.string().optional(),
  descricao: z.string().optional(),
})

export type CreateCalendarInput = z.infer<typeof createCalendarSchema>
export type UpdateCalendarInput = z.infer<typeof updateCalendarSchema>
