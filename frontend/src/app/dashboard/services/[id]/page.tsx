'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import api from '@/lib/api'
import { useAuthStore } from '@/lib/auth-store'

interface Service {
  id: string
  titulo: string
  descricao: string
  status: string
  prazo: string
  valor: number
  observacoes: string
  endereco: any
  createdAt: string
  company: { id: string; nomeFantasia: string }
  participants: any[]
  evaluations: any[]
  materialRequests: any[]
}

const statusLabels = {
  pendente: 'Pendente',
  em_execucao: 'Em Execução',
  finalizado: 'Finalizado',
  cancelado: 'Cancelado',
}

const statusColors = {
  pendente: 'bg-yellow-100 text-yellow-800',
  em_execucao: 'bg-blue-100 text-blue-800',
  finalized: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
}

export default function ServiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuthStore()
  
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [showInvite, setShowInvite] = useState(false)
  const [montadores, setMontadores] = useState<any[]>([])
  const [selectedMontador, setSelectedMontador] = useState('')
  const [showEvaluate, setShowEvaluate] = useState(false)
  const [evaluation, setEvaluation] = useState({ nota: 5, comentario: '' })
  const [showMaterial, setShowMaterial] = useState(false)
  const [material, setMaterial] = useState({ tipo: 'material', descricao: '' })
  const [showEdit, setShowEdit] = useState(false)
  const [editData, setEditData] = useState({
    titulo: '',
    descricao: '',
    valor: '',
    prazo: '',
    observacoes: '',
  })
  const [showEdit, setShowEdit] = useState(false)
  const [editData, setEditData] = useState({
    titulo: '',
    descricao: '',
    valor: '',
    prazo: '',
    observacoes: '',
  })

  useEffect(() => {
    fetchService()
  }, [])

  const fetchService = async () => {
    try {
      const response = await api.get(`/services/${params.id}`)
      setService(response.data.data)
    } catch (error) {
      console.error('Error fetching service:', error)
      router.push('/dashboard/services')
    } finally {
      setLoading(false)
    }
  }

  const fetchMontadores = async () => {
    try {
      const response = await api.get('/users/montadores')
      setMontadores(response.data.data)
    } catch (error) {
      console.error('Error fetching montadores:', error)
    }
  }

  const handleInvite = async () => {
    if (!selectedMontador) return
    try {
      await api.post(`/services/${params.id}/convidar`, {
        montadorProfileId: selectedMontador,
      })
      setShowInvite(false)
      fetchService()
      alert('Convite enviado!')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao enviar convite')
    }
  }

  const handleStartExecution = async () => {
    try {
      await api.post(`/services/${params.id}/iniciar`)
      fetchService()
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao iniciar')
    }
  }

  const handleComplete = async () => {
    try {
      await api.post(`/services/${params.id}/finalizar`)
      fetchService()
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao finalizar')
    }
  }

  const handleEvaluate = async () => {
    if (!service) return
    try {
      const participantId = service.participants[0]?.montadorProfileId
      await api.post('/evaluations', {
        serviceId: service.id,
        montadorId: participantId,
        nota: evaluation.nota,
        comentario: evaluation.comentario,
      })
      setShowEvaluate(false)
      fetchService()
      alert('Avaliação enviada!')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao avaliar')
    }
  }

  const handleRequestMaterial = async () => {
    if (!material.descricao) return
    try {
      await api.post('/materials', {
        serviceId: service?.id,
        tipo: material.tipo,
        descricao: material.descricao,
      })
      setShowMaterial(false)
      setMaterial({ tipo: 'material', descricao: '' })
      fetchService()
      alert('Solicitação enviada!')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao solicitar')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return
    try {
      await api.delete(`/services/${params.id}`)
      router.push('/dashboard/services')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao excluir serviço')
    }
  }

  const handleEdit = async () => {
    try {
      await api.patch(`/services/${params.id}`, {
        ...editData,
        valor: editData.valor ? Number(editData.valor) : undefined,
      })
      setShowEdit(false)
      fetchService()
      alert('Serviço atualizado!')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao atualizar serviço')
    }
  }

  const openEditModal = () => {
    if (!service) return
    setEditData({
      titulo: service.titulo,
      descricao: service.descricao || '',
      valor: service.valor?.toString() || '',
      prazo: service.prazo ? service.prazo.slice(0, 16) : '',
      observacoes: service.observacoes || '',
    })
    setShowEdit(true)
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return
    try {
      await api.delete(`/services/${params.id}`)
      router.push('/dashboard/services')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao excluir serviço')
    }
  }
  }

  const openEditModal = () => {
    if (!service) return
    setEditData({
      titulo: service.titulo,
      descricao: service.descricao || '',
      valor: service.valor?.toString() || '',
      prazo: service.prazo ? service.prazo.slice(0, 16) : '',
      observacoes: service.observacoes || '',
    })
    setShowEdit(true)
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return
    try {
      await api.delete(`/services/${params.id}`)
      router.push('/dashboard/services')
    } catch (error: any) {
      alert(error.response?.data?.error?.message || 'Erro ao excluir serviço')
    }
  }

  const openEditModal = () => {
    if (!service) return
    setEditData({
      titulo: service.titulo,
      descricao: service.descricao || '',
      valor: service.valor?.toString() || '',
      prazo: service.prazo ? service.prazo.slice(0, 16) : '',
      observacoes: service.observacoes || '',
    })
    setShowEdit(true)
  }

  const isMontador = user?.type === 'montador'
  const isEmpresa = user?.type === 'empresa'

  if (loading || !service) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900 mb-4">
        ← Voltar
      </button>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{service.titulo}</h1>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[service.status as keyof typeof statusColors]}`}>
              {statusLabels[service.status as keyof typeof statusLabels]}
            </span>
          </div>
          {isEmpresa && service.status === 'pendente' && (
            <div className="flex gap-2">
              <button
                onClick={openEditModal}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200"
              >
                Excluir
              </button>
              <button
                onClick={() => { setShowInvite(true); fetchMontadores() }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Convidar Montador
              </button>
            </div>
          )}
        </div>

        {service.descricao && (
          <p className="text-gray-600 mb-4">{service.descricao}</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {service.prazo && (
            <div>
              <p className="text-gray-500">Prazo</p>
              <p className="font-medium">{new Date(service.prazo).toLocaleString('pt-BR')}</p>
            </div>
          )}
          {service.valor && (
            <div>
              <p className="text-gray-500">Valor</p>
              <p className="font-medium">R$ {service.valor.toFixed(2)}</p>
            </div>
          )}
          <div>
            <p className="text-gray-500">Criado em</p>
            <p className="font-medium">{new Date(service.createdAt).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>

        {service.endereco && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Endereço</p>
            <p className="text-gray-900">
              {service.endereco.rua}, {service.endereco.numero} - {service.endereco.cidade}/{service.endereco.estado}
            </p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Participantes</h2>
          {service.participants.length === 0 ? (
            <p className="text-gray-500">Nenhum montador参与</p>
          ) : (
            <div className="space-y-3">
              {service.participants.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{p.montadorProfile?.user?.name || 'Montador'}</p>
                    <p className="text-sm text-gray-500">
                      {p.role === 'titular' ? 'Titular' : 'Auxiliar'} - {p.status}
                    </p>
                  </div>
                  {p.avaliacaoMedia && (
                    <span className="text-yellow-500">★ {p.montadorProfile?.avaliacaoMedia?.toFixed(1)}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Avaliações</h2>
          {service.evaluations.length === 0 ? (
            <p className="text-gray-500">Nenhuma avaliação</p>
          ) : (
            <div className="space-y-3">
              {service.evaluations.map((e: any) => (
                <div key={e.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{e.nota}/5</span>
                  </div>
                  {e.comentario && <p className="text-sm text-gray-600">{e.comentario}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Solicitações de Materiais</h2>
        {isMontador && service.status === 'em_execucao' && (
          <button
            onClick={() => setShowMaterial(true)}
            className="mb-4 text-blue-600 hover:underline text-sm"
          >
            + Solicitar material/peça
          </button>
        )}
        {service.materialRequests.length === 0 ? (
          <p className="text-gray-500">Nenhuma solicitação</p>
        ) : (
          <div className="space-y-3">
            {service.materialRequests.map((m: any) => (
              <div key={m.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{m.tipo === 'material' ? 'Material' : 'Peça'}</span>
                  <span className={`text-xs px-2 py-1 rounded ${m.status === 'aprovado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {m.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{m.descricao}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {isMontador && service.status === 'pendente' && service.participants.some((p: any) => p.status === 'aceito') && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleStartExecution}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
          >
            Iniciar Execução
          </button>
        </div>
      )}

      {isMontador && service.status === 'em_execucao' && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleComplete}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Finalizar Serviço
          </button>
        </div>
      )}

      {isEmpresa && service.status === 'finalizado' && service.evaluations.length === 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowEvaluate(true)}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-yellow-600"
          >
            Avaliar Montador
          </button>
        </div>
      )}

      {showInvite && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Convidar Montador</h3>
            <select
              value={selectedMontador}
              onChange={(e) => setSelectedMontador(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            >
              <option value="">Selecione um montador</option>
              {montadores.map((m: any) => (
                <option key={m.id} value={m.id}>
                  {m.user?.name} - ★ {m.avaliacaoMedia?.toFixed(1)}
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <button onClick={handleInvite} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                Enviar Convite
              </button>
              <button onClick={() => setShowInvite(false)} className="flex-1 border py-2 rounded-lg">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEvaluate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Avaliar Montador</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Nota</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setEvaluation({ ...evaluation, nota: n })}
                    className={`text-2xl ${evaluation.nota >= n ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Comentário</label>
              <textarea
                value={evaluation.comentario}
                onChange={(e) => setEvaluation({ ...evaluation, comentario: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
              />
            </div>
            <div className="flex gap-4">
              <button onClick={handleEvaluate} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                Enviar Avaliação
              </button>
              <button onClick={() => setShowEvaluate(false)} className="flex-1 border py-2 rounded-lg">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showMaterial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Solicitar Material/Peça</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Tipo</label>
              <select
                value={material.tipo}
                onChange={(e) => setMaterial({ ...material, tipo: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="material">Material</option>
                <option value="peca">Peça</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Descrição</label>
              <textarea
                value={material.descricao}
                onChange={(e) => setMaterial({ ...material, descricao: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
                placeholder="Descreva o material ou peça necessária..."
              />
            </div>
            <div className="flex gap-4">
              <button onClick={handleRequestMaterial} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                Enviar Solicitação
              </button>
              <button onClick={() => setShowMaterial(false)} className="flex-1 border py-2 rounded-lg">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Editar Serviço</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={editData.titulo}
                  onChange={(e) => setEditData({ ...editData, titulo: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={editData.descricao}
                  onChange={(e) => setEditData({ ...editData, descricao: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editData.valor}
                  onChange={(e) => setEditData({ ...editData, valor: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Prazo</label>
                <input
                  type="datetime-local"
                  value={editData.prazo}
                  onChange={(e) => setEditData({ ...editData, prazo: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Observações</label>
                <textarea
                  value={editData.observacoes}
                  onChange={(e) => setEditData({ ...editData, observacoes: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={handleEdit} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                Salvar
              </button>
              <button onClick={() => setShowEdit(false)} className="flex-1 border py-2 rounded-lg">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
