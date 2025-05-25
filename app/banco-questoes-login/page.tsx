"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { BookOpen, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, CheckCircle, Eye, EyeOff, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function BancoQuestoesLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Verificação simplificada de credenciais para demonstração
    if (email.endsWith("@dermato.com") && password.length >= 8) {
      setIsSuccess(true)
      
      // Extrair nome de usuário do email
      const username = email.split('@')[0];
      const nameToDisplay = username.charAt(0).toUpperCase() + username.slice(1);
      setDisplayName(nameToDisplay);
      
      // Armazenar dados do usuário no localStorage
      localStorage.setItem("specialUser", JSON.stringify({
        email: email,
        name: nameToDisplay,
        role: "professor",
        isSpecialUser: true,
      }))
      
      // Criar cookie para o middleware
      document.cookie = `specialUser=true; path=/; max-age=${60*60*24*30}; SameSite=Lax`;
      
      // Aguardar um pouco para mostrar a animação de sucesso
      setTimeout(() => {
        // Redirecionar para o banco de questões
        window.location.href = "/banco-questoes";
      }, 1500);
    } else {
      setError("Email ou senha incorretos. O email deve terminar com @dermato.com e a senha deve ter pelo menos 8 caracteres.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F3EE] via-white to-[#F8F3EE]">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-[#B38E6A] to-[#9F7D5D] p-4 rounded-2xl shadow-lg">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-bold text-[#7D6A4F]">Acesso Exclusivo</h1>
            <h2 className="text-2xl font-semibold text-[#B38E6A] mt-1">Banco de Questões</h2>
            <p className="mt-3 text-gray-600">Área restrita para professores autorizados</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-xl border border-[#D9C5B2]/30">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">Acesso Autorizado</h3>
                <p className="text-gray-600 text-center mb-4">Bem-vindo(a), {displayName}!</p>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3">Redirecionando...</p>
              </motion.div>
            ) : (
              <>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-md flex items-start gap-3"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#B38E6A]" />
                      <span>Email</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu email de acesso"
                        className="border-gray-300 focus:border-[#B38E6A] focus:ring-[#B38E6A] pl-4"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-[#B38E6A]" />
                      <span>Senha</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••••••"
                        className="border-gray-300 focus:border-[#B38E6A] focus:ring-[#B38E6A] pl-4 pr-10"
                        required
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center flex-wrap gap-2">
                      Esqueceu a senha? Entre em contato pelo WhatsApp:
                      <a 
                        href="https://wa.me/5571991373142?text=Olá,%20preciso%20de%20ajuda%20com%20o%20acesso%20ao%20banco%20de%20questões." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium hover:from-green-600 hover:to-green-700 transition-colors shadow-sm"
                      >
                        <MessageCircle className="h-3 w-3" />
                        <span>Abrir WhatsApp</span>
                        <span className="font-normal opacity-90">(71 99137-3142)</span>
                      </a>
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#B38E6A] to-[#9F7D5D] hover:from-[#9F7D5D] hover:to-[#8A6D50] text-white py-6 h-auto rounded-lg flex items-center justify-center gap-2 shadow-md"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Verificando...</span>
                        </div>
                      ) : (
                        <>
                          <ShieldCheck className="h-5 w-5" />
                          <span>Acessar Banco de Questões</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <Link href="/" className="text-[#B38E6A] hover:text-[#9F7D5D] text-sm flex items-center justify-center gap-1">
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Voltar para a página inicial</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Acesso restrito a profissionais autorizados.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 