import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#B38E6A]/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-[#B38E6A]">FisioDerma</h2>
            <p className="text-sm text-gray-600">Educação em Fisioterapia Dermatofuncional</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/sobre" className="text-gray-600 hover:text-[#B38E6A] transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-600 hover:text-[#B38E6A] transition-colors">
              Contato
            </Link>
            <Link href="/politica-privacidade" className="text-gray-600 hover:text-[#B38E6A] transition-colors">
              Privacidade
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FisioDerma. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
} 