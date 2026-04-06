import { prismaClient } from '../../database/connection'
import { AppError } from '../../shared/filters/error.filter'
import type { CreateServiceInput, UpdateServiceInput, InviteMontadorInput } from './services.dto'

export class ServicesService {
  async create(companyId: string, input: CreateServiceInput) {
    const service = await prismaClient.service.create({
      data: {
        companyId,
        titulo: input.titulo,
        descricao: input.descricao,
        endereco: input.endereco as any,
        dataInicio: input.dataInicio ? new Date(input.dataInicio) : undefined,
        dataFim: input.dataFim ? new Date(input.dataFim) : undefined,
        prazo: input.prazo ? new Date(input.prazo) : undefined,
        valor: input.valor,
        observacoes: input.observacoes,
      },
      include: {
        company: {
          select: {
            id: true,
            nomeFantasia: true,
          },
        },
      },
    })

    return service
  }

  async findAll(companyId: string) {
    return prismaClient.service.findMany({
      where: { companyId },
      include: {
        participants: {
          include: {
            montadorProfile: {
              include: {
                user: {
                  select: { name: true },
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
    })
  }

  async findOne(serviceId: string, companyId: string) {
    const service = await prismaClient.service.findFirst({
      where: { id: serviceId, companyId },
      include: {
        company: true,
        participants: {
          include: {
            montadorProfile: {
              include: {
                user: {
                  select: { id: true, name: true, phone: true },
                },
                evaluations: {
                  where: { serviceId },
                  take: 5,
                },
              },
            },
          },
        },
        evaluations: {
          include: {
            montadorProfile: {
              include: {
                user: { select: { name: true } },
              },
            },
          },
        },
        materialRequests: true,
      },
    })

    if (!service) {
      throw new AppError(404, 'NOT_FOUND', 'Serviço não encontrado')
    }

    return service
  }

  async update(serviceId: string, companyId: string, input: UpdateServiceInput) {
    const service = await prismaClient.service.findFirst({
      where: { id: serviceId, companyId },
    })

    if (!service) {
      throw new AppError(404, 'NOT_FOUND', 'Serviço não encontrado')
    }

    if (service.status === 'finalizado' || service.status === 'cancelado') {
      throw new AppError(400, 'INVALID_STATUS', 'Não é possível editar serviço finalizado ou cancelado')
    }

    const updated = await prismaClient.service.update({
      where: { id: serviceId },
      data: {
        titulo: input.titulo,
        descricao: input.descricao,
        endereco: input.endereco as any,
        dataInicio: input.dataInicio ? new Date(input.dataInicio) : undefined,
        dataFim: input.dataFim ? new Date(input.dataFim) : undefined,
        prazo: input.prazo ? new Date(input.prazo) : undefined,
        valor: input.valor,
        observacoes: input.observacoes,
        status: input.status,
      },
    })

    return updated
  }

  async delete(serviceId: string, companyId: string) {
    const service = await prismaClient.service.findFirst({
      where: { id: serviceId, companyId },
    })

    if (!service) {
      throw new AppError(404, 'NOT_FOUND', 'Serviço não encontrado')
    }

    if (service.status !== 'pendente') {
      throw new AppError(400, 'INVALID_STATUS', 'Apenas serviços pendentes podem ser deletados')
    }

    await prismaClient.service.delete({ where: { id: serviceId } })

    return { message: 'Serviço deletado com sucesso' }
  }

  async inviteMontador(serviceId: string, companyId: string, input: InviteMontadorInput) {
    const service = await prismaClient.service.findFirst({
      where: { id: serviceId, companyId },
    })

    if (!service) {
      throw new AppError(404, 'NOT_FOUND', 'Serviço não encontrado')
    }

    const existingInvite = await prismaClient.invite.findFirst({
      where: {
        companyId,
        montadorId: input.montadorProfileId,
        serviceId,
        status: 'pendente',
      },
    })

    if (existingInvite) {
      throw new AppError(400, 'DUPLICATE_INVITE', 'Convite já enviado para este montador')
    }

    if (service.dataInicio && service.dataFim) {
      const conflictingServices = await prismaClient.serviceParticipant.count({
        where: {
          montadorProfileId: input.montadorProfileId,
          status: 'aceito',
          service: {
            OR: [
              {
                dataInicio: { lte: service.dataFim },
                dataFim: { gte: service.dataInicio },
              },
            ],
          },
        },
      })

      if (conflictingServices > 0) {
        throw new AppError(409, 'SCHEDULE_CONFLICT', 'O montador já possui um serviço agendado neste período')
      }
    }

    const invite = await prismaClient.invite.create({
      data: {
        companyId,
        montadorId: input.montadorProfileId,
        tipo: input.tipo,
        serviceId: input.tipo === 'servico' ? serviceId : null,
        mensagem: input.mensagem,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    return invite
  }

    const existingInvite = await prismaClient.invite.findFirst({
      where: {
        companyId,
        montadorId: input.montadorProfileId,
        serviceId,
        status: 'pendente',
      },
    })

    if (existingInvite) {
      throw new AppError(400, 'DUPLICATE_INVITE', 'Convite já enviado para este montador')
    }

    if (service.dataInicio && service.dataFim) {
      const conflictingServices = await prismaClient.serviceParticipant.count({
        where: {
          montadorProfileId: input.montadorProfileId,
          status: 'aceito',
          service: {
            OR: [
              {
                dataInicio: { lte: service.dataFim },
                dataFim: { gte: service.dataInicio },
              },
            ],
          },
        },
      })

      if (conflictingServices > 0) {
        throw new AppError(409, 'SCHEDULE_CONFLICT', 'O montador já possui um serviço agendado neste período')
      }
    }

    const invite = await prismaClient.invite.create({
      data: {
        companyId,
        montadorId: input.montadorProfileId,
        tipo: input.tipo,
        serviceId: input.tipo === 'servico' ? serviceId : null,
        mensagem: input.mensagem,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    return invite
  }

  async getInvites(montadorId: string) {
    const invites = await prismaClient.invite.findMany({
      where: {
        montadorId,
        status: 'pendente',
      },
      include: {
        company: {
          include: { user: { select: { name: true } } },
        },
        service: { select: { titulo: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return invites
  }

  async respondToInvite(inviteId: string, montadorId: string, accept: boolean) {
    const invite = await prismaClient.invite.findFirst({
      where: { id: inviteId, montadorId },
      include: { service: true },
    })

    if (!invite) {
      throw new AppError(404, 'NOT_FOUND', 'Convite não encontrado')
    }

    if (invite.status !== 'pendente') {
      throw new AppError(400, 'INVALID_STATUS', 'Convite já respondedo')
    }

    if (accept && invite.service) {
      const { dataInicio, dataFim } = invite.service

      if (dataInicio && dataFim) {
        const conflictingServices = await prismaClient.serviceParticipant.count({
          where: {
            montadorProfileId: montadorId,
            status: 'aceito',
            service: {
              id: { not: invite.serviceId! },
              OR: [
                {
                  dataInicio: { lte: dataFim },
                  dataFim: { gte: dataInicio },
                },
              ],
            },
          },
        })

        if (conflictingServices > 0) {
          throw new AppError(409, 'SCHEDULE_CONFLICT', 'Você já possui um serviço agendado neste período')
        }
      }
    }

    const updated = await prismaClient.invite.update({
      where: { id: inviteId },
      data: { status: accept ? 'aceito' : 'recusado' },
    })

    if (accept && invite.serviceId) {
      await prismaClient.serviceParticipant.create({
        data: {
          serviceId: invite.serviceId,
          montadorProfileId: montadorId,
          role: 'titular',
          status: 'aceito',
        },
      })
    }

    return updated
  }

    if (invite.status !== 'pendente') {
      throw new AppError(400, 'INVALID_STATUS', 'Convite já respondedo')
    }

    if (accept && invite.service) {
      const { dataInicio, dataFim } = invite.service

      if (dataInicio && dataFim) {
        const conflictingServices = await prismaClient.serviceParticipant.count({
          where: {
            montadorProfileId: montadorId,
            status: 'aceito',
            service: {
              id: { not: invite.serviceId! },
              OR: [
                {
                  dataInicio: { lte: dataFim },
                  dataFim: { gte: dataInicio },
                },
              ],
            },
          },
        })

        if (conflictingServices > 0) {
          throw new AppError(409, 'SCHEDULE_CONFLICT', 'Você já possui um serviço agendado neste período')
        }
      }
    }

    const updated = await prismaClient.invite.update({
      where: { id: inviteId },
      data: { status: accept ? 'aceito' : 'recusado' },
    })

    if (accept && invite.serviceId) {
      await prismaClient.serviceParticipant.create({
        data: {
          serviceId: invite.serviceId,
          montadorProfileId: montadorId,
          role: 'titular',
          status: 'aceito',
        },
      })
    }

    return updated
  }

  async startExecution(serviceId: string, montadorId: string) {
    const participant = await prismaClient.serviceParticipant.findFirst({
      where: {
        serviceId,
        montadorProfileId: montadorId,
        status: 'aceito',
      },
    })

    if (!participant) {
      throw new AppError(403, 'NOT_PARTICIPANT', 'Você não é participante deste serviço')
    }

    const updated = await prismaClient.serviceParticipant.update({
      where: { id: participant.id },
      data: {
        dataInicioExecucao: new Date(),
      },
    })

    await prismaClient.service.update({
      where: { id: serviceId },
      data: { status: 'em_execucao' },
    })

    return updated
  }

  async completeService(serviceId: string, montadorId: string) {
    const participant = await prismaClient.serviceParticipant.findFirst({
      where: {
        serviceId,
        montadorProfileId: montadorId,
        status: 'aceito',
      },
    })

    if (!participant) {
      throw new AppError(403, 'NOT_PARTICIPANT', 'Você não é participante deste serviço')
    }

    await prismaClient.serviceParticipant.update({
      where: { id: participant.id },
      data: { dataFimExecucao: new Date() },
    })

    const hasOtherParticipants = await prismaClient.serviceParticipant.findFirst({
      where: {
        serviceId,
        id: { not: participant.id },
        dataFimExecucao: null,
      },
    })

    if (!hasOtherParticipants) {
      await prismaClient.service.update({
        where: { id: serviceId },
        data: { status: 'finalizado' },
      })
    }

    return { message: 'Serviço marcado para finalização' }
  }

  async getMyServices(montadorId: string) {
    const participations = await prismaClient.serviceParticipant.findMany({
      where: { montadorProfileId: montadorId },
      include: {
        service: {
          include: {
            company: {
              include: { user: { select: { name: true } } },
            },
            _count: { select: { evaluations: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return participations
  }
}

export const servicesService = new ServicesService()
