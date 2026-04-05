import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { calendarService } from './calendar.service'
import { prismaClient } from '../../database/connection'
import { createCalendarSchema, updateCalendarSchema } from './calendar.dto'

export class CalendarController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = createCalendarSchema.parse(req.body)
      const profile = await prismaClient.montadorProfile.findUnique({ where: { userId: req.user!.userId } })
      const calendar = await calendarService.create(profile!.id, input)
      res.status(201).json({ success: true, data: calendar })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } })
      }
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await prismaClient.montadorProfile.findUnique({ where: { userId: req.user!.userId } })
      const { month, year } = req.query
      const calendars = await calendarService.findAll(
        profile!.id,
        month ? Number(month) : undefined,
        year ? Number(year) : undefined
      )
      res.json({ success: true, data: calendars })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = updateCalendarSchema.parse(req.body)
      const profile = await prismaClient.montadorProfile.findUnique({ where: { userId: req.user!.userId } })
      const calendar = await calendarService.update(req.params.id, profile!.id, input)
      res.json({ success: true, data: calendar })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } })
      }
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await prismaClient.montadorProfile.findUnique({ where: { userId: req.user!.userId } })
      const result = await calendarService.delete(req.params.id, profile!.id)
      res.json({ success: true, ...result })
    } catch (error) {
      next(error)
    }
  }
}

export const calendarController = new CalendarController()
