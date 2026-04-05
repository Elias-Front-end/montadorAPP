'use client'

import { Suspense } from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth-store'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get('type') || 'montador'
  
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState<'montador' | 'empresa'>(defaultType as 'montador' | 'empresa')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  })
  const [error, setError] = useState('')
  
  const { login, register, isLoading } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await register({
          ...formData,
          type: userType,
        })
      }
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Erro ao processar requisição')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="text-2xl font-bold text-blue-600 mb-8 block">
            Montador Conecta
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? 'Bem-vindo de volta' : 'Criar conta'}
          </h1>
          <p className="text-gray-600 mb-8">
            {isLogin ? 'Entre com sua conta' : 'Escolha seu tipo de cadastro'}
          </p>

          {!isLogin && (
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setUserType('montador')}
                className={`flex-1 py-3 rounded-lg border-2 ${
                  userType === 'montador'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                Sou Montador
              </button>
              <button
                type="button"
                onClick={() => setUserType('empresa')}
                className={`flex-1 py-3 rounded-lg border-2 ${
                  userType === 'empresa'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                Sou Empresa
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                minLength={6}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone (opcional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>

          {isLogin && (
            <div className="text-center mt-4">
              <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-blue-600">
                Esqueceu a senha?
              </Link>
            </div>
          )}

          <p className="mt-4 text-center text-gray-600">
            {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-blue-600 font-medium"
            >
              {isLogin ? 'Cadastre-se' : 'Entre'}
            </button>
          </p>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 bg-blue-600 items-center justify-center p-8">
        <div className="text-white text-center max-w-md">
          <h2 className="text-4xl font-bold mb-4">
            Simplifique suas montagens
          </h2>
          <p className="text-blue-100 text-lg">
            Encontre montadores confiáveis ou conquiste novos clientes.
            Tudo em uma plataforma completa.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginForm />
    </Suspense>
  )
}
