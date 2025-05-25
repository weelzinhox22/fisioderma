"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Home, 
  FileText, 
  Menu as MenuIcon,
  X,
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

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { supabase } = useSupabase()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      href: '/dashboard/conteudos', 
      label: 'Conteúdos',
      icon: BookOpen 
    },
    { 
      href: '/banco-questoes-login',
      label: 'Banco de Questões',
      icon: FileText
    }
  ]

  useEffect(() => {
    setMounted(true)

    // Fechar o menu móvel quando a rota mudar
    setMobileMenuOpen(false)
  }, [pathname])

  // Verificar se um link está ativo
  const isActive = (href: string) => {
    if (!mounted) return false
    return pathname === href || pathname.startsWith(href + '/')
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
    <div>
      {/* Navbar fixa no topo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#D9C5B2]/50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo e marca */}
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center">
                <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-[#B38E6A] to-[#8A6D50] shadow-md mr-3">
                  <span className="font-semibold text-lg text-white">F</span>
                </div>
                <div>
                  <span className="text-lg sm:text-2xl font-semibold text-[#8A6D50] hidden sm:block">
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
            </div>

            {/* Botão de menu móvel */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-md text-[#B38E6A] hover:bg-[#F7F2EB] md:hidden border border-[#B38E6A]/30"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <MenuIcon size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Menu móvel - Versão simplificada */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#D9C5B2]/30 py-2 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-base ${
                  isActive(item.href)
                    ? "bg-[#F7F2EB] text-[#8A6D50] border-l-4 border-[#B38E6A]"
                    : "text-neutral-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={20} className="mr-3" />
                {item.label}
              </Link>
            ))}

            <div className="px-4 py-3">
              <Link
                href="/"
                className="block w-full py-2 text-center bg-[#B38E6A] text-white rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Voltar para o Início
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Espaçador para compensar a altura da navbar fixa */}
      <div className="h-24 md:h-36"></div>
    </div>
  )
} 