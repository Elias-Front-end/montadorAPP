import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Montador Conecta</h1>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Cadastrar
            </Link>
          </div>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Conectando Marcenarias a
          <span className="text-blue-600"> Montadores Profissionais</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A plataforma que facilita a contratação de montadores de móveis confiáveis.
          Publique serviços, acompanhe execuções e avalie resultados.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login?type=empresa"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700"
          >
            Sou Empresa
          </Link>
          <Link
            href="/login?type=montador"
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-50"
          >
            Sou Montador
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Como funciona</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">📋</div>
              <h4 className="text-xl font-semibold mb-2">Publique Serviços</h4>
              <p className="text-gray-600">
                Crie serviços de montagem com detalhes, prazos e valor.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-semibold mb-2">Conecte-se</h4>
              <p className="text-gray-600">
                Convide montadores ou receba propostas de profissionais.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h4 className="text-xl font-semibold mb-2">Avalie</h4>
              <p className="text-gray-600">
                Após a conclusão, avalie o trabalho realizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Montador Conecta. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
