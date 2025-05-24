"use client"

import type React from "react"

import { useState } from "react"
import { useSupabase } from "@/lib/supabase/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Loader2, CheckCircle, Mail } from "lucide-react"

// Cores em tons bege/nude refinados
const colors = {
  primary: '#B38E6A',           // Bege escuro / Nude
  primaryLight: '#D9C5B2',      // Versão mais clara
  primaryLighter: '#F8F3EE',    // Versão ainda mais clara para backgrounds
  primaryDark: '#9F7D5D',       // Versão mais escura
  accentGold: '#D4B78F',        // Tom dourado para acentos
}

export function PasswordResetForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { supabase } = useSupabase()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Verificar se o cliente Supabase está disponível
      if (!supabase) {
        // Modo de demonstração - simular recuperação de senha
        setTimeout(() => {
          setIsSuccess(true)
          toast({
            title: "Modo de demonstração",
            description: "Em um ambiente real, um email seria enviado para redefinir sua senha.",
          })
        }, 1500)
        return
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/atualizar-senha`,
      })

      if (error) {
        throw error
      }

      setIsSuccess(true)
      toast({
        title: "Email enviado com sucesso!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      })
    } catch (error: any) {
      toast({
        title: "Erro ao enviar email",
        description: error.message || "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center py-4"
      >
        <CheckCircle 
          className="mx-auto h-16 w-16 mb-5" 
          style={{ color: colors.primary }}
        />
        <h3 
          className="text-xl font-medium mb-3"
          style={{ color: colors.primary }}
        >
          Email enviado!
        </h3>
        <p className="text-neutral-600 text-sm">
          Enviamos um link para <span className="font-medium">{email}</span>. 
          <br />Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
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
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
            className="pl-10 rounded-md focus-visible:ring-[#B38E6A] focus-visible:border-[#B38E6A] transition-all border-neutral-200"
        />
      </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
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
              <span>Enviando...</span>
            </div>
        ) : (
            <div className="flex items-center justify-center">
              <Mail className="mr-2 h-4 w-4" /> 
              <span>Enviar link de recuperação</span>
            </div>
        )}
      </Button>
      </motion.div>
    </motion.form>
  )
}
