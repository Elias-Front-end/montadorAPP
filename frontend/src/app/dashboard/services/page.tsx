'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useAuthStore } from '@/lib/auth-store'
import Link from 'next/link'

interface Service {
  id: string
  titulo: string
  descricao: string
  status: 'pendente' | 'em_execucao' | 'finalizado' | 'cancelado'
  prazo: string
  valor: number
  createdAt: string
  participants: any[]
}

const statusColors = {
  pendente: 'bg-yellow-100 text-yellow-800',
  em_execucao: 'bg-blue-100 text-blue-800',
  finalizado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
}

export default function ServicesPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await api.get('/services')
      setServices(response.data.data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const isMontador = user?.type === 'montador'
  const isEmpresa = user?.type === 'empresa'

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEmpresa ? 'Meus Serviços' : 'Meus Serviços'}
        </h1>
        {isEmpresa && (
          <Link
            href="/dashboard/services/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Novo Serviço
          </Link>
        )}
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-500 mb-4">Nenhum serviço encontrado</p>
          {isEmpresa && (
            <Link
              href="/dashboard/services/new"
              className="text-blue-600 hover:underline"
            >
              Criar primeiro serviço
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.titulo}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[service.status]}`}>
                      {service.status === 'pendente' && 'Pendente'}
                      {service.status === 'em_execucao' && 'Em Execução'}
                      {service.status === 'finalizado' && 'Finalizado'}
                      {service.status === 'cancelado' && 'Cancelado'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {service.descricao || 'Sem descrição'}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {service.prazo && (
                      <span>Prazo: {new Date(service.prazo).toLocaleDateString('pt-BR')}</span>
                    )}
                    {service.valor && (
                      <span>R$ {service.valor.toFixed(2)}</span>
                    )}
                    {service.participants && service.participants.length > 0 && (
                      <span>{service.participants.length} participante(s)</span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/dashboard/services/${service.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
