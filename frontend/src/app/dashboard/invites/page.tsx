'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

interface Invite {
  id: string
  tipo: string
  status: string
  mensagem: string
  createdAt: string
  company: { user: { name: string } }
  service?: { titulo: string }
}

export default function InvitesPage() {
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvites()
  }, [])

  const fetchInvites = async () => {
    try {
      const response = await api.get('/services/convites')
      setInvites(response.data.data)
    } catch (error) {
      console.error('Error fetching invites:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResponse = async (inviteId: string, accept: boolean) => {
    try {
      await api.post(`/services/convites/${inviteId}/responder`, { accept })
      fetchInvites()
      alert(accept ? 'Convite aceito!' : 'Convite recusado')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao responder convite')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Meus Convites</h1>

      {invites.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-500">Nenhum convite pendente</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invites.map((invite) => (
            <div key={invite.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {invite.tipo === 'servico' ? 'Serviço' : 'Time Fixo'}
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                      {invite.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {invite.company?.user?.name}
                  </h3>
                  {invite.service?.titulo && (
                    <p className="text-gray-600 text-sm">
                      Serviço: {invite.service.titulo}
                    </p>
                  )}
                  {invite.mensagem && (
                    <p className="text-gray-500 text-sm mt-2">{invite.mensagem}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-2">
                    Recebido em: {new Date(invite.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {invite.status === 'pendente' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleResponse(invite.id, true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Aceitar
                    </button>
                    <button
                      onClick={() => handleResponse(invite.id, false)}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                    >
                      Recusar
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
