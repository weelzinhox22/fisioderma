"use client"

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  BookOpen, 
  ChevronRight,
  Snowflake,
  Waves,
  Speaker,
  Flame,
  Zap,
  FileText,
  Info,
  GraduationCap
} from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Registrando plugins do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function DashboardPage() {
  // Definindo as cores principais em tons bege/nude
  const colors = {
    primary: '#B38E6A',
    primaryLight: '#D9C5B2',
    primaryTransparent: 'rgba(179, 142, 106, 0.2)',
    primaryDark: '#8A6D50',
    text: '#735E44',
  }

  // Efeito para animações GSAP
  useEffect(() => {
    // Animação para elementos da página
    const animatedElements = document.querySelectorAll('.animate-item')
    gsap.fromTo(animatedElements,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2
      }
    )
    
    return () => {
      // Limpar animações ao desmontar
      ScrollTrigger.getAll().forEach(t => t.kill())
      gsap.killTweensOf('.animate-item')
    }
  }, [])
  
  // Array de módulos com ícones
  const modules = [
    { 
      title: "Criolipólise", 
      description: "Resfriamento Controlado para Redução de Gordura Localizada", 
      icon: Snowflake,
      color: "#64B5F6",
      link: "/conteudos/criolise"
    },
    { 
      title: "Lipocavitação", 
      description: "Técnica de ultrassom para redução de gordura localizada", 
      icon: Waves,
      color: "#81C784",
      link: "/conteudos/lipocavitacao"
    },
    { 
      title: "Ultrassom", 
      description: "Fundamentos e Aplicações na Fisioterapia Dermatofuncional", 
      icon: Speaker,
      color: "#FFB74D",
      link: "/conteudos/ultrassom"
    },
    { 
      title: "Queimados", 
      description: "Fisioterapia Dermatofuncional para Tratamento de Queimaduras", 
      icon: Flame,
      color: "#F06292",
      link: "/conteudos/queimados"
    },
    { 
      title: "Radiofrequência", 
      description: "Tecnologia para tratamento de flacidez e rejuvenescimento", 
      icon: Zap,
      color: "#E57373",
      link: "/conteudos/radiofrequencia"
    }
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#F7F2EB]/50 to-white">
      <DashboardSidebar />
      
      <div className="flex-1 p-6 pt-16 pb-16 overflow-auto w-full mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center">
                <h1 className="text-4xl font-medium text-[#8A6D50] tracking-wide">
                  Dashboard
                </h1>
              </div>
              <p className="text-neutral-500 mt-3 text-base">Bem-vindo à plataforma de Fisioterapia Dermatofuncional</p>
            </motion.div>
          </div>

          {/* Aviso sobre origem do conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-10 bg-[#F7F2EB] border border-[#D9C5B2] rounded-lg p-6 shadow-sm animate-item"
          >
            <div className="flex items-start md:items-center gap-4">
              <Info className="h-7 w-7 text-[#B38E6A] flex-shrink-0 mt-0.5 md:mt-0" />
              <p className="text-base md:text-lg text-[#8A6D50]">
                <span className="font-medium">Importante:</span> Todos os conteúdos disponíveis nesta plataforma foram retirados dos slides da professora Adriana Dias, sendo utilizados para fins educacionais.
              </p>
            </div>
          </motion.div>

          {/* Destaque principal - Avaliação de Conhecimentos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-10 bg-white border border-[#D9C5B2] rounded-lg shadow-md overflow-hidden animate-item"
          >
            <div className="bg-[#B38E6A]/10 p-6 border-b border-[#D9C5B2]">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center">
                  <div className="p-3.5 rounded-full bg-[#B38E6A]/20 mr-3">
                    <GraduationCap className="h-8 w-8 text-[#B38E6A]" />
                  </div>
                  <h2 className="text-2xl font-medium text-[#8A6D50]">
                    Avaliação de Conhecimentos
                  </h2>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-medium text-[#8A6D50] mb-4">
                Avaliação de Conhecimentos Gerais em Fisioterapia Dermatofuncional
              </h3>
              
              <div className="flex flex-col space-y-4">
                <p className="text-neutral-600">
                  Esta avaliação contém 40 questões que abrangem os principais temas estudados em Fisioterapia Dermatofuncional, incluindo:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-2">
                  <li>Criolipólise</li>
                  <li>Lipocavitação</li>
                  <li>Ultrassom</li>
                  <li>Radiofrequência</li>
                  <li>Tratamento de Queimados</li>
                </ul>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                  <div className="flex items-center text-neutral-500 text-sm">
                    <FileText className="h-4 w-4 mr-2 text-[#B38E6A]" />
                    <span>40 questões de múltipla escolha</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link href="/dashboard/provas/exame">
                    <Button className="bg-[#B38E6A] hover:bg-[#8A6D50] text-white px-6 py-2.5 h-auto text-base">
                      Iniciar Avaliação
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Módulos de Conteúdo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-1.5 bg-[#B38E6A] rounded-full"></div>
              <h2 className="text-2xl font-medium text-[#8A6D50] tracking-wide">Conteúdos Disponíveis</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {modules.map((module, index) => (
                <Link href={module.link} key={index} className="block h-full">
                  <motion.div 
                    className="animate-item bg-white border border-neutral-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full"
                    whileHover={{ 
                      y: -3, 
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
                      borderColor: module.color,
                      borderLeftWidth: "3px"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-full" style={{ backgroundColor: `${module.color}15` }}>
                        <module.icon className="h-6 w-6" style={{ color: module.color }} />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-base font-medium text-neutral-700">{module.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{module.description}</p>
                    
                    <div className="flex justify-end">
                      <div className="flex items-center text-sm font-medium text-[#B38E6A]">
                        <span>Ver conteúdo</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Informações adicionais */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white border border-[#D9C5B2] rounded-lg p-7 shadow-sm animate-item mb-6"
          >
            <h3 className="text-xl font-medium text-[#8A6D50] mb-5 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-[#B38E6A]" />
              Sobre a Avaliação
            </h3>
            
            <div className="space-y-4 text-neutral-600">
              <p className="leading-relaxed">
                A avaliação foi desenvolvida para testar seus conhecimentos nos principais temas abordados
                no curso de Fisioterapia Dermatofuncional.
              </p>
              
              <p className="leading-relaxed">
                Você deverá responder cada questão antes de prosseguir para a próxima. Ao final, será exibida
                sua pontuação e um resumo do seu desempenho em cada tema.
              </p>
              
              <p className="leading-relaxed">
                Recomendamos que reserve um tempo adequado para completar a avaliação sem interrupções, 
                pois não é possível salvar seu progresso parcial.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
