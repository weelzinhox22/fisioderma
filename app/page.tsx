"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, User } from "lucide-react"

export default function Home() {
  const handleAccessDashboard = () => {
    // Simular login bem-sucedido armazenando dados de usuário no localStorage
    localStorage.setItem("userData", JSON.stringify({
      id: "user-123",
      email: "usuario@exemplo.com",
      role: "user"
    }))
    
    // Criar cookie para o middleware
    document.cookie = `specialUser=true; path=/; max-age=${60*60*24*30}; SameSite=Lax`;
    
    // Redirecionar para o dashboard
    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Vídeo de fundo com overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero/hero-poster.jpg"
        >
          <source src="/images/hero/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Conteúdo principal centralizado */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 relative z-10 pt-16">
        <div className="max-w-5xl w-full">
          {/* Logo e título com espaçamento reduzido */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#B38E6A] to-[#8A6D50] shadow-lg flex items-center justify-center">
                <span className="font-bold text-2xl text-white">F</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              Fisioterapia <span className="text-[#D4B78F]">Dermatofuncional</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto drop-shadow mb-8">
              Plataforma completa de estudos para profissionais e estudantes da área
            </p>
          </div>
          
          {/* Painel de acesso */}
          <div 
            className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-[#D9C5B2]/30 max-w-2xl mx-auto"
          >
            <h3 className="text-center text-lg font-semibold text-[#7D6A4F] mb-4">Acesso Rápido</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Botão de acesso para alunos */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B38E6A] to-[#D4B78F] rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                <Button 
                  onClick={handleAccessDashboard}
                  className="relative bg-white hover:bg-gray-50 text-[#B38E6A] px-4 py-4 h-auto rounded-xl flex items-center gap-3 w-full border border-[#D9C5B2]/20"
                >
                  <div className="bg-gradient-to-br from-[#B38E6A] to-[#D4B78F] p-2 rounded-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-semibold block text-sm sm:text-base">Área do Aluno</span>
                    <span className="text-xs text-gray-500">Acesso aos conteúdos</span>
                  </div>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              
              {/* Botão de acesso para professores */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9F7D5D] to-[#B38E6A] rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                <Button 
                  onClick={() => window.location.href = "/banco-questoes-login"}
                  className="relative bg-white hover:bg-gray-50 text-[#9F7D5D] px-4 py-4 h-auto rounded-xl flex items-center gap-3 w-full border border-[#D9C5B2]/20"
                >
                  <div className="bg-gradient-to-br from-[#9F7D5D] to-[#B38E6A] p-2 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-semibold block text-sm sm:text-base">Área do Professor</span>
                    <span className="text-xs text-gray-500">Banco de questões</span>
                  </div>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rodapé simples com altura reduzida */}
      <div className="h-16 md:h-10 py-4 md:py-0 flex items-center justify-center relative z-10">
        <p className="text-center text-white/80 text-xs">
          © {new Date().getFullYear()} Fisioterapia Dermatofuncional
        </p>
      </div>
    </main>
  )
}
