"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { X, Menu } from "lucide-react"

// Cores personalizadas em tons bege/nude
const colors = {
  primary: '#B38E6A',           // Bege mais escuro / Nude
  primaryTransparent: 'rgba(179, 142, 106, 0.2)',
  primaryHover: '#9F7D5D',      // Versão mais escura
  secondary: '#D9C5B2',         // Bege mais claro
  accent: '#C4A484',            // Tom médio para detalhes
  lightBg: '#F3E9E0',           // Fundo claro
  textDark: '#54413B'           // Tom escuro para texto
}

interface NavbarProps {
  className?: string
}

export function Navbar({ className = '' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Detectar scroll para alterar o estilo da navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Controlar visibilidade do menu
  const toggleMenu = () => {
    if (isMenuOpen) {
      document.body.style.overflow = ''
      setIsMenuOpen(false)
    } else {
      document.body.style.overflow = 'hidden'
      setIsMenuOpen(true)
    }
    }

  // Fechar menu ao navegar
  const handleNavigation = (href: string) => {
    document.body.style.overflow = ''
    setIsMenuOpen(false)
    router.push(href)
  }

  // Links principais de navegação
  const navItems = [
    { name: "Início", href: "/" },
    { name: "Provas", href: "/dashboard/provas/exame" },
    { name: "Contato", href: "/contato" },
  ]

  return (
    <>
      {/* Barra de navegação minimalista */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isMenuOpen 
            ? "bg-transparent" 
            : isScrolled 
              ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-[#D9C5B2]/30" 
              : "bg-transparent"
        } ${className}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24 md:h-28">
            {/* Logo - Adicionado para mobile */}
            <div className="flex items-center">
              <a 
                href="/" 
                className="bg-gradient-to-br from-[#B38E6A] to-[#8A6D50] h-10 w-10 rounded-full flex items-center justify-center shadow-md"
              >
                <span className="font-semibold text-lg text-white">F</span>
              </a>
            </div>

            {/* Botão MENU */}
            <div className="relative z-50">
              <button 
                onClick={toggleMenu}
                className={`group flex items-center gap-3 px-5 py-2.5 font-medium rounded-full transition-all duration-500 ${
                  isScrolled 
                    ? "text-gray-900 hover:bg-[#F7F2EB] shadow-sm border border-[#D9C5B2]/30 hover:border-[#B38E6A]/50" 
                    : "text-white hover:bg-white/20 shadow-lg backdrop-blur-sm"
                }`}
                aria-label={isMenuOpen ? "Fechar menu" : "Menu"}
              >
                <span className="transition-all duration-500 transform group-hover:translate-x-0.5 tracking-wide">
                  {isMenuOpen ? "Fechar" : "Menu"}
                </span>
                
                <div className="relative w-5 h-5 flex items-center justify-center">
                  {/* Icone de menu com animação */}
                  {!isMenuOpen ? (
                    <Menu className={`w-5 h-5 transition-all duration-500 transform group-hover:scale-110 ${
                      isScrolled ? "text-[#B38E6A]" : "text-white"
                    }`} />
                  ) : (
                    <div className="relative w-5 h-5">
                      <X className={`absolute inset-0 w-full h-full transition-all duration-500 rotate-0 ${
                        isScrolled ? "text-[#B38E6A]" : "text-white"
                      }`} />
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay do menu com animação */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 transition-all duration-700 ease-in-out"
        style={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
        onClick={toggleMenu} // Fecha o menu ao clicar no overlay
      />

      {/* Menu em tela cheia com animação */}
      <div 
        className="fixed inset-0 bg-white z-40 transition-all duration-700 ease-in-out transform"
        style={{
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        {/* Decoração lateral */}
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b" 
             style={{ backgroundImage: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary}, ${colors.accent})` }} />
        
        <div className="w-full h-full flex flex-col">
          {/* Cabeçalho do menu com botão de fechar evidente */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              {/* Logo no cabeçalho do menu */}
              <div className="flex items-center">
                <a 
                  href="/" 
                  className="bg-gradient-to-br from-[#B38E6A] to-[#8A6D50] h-10 w-10 rounded-full flex items-center justify-center shadow-md"
                >
                  <span className="font-semibold text-lg text-white">F</span>
                </a>
                <span className="ml-3 text-lg font-medium text-[#8A6D50]">FisioDerma</span>
              </div>
              
              {/* Botão Fechar claramente visível */}
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
                style={{ 
                  backgroundColor: colors.primaryTransparent,
                  color: colors.primary
                }}
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Conteúdo principal do menu */}
          <div className="flex-grow flex items-center justify-center overflow-y-auto">
            <div className="container mx-auto px-4 md:px-8 py-4 md:py-0">
              {/* Links de navegação */}
              <div className="flex flex-col justify-center items-start max-w-4xl mx-auto">
                <nav className="space-y-6 md:space-y-10 w-full">
                  {navItems.map((item, index) => (
                    <div 
                      key={item.name}
                      className="overflow-hidden"
                    >
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className="group relative text-3xl md:text-6xl font-bold transition-all duration-700 flex items-center w-full py-2"
                        style={{ 
                          color: pathname === item.href ? colors.primary : colors.textDark,
                          transitionDelay: isMenuOpen ? `${200 + index * 100}ms` : '0ms',
                          transform: isMenuOpen ? 'translateY(0)' : 'translateY(2rem)',
                          opacity: isMenuOpen ? 1 : 0
                        }}
                      >
                        <span className="relative">
                          {/* Efeito de linha animada */}
                          <span 
                            className="absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-700 group-hover:w-full"
                            style={{ 
                              backgroundColor: colors.primary,
                              width: pathname === item.href ? '100%' : '0'
                            }}
                          ></span>
                          
                          {/* Texto com animação de letra */}
                          <span className="block">
                            {item.name.split('').map((letter, letterIndex) => (
                              <span 
                                key={letterIndex}
                                className="inline-block transition-transform duration-500"
                                style={{ 
                                  transitionDelay: `${letterIndex * 40}ms`,
                                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(100%)'
                                }}
                              >
                                {letter}
                              </span>
                            ))}
                          </span>
                        </span>
                        
                        {/* Indicador decorativo */}
                        {pathname === item.href && (
                          <span 
                            className="ml-4 h-2 w-2 rounded-full inline-block shadow-sm" 
                            style={{ backgroundColor: colors.primary }} 
                          />
                        )}
                      </button>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          
          {/* Botões de acesso rápido no menu */}
          <div className="container mx-auto px-4 py-8 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/dashboard" 
                className="group flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#B38E6A] to-[#9F7D5D] rounded-xl text-white hover:from-[#9F7D5D] hover:to-[#8A6D50] transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu();
                  setTimeout(() => handleNavigation('/dashboard'), 500);
                }}
              >
                <span className="font-medium">Acessar Plataforma</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorações de fundo */}
        <div className="absolute bottom-8 right-8 opacity-5 w-64 h-64 rounded-full border-8" 
             style={{ borderColor: colors.primary }}></div>
        <div className="absolute top-32 right-16 opacity-5 w-32 h-32 rounded-full border-4" 
             style={{ borderColor: colors.secondary }}></div>
        <div className="absolute top-1/2 -left-20 opacity-5 w-40 h-40 rounded-full border-4" 
             style={{ borderColor: colors.accent }}></div>
      </div>
    </>
  )
}
