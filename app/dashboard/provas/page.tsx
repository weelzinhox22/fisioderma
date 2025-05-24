"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  FileText, 
  Clock, 
  Calendar, 
  Award,
  CheckCircle,
  PieChart,
  Star,
  LockIcon,
  UnlockIcon,
  Timer,
  AlertCircle,
  ChevronRight,
  ArrowRight
} from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'

// Registrando plugins do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProvasPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [filterStatus, setFilterStatus] = useState("todas")
  
  // Definindo as cores principais em tons bege/nude
  const colors = {
    primary: '#B38E6A',
    primaryLight: '#D9C5B2',
    primaryTransparent: 'rgba(179, 142, 106, 0.2)',
    primaryDark: '#8A6D50',
    text: '#735E44',
    success: '#68B984',
    warning: '#FFC26F',
    error: '#F16767',
    neutral: '#9CA3AF',
  }
  
  // Filtros de status
  const statusFilters = [
    { id: "todas", label: "Todas" },
    { id: "disponivel", label: "Disponíveis", icon: UnlockIcon },
    { id: "concluida", label: "Concluídas", icon: CheckCircle },
    { id: "bloqueada", label: "Bloqueadas", icon: LockIcon },
  ]
  
  // Dados mockados para provas
  const examsMock = [
    {
      id: "1",
      title: "Avaliação de Conhecimentos Gerais em Fisioterapia Dermatofuncional",
      description: "Avaliação abrangente sobre os princípios fundamentais e aplicações práticas.",
      timeLimit: 90,
      questions: 40,
      dueDate: "15/12/2023",
      status: "disponivel",
      progress: 0,
      featured: true,
      difficulty: "Intermediário"
    },
    {
      id: "2",
      title: "Radiofrequência - Protocolos e Aplicações",
      description: "Teste seus conhecimentos sobre os princípios físicos e aplicações da radiofrequência.",
      timeLimit: 60,
      questions: 30,
      dueDate: "20/12/2023",
      status: "disponivel",
      progress: 0,
      featured: true,
      difficulty: "Avançado"
    },
    {
      id: "3",
      title: "Fundamentos da Criolipólise",
      description: "Avaliação básica sobre os princípios e procedimentos da criolipólise.",
      timeLimit: 45,
      questions: 25,
      dueDate: "10/12/2023",
      status: "concluida",
      progress: 100,
      score: 92,
      featured: false,
      difficulty: "Básico",
      completedAt: "05/12/2023"
    },
    {
      id: "4",
      title: "Lipocavitação e Ultrassom",
      description: "Avaliação sobre técnicas de lipocavitação e uso de ultrassom terapêutico.",
      timeLimit: 60,
      questions: 35,
      dueDate: "22/12/2023",
      status: "concluida",
      progress: 100,
      score: 78,
      featured: false,
      difficulty: "Intermediário",
      completedAt: "03/12/2023"
    },
    {
      id: "5",
      title: "Certificação em Tratamento de Queimados",
      description: "Avaliação completa para certificação na especialidade de tratamento de queimados.",
      timeLimit: 120,
      questions: 50,
      dueDate: "05/01/2024",
      status: "bloqueada",
      progress: 0,
      featured: false,
      difficulty: "Avançado",
      prerequisite: "Concluir o módulo de Queimados"
    },
    {
      id: "6",
      title: "Protocolos Pós-Operatórios",
      description: "Avaliação sobre procedimentos e cuidados no tratamento pós-operatório.",
      timeLimit: 75,
      questions: 40,
      dueDate: "28/12/2023",
      status: "bloqueada",
      progress: 0,
      featured: false,
      difficulty: "Intermediário",
      prerequisite: "Concluir o módulo de Pós-operatório"
    },
  ]
  
  // Filtragem das provas com base no status selecionado
  const filteredExams = examsMock.filter(exam => {
    if (filterStatus === "todas") return true;
    return exam.status === filterStatus;
  });
  
  // Provas em destaque
  const featuredExams = examsMock.filter(exam => exam.featured && exam.status === "disponivel");
  
  // Provas concluídas
  const completedExams = examsMock.filter(exam => exam.status === "concluida");
  
  // Efeito para animações GSAP
  useEffect(() => {
    if (pageRef.current) {
      // Animação do cabeçalho
      gsap.fromTo(
        ".exam-header", 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      
      // Animação dos filtros
      gsap.fromTo(
        ".filter-item", 
        { opacity: 0, y: 10 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.08, 
          ease: "power2.out",
          delay: 0.2
        }
      );
      
      // Animação dos cards de destaque
      gsap.fromTo(
        ".featured-exam", 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.15, 
          ease: "power2.out",
          delay: 0.4
        }
      );
      
      // Animação da lista de provas
      gsap.fromTo(
        ".exam-item", 
        { opacity: 0, scale: 0.95 }, 
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.08, 
          ease: "power2.out",
          delay: 0.6
        }
      );
      
      // Animação do gráfico de desempenho
      gsap.fromTo(
        ".performance-chart", 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out",
          delay: 0.5
        }
      );
    }
    
    return () => {
      // Limpar animações ao desmontar
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(".exam-header");
      gsap.killTweensOf(".filter-item");
      gsap.killTweensOf(".featured-exam");
      gsap.killTweensOf(".exam-item");
      gsap.killTweensOf(".performance-chart");
    }
  }, [filterStatus]);
  
  return (
    <div className="flex min-h-screen bg-gray-50" ref={pageRef}>
      <DashboardSidebar />
      
      <div className="flex-1 p-8 pt-16 pb-16 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho da página */}
          <div className="exam-header mb-12">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#B38E6A] mr-4">
                <span className="font-medium text-lg text-white">F</span>
              </div>
              <h1 className="text-4xl font-light text-[#B38E6A] tracking-wide">
                FisioDerma
              </h1>
            </div>
            <p className="text-neutral-500 mt-2 ml-16 text-sm">Plataforma de Fisioterapia Dermatofuncional</p>
          </div>
          
          {/* Título da seção */}
          <div className="exam-header flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-[#B38E6A] rounded-full"></div>
            <h2 className="text-2xl font-light text-neutral-700 tracking-wide">Provas</h2>
          </div>
          
          {/* Filtros de status */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-3">
              {statusFilters.map((filter, index) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setFilterStatus(filter.id)}
                  className={`filter-item px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-200 ${
                    filterStatus === filter.id 
                      ? 'bg-[#B38E6A] text-white shadow-md' 
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                  whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  whileTap={{ y: 0 }}
                >
                  {filter.icon && <filter.icon className="h-4 w-4" />}
                  <span>{filter.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Provas em destaque */}
          {filterStatus === "todas" && featuredExams.length > 0 && (
            <div className="mb-12">
              <h3 className="exam-header text-xl font-light mb-5 text-neutral-700 tracking-wide flex items-center">
                <Star className="h-5 w-5 mr-2 text-[#B38E6A]" />
                Provas em Destaque
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredExams.map((exam, index) => (
                  <motion.div
                    key={exam.id}
                    className="featured-exam bg-white border border-neutral-100 rounded-lg shadow-sm overflow-hidden"
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 25px rgba(179, 142, 106, 0.1)"
                    }}
                  >
                    <div className="bg-gradient-to-r from-[#B38E6A] to-[#D9C5B2] h-2" />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-medium text-neutral-800 flex-1">{exam.title}</h3>
                        <span className="px-2 py-1 bg-[#B38E6A20] text-[#B38E6A] text-xs font-medium rounded">
                          {exam.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-neutral-600 text-sm mb-6">{exam.description}</p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center text-neutral-500 text-sm">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{exam.timeLimit} min</span>
                          </div>
                          <div className="flex items-center text-neutral-500 text-sm">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>{exam.questions} questões</span>
                          </div>
                        </div>
                        <div className="flex items-center text-neutral-500 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Até {exam.dueDate}</span>
                        </div>
                      </div>
                      
                      <motion.button 
                        className="w-full flex items-center justify-center gap-2 bg-[#B38E6A] hover:bg-[#A47D5D] text-white py-2.5 px-4 rounded-md font-medium transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Iniciar Prova
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Resumo de desempenho (para provas concluídas) */}
          {completedExams.length > 0 && (filterStatus === "todas" || filterStatus === "concluida") && (
            <div className="mb-12">
              <h3 className="exam-header text-xl font-light mb-5 text-neutral-700 tracking-wide flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-[#B38E6A]" />
                Seu Desempenho
              </h3>
              
              <div className="performance-chart bg-white border border-neutral-100 rounded-lg p-6 shadow-sm">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Gráfico circular mockado */}
                  <div className="relative w-36 h-36 mx-auto md:mx-0">
                    <div className="absolute inset-0 rounded-full border-8 border-neutral-100"></div>
                    <div 
                      className="absolute inset-0 rounded-full border-8 border-transparent"
                      style={{ 
                        borderTopColor: colors.primary, 
                        borderRightColor: colors.primary,
                        borderBottomColor: colors.primary,
                        transform: 'rotate(45deg)'
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-2xl font-bold text-neutral-800">85%</span>
                      <span className="text-xs text-neutral-500">Média</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Provas realizadas</span>
                        <span className="text-xl font-medium text-neutral-800">{completedExams.length}</span>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Melhor nota</span>
                        <span className="text-xl font-medium" style={{ color: colors.success }}>
                          {Math.max(...completedExams.map(exam => exam.score))}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Última prova</span>
                        <span className="text-xl font-medium text-neutral-800">
                          {completedExams.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0].score}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Lista de todas as provas */}
          <div className="mb-8">
            <h3 className="exam-header text-xl font-light mb-5 text-neutral-700 tracking-wide flex items-center">
              <FileText className="h-5 w-5 mr-2 text-[#B38E6A]" />
              {filteredExams.length === 0 
                ? "Nenhuma prova encontrada" 
                : `${filteredExams.length} ${filteredExams.length === 1 ? 'prova' : 'provas'}`}
            </h3>
            
            <div className="space-y-4">
              {filteredExams.map((exam, index) => (
                <motion.div
                  key={exam.id}
                  className="exam-item bg-white border border-neutral-100 rounded-lg shadow-sm overflow-hidden"
                  whileHover={{ 
                    y: -3,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.05)"
                  }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Barra de status lateral */}
                    <div 
                      className={`w-full md:w-1.5 h-1.5 md:h-auto ${
                        exam.status === "disponivel" ? "bg-[#B38E6A]" : 
                        exam.status === "concluida" ? "bg-[#68B984]" : 
                        "bg-[#9CA3AF]"
                      }`}
                    ></div>
                    
                    <div className="p-5 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              exam.status === "disponivel" ? "bg-[#B38E6A20] text-[#B38E6A]" : 
                              exam.status === "concluida" ? "bg-[#68B98420] text-[#68B984]" : 
                              "bg-[#9CA3AF20] text-[#9CA3AF]"
                            }`}>
                              {exam.status === "disponivel" ? "Disponível" : 
                               exam.status === "concluida" ? "Concluída" : 
                               "Bloqueada"}
                            </span>
                            <span className="text-xs text-neutral-500">{exam.difficulty}</span>
                          </div>
                          <h3 className="text-base font-medium text-neutral-800">{exam.title}</h3>
                        </div>
                        
                        {exam.status === "concluida" && (
                          <div className={`px-3 py-1 rounded-md font-medium text-sm ${
                            exam.score >= 90 ? "bg-[#68B98420] text-[#68B984]" :
                            exam.score >= 70 ? "bg-[#FFC26F20] text-[#FFC26F]" :
                            "bg-[#F1676720] text-[#F16767]"
                          }`}>
                            {exam.score}%
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-neutral-500 mb-4 hidden md:block">{exam.description}</p>
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center text-xs text-neutral-500">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            <span>{exam.timeLimit} min</span>
                          </div>
                          <div className="flex items-center text-xs text-neutral-500">
                            <FileText className="h-3.5 w-3.5 mr-1.5" />
                            <span>{exam.questions} questões</span>
                          </div>
                          {exam.status !== "concluida" && (
                            <div className="flex items-center text-xs text-neutral-500">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              <span>{exam.status === "disponivel" ? `Até ${exam.dueDate}` : "-"}</span>
                            </div>
                          )}
                          {exam.status === "concluida" && (
                            <div className="flex items-center text-xs text-neutral-500">
                              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                              <span>Concluída em {exam.completedAt}</span>
                            </div>
                          )}
                          {exam.status === "bloqueada" && exam.prerequisite && (
                            <div className="flex items-center text-xs text-neutral-500">
                              <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                              <span>{exam.prerequisite}</span>
                            </div>
                          )}
                        </div>
                        
                        {exam.status === "disponivel" && (
                          <motion.button 
                            className="md:w-auto w-full flex items-center justify-center gap-1.5 bg-[#B38E6A] hover:bg-[#A47D5D] text-white py-1.5 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Iniciar
                            <ArrowRight className="h-3.5 w-3.5" />
                          </motion.button>
                        )}
                        
                        {exam.status === "concluida" && (
                          <motion.button 
                            className="md:w-auto w-full flex items-center justify-center gap-1.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 py-1.5 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Ver Resultado
                            <ChevronRight className="h-3.5 w-3.5" />
                          </motion.button>
                        )}
                        
                        {exam.status === "bloqueada" && (
                          <div className="flex items-center text-xs text-neutral-500">
                            <LockIcon className="h-3.5 w-3.5 mr-1.5" />
                            <span>Bloqueada</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
