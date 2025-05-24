"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  BookOpen, 
  FileText, 
  User, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useSupabase } from '@/lib/supabase/provider'

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { supabase } = useSupabase()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  // Links da sidebar
  const menuItems = [
    { 
      href: '/dashboard', 
      label: 'Dashboard',
      icon: Home 
    },
    { 
      href: '/dashboard/conteudos', 
      label: 'Conteúdos',
      icon: BookOpen 
    },
    { 
      href: '/dashboard/provas', 
      label: 'Provas',
      icon: FileText 
    },
    { 
      href: '/dashboard/perfil', 
      label: 'Perfil',
      icon: User 
    },
    { 
      href: '/dashboard/configuracoes', 
      label: 'Configurações',
      icon: Settings 
    },
  ]
  
  useEffect(() => {
    setMounted(true)
    
    // Previne o scroll quando o menu está aberto
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  
  // Verificar se um link está ativo
  const isActive = (href: string) => {
    if (!mounted) return false
    return pathname === href
  }
  
  // Função para fazer logout
  const handleLogout = async () => {
    // Fechar o menu
    setIsOpen(false)
    
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
  
  // Variantes para animações
  const menuContainerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1.0],
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(8px)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  }
  
  const menuItemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      filter: "blur(8px)" 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  }
  
  const logoVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1.0], 
        delay: 0.1 
      }
    },
    exit: {
      x: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  }
  
  const patternVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.04,
      transition: { 
        duration: 1.2, 
        ease: "easeInOut", 
        delay: 0.3 
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <>
      {/* Botão de menu flutuante - Sempre visível independente da rota */}
      <motion.button
        className="fixed top-5 left-5 z-50 bg-[#B38E6A] rounded-md p-2.5 border-none shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, backgroundColor: "#A47D5D" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label="Menu"
        style={{ position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <motion.div 
          initial={false}
          animate={{ 
            rotate: isOpen ? 90 : 0,
            scale: isOpen ? 1.1 : 1
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 0.1, 0.25, 1.0] 
          }}
        >
          {isOpen ? <X size={22} color="white" /> : <Menu size={22} color="white" />}
        </motion.div>
      </motion.button>
      
      {/* Menu de tela cheia */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center overflow-hidden"
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Logo no canto superior */}
            <motion.div 
              className="absolute top-5 left-16 flex items-center"
              variants={logoVariants}
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#B38E6A] mr-3">
                <span className="font-medium text-base text-white">F</span>
                </div>
              <h1 className="text-xl font-medium text-[#B38E6A]">FisioDerma</h1>
            </motion.div>
            
            {/* Menu principal */}
            <div className="flex flex-col items-start w-full max-w-md px-8">
              {menuItems.map((item, index) => {
                const active = isActive(item.href);
                
                return (
                  <motion.div 
                    key={item.href}
                    className="w-full mb-4"
                    variants={menuItemVariants}
                    custom={index}
                  >
                    <Link 
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="inline-block w-full"
                    >
                      <div className="group relative">
                        <div className="flex items-center relative z-10">
                          <span 
                            className={`inline-block text-[32px] uppercase font-light tracking-wide transition-colors duration-300 ${
                              active 
                                ? "text-white" 
                                : "text-[#B38E6A] group-hover:text-white"
                            }`}
                          >
                            {item.label}
                          </span>
                          <motion.div 
                            className={`ml-4 ${
                              active 
                                ? "text-white" 
                                : "text-[#B38E6A] opacity-70 group-hover:text-white"
                            } transition-colors duration-300`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.4,
                              delay: 0.1 + index * 0.05
                            }}
                          >
                            <item.icon size={24} />
                          </motion.div>
                        </div>
                        <motion.div 
                          className={`absolute left-0 bottom-0 w-full h-full bg-[#B38E6A] transform origin-left transition-transform duration-300 -z-10 ${
                            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Botão Sair */}
              <motion.div
                className="w-full mt-6"
                variants={menuItemVariants}
                custom={menuItems.length}
              >
                <button 
                  onClick={handleLogout}
                  className="inline-block w-full"
                >
                  <div className="group relative">
                    <div className="flex items-center relative z-10">
                      <span className="inline-block text-[32px] uppercase font-light tracking-wide text-red-500 group-hover:text-white transition-colors duration-300">
                        Sair
                      </span>
                      <motion.div 
                        className="ml-4 text-red-500 opacity-70 group-hover:text-white transition-colors duration-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4,
                          delay: 0.1 + menuItems.length * 0.05
                        }}
                      >
                        <LogOut size={24} />
                      </motion.div>
                    </div>
                    <motion.div 
                      className="absolute left-0 bottom-0 w-full h-full bg-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 -z-10"
                    />
                  </div>
                </button>
              </motion.div>
            </div>
            
            {/* Padrão decorativo de fundo */}
            <motion.div 
              className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
              variants={patternVariants}
              style={{
                backgroundImage: "url('/images/pattern.svg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center right"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
