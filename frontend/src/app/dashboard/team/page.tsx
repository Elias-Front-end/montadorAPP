'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

interface Montador {
  id: string
  user: { name: string; email: string; phone: string }
  avaliacaoMedia: number
  totalAvaliacoes: number
  badge: string
  habilidades: string[]
}

export default function TeamPage() {
  const [team, setTeam] = useState<Montador[]>([])
  const [available, setAvailable] = useState<Montador[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [teamRes, availableRes] = await Promise.all([
        api.get('/users/team'),
        api.get('/users/montadores'),
      ])
      setTeam(teamRes.data.data)
      setAvailable(availableRes.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!selectedId) return
    try {
      await api.post('/users/team/adicionar', { montadorId: selectedId })
      setShowAdd(false)
      setSelectedId('')
      fetchData()
      alert('Montador adicionado ao time!')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao adicionar')
    }
  }

  const handleRemove = async (id: string) => {
    if (!confirm('Remover do time?')) return
    try {
      await api.delete(`/users/team/remover/${id}`)
      fetchData()
      alert('Montador removido do time')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao remover')
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meu Time Fixo</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Adicionar Montador
        </button>
      </div>

      {team.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-500 mb-4">Nenhum montador no time fixo</p>
          <p className="text-gray-400 text-sm">Adicione montadores de confiança para trabalhar sempre com você</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {team.map((montador) => (
            <div key={montador.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{montador.user.name}</h3>
                  <p className="text-sm text-gray-500">{montador.user.email}</p>
                  {montador.user.phone && (
                    <p className="text-sm text-gray-500">{montador.user.phone}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">{montador.avaliacaoMedia?.toFixed(1) || '0.0'}</span>
                    <span className="text-gray-400 text-xs">({montador.totalAvaliacoes} avaliações)</span>
                  </div>
                  {montador.habilidades && montador.habilidades.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {montador.habilidades.slice(0, 3).map((h) => (
                        <span key={h} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(montador.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Adicionar ao Time</h3>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            >
              <option value="">Selecione um montador</option>
              {available
                .filter((m) => !team.find((t) => t.id === m.id))
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.user.name} - ★ {m.avaliacaoMedia?.toFixed(1)}
                  </option>
                ))}
            </select>
            <div className="flex gap-4">
              <button onClick={handleAdd} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                Adicionar
              </button>
              <button onClick={() => setShowAdd(false)} className="flex-1 border py-2 rounded-lg">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
