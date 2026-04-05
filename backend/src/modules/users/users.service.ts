import { prismaClient } from '../../database/connection'
import { AppError } from '../../shared/filters/error.filter'
import type { UpdateProfileInput, UpdateMontadorInput } from './users.dto'

export class UsersService {
  async getMe(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      include: {
        montadorProfile: true,
        company: true,
      },
    })

    if (!user) {
      throw new AppError(404, 'NOT_FOUND', 'Usuário não encontrado')
    }

    return this.sanitizeUser(user)
  }

  async updateMe(userId: string, input: UpdateProfileInput) {
    const user = await prismaClient.user.update({
      where: { id: userId },
      data: {
        name: input.name,
        phone: input.phone,
      },
    })

    return this.sanitizeUser(user)
  }

  async updateMontadorProfile(userId: string, input: UpdateMontadorInput) {
    const profile = await prismaClient.montadorProfile.findUnique({
      where: { userId },
    })

    if (!profile) {
      throw new AppError(404, 'NOT_FOUND', 'Perfil de montador não encontrado')
    }

    const updated = await prismaClient.montadorProfile.update({
      where: { userId },
      data: {
        cpf: input.cpf,
        bio: input.bio,
        fotoPerfil: input.fotoPerfil,
        habilidades: input.habilidades,
        disponibilidade: input.disponibilidade,
      },
    })

    return updated
  }

  async getMontadorProfile(montadorId: string) {
    const profile = await prismaClient.montadorProfile.findUnique({
      where: { id: montadorId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        evaluations: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            service: {
              select: {
                titulo: true,
              },
            },
          },
        },
      },
    })

    if (!profile) {
      throw new AppError(404, 'NOT_FOUND', 'Perfil não encontrado')
    }

    return profile
  }

  async searchMontadores(filters: {
    habilidades?: string[]
    avaliacaoMinima?: number
    badge?: string
  }) {
    const where: any = {}

    if (filters.habilidades && filters.habilidades.length > 0) {
      where.habilidades = { hasSome: filters.habilidades }
    }

    if (filters.avaliacaoMinima) {
      where.avaliacaoMedia = { gte: filters.avaliacaoMinima }
    }

    if (filters.badge) {
      where.badge = filters.badge
    }

    const montadores = await prismaClient.montadorProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
      },
      orderBy: { avaliacaoMedia: 'desc' },
    })

    return montadores
  }

  private sanitizeUser(user: any) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      type: user.type,
      status: user.status,
      montadorProfile: user.montadorProfile,
      company: user.company,
    }
  }
}

export const usersService = new UsersService()
