"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Loader2, Mail, Lock, User, AlertCircle } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { Separator } from "@/components/ui/separator"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Cores em tons bege/nude refinados
const colors = {
  primary: '#B38E6A',           // Bege escuro / Nude
  primaryLight: '#D9C5B2',      // Versão mais clara
  primaryLighter: '#F8F3EE',    // Versão ainda mais clara para backgrounds
  primaryDark: '#9F7D5D',       // Versão mais escura
  accentGold: '#D4B78F',        // Tom dourado para acentos
}

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { supabase: providerSupabase } = useSupabase()
  const [supabase, setSupabase] = useState(providerSupabase)
  const router = useRouter()
  const { toast } = useToast()
  
  // Tentar criar um cliente Supabase diretamente se o provider não fornecer um
  useEffect(() => {
    const initializeDirectSupabase = async () => {
      if (!providerSupabase) {
        try {
          console.log("Tentando criar cliente Supabase diretamente")
          const directClient = createClientComponentClient()
          setSupabase(directClient)
          console.log("Cliente Supabase criado diretamente")
        } catch (error) {
          console.error("Erro ao criar cliente Supabase diretamente:", error)
        }
      }
    }
    
    initializeDirectSupabase()
  }, [providerSupabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)

    try {
      // Usar conta especial se não for possível registrar via Supabase
      if (!supabase) {
        console.log("Supabase não disponível, criando conta especial")
        // Criar uma conta "especial" localmente
        localStorage.setItem(
          "specialUser",
          JSON.stringify({
            email,
            name,
            role: "basic",
            isSpecialUser: true,
            createdAt: new Date().toISOString(),
          })
        )
        
        setTimeout(() => {
          toast({
            title: "Conta criada com sucesso",
            description: "Você foi registrado em modo offline. Algumas funcionalidades podem estar limitadas.",
          })
          router.push("/login")
        }, 1500)
        return
      }

      console.log("Iniciando registro com Supabase")
      
      // Registrar o usuário
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "basic" // Definir role nos metadados do usuário
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        },
      })

      if (authError) {
        console.error("Erro ao registrar usuário:", authError)
        // Traduzir mensagens de erro comuns
        let mensagem = "Erro ao registrar conta. Por favor, tente novamente."
        
        if (authError.message.includes("email") && authError.message.includes("taken")) {
          mensagem = "Este email já está em uso. Tente fazer login ou recuperar sua senha."
        } else if (authError.message.includes("password") && authError.message.includes("length")) {
          mensagem = "A senha deve ter pelo menos 6 caracteres."
        }
        
        throw new Error(mensagem)
      }

      if (!authData.user) {
        throw new Error("Falha ao criar usuário")
      }

      console.log("Usuário registrado com sucesso:", authData.user.id)

      // Inserir perfil do usuário na tabela user_profiles
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          id: authData.user.id,
          name: name,
          email: email,
          role: "basic",
          created_at: new Date().toISOString()
        });

      // Se houver erro ao criar o perfil, tente criar na tabela profiles (fallback)
      if (profileError) {
        console.warn("Erro ao inserir em user_profiles, tentando tabela profiles:", profileError)
        
        try {
          const { error: oldProfileError } = await supabase
            .from("profiles")
            .insert({
              id: authData.user.id,
              name: name,
              email: email,
              role: "basic"
            });
            
          if (oldProfileError) {
            console.error("Erro ao inserir perfil na tabela profiles:", oldProfileError)
            // Não lançamos erro aqui, pois o usuário já foi criado na Auth
          }
        } catch (err) {
          console.error("Erro ao tentar inserir na tabela profiles:", err)
        }
      }

      toast({
        title: "Registro realizado com sucesso!",
        description: "Verifique seu email para confirmar sua conta.",
      })

      // Redirecionar para página de login
      router.push("/login")
    } catch (error: any) {
      console.error("Erro no processo de registro:", error)
      setErrorMsg(error.message || "Ocorreu um erro ao criar sua conta.")
      toast({
        title: "Erro ao registrar",
        description: error.message || "Ocorreu um erro ao criar sua conta.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true)
    setErrorMsg(null)
    
    try {
      if (!supabase) {
        throw new Error("Supabase não está disponível")
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error("Erro ao registrar com Google:", error)
      setErrorMsg(error.message || "Ocorreu um erro ao tentar registrar com Google.")
      toast({
        title: "Erro ao registrar com Google",
        description: error.message || "Ocorreu um erro ao tentar registrar com Google.",
        variant: "destructive",
      })
      setIsGoogleLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {errorMsg && (
        <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-md">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
            <p className="text-sm text-red-800">{errorMsg}</p>
          </div>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 border-neutral-200 hover:border-[#B38E6A] hover:bg-[#F8F3EE] transition-all duration-200 h-10 rounded-md"
        onClick={handleGoogleSignUp}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? 
          <Loader2 className="h-4 w-4 animate-spin" /> : 
          <FcGoogle className="h-5 w-5" />
        }
        <span className="font-normal">
        {isGoogleLoading ? "Conectando..." : "Continuar com Google"}
        </span>
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="bg-neutral-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-neutral-500">ou continue com email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div 
          className="space-y-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Label htmlFor="name" className="text-neutral-700 font-normal text-sm pl-0.5">Nome completo</Label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-neutral-400 pointer-events-none">
              <User className="h-4 w-4" />
            </div>
          <Input
              className="pl-10 rounded-md focus-visible:ring-[#B38E6A] focus-visible:border-[#B38E6A] transition-all border-neutral-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
            required
              type="text"
              id="name"
          />
        </div>
        </motion.div>

        <motion.div 
          className="space-y-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
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
          transition={{ duration: 0.4, delay: 0.3 }}
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
            minLength={6}
          />
        </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
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
                <Loader2 className="h-5 w-5 animate-spin mr-2" /> 
                <span>Registrando...</span>
              </div>
            ) : (
              "Criar conta"
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
