"use client"

import { LoginForm } from "@/components/auth/login-form"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AlertCircle } from "lucide-react"

// Cores em tons bege/nude refinados
const colors = {
  primary: '#B38E6A',           // Bege escuro / Nude
  primaryLight: '#D9C5B2',      // Versão mais clara
  primaryLighter: '#F8F3EE',    // Versão ainda mais clara para backgrounds (ajustado para mais branco)
  primaryDark: '#9F7D5D',       // Versão mais escura
  accentGold: '#D4B78F',        // Tom dourado para acentos
}

// Componente de carregamento para o Suspense
function LoginFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-md w-full"></div>
      <div className="h-5 bg-gray-200 rounded-md w-full"></div>
      <div className="h-10 bg-gray-200 rounded-md w-full"></div>
      <div className="h-10 bg-gray-200 rounded-md w-full"></div>
    </div>
  )
}

// Componente para mensagem de erro de conexão
function ConnectionErrorMessage() {
  const searchParams = useSearchParams()
  const [connectionError, setConnectionError] = useState(false)
  
  useEffect(() => {
    // Verificar se há erro de conexão na URL
    const error = searchParams.get("error")
    
    // Removido temporariamente para evitar falsos positivos
    // if (error === "connection") {
    //   setConnectionError(true)
    // }
    
    // Agora só mostramos o erro se explicitamente solicitado e após verificação
    if (error === "connection") {
      // Verificar se realmente há um problema de conexão
      fetch('/api/health-check')
        .then(response => {
          // Se conseguir conectar, não mostrar erro
          setConnectionError(false)
        })
        .catch(err => {
          // Só mostrar erro se realmente não conseguir conectar
          setConnectionError(true)
        })
    }
  }, [searchParams])

  if (!connectionError) return null;
  
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-md mb-4 flex items-start gap-3">
      <div className="shrink-0">
        <AlertCircle size={18} className="text-red-500 mt-0.5" />
      </div>
      <div>
        <p className="text-sm text-red-800">
          Detectamos um problema de conexão com o servidor. Isso pode ocorrer se você estiver offline ou se o servidor estiver indisponível.
        </p>
        <p className="text-xs text-red-600 mt-1 font-semibold">
          Você pode usar as contas especiais para acessar o sistema mesmo offline.
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div 
      className="h-screen flex flex-col overflow-hidden relative bg-white"
    >
      {/* Background com animação */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradiente de fundo */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primaryLighter} 0%, #FFFFFF 100%)`,
          }}
        />
        
        {/* Padrão animado - círculos sutis */}
        <div 
          className="absolute inset-0 opacity-[0.04] animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle, ${colors.primary} 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            animationDuration: '6s'
          }}
        />

        {/* Círculo decorativo superior */}
        <div 
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.primaryLight}20 0%, transparent 70%)`,
            animation: 'float 20s infinite ease-in-out'
          }}
        />
        
        {/* Círculo decorativo inferior */}
        <div 
          className="absolute -bottom-40 -right-20 w-[30rem] h-[30rem] rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.primaryLight}15 0%, transparent 70%)`,
            animation: 'float 25s infinite ease-in-out reverse'
          }}
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Conteúdo centralizado */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 py-0 relative z-10">
          <div className="text-center mb-6">
            <h1 
              className="text-3xl font-light tracking-tight"
              style={{ color: colors.primary }}
            >
              Entrar
            </h1>
            <p className="text-neutral-600 mt-1 font-light text-sm">
              Acesse sua conta para continuar
            </p>
          </div>

          <Suspense fallback={<div className="p-3 bg-gray-50 border border-gray-200 rounded-md mb-4">Carregando...</div>}>
            <ConnectionErrorMessage />
          </Suspense>

          <div 
            className="p-7 rounded-xl shadow-lg backdrop-blur-sm bg-white/95"
            style={{ 
              boxShadow: `0 10px 30px rgba(179, 142, 106, 0.08), 0 2px 8px rgba(0, 0, 0, 0.03)`,
              borderTop: `3px solid ${colors.primary}`
            }}
          >
            <Suspense fallback={<LoginFormSkeleton />}>
              <LoginForm />
            </Suspense>

            <div className="mt-5 text-center text-sm">
              <p className="text-neutral-600">
                Não tem uma conta?{" "}
                <Link 
                  href="/registro" 
                  className="hover:underline transition-colors font-medium"
                  style={{ color: colors.primary }}
                >
                  Registre-se
                </Link>
              </p>
              <Link 
                href="/recuperar-senha" 
                className="hover:underline inline-block mt-1 transition-colors"
                style={{ color: colors.primary }}
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CSS para animações */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.03);
          }
        }
        
        body {
          background-color: white;
        }
      `}</style>
    </div>
  )
}
