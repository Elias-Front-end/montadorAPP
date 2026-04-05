import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { evaluationsService } from './evaluations.service'
import { prismaClient } from '../../database/connection'
import { createEvaluationSchema } from './evaluations.dto'

export class EvaluationsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = createEvaluationSchema.parse(req.body)
      const company = await prismaClient.company.findUnique({ where: { userId: req.user!.userId } })
      const evaluation = await evaluationsService.create(company!.id, input)
      res.status(201).json({ success: true, data: evaluation })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } })
      }
      next(error)
    }
  }

  async findByMontador(req: Request, res: Response, next: NextFunction) {
    try {
      const evaluations = await evaluationsService.findByMontador(req.params.montadorId)
      res.json({ success: true, data: evaluations })
    } catch (error) {
      next(error)
    }
  }
}

export const evaluationsController = new EvaluationsController()
