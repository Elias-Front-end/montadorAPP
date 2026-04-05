export type UserType = 'montador' | 'empresa' | 'admin'
export type UserStatus = 'pending' | 'active' | 'inactive' | 'blocked'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  type: UserType
  status: UserStatus
  montadorProfile?: MontadorProfile
  company?: Company
}

export interface MontadorProfile {
  id: string
  userId: string
  cpf?: string
  bio?: string
  fotoPerfil?: string
  habilidades: string[]
  avaliacaoMedia: number
  totalAvaliacoes: number
  badge: 'none' | 'bronze' | 'prata' | 'ouro'
}

export interface Company {
  id: string
  userId: string
  cnpj?: string
  nomeFantasia?: string
  razaoSocial?: string
  fotoLogo?: string
  telefone?: string
}

export type ServiceStatus = 'pendente' | 'em_execucao' | 'finalizado' | 'cancelado'

export interface Service {
  id: string
  companyId: string
  titulo: string
  descricao?: string
  endereco?: {
    rua: string
    numero: string
    cidade: string
    estado: string
    cep: string
    complemento?: string
  }
  dataInicio?: Date
  dataFim?: Date
  prazo?: Date
  status: ServiceStatus
  valor?: number
  observacoes?: string
  company?: Company
  participants?: ServiceParticipant[]
  createdAt: Date
}

export interface ServiceParticipant {
  id: string
  serviceId: string
  montadorProfileId: string
  role: 'titular' | 'auxiliar'
  status: 'pendente' | 'aceito' | 'recusado'
  dataInicioExecucao?: Date
  dataFimExecucao?: Date
  montadorProfile?: MontadorProfile & { user: { name: string } }
}

export interface Evaluation {
  id: string
  serviceId: string
  montadorId: string
  companyId: string
  nota: number
  comentario?: string
  createdAt: Date
}

export interface Calendar {
  id: string
  montadorId: string
  serviceId?: string
  data: Date
  horaInicio?: string
  horaFim?: string
  tipo: 'agendamento' | 'disponivel' | 'feriado'
  titulo?: string
  descricao?: string
}

export interface Invite {
  id: string
  companyId: string
  montadorId: string
  tipo: 'servico' | 'time_fixo'
  serviceId?: string
  status: 'pendente' | 'aceito' | 'recusado'
  mensagem?: string
  createdAt: Date
  company?: Company & { user: { name: string } }
  service?: { titulo: string }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: {
    code: string
    message: string
  }
}
