'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'

export default function ProfilePage() {
  const { user, fetchUser } = useAuthStore()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    bio: '',
    habilidades: [] as string[],
  })
  const [newHabilidade, setNewHabilidade] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/me')
      setProfile(response.data.data.montadorProfile)
      if (response.data.data.montadorProfile) {
        setFormData({
          name: user?.name || '',
          phone: user?.phone || '',
          bio: response.data.data.montadorProfile.bio || '',
          habilidades: response.data.data.montadorProfile.habilidades || [],
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await api.patch('/users/me', {
        name: formData.name,
        phone: formData.phone,
      })
      await api.patch('/users/me/montador', {
        bio: formData.bio,
        habilidades: formData.habilidades,
      })
      setEditing(false)
      fetchUser()
      fetchProfile()
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  const addHabilidade = () => {
    if (newHabilidade && !formData.habilidades.includes(newHabilidade)) {
      setFormData({
        ...formData,
        habilidades: [...formData.habilidades, newHabilidade],
      })
      setNewHabilidade('')
    }
  }

  const removeHabilidade = (h: string) => {
    setFormData({
      ...formData,
      habilidades: formData.habilidades.filter((item) => item !== h),
    })
  }

  const isMontador = user?.type === 'montador'
  const badgeColors = {
    none: 'bg-gray-100 text-gray-600',
    bronze: 'bg-amber-100 text-amber-700',
    prata: 'bg-gray-200 text-gray-700',
    ouro: 'bg-yellow-100 text-yellow-700',
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
        {editing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Salvar
            </button>
            <button
              onClick={() => setEditing(false)}
              className="border px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 hover:underline"
          >
            Editar
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600">Nome</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Telefone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                {user?.phone && <p className="text-gray-500">{user.phone}</p>}
              </>
            )}
          </div>
          {profile?.badge && profile.badge !== 'none' && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColors[profile.badge as keyof typeof badgeColors]}`}>
              {profile.badge === 'bronze' && '🥉 Bronze'}
              {profile.badge === 'prata' && '🥈 Prata'}
              {profile.badge === 'ouro' && '🥇 Ouro'}
            </span>
          )}
        </div>

        {isMontador && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{profile?.avaliacaoMedia?.toFixed(1) || '0.0'}</p>
                <p className="text-sm text-gray-600">Nota média</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{profile?.totalAvaliacoes || 0}</p>
                <p className="text-sm text-gray-600">Avaliações</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{profile?.badge === 'none' ? '-' : profile.badge.toUpperCase()}</p>
                <p className="text-sm text-gray-600">Badge</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              {editing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Conte um pouco sobre você..."
                />
              ) : (
                <p className="text-gray-600">{profile?.bio || 'Sem bio'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Habilidades</label>
              {editing ? (
                <div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newHabilidade}
                      onChange={(e) => setNewHabilidade(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="Adicionar habilidade..."
                      onKeyPress={(e) => e.key === 'Enter' && addHabilidade()}
                    />
                    <button
                      onClick={addHabilidade}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Adicionar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.habilidades.map((h) => (
                      <span key={h} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                        {h}
                        <button onClick={() => removeHabilidade(h)} className="hover:text-blue-900">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile?.habilidades?.length > 0 ? (
                    profile.habilidades.map((h: string) => (
                      <span key={h} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {h}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">Nenhuma habilidade adicionada</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
