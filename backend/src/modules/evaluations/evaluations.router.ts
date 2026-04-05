import { Router } from 'express'
import { evaluationsController } from './evaluations.controller'
import { authMiddleware, requireType } from '../../shared/decorators/auth.decorator'

export const evaluationsRouter = Router()

evaluationsRouter.post('/', authMiddleware, requireType('empresa'), (req, res, next) => evaluationsController.create(req, res, next))
evaluationsRouter.get('/montador/:montadorId', (req, res, next) => evaluationsController.findByMontador(req, res, next))
