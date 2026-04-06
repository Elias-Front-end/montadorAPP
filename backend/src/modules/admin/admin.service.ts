import { prismaClient } from '../../database/connection'
import { AppError } from '../../shared/filters/error.filter'

export class AdminService {
  async getAllUsers(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit
    const [users, total] = await Promise.all([
      prismaClient.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          type: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prismaClient.user.count(),
    ])

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  async getAllServices(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit
    const [services, total] = await Promise.all([
      prismaClient.service.findMany({
        skip,
        take: limit,
        include: {
          company: {
            include: {
              user: {
                select: { name: true, email: true },
              },
            },
          },
          participants: {
            include: {
              montadorProfile: {
                include: {
                  user: {
                    select: { name: true, email: true },
                  },
                },
              },
            },
          },
          _count: {
            select: { evaluations: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prismaClient.service.count(),
    ])

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  async interveneService(serviceId: string, action: 'cancel' | 'force_complete') {
    const service = await prismaClient.service.findUnique({
      where: { id: serviceId },
    })

    if (!service) {
      throw new AppError(404, 'NOT_FOUND', 'Serviço não encontrado')
    }

    const newStatus = action === 'cancel' ? 'cancelado' : 'finalizado'

    const updated = await prismaClient.service.update({
      where: { id: serviceId },
      data: { status: newStatus },
    })

    return updated
  }

  async blockUser(userId: string, reason: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError(404, 'NOT_FOUND', 'Usuário não encontrado')
    }

    const updated = await prismaClient.user.update({
      where: { id: userId },
      data: { status: 'blocked' },
    })

    await prismaClient.adminLog.create({
      data: {
        action: 'block_user',
        targetId: userId,
        targetType: 'user',
        reason,
        adminId: 'system',
      },
    })

    return updated
  }

  async getDashboardStats() {
    const [
      totalUsers,
      totalServices,
      totalEvaluations,
      activeMontadores,
      activeCompanies,
    ] = await Promise.all([
      prismaClient.user.count(),
      prismaClient.service.count(),
      prismaClient.evaluation.count(),
      prismaClient.montadorProfile.count({ where: { user: { status: 'active' } } }),
      prismaClient.company.count({ where: { user: { status: 'active' } } }),
    ])

    const avgRating = await prismaClient.evaluation.aggregate({
      _avg: { nota: true },
    })

    return {
      totalUsers,
      totalServices,
      totalEvaluations,
      activeMontadores,
      activeCompanies,
      avgRating: avgRating._avg.nota || 0,
    }
  }
}

export const adminService = new AdminService()