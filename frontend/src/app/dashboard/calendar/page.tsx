'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'

interface CalendarEvent {
  id: string
  data: string
  horaInicio: string
  horaFim: string
  tipo: 'agendamento' | 'disponivel' | 'feriado'
  titulo: string
  descricao: string
  service?: { titulo: string }
}

const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export default function CalendarPage() {
  const { user } = useAuthStore()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    data: '',
    horaInicio: '',
    horaFim: '',
    tipo: 'agendamento' as const,
    titulo: '',
    descricao: '',
  })

  useEffect(() => {
    fetchCalendar()
  }, [currentDate])

  const fetchCalendar = async () => {
    try {
      const month = currentDate.getMonth() + 1
      const year = currentDate.getFullYear()
      const response = await api.get(`/calendar?month=${month}&year=${year}`)
      setEvents(response.data.data)
    } catch (error) {
      console.error('Error fetching calendar:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      await api.post('/calendar', formData)
      setShowModal(false)
      setFormData({
        data: '',
        horaInicio: '',
        horaFim: '',
        tipo: 'agendamento',
        titulo: '',
        descricao: '',
      })
      fetchCalendar()
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este evento?')) return
    try {
      await api.delete(`/calendar/${id}`)
      fetchCalendar()
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (number | null)[] = []
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i)
    }
    
    return days
  }

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter((e) => e.data.startsWith(dateStr))
  }

  const isMontador = user?.type === 'montador'
  const days = getDaysInMonth(currentDate)

  if (!isMontador) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Esta página é exclusiva para montadores.</p>
      </div>
    )
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
        <h1 className="text-2xl font-bold text-gray-900">Minha Agenda</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Novo Evento
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <h2 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dayEvents = day ? getEventsForDay(day) : []
            return (
              <div
                key={index}
                className={`min-h-[80px] p-2 border rounded-lg ${!day ? 'bg-gray-50' : 'bg-white'}`}
              >
                {day && (
                  <>
                    <p className="text-sm font-medium text-gray-700 mb-1">{day}</p>
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded mb-1 cursor-pointer ${
                          event.tipo === 'agendamento'
                            ? 'bg-blue-100 text-blue-700'
                            : event.tipo === 'disponivel'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {event.titulo || event.tipo}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Próximos Eventos</h3>
        {events.length === 0 ? (
          <p className="text-gray-500">Nenhum evento agendado</p>
        ) : (
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{event.titulo || event.tipo}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.data).toLocaleDateString('pt-BR')}
                    {event.horaInicio && ` ${event.horaInicio}`}
                    {event.horaFim && ` - ${event.horaFim}`}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Novo Evento</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Data</label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Hora Início</label>
                  <input
                    type="time"
                    value={formData.horaInicio}
                    onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Hora Fim</label>
                  <input
                    type="time"
                    value={formData.horaFim}
                    onChange={(e) => setFormData({ ...formData, horaFim: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Tipo</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="agendamento">Agendamento</option>
                  <option value="disponivel">Disponível</option>
                  <option value="feriado">Feriado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Título do evento"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={handleCreate} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                Criar
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 border py-2 rounded-lg">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
