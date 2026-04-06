import { Router } from 'express'
import { usersController } from './users.controller'
import { authMiddleware } from '../../shared/decorators/auth.decorator'

export const usersRouter = Router()

usersRouter.get('/me', authMiddleware, (req, res, next) => usersController.getMe(req, res, next))
usersRouter.patch('/me', authMiddleware, (req, res, next) => usersController.updateMe(req, res, next))
usersRouter.patch('/me/montador', authMiddleware, (req, res, next) => usersController.updateMontadorProfile(req, res, next))
usersRouter.get('/montadores', (req, res, next) => usersController.searchMontadores(req, res, next))
usersRouter.get('/montadores/:id', (req, res, next) => usersController.getMontadorProfile(req, res, next))
usersRouter.get('/team', authMiddleware, (req, res, next) => usersController.getMyTeam(req, res, next))
usersRouter.post('/team/adicionar', authMiddleware, (req, res, next) => usersController.addToTeam(req, res, next))
usersRouter.delete('/team/remover/:montadorId', authMiddleware, (req, res, next) => usersController.removeFromTeam(req, res, next))
