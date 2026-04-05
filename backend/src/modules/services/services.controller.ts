import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { servicesService } from './services.service'
import { prismaClient } from '../../database/connection'
import { createServiceSchema, updateServiceSchema, inviteMontadorSchema } from './services.dto'

class ServicesController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = createServiceSchema.parse(req.body)
      const company = await prismaClient.company.findUnique({ where: { userId: req.user!.userId } })
      const service = await servicesService.create(company!.id, input)
      res.status(201).json({ success: true, data: service })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } })
      }
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await prismaClient.company.findUnique({ where: { userId: req.user!.userId } })
      const services = await servicesService.findAll(company!.id)
      res.json({ success: true, data: services })
    } catch (error) {
      next(error)
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await prismaClient.company.findUnique({ where: { userId: req.user!.userId } })
      const service = await servicesService.findOne(req.params.id, company!.id)
      res.json({ success: true, data: service })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = updateServiceSchema.parse(req.body)
      const company = await prismaClient.company.findUnique({ where: { userId: req.user!.userId } })
      const service = await servicesService.update(req.params.id, company!.id, input)
      res.json({ success: true, data: service })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } })
      }
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await prismaClient.company.findUnique({ where: { userId: req.user!.userId } })
      const result = await servicesService.delete(req.params.id, company!.id)
      res.json({ success: true, ...result })
    } catch (error) {
      next(error)
    }
  }

  async inviteMontador(req: Request, res: Response, next: NextFunction) {
    try {
      const input = inviteMontadorSchema.parse(req.body)
      const company = await prismaClient.company.findUnique({ where: { userId: req.user!.userId } })
      const invite = await servicesService.inviteMontador(req.params.id, company!.id, input)
      res.status(201).json({ success: true, data: invite })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: error.errors[0].message } })
      }
      next(error)
    }
  }

  async getMyInvites(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await prismaClient.montadorProfile.findUnique({ where: { userId: req.user!.userId } })
      const invites = await servicesService.getInvites(profile!.id)
      res.json({ success: true, data: invites })
    } catch (error) {
      next(error)
    }
  }

  async respondToInvite(req: Request, res: Response, next: NextFunction) {
    try {
      const { accept } = req.body
      const profile = await prismaClient.montadorProfile.findUnique({ where: { userId: req.user!.userId } })
      const result = await servicesService.respondToInvite(req.params.inviteId, profile!.id, accept)
      res.json({ success: true, data: result })
    } catch (error) {
      next(error)
    }
  }

  async startExecution(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await prismaClient.montadorProfile.findUnique({ where: { userId: req.user!.userId } })
      const result = await servicesService.startExecution(req.params.id, profile!.id)
      res.json({ success: true, data: result })
    } catch (error) {
      next(error)
    }
  }

  async completeService(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await prismaClient.montadorProfile.findUnique({ where: { userId: req.user!.userId } })
      const result = await servicesService.completeService(req.params.id, profile!.id)
      res.json({ success: true, ...result })
    } catch (error) {
      next(error)
    }
  }

  async getMyServices(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await prismaClient.montadorProfile.findUnique({ where: { userId: req.user!.userId } })
      const services = await servicesService.getMyServices(profile!.id)
      res.json({ success: true, data: services })
    } catch (error) {
      next(error)
    }
  }
}

export const servicesController = new ServicesController()
