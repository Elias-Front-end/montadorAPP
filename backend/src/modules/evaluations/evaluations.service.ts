import { prismaClient } from '../../database/connection'
import { AppError } from '../../shared/filters/error.filter'
import type { CreateEvaluationInput } from './evaluations.dto'

export class EvaluationsService {
  async create(companyId: string, input: CreateEvaluationInput) {
    const service = await prismaClient.service.findUnique({
      where: { id: input.serviceId },
    })

    if (!service) {
      throw new AppError(404, 'NOT_FOUND', 'Serviço não encontrado')
    }

    if (service.companyId !== companyId) {
      throw new AppError(403, 'FORBIDDEN', 'Não autorizado a avaliar este serviço')
    }

    if (service.status !== 'finalizado') {
      throw new AppError(400, 'INVALID_STATUS', 'Só é possível avaliar serviços finalizados')
    }

    const existingEvaluation = await prismaClient.evaluation.findUnique({
      where: {
        serviceId_montadorId: {
          serviceId: input.serviceId,
          montadorId: input.montadorId,
        },
      },
    })

    if (existingEvaluation) {
      throw new AppError(400, 'DUPLICATE_EVALUATION', 'Já avaliou este montador neste serviço')
    }

    const evaluation = await prismaClient.evaluation.create({
      data: {
        serviceId: input.serviceId,
        montadorId: input.montadorId,
        companyId,
        nota: input.nota,
        comentario: input.comentario,
      },
    })

    await this.updateMontadorScore(input.montadorId)

    return evaluation
  }

  async findByMontador(montadorId: string) {
    return prismaClient.evaluation.findMany({
      where: { montadorId },
      include: {
        service: { select: { titulo: true } },
        company: { select: { nomeFantasia: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  private async updateMontadorScore(montadorId: string) {
    const stats = await prismaClient.evaluation.aggregate({
      where: { montadorId },
      _avg: { nota: true },
      _count: { id: true },
    })

    const avaliacaoMedia = stats._avg.nota || 0
    const totalAvaliacoes = stats._count.id

    let badge: 'none' | 'bronze' | 'prata' | 'ouro' = 'none'
    if (avaliacaoMedia >= 4.5) {
      badge = 'ouro'
    } else if (avaliacaoMedia >= 4.0) {
      badge = 'prata'
    } else if (avaliacaoMedia >= 3.0) {
      badge = 'bronze'
    }

    await prismaClient.montadorProfile.update({
      where: { id: montadorId },
      data: {
        avaliacaoMedia,
        totalAvaliacoes,
        badge,
      },
    })
  }
}

export const evaluationsService = new EvaluationsService()
