import { create } from 'zustand'
import api from '@/lib/api'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  name: string
  phone?: string
  type: 'montador' | 'empresa'
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const response = await api.post('/auth/login', { email, password })
      const { user, accessToken } = response.data.data
      
      localStorage.setItem('accessToken', accessToken)
      set({ user, accessToken, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true })
    try {
      const response = await api.post('/auth/register', data)
      const { user, accessToken } = response.data.data
      
      localStorage.setItem('accessToken', accessToken)
      set({ user, accessToken, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } catch {
    } finally {
      localStorage.removeItem('accessToken')
      set({ user: null, accessToken: null, isAuthenticated: false })
    }
  },

  fetchUser: async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      set({ isAuthenticated: false })
      return
    }
    
    try {
      const response = await api.get('/users/me')
      set({ user: response.data.data, isAuthenticated: true })
    } catch {
      set({ user: null, isAuthenticated: false, accessToken: null })
    }
  },
}))
