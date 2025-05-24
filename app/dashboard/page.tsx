"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  BookOpen, 
  FileText, 
  Clock, 
  ChevronRight,
  BookOpenCheck,
  GraduationCap,
  FileCheck,
  Zap,
  Snowflake,
  Waves,
  Speaker,
  Flame,
  Scissors
} from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'

// Registrando plugins do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function DashboardPage() {
  const [progress] = useState(65)
  
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
    // Animação de entrada para os cards
    const cards = document.querySelectorAll('.stats-card')
    gsap.fromTo(cards, 
      { y: 20, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out" 
      }
    )
    
    // Animação para barra de progresso
    gsap.fromTo('.progress-bar',
      { width: 0 },
      { 
        width: '100%', 
        duration: 1, 
        ease: "power2.out",
        delay: 0.3
      }
    )
    
    // Animação para os módulos
    const moduleItems = document.querySelectorAll('.module-item')
    gsap.fromTo(moduleItems,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.4
      }
    )
    
    return () => {
      // Limpar animações ao desmontar
      ScrollTrigger.getAll().forEach(t => t.kill())
      gsap.killTweensOf('.stats-card')
      gsap.killTweensOf('.progress-bar')
      gsap.killTweensOf('.module-item')
    }
  }, [])
  
  // Array de módulos com ícones
  const modules = [
    { 
      title: "Introdução à Dermatofuncional", 
      description: "Fundamentos básicos e princípios", 
      progress: 95,
      icon: BookOpenCheck,
      color: colors.primary
    },
    { 
      title: "Radiofrequência", 
      description: "Técnicas e aplicações clínicas", 
      progress: 75,
      icon: Zap,
      color: "#E57373"
    },
    { 
      title: "Criolipólise", 
      description: "Procedimentos e cuidados específicos", 
      progress: 60,
      icon: Snowflake,
      color: "#64B5F6"
    },
    { 
      title: "Lipocavitação", 
      description: "Métodos e protocolos de tratamento", 
      progress: 45,
      icon: Waves,
      color: "#81C784"
    },
    { 
      title: "Ultrassom", 
      description: "Aplicações terapêuticas e diagnósticas", 
      progress: 30,
      icon: Speaker,
      color: "#FFB74D"
    },
    { 
      title: "Queimados", 
      description: "Tratamentos e reabilitação", 
      progress: 15,
      icon: Flame,
      color: "#F06292"
    },
    { 
      title: "Pós-operatório", 
      description: "Protocolos e cuidados especiais", 
      progress: 5,
      icon: Scissors,
      color: "#9575CD"
    }
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 p-8 pt-16 pb-16 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#B38E6A] mr-4">
                  <span className="font-medium text-lg text-white">F</span>
                </div>
                <h1 className="text-4xl font-light text-[#B38E6A] tracking-wide">
                  FisioDerma
                </h1>
              </div>
              <p className="text-neutral-500 mt-2 ml-16 text-sm">Plataforma de Fisioterapia Dermatofuncional</p>
            </motion.div>
          </div>
          
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-[#B38E6A] rounded-full"></div>
              <h2 className="text-2xl font-light text-neutral-700 tracking-wide">Dashboard</h2>
            </div>
            
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="stats-card bg-white border border-neutral-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(179, 142, 106, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1 font-medium">Conteúdos Disponíveis</p>
                    <h3 className="text-3xl font-light tracking-wide" style={{ color: colors.primary }}>7</h3>
                  </div>
                  <div className="p-3 rounded-full" style={{ backgroundColor: colors.primaryTransparent }}>
                    <BookOpen className="h-6 w-6" style={{ color: colors.primary }} />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="stats-card bg-white border border-neutral-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(179, 142, 106, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1 font-medium">Progresso Geral</p>
                    <h3 className="text-3xl font-light tracking-wide" style={{ color: colors.primary }}>{progress}%</h3>
                  </div>
                  <div className="p-3 rounded-full" style={{ backgroundColor: colors.primaryTransparent }}>
                    <GraduationCap className="h-6 w-6" style={{ color: colors.primary }} />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="stats-card bg-white border border-neutral-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(179, 142, 106, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1 font-medium">Provas Realizadas</p>
                    <h3 className="text-3xl font-light tracking-wide" style={{ color: colors.primary }}>2</h3>
                  </div>
                  <div className="p-3 rounded-full" style={{ backgroundColor: colors.primaryTransparent }}>
                    <FileCheck className="h-6 w-6" style={{ color: colors.primary }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Seção de Prova Online */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-[#B38E6A] rounded-full"></div>
              <h2 className="text-2xl font-light text-neutral-700 tracking-wide">Avaliação</h2>
            </div>
            
            <motion.div 
              className="bg-white border border-neutral-100 rounded-lg p-6 shadow-sm"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(179, 142, 106, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2 text-neutral-700">Prova de Certificação</h3>
                  <p className="text-neutral-600 mb-4">Avalie seus conhecimentos em fisioterapia dermatofuncional</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center text-sm text-neutral-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>90 minutos</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>40 questões</span>
                    </div>
                  </div>
                </div>
                <motion.button 
                  className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white bg-[#B38E6A] hover:bg-[#A47D5D] w-full md:w-auto"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 5px 15px rgba(179, 142, 106, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Iniciar Avaliação
                  <ChevronRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Módulos de Estudo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-[#B38E6A] rounded-full"></div>
              <h2 className="text-2xl font-light text-neutral-700 tracking-wide">Módulos de Estudo</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {modules.map((module, index) => (
                <motion.div 
                  key={index}
                  className="module-item bg-white border border-neutral-100 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 25px rgba(179, 142, 106, 0.1)",
                    borderColor: module.color,
                    borderLeftWidth: "4px"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="p-2.5 rounded-md mr-4" 
                      style={{ backgroundColor: `${module.color}20` }} // Cor com transparência
                    >
                      <module.icon className="h-5 w-5" style={{ color: module.color }} />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-700">{module.title}</h3>
                      <p className="text-sm text-neutral-500">{module.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-neutral-500">Progresso</span>
                    <span className="text-xs font-medium" style={{ color: module.color }}>{module.progress}%</span>
                  </div>
                  
                  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                    <motion.div 
                      className="progress-bar h-full absolute left-0 top-0 rounded-full"
                      style={{ backgroundColor: module.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${module.progress}%` }}
                      transition={{ duration: 1, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                    />
      </div>

                  <motion.button 
                    className="mt-4 w-full inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-medium border border-neutral-200 hover:bg-neutral-50 transition-colors duration-200"
                    whileHover={{ 
                      borderColor: module.color,
                      color: module.color,
                      backgroundColor: `${module.color}10`
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continuar Estudos
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
