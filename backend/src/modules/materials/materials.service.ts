import { prismaClient } from '../../database/connection'
import { AppError } from '../../shared/filters/error.filter'
import type { CreateMaterialInput, UpdateMaterialInput } from './materials.dto'

export class MaterialsService {
  async create(montadorId: string, input: CreateMaterialInput) {
    const service = await prismaClient.service.findUnique({
      where: { id: input.serviceId },
    })

    if (!service) {
      throw new AppError(404, 'NOT_FOUND', 'Serviço não encontrado')
    }

    const participant = await prismaClient.serviceParticipant.findFirst({
      where: {
        serviceId: input.serviceId,
        montadorProfileId: montadorId,
        status: 'aceito',
      },
    })

    if (!participant) {
      throw new AppError(403, 'FORBIDDEN', 'Você não é participante deste serviço')
    }

    const material = await prismaClient.materialRequest.create({
      data: {
        serviceId: input.serviceId,
        companyId: service.companyId,
        montadorId,
        tipo: input.tipo,
        descricao: input.descricao,
        fotoUrl: input.fotoUrl,
      },
    })

    return material
  }

  async findByService(serviceId: string, companyId: string) {
    const service = await prismaClient.service.findFirst({
      where: { id: serviceId, companyId },
    })

    if (!service) {
      throw new AppError(404, 'NOT_FOUND', 'Serviço não encontrado')
    }

    return prismaClient.materialRequest.findMany({
      where: { serviceId },
      include: {
        montadorProfile: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async updateStatus(materialId: string, companyId: string, status: string) {
    const material = await prismaClient.materialRequest.findFirst({
      where: { id: materialId, companyId },
    })

    if (!material) {
      throw new AppError(404, 'NOT_FOUND', 'Solicitação não encontrada')
    }

    return prismaClient.materialRequest.update({
      where: { id: materialId },
      data: { status },
    })
  }
}

export const materialsService = new MaterialsService()
