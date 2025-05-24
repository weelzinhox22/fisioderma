"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Bell, 
  Shield, 
  AlertCircle,
  Settings
} from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { NotificationSettings } from "@/components/dashboard/settings/notification-settings"
import { SecuritySettings } from "@/components/dashboard/settings/security-settings"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ConfiguracoesPage() {
  const [mounted, setMounted] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("notificacoes")
  
  useEffect(() => {
    setMounted(true)
    
    // Simulando uma verificação de usuário
    // Em um aplicativo real, isso viria de um contexto de autenticação ou API
    const checkUserPermissions = () => {
      // Simula um atraso de carregamento
      setTimeout(() => {
        // Aqui você buscaria o usuário atual do seu sistema de autenticação
        const userEmail = "usuario@exemplo.com" // Substituir por lógica real de autenticação
        
        setCurrentUser(userEmail)
        // Verificação de acesso administrativo
        setIsAdmin(userEmail === "weelzinho@admin.com")
        setIsLoading(false)
      }, 500)
    }
    
    checkUserPermissions()
  }, [])

  // Variantes para animações aprimoradas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const tabIndicatorVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (i: number) => ({
      width: "100%",
      opacity: 1,
      transition: { 
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  if (!mounted) return null
  
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center py-32">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#B38E6A] rounded-full animate-spin"></div>
          <Settings className="h-6 w-6 text-[#B38E6A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-500 mt-4"
        >
          Carregando configurações...
        </motion.p>
      </div>
    )
  }

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        variants={itemVariants}
        className="relative mb-12 pb-6 border-b border-gray-100"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center">
          <Settings className="h-8 w-8 mr-3 text-[#B38E6A]" />
          Configurações
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Gerencie suas preferências e configurações de conta para personalizar sua experiência
        </p>
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#B38E6A] to-[#D4B595]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {!isAdmin && (
        <motion.div 
          variants={fadeInVariants}
          className="mb-8"
        >
          <Alert className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 text-amber-800 shadow-sm">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="font-medium">Acesso restrito</AlertTitle>
            <AlertDescription>
              Algumas configurações estão disponíveis apenas para administradores. 
              Contate o administrador do sistema se precisar de acesso.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Tabs 
        defaultValue="notificacoes" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <motion.div variants={itemVariants}>
          <TabsList className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 p-1 bg-gray-50 rounded-xl">
            {[
              { value: "notificacoes", label: "Notificações", icon: <Bell size={18} /> },
              { value: "seguranca", label: "Segurança", icon: <Shield size={18} /> }
            ].map((tab, i) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="relative flex items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-[#B38E6A] data-[state=active]:shadow-md rounded-lg transition-all duration-300 ease-out"
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-12 bg-[#B38E6A]"
                    initial={false}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          <TabsContent value="notificacoes" className="mt-0">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="seguranca" className="mt-0">
            <SecuritySettings />
          </TabsContent>
        </motion.div>
      </Tabs>

      {isAdmin && (
        <motion.div 
          variants={itemVariants}
          className="mt-10"
        >
          <Card className="p-6 border-none bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                Acesso Administrativo
              </h2>
              <p className="text-gray-600 mb-4 max-w-3xl">
                Você está logado como administrador e tem acesso a funcionalidades adicionais.
                Para gerenciar usuários ou configurações avançadas, entre em contato com o suporte técnico.
              </p>
              <Alert className="bg-white bg-opacity-80 border-blue-200 text-blue-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Nota do administrador</AlertTitle>
                <AlertDescription>
                  Funcionalidades administrativas avançadas foram simplificadas nesta versão.
                  Para acesso completo, consulte a documentação do sistema.
                </AlertDescription>
              </Alert>
            </div>
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-20"
              style={{ filter: "blur(40px)" }}
              animate={{ 
                x: [0, 10, 0, -10, 0],
                y: [0, -10, 0, 10, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }}
            />
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
} 