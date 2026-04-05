'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'
import Link from 'next/link'

interface DashboardStats {
  totalServices: number
  pendingServices: number
  inProgressServices: number
  completedServices: number
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState<DashboardStats>({
    totalServices: 0,
    pendingServices: 0,
    inProgressServices: 0,
    completedServices: 0,
  })

  useEffect(() => {
    if (user?.type === 'empresa') {
      fetchCompanyStats()
    } else if (user?.type === 'montador') {
      fetchMontadorStats()
    }
  }, [user])

  const fetchCompanyStats = async () => {
    try {
      const response = await api.get('/services')
      const services = response.data.data
      
      setStats({
        totalServices: services.length,
        pendingServices: services.filter((s: any) => s.status === 'pendente').length,
        inProgressServices: services.filter((s: any) => s.status === 'em_execucao').length,
        completedServices: services.filter((s: any) => s.status === 'finalizado').length,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchMontadorStats = async () => {
    try {
      const response = await api.get('/services/meus-servicos')
      const services = response.data.data
      
      setStats({
        totalServices: services.length,
        pendingServices: services.filter((s: any) => s.service.status === 'pendente').length,
        inProgressServices: services.filter((s: any) => s.service.status === 'em_execucao').length,
        completedServices: services.filter((s: any) => s.service.status === 'finalizado').length,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const isMontador = user?.type === 'montador'
  const isEmpresa = user?.type === 'empresa'

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
         Olá, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          {isMontador && 'Gerencie seus serviços e agenda'}
          {isEmpresa && 'Gerencie seus serviços e montadores'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">Total de Serviços</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalServices}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">Pendentes</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingServices}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">Em Execução</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.inProgressServices}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">Finalizados</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.completedServices}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Ações Rápidas</h2>
          </div>
          <div className="space-y-3">
            {isEmpresa && (
              <Link
                href="/dashboard/services/new"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Criar Novo Serviço
              </Link>
            )}
            <Link
              href="/dashboard/services"
              className="block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
            >
              Ver Todos os Serviços
            </Link>
            {isMontador && (
              <Link
                href="/dashboard/calendar"
                className="block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
              >
                Gerenciar Agenda
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Meu Perfil</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Tipo:</span>{' '}
              {isMontador ? 'Montador' : 'Empresa'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            {user?.phone && (
              <p className="text-gray-600">
                <span className="font-medium">Telefone:</span> {user.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
