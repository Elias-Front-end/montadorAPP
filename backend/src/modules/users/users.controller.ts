import { Request, Response, NextFunction } from 'express'
import { usersService } from './users.service'
import { authMiddleware } from '../../shared/decorators/auth.decorator'
import { updateMontadorSchema } from './users.dto'
import { z } from 'zod'

export class UsersController {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.getMe(req.user!.userId)
      res.json({ success: true, data: user })
    } catch (error) {
      next(error)
    }
  }

  async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.updateMe(req.user!.userId, req.body)
      res.json({ success: true, data: user })
    } catch (error) {
      next(error)
    }
  }

  async updateMontadorProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const input = updateMontadorSchema.parse(req.body)
      const profile = await usersService.updateMontadorProfile(req.user!.userId, input)
      res.json({ success: true, data: profile })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: error.errors[0].message },
        })
      }
      next(error)
    }
  }

  async getMontadorProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await usersService.getMontadorProfile(req.params.id)
      res.json({ success: true, data: profile })
    } catch (error) {
      next(error)
    }
  }

  async searchMontadores(req: Request, res: Response, next: NextFunction) {
    try {
      const { habilidades, avaliacaoMinima, badge } = req.query
      const montadores = await usersService.searchMontadores({
        habilidades: habilidades ? (habilidades as string).split(',') : undefined,
        avaliacaoMinima: avaliacaoMinima ? Number(avaliacaoMinima) : undefined,
        badge: badge as string,
      })
      res.json({ success: true, data: montadores })
    } catch (error) {
      next(error)
    }
  }
}

export const usersController = new UsersController()
