import { Router } from 'express'
import { materialsController } from './materials.controller'
import { authMiddleware, requireType } from '../../shared/decorators/auth.decorator'

export const materialsRouter = Router()

materialsRouter.post('/', authMiddleware, requireType('montador'), (req, res, next) => materialsController.create(req, res, next))
materialsRouter.get('/service/:serviceId', authMiddleware, requireType('empresa'), (req, res, next) => materialsController.findByService(req, res, next))
materialsRouter.patch('/:id/status', authMiddleware, requireType('empresa'), (req, res, next) => materialsController.updateStatus(req, res, next))
