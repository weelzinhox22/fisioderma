"use client"

import { LoginForm } from "@/components/auth/login-form"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Suspense } from "react"

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
