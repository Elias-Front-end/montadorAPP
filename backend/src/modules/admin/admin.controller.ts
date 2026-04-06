import { Request, Response, NextFunction } from 'express'
import { adminService } from './admin.service'
import { authMiddleware, requireType } from '../../shared/decorators/auth.decorator'

export class AdminController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 20
      const result = await adminService.getAllUsers(page, limit)
      res.json({ success: true, data: result })
    } catch (error) {
      next(error)
    }
  }

  async getServices(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 20
      const result = await adminService.getAllServices(page, limit)
      res.json({ success: true, data: result })
    } catch (error) {
      next(error)
    }
  }

  async interveneService(req: Request, res: Response, next: NextFunction) {
    try {
      const { action } = req.body
      const result = await adminService.interveneService(req.params.id, action)
      res.json({ success: true, data: result })
    } catch (error) {
      next(error)
    }
  }

  async blockUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { reason } = req.body
      const result = await adminService.blockUser(req.params.id, reason)
      res.json({ success: true, data: result })
    } catch (error) {
      next(error)
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await adminService.getDashboardStats()
      res.json({ success: true, data: stats })
    } catch (error) {
      next(error)
    }
  }
}

export const adminController = new AdminController()