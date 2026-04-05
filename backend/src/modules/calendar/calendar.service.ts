import { prismaClient } from '../../database/connection'
import type { CreateCalendarInput, UpdateCalendarInput } from './calendar.dto'

export class CalendarService {
  async create(montadorId: string, input: CreateCalendarInput) {
    return prismaClient.calendar.create({
      data: {
        montadorId,
        data: new Date(input.data),
        horaInicio: input.horaInicio,
        horaFim: input.horaFim,
        tipo: input.tipo,
        titulo: input.titulo,
        descricao: input.descricao,
      },
    })
  }

  async findAll(montadorId: string, month?: number, year?: number) {
    const where: any = { montadorId }

    if (month && year) {
      const startDate = new Date(year, month - 1, 1)
      const endDate = new Date(year, month, 0)
      where.data = {
        gte: startDate,
        lte: endDate,
      }
    }

    return prismaClient.calendar.findMany({
      where,
      include: {
        service: { select: { titulo: true } },
      },
      orderBy: { data: 'asc' },
    })
  }

  async update(calendarId: string, montadorId: string, input: UpdateCalendarInput) {
    const calendar = await prismaClient.calendar.findFirst({
      where: { id: calendarId, montadorId },
    })

    if (!calendar) {
      throw new Error('Calendário não encontrado')
    }

    return prismaClient.calendar.update({
      where: { id: calendarId },
      data: {
        data: input.data ? new Date(input.data) : undefined,
        horaInicio: input.horaInicio,
        horaFim: input.horaFim,
        tipo: input.tipo,
        titulo: input.titulo,
        descricao: input.descricao,
      },
    })
  }

  async delete(calendarId: string, montadorId: string) {
    const calendar = await prismaClient.calendar.findFirst({
      where: { id: calendarId, montadorId },
    })

    if (!calendar) {
      throw new Error('Calendário não encontrado')
    }

    await prismaClient.calendar.delete({ where: { id: calendarId } })
    return { message: 'Evento deletado com sucesso' }
  }
}

export const calendarService = new CalendarService()
