import { Router } from 'express'
import { adminController } from './admin.controller'
import { authMiddleware, requireType } from '../../shared/decorators/auth.decorator'

export const adminRouter = Router()

adminRouter.use(authMiddleware)
adminRouter.use(requireType('admin'))

adminRouter.get('/users', (req, res, next) => adminController.getUsers(req, res, next))
adminRouter.get('/services', (req, res, next) => adminController.getServices(req, res, next))
adminRouter.get('/stats', (req, res, next) => adminController.getStats(req, res, next))
adminRouter.post('/services/:id/intervir', (req, res, next) => adminController.interveneService(req, res, next))
adminRouter.post('/users/:id/bloquear', (req, res, next) => adminController.blockUser(req, res, next))