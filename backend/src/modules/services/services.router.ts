import { Router } from 'express'
import { servicesController } from './services.controller'
import { authMiddleware, requireType } from '../../shared/decorators/auth.decorator'

export const servicesRouter = Router()

servicesRouter.post('/', authMiddleware, requireType('empresa'), (req, res, next) => servicesController.create(req, res, next))
servicesRouter.get('/', authMiddleware, requireType('empresa'), (req, res, next) => servicesController.findAll(req, res, next))
servicesRouter.get('/meus-servicos', authMiddleware, requireType('montador'), (req, res, next) => servicesController.getMyServices(req, res, next))
servicesRouter.get('/convites', authMiddleware, requireType('montador'), (req, res, next) => servicesController.getMyInvites(req, res, next))
servicesRouter.post('/convites/:inviteId/responder', authMiddleware, requireType('montador'), (req, res, next) => servicesController.respondToInvite(req, res, next))
servicesRouter.get('/:id', authMiddleware, (req, res, next) => servicesController.findOne(req, res, next))
servicesRouter.patch('/:id', authMiddleware, requireType('empresa'), (req, res, next) => servicesController.update(req, res, next))
servicesRouter.delete('/:id', authMiddleware, requireType('empresa'), (req, res, next) => servicesController.delete(req, res, next))
servicesRouter.post('/:id/convidar', authMiddleware, requireType('empresa'), (req, res, next) => servicesController.inviteMontador(req, res, next))
servicesRouter.post('/:id/iniciar', authMiddleware, requireType('montador'), (req, res, next) => servicesController.startExecution(req, res, next))
servicesRouter.post('/:id/finalizar', authMiddleware, requireType('montador'), (req, res, next) => servicesController.completeService(req, res, next))
