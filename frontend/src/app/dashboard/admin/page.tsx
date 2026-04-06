'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [stats, setStats] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'services'>('stats')

  useEffect(() => {
    if (user?.type !== 'admin') {
      router.push('/dashboard')
    }
  }, [user])

  useEffect(() => {
    if (user?.type === 'admin') {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, servicesRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users?limit=10'),
        api.get('/admin/services?limit=10'),
      ])
      setStats(statsRes.data.data)
      setUsers(usersRes.data.data.users)
      setServices(servicesRes.data.data.services)
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBlockUser = async (userId: string) => {
    const reason = prompt('Motivo do bloqueio:')
    if (!reason) return
    try {
      await api.post(`/admin/users/${userId}/bloquear`, { reason })
      fetchData()
      alert('Usuário bloqueado!')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao bloquear')
    }
  }

  const handleIntervene = async (serviceId: string, action: 'cancel' | 'force_complete') => {
    if (!confirm(`Tem certeza que deseja ${action === 'cancel' ? 'cancelar' : 'forçar conclusão'}?`)) return
    try {
      await api.post(`/admin/services/${serviceId}/intervir`, { action })
      fetchData()
      alert('Ação realizada!')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao intervir')
    }
  }

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Painel Administrativo</h1>

      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 font-medium ${activeTab === 'stats' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Estatísticas
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Usuários
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 font-medium ${activeTab === 'services' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Serviços
        </button>
      </div>

      {activeTab === 'stats' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600">Total de Usuários</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600">Montadores Ativos</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.activeMontadores}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600">Empresas Ativas</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.activeCompanies}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600">Total de Serviços</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalServices}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600">Avaliações</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.totalEvaluations}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600">Nota Média</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{stats.avgRating.toFixed(1)}</p>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-4">
          {users.map((u) => (
            <div key={u.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{u.name}</h3>
                  <p className="text-sm text-gray-500">{u.email}</p>
                  <span className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                    u.type === 'admin' ? 'bg-purple-100 text-purple-700' :
                    u.type === 'empresa' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {u.type}
                  </span>
                  <span className={`inline-block ml-2 px-2 py-1 rounded text-xs ${
                    u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {u.status}
                  </span>
                </div>
                {u.status === 'active' && u.type !== 'admin' && (
                  <button
                    onClick={() => handleBlockUser(u.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Bloquear
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-4">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{s.titulo}</h3>
                  <p className="text-sm text-gray-500">
                    Empresa: {s.company.user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {s.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Participantes: {s.participants.length}
                  </p>
                </div>
                {s.status !== 'finalizado' && s.status !== 'cancelado' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleIntervene(s.id, 'cancel')}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleIntervene(s.id, 'force_complete')}
                      className="text-green-500 hover:text-green-700 text-sm"
                    >
                      Forçar Conclusão
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
