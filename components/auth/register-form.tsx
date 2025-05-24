"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Loader2, Mail, Lock, User } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { Separator } from "@/components/ui/separator"

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
  const { supabase } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Verificar se o cliente Supabase está disponível
      if (!supabase) {
        // Modo de demonstração - simular registro
        setTimeout(() => {
          toast({
            title: "Modo de demonstração",
            description: "Registro simulado. Em um ambiente real, você seria registrado no Supabase.",
          })
          router.push("/login")
        }, 1500)
        return
      }

      // Registrar o usuário
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (authError) {
        throw authError
      }

      if (authData.user) {
        // Criar perfil do usuário com papel padrão
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          name,
          email,
          role: "basic", // Papel padrão
        })

        if (profileError) {
          throw profileError
        }
      }

      toast({
        title: "Registro realizado com sucesso!",
        description: "Verifique seu email para confirmar sua conta.",
      })

      router.push("/login")
    } catch (error: any) {
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                <span>Registrando...</span>
              </div>
          ) : (
              <div className="flex items-center justify-center">
                <Mail className="mr-2 h-4 w-4" /> 
                <span>Criar conta</span>
              </div>
          )}
        </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}
