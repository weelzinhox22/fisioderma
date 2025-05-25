"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, User, HelpCircle, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

// Interface para os passos do tour
interface TourStep {
  target: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

export default function Home() {
  const [tourStep, setTourStep] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const targetRefs = useRef<{[key: string]: DOMRect | null}>({})
  
  // Detectar se o dispositivo é móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  
  // Definir os passos do tour guiado
  const tourSteps: TourStep[] = [
    {
      target: '.site-navbar',
      content: 'Use o botão de menu para navegar pelo site e acessar todas as seções disponíveis.',
      placement: isMobile ? 'bottom' : 'bottom',
    },
    {
      target: '.student-area',
      content: 'Acesse a área do aluno para visualizar os conteúdos e provas disponíveis.',
      placement: isMobile ? 'bottom' : 'right',
    },
    {
      target: '.teacher-area',
      content: 'Professores podem acessar o banco de questões para gerenciar as avaliações.',
      placement: isMobile ? 'bottom' : 'left',
    }
  ]
  
  // Posicionar o tooltip próximo ao elemento alvo
  useEffect(() => {
    if (tourStep === null || !tooltipRef.current) return;
    
    const currentStep = tourSteps[tourStep];
    const targetElement = document.querySelector(currentStep.target);
    
    if (!targetElement) return;
    
    const targetRect = targetElement.getBoundingClientRect();
    targetRefs.current[currentStep.target] = targetRect;
    
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    let top = 0, left = 0;
    
    switch (currentStep.placement) {
      case 'top':
        top = targetRect.top - tooltipRect.height - 10;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = targetRect.bottom + 10;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.left - tooltipRect.width - 10;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.right + 10;
        break;
    }
    
    // Ajustes para garantir que fique visível na tela
    if (left < 20) left = 20;
    if (left + tooltipRect.width > window.innerWidth - 20) {
      left = window.innerWidth - tooltipRect.width - 20;
    }
    if (top < 20) top = 20;
    if (top + tooltipRect.height > window.innerHeight - 20) {
      top = window.innerHeight - tooltipRect.height - 20;
    }
    
    tooltipRef.current.style.top = `${top}px`;
    tooltipRef.current.style.left = `${left}px`;
  }, [tourStep, tourSteps]);
  
  // Iniciar o tour
  const startTour = () => {
    setTourStep(0);
    localStorage.setItem("tourStarted", "true");
  };
  
  // Avançar para o próximo passo
  const nextStep = () => {
    if (tourStep !== null && tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      endTour();
    }
  };
  
  // Voltar para o passo anterior
  const prevStep = () => {
    if (tourStep !== null && tourStep > 0) {
      setTourStep(tourStep - 1);
    }
  };
  
  // Finalizar o tour
  const endTour = () => {
    setTourStep(null);
    localStorage.setItem("tourCompleted", "true");
  };

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
      {/* Tour Guiado Personalizado */}
      <AnimatePresence>
        {tourStep !== null && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[9999] bg-white rounded-xl shadow-xl p-4 w-[300px] max-w-[90vw]"
            style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
          >
            <button 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={endTour}
            >
              <X size={16} />
            </button>
            
            <div className="mb-4">
              <p className="text-gray-800">{tourSteps[tourStep].content}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-500">
                  {tourStep + 1} de {tourSteps.length}
                </span>
              </div>
              
              <div className="flex gap-2">
                {tourStep > 0 && (
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="px-3 py-1 h-8 text-[#B38E6A] border-[#B38E6A]/30 hover:bg-[#B38E6A]/10"
                  >
                    Anterior
                  </Button>
                )}
                
                <Button
                  onClick={nextStep}
                  className="px-3 py-1 h-8 bg-[#B38E6A] hover:bg-[#9F7D5D]"
                >
                  {tourStep < tourSteps.length - 1 ? 'Próximo' : 'Concluir'}
                  {tourStep < tourSteps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão do Tour */}
      <button 
        className="fixed bottom-6 right-6 z-50 bg-[#B38E6A] text-white p-3 rounded-full shadow-lg hover:bg-[#9F7D5D] transition-colors duration-300"
        onClick={startTour}
        aria-label="Iniciar tour guiado"
      >
        <HelpCircle className="h-6 w-6" />
      </button>
      
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
      
      {/* Navbar com classe para o tour */}
      <div className="site-navbar">
        <Navbar />
      </div>
      
      {/* Conteúdo principal centralizado - Melhorado para mobile */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 relative z-10 pt-24 md:pt-16">
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
          
          {/* Painel de acesso - Melhorado para mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-[#D9C5B2]/30 max-w-2xl mx-auto"
          >
            <h3 className="text-center text-lg font-semibold text-[#7D6A4F] mb-4">Acesso Rápido</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Botão de acesso para alunos */}
              <div className="relative group student-area">
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
              <div className="relative group teacher-area">
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
          </motion.div>
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
