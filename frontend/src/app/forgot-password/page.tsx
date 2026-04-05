'use client'

import { useState } from 'react'
import Link from 'next/link'
import api from '@/lib/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      await api.post('/auth/forgot-password', { email })
      setSent(true)
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Erro ao processar requisição')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="text-5xl mb-4">📧</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Enviado</h1>
            <p className="text-gray-600 mb-6">
              Se o email {email} existir em nossa base, você receberá instruções para redefinir sua senha.
            </p>
            <Link href="/login" className="text-blue-600 hover:underline">
              Voltar para Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="text-2xl font-bold text-blue-600 mb-8 block">
            Montador Conecta
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">Esqueci a senha</h1>
          <p className="text-gray-600 mb-8">
            Digite seu email para receber instruções de recuperação
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar Email'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Lembrou a senha?{' '}
            <Link href="/login" className="text-blue-600 font-medium">
              Voltar para Login
            </Link>
          </p>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 bg-blue-600 items-center justify-center p-8">
        <div className="text-white text-center max-w-md">
          <h2 className="text-4xl font-bold mb-4">
            Recupere seu acesso
          </h2>
          <p className="text-blue-100 text-lg">
            Não se preocupe, vamos ajudá-lo a recuperar sua conta.
          </p>
        </div>
      </div>
    </div>
  )
}
