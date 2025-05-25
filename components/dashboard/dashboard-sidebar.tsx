"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  FileText, 
  User, 
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Snowflake,
  Waves,
  Flame,
  Zap,
  Speaker
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useSupabase } from '@/lib/supabase/provider'
import { useClickAway } from 'react-use'

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { supabase } = useSupabase()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [contentMenuOpen, setContentMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const contentMenuRef = useRef(null)
  
  // Links da navegação
  const navItems = [
    { 
      href: '/dashboard', 
      label: 'Dashboard',
      icon: Home 
    },
    { 
      href: '/dashboard/provas/exame', 
      label: 'Avaliação',
      icon: GraduationCap 
    },
    { 
      href: '/banco-questoes-login', 
      label: 'Banco de Questões',
      icon: FileText 
    }
  ]

  // Conteúdos disponíveis
  const contentItems = [
    {
      href: '/conteudos/criolise',
      label: 'Criolipólise',
      icon: Snowflake,
      color: "#64B5F6"
    },
    {
      href: '/conteudos/lipocavitacao',
      label: 'Lipocavitação',
      icon: Waves,
      color: "#81C784"
    },
    {
      href: '/conteudos/queimados',
      label: 'Queimados',
      icon: Flame,
      color: "#F06292"
    },
    {
      href: '/conteudos/radiofrequencia',
      label: 'Radiofrequência',
      icon: Zap,
      color: "#E57373"
    },
    {
      href: '/conteudos/ultrassom',
      label: 'Ultrassom',
      icon: Speaker,
      color: "#FFB74D"
    }
  ]

  // Itens do menu do usuário
  const userMenuItems = []
  
  // Fechar menus ao clicar fora
  useClickAway(userMenuRef, () => {
    setUserMenuOpen(false)
  })

  useClickAway(contentMenuRef, () => {
    setContentMenuOpen(false)
  })

  useEffect(() => {
    setMounted(true)
    
    // Fechar o menu móvel quando a rota mudar
    setMobileMenuOpen(false)
    
    // Previne o scroll quando o menu móvel está aberto
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen, pathname])
  
  // Verificar se um link está ativo
  const isActive = (href: string) => {
    if (!mounted) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  // Verificar se algum conteúdo está ativo
  const isContentActive = () => {
    if (!mounted) return false
    return contentItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
  }
  
  // Função para fazer logout
  const handleLogout = async () => {
    try {
      // Remover usuário especial do localStorage se existir
      if (localStorage.getItem("specialUser")) {
        localStorage.removeItem("specialUser")
      }
      
      // Se estiver usando Supabase, fazer logout
      if (supabase) {
        await supabase.auth.signOut()
      }
      
      // Mostrar mensagem de sucesso
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso",
      })
      
      // Redirecionar para a página de login
      router.push('/login')
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar desconectar",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      {/* Navbar fixa no topo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#D9C5B2]/50 shadow-md backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo e marca */}
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center group">
                <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-[#B38E6A] to-[#8A6D50] shadow-md mr-3 group-hover:shadow-lg transition-all duration-300">
                  <span className="font-semibold text-lg text-white">F</span>
                </div>
                <div>
                  <span className="text-lg sm:text-2xl font-semibold text-[#8A6D50] hidden sm:block tracking-wide">
                    Fisio<span className="text-[#B38E6A]">Derma</span>
                  </span>
                  <span className="text-xs font-medium text-neutral-500 hidden sm:block">Fisioterapia Dermatofuncional</span>
                </div>
              </Link>
            </div>
            
            {/* Links de navegação - Visíveis apenas no desktop */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item) => {
                const active = isActive(item.href);
                
                return (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className={`relative px-5 py-3 rounded-md text-base font-medium transition-all duration-200 hover:bg-[#F7F2EB]/70 ${
                      active 
                        ? "text-[#8A6D50]" 
                        : "text-neutral-500 hover:text-[#B38E6A]"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon size={18} className={active ? "text-[#B38E6A]" : ""} />
                      <span>{item.label}</span>
                    </div>
                    
                    {/* Indicador de ativo */}
                    {active && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B38E6A] rounded-full"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Menu dropdown de conteúdos */}
              <div className="relative" ref={contentMenuRef}>
                <button
                  onClick={() => setContentMenuOpen(!contentMenuOpen)}
                  className={`relative px-5 py-3 rounded-md text-base font-medium transition-all duration-200 hover:bg-[#F7F2EB]/70 ${
                    isContentActive() 
                      ? "text-[#8A6D50]" 
                      : "text-neutral-500 hover:text-[#B38E6A]"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen size={18} className={isContentActive() ? "text-[#B38E6A]" : ""} />
                    <span>Conteúdos</span>
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform duration-200 ${contentMenuOpen ? 'rotate-180' : ''} ${isContentActive() ? "text-[#B38E6A]" : ""}`} 
                    />
                  </div>
                  
                  {/* Indicador de ativo */}
                  {isContentActive() && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B38E6A] rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </button>
                
                {/* Dropdown de conteúdos */}
                <AnimatePresence>
                  {contentMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-2 border border-[#D9C5B2]/50 z-50"
                    >
                      {contentItems.map((item) => {
                        const active = isActive(item.href);
                        
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-5 py-2.5 text-base hover:bg-[#F7F2EB]/50 transition-colors ${
                              active 
                                ? "bg-[#F7F2EB] text-[#8A6D50] border-l-2 border-[#B38E6A]" 
                                : "text-neutral-600 hover:text-[#B38E6A]"
                            }`}
                          >
                            <item.icon 
                              size={18} 
                              className="mr-3" 
                              style={{ color: active ? "#B38E6A" : item.color }} 
                            />
                            {item.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Menu do usuário e botão de menu móvel */}
            <div className="flex items-center">
              {/* Botão de menu móvel */}
              <div className="ml-2 -mr-2 flex md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-3 rounded-md text-[#B38E6A] hover:bg-[#F7F2EB] focus:outline-none"
                >
                  <span className="sr-only">Abrir menu</span>
                  {mobileMenuOpen ? (
                    <X size={24} aria-hidden="true" />
                  ) : (
                    <Menu size={24} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Menu móvel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-3 pt-3 pb-6 space-y-3 sm:px-4 border-t border-[#D9C5B2]/30 bg-[#F7F2EB]/40">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-4 rounded-md text-base font-medium ${
                        active 
                          ? "bg-[#F7F2EB] text-[#8A6D50] border-l-4 border-[#B38E6A]" 
                          : "text-neutral-600 hover:bg-[#F7F2EB]/50 hover:text-[#B38E6A]"
                      }`}
                    >
                      <item.icon size={22} className="mr-3" />
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Cabeçalho da seção de conteúdos no móvel */}
                <div className="pt-4 pb-2">
                  <p className="px-4 text-sm font-medium text-neutral-500 uppercase tracking-wider">Conteúdos</p>
                </div>
                
                {/* Lista de conteúdos no móvel */}
                {contentItems.map((item) => {
                  const active = isActive(item.href);
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-4 rounded-md text-base font-medium ${
                        active 
                          ? "bg-[#F7F2EB] text-[#8A6D50] border-l-4 border-[#B38E6A]" 
                          : "text-neutral-600 hover:bg-[#F7F2EB]/50 hover:text-[#B38E6A]"
                      }`}
                    >
                      <item.icon 
                        size={22} 
                        className="mr-3" 
                        style={{ color: active ? "#B38E6A" : item.color }} 
                      />
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Divisor */}
                <div className="my-2 border-t border-[#D9C5B2]/30"></div>
                
                {/* Botão de ajuda */}
                <Link 
                  href="/"
                  className="flex items-center justify-center py-3 bg-gradient-to-r from-[#B38E6A] to-[#9F7D5D] text-white rounded-md font-medium shadow-sm"
                >
                  <span>Voltar para o Início</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Espaçador para compensar a altura da navbar fixa */}
      <div className="h-24 md:h-36"></div>
    </>
  )
}
