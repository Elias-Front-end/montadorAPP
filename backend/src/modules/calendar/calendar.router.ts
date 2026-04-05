import { Router } from 'express'
import { calendarController } from './calendar.controller'
import { authMiddleware, requireType } from '../../shared/decorators/auth.decorator'

export const calendarRouter = Router()

calendarRouter.post('/', authMiddleware, requireType('montador'), (req, res, next) => calendarController.create(req, res, next))
calendarRouter.get('/', authMiddleware, requireType('montador'), (req, res, next) => calendarController.findAll(req, res, next))
calendarRouter.patch('/:id', authMiddleware, requireType('montador'), (req, res, next) => calendarController.update(req, res, next))
calendarRouter.delete('/:id', authMiddleware, requireType('montador'), (req, res, next) => calendarController.delete(req, res, next))
