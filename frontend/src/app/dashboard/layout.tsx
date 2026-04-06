'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth-store'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isAuthenticated, logout, fetchUser } = useAuthStore()

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const isMontador = user.type === 'montador'
  const isEmpresa = user.type === 'empresa'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-xl font-bold text-blue-600">
              Montador Conecta
            </Link>
            
            <nav className="flex items-center gap-6">
              {user.type === 'admin' && (
                <Link href="/dashboard/admin" className="text-gray-600 hover:text-blue-600">
                  Admin
                </Link>
              )}
              {isEmpresa && (
                <>
                  <Link href="/dashboard/services" className="text-gray-600 hover:text-blue-600">
                    Meus Serviços
                  </Link>
                  <Link href="/dashboard/team" className="text-gray-600 hover:text-blue-600">
                    Meu Time
                  </Link>
                </>
              )}
              {isMontador && (
                <>
                  <Link href="/dashboard/invites" className="text-gray-600 hover:text-blue-600">
                    Convites
                  </Link>
                  <Link href="/dashboard/services" className="text-gray-600 hover:text-blue-600">
                    Meus Serviços
                  </Link>
                  <Link href="/dashboard/calendar" className="text-gray-600 hover:text-blue-600">
                    Agenda
                  </Link>
                </>
              )}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Sair
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
