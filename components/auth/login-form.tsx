"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSupabase } from "@/lib/supabase/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { Separator } from "@/components/ui/separator"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createSupabaseClient, SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/client"

// Cores em tons bege/nude refinados
const colors = {
  primary: '#B38E6A',           // Bege escuro / Nude
  primaryLight: '#D9C5B2',      // Versão mais clara
  primaryLighter: '#F8F3EE',    // Versão ainda mais clara para backgrounds
  primaryDark: '#9F7D5D',       // Versão mais escura
  accentGold: '#D4B78F',        // Tom dourado para acentos
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { supabase, errorMessage } = useSupabase()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"
  const [configError, setConfigError] = useState<string | null>(null)
  const [networkError, setNetworkError] = useState<boolean>(false)

  useEffect(() => {
    // Verificar se há erros de configuração do Supabase
    if (errorMessage) {
      setConfigError(errorMessage)
      console.error("Erro de configuração do Supabase:", errorMessage)
    } else if (!supabase) {
      const msg = "O Supabase não está configurado corretamente. Use as contas especiais para fazer login."
      setConfigError(msg)
      console.error(msg)
    }
  }, [supabase, errorMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Iniciando processo de login...")
      console.log("Email:", email)

      // Verificar credenciais especiais
      if (
        (email === "profadrianadermato@dermato.com" && password === "professoraadriana123") ||
        (email === "weelzinho@admin.com" && password === "weladmin12345")
      ) {
        console.log("Login com conta especial")
        const isAdmin = email === "weelzinho@admin.com"
        const isProfessor = email === "profadrianadermato@dermato.com"

        // Armazenar no localStorage e também em um cookie para o middleware
        localStorage.setItem(
          "specialUser",
          JSON.stringify({
            email,
            name: isAdmin ? "Weelzinho Admin" : "Profa. Adriana",
            role: isAdmin ? "admin" : "professor",
            isSpecialUser: true,
          })
        )
        
        // Criar um cookie para o middleware
        document.cookie = `specialUser=true; path=/; max-age=${60*60*24*30}; SameSite=Lax`;

        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a) ${isAdmin ? "Administrador" : "Professora Adriana"}!`,
        })

        router.push(isProfessor ? "/banco-questoes" : "/dashboard")
        return
      }

      // Criar cliente Supabase com credenciais fixas para garantir funcionamento
      const authClient = createSupabaseClient()
      
      console.log("Cliente Supabase criado")
      
      console.log("Tentando login com Supabase...")

      try {
        const { data, error } = await authClient.auth.signInWithPassword({
          email,
          password,
        })

        console.log("Resposta do Supabase:", { data, error })

        if (error) {
          // Traduzir mensagens de erro comuns
          let mensagem = "Erro ao fazer login. Por favor, tente novamente."
          
          if (error.message.includes("Invalid login credentials")) {
            mensagem = "Email ou senha incorretos"
          } else if (error.message.includes("Email not confirmed")) {
            mensagem = "Por favor, confirme seu email antes de fazer login"
          } else if (error.message.includes("invalid api key")) {
            mensagem = "Erro de configuração do Supabase. Por favor, contate o suporte."
            console.error("Erro de API key do Supabase:", error)
          } else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
            mensagem = "Erro de conexão. Verifique sua internet e tente novamente, ou use uma conta especial."
            setNetworkError(true)
          }
          
          throw new Error(mensagem)
        }

        if (data?.user) {
          console.log("Login bem-sucedido:", data.user)
          toast({
            title: "Login realizado com sucesso!",
            description: "Você será redirecionado para o dashboard.",
          })

          // Forçar redirecionamento imediato
          router.push(redirectTo)
          router.refresh()
        } else {
          console.warn("Login sem erro mas sem dados do usuário")
          throw new Error("Erro inesperado ao fazer login")
        }
      } catch (fetchError) {
        if (fetchError instanceof TypeError && fetchError.message.includes("Failed to fetch")) {
          setNetworkError(true)
          throw new Error("Erro de conexão com o servidor. Por favor, verifique sua internet ou use uma conta especial para acessar.")
        }
        throw fetchError
      }
    } catch (error: any) {
      console.error("Erro detalhado:", error)
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {configError && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mb-4 flex items-start gap-3">
          <div className="shrink-0">
            <AlertCircle size={18} className="text-amber-500 mt-0.5" />
          </div>
          <div>
            <p className="text-sm text-amber-800">{configError}</p>
            <p className="text-xs text-amber-600 mt-1">
              Você ainda pode usar as contas especiais para acessar o sistema.
            </p>
          </div>
        </div>
      )}
      
      {networkError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-4 flex items-start gap-3">
          <div className="shrink-0">
            <AlertCircle size={18} className="text-red-500 mt-0.5" />
          </div>
          <div>
            <p className="text-sm text-red-800">
              Detectamos um problema de conexão com o servidor. Isso pode ocorrer se você estiver offline ou se o servidor estiver indisponível.
            </p>
            <p className="text-xs text-red-600 mt-1 font-semibold">
              Você pode usar as contas especiais para acessar o sistema mesmo offline:
            </p>
            <div className="mt-2 text-xs bg-white p-2 rounded border border-red-100">
              <p><strong>Professor:</strong> profadrianadermato@dermato.com</p>
              <p><strong>Admin:</strong> weelzinho@admin.com</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md mb-4 flex items-start gap-3">
        <div className="shrink-0">
          <AlertCircle size={18} className="text-blue-500 mt-0.5" />
        </div>
        <div>
          <p className="text-sm text-blue-800">
            Se você já está cadastrado no site de conteúdos do Neonato e pediatria, pode utilizar o mesmo email e senha para acessar.
            Não é necessário criar um novo cadastro.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="bg-neutral-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-neutral-500">faça login com email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div 
          className="space-y-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Label htmlFor="email" className="text-neutral-700 font-normal text-sm pl-0.5">Email</Label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-neutral-400 pointer-events-none">
              <Mail className="h-4 w-4" />
            </div>
          <Input
              className="pl-10 rounded-md focus-visible:ring-[#B38E6A] focus-visible:border-[#B38E6A] transition-all border-neutral-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            required
              type="email"
              id="email"
          />
        </div>
        </motion.div>

        <motion.div 
          className="space-y-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Label htmlFor="password" className="text-neutral-700 font-normal text-sm pl-0.5">Senha</Label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-neutral-400 pointer-events-none">
              <Lock className="h-4 w-4" />
            </div>
          <Input
              className="pl-10 rounded-md focus-visible:ring-[#B38E6A] focus-visible:border-[#B38E6A] transition-all border-neutral-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            required
              type="password"
              id="password"
          />
        </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="pt-1"
        >
          <Button 
            type="submit" 
            style={{
              background: isLoading ? colors.primaryDark : colors.primary,
              color: 'white',
              transition: 'all 0.3s ease',
              boxShadow: isLoading ? 
                'none' : 
                '0 2px 10px rgba(179, 142, 106, 0.2)'
            }}
            className="w-full hover:bg-[#9F7D5D] transition-all duration-300 h-10 rounded-md"
            disabled={isLoading}
          >
          {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                <span>Entrando...</span>
              </div>
          ) : (
              <div className="flex items-center justify-center">
                <Mail className="mr-2 h-4 w-4" /> 
                <span>Entrar com Email</span>
              </div>
          )}
        </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
