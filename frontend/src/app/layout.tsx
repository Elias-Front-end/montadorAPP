import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Montador Conecta',
  description: 'Conectando marcenarias a montadores profissionais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
