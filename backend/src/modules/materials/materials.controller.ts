import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { materialsService } from './materials.service'
import { prismaClient } from '../../database/connection'
import { createMaterialSchema } from './materials.dto'

export class MaterialsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = createMaterialSchema.parse(req.body)
      const profile = await prismaClient.montadorProfile.findUnique({ where: { userId: req.user!.userId } })
      const material = await materialsService.create(profile!.id, input)
      res.status(201).json({ success: true, data: material })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } })
      }
      next(error)
    }
  }

  async findByService(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await prismaClient.company.findUnique({ where: { userId: req.user!.userId } })
      const materials = await materialsService.findByService(req.params.serviceId, company!.id)
      res.json({ success: true, data: materials })
    } catch (error) {
      next(error)
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body
      const company = await prismaClient.company.findUnique({ where: { userId: req.user!.userId } })
      const material = await materialsService.updateStatus(req.params.id, company!.id, status)
      res.json({ success: true, data: material })
    } catch (error) {
      next(error)
    }
  }
}

export const materialsController = new MaterialsController()
