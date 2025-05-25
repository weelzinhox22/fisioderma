"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  FileText, 
  Clock, 
  Calendar,
  Timer,
  GraduationCap,
  ArrowRight
} from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Registrando plugins do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProvasPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  
  // Definindo as cores principais em tons bege/nude
  const colors = {
    primary: '#B38E6A',
    primaryLight: '#D9C5B2',
    primaryTransparent: 'rgba(179, 142, 106, 0.2)',
    primaryDark: '#8A6D50',
    text: '#735E44',
  }
  
  // Dados da avaliação
  const exam = {
    id: "1",
    title: "Avaliação de Conhecimentos Gerais em Fisioterapia Dermatofuncional",
    description: "Avaliação abrangente sobre os princípios fundamentais e aplicações práticas em Fisioterapia Dermatofuncional.",
    timeLimit: 90,
    questions: 40,
    topics: [
      "Criolipólise",
      "Lipocavitação",
      "Ultrassom",
      "Radiofrequência",
      "Tratamento de Queimados"
    ],
    difficulty: "Intermediário"
  }
  
  // Efeito para animações GSAP
  useEffect(() => {
    if (pageRef.current) {
      // Animação dos elementos
      gsap.fromTo(
        ".animate-item", 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: "power2.out",
          delay: 0.2
        }
      );
    }
    
    return () => {
      // Limpar animações ao desmontar
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(".animate-item");
    }
  }, []);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#F7F2EB]/50 to-white" ref={pageRef}>
      <DashboardSidebar />
      
      <div className="flex-1 p-6 pt-4 pb-16 overflow-auto w-full">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho da página */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 animate-item">
            <div>
              <h1 className="text-3xl font-medium text-[#8A6D50] tracking-wide">
                Avaliação
              </h1>
              <p className="text-neutral-500 mt-1 text-sm">
                Teste seus conhecimentos em Fisioterapia Dermatofuncional
              </p>
            </div>
          </div>
          
          {/* Card principal da avaliação */}
          <div className="bg-white border border-[#D9C5B2] rounded-lg shadow-md overflow-hidden mb-8 animate-item">
            <div className="bg-[#B38E6A]/10 p-6 border-b border-[#D9C5B2]">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-[#B38E6A]/20 mr-3">
                  <GraduationCap className="h-8 w-8 text-[#B38E6A]" />
                </div>
                <h2 className="text-2xl font-medium text-[#8A6D50]">
                  {exam.title}
                </h2>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-neutral-600 mb-6">
                {exam.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center p-3 bg-[#F7F2EB] rounded-lg">
                  <Clock className="h-5 w-5 text-[#B38E6A] mr-3" />
                  <div>
                    <p className="text-sm text-neutral-500">Tempo estimado</p>
                    <p className="font-medium text-[#8A6D50]">{exam.timeLimit} minutos</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-[#F7F2EB] rounded-lg">
                  <FileText className="h-5 w-5 text-[#B38E6A] mr-3" />
                  <div>
                    <p className="text-sm text-neutral-500">Questões</p>
                    <p className="font-medium text-[#8A6D50]">{exam.questions} questões</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-[#F7F2EB] rounded-lg">
                  <Timer className="h-5 w-5 text-[#B38E6A] mr-3" />
                  <div>
                    <p className="text-sm text-neutral-500">Nível</p>
                    <p className="font-medium text-[#8A6D50]">{exam.difficulty}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-[#8A6D50] mb-3">Tópicos abordados</h3>
                <div className="flex flex-wrap gap-2">
                  {exam.topics.map((topic, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-[#B38E6A]/10 text-[#8A6D50] text-sm rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Link href="/dashboard/provas/exame">
                  <Button className="bg-[#B38E6A] hover:bg-[#8A6D50] text-white px-6">
                    <span>Iniciar Avaliação</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Instruções */}
          <div className="bg-white border border-[#D9C5B2] rounded-lg p-6 shadow-sm animate-item">
            <h3 className="text-lg font-medium text-[#8A6D50] mb-4">
              Instruções para a Avaliação
            </h3>
            
            <div className="space-y-4 text-neutral-600">
              <p>
                Esta avaliação contém {exam.questions} questões de múltipla escolha sobre os temas mais importantes 
                da Fisioterapia Dermatofuncional.
              </p>
              
              <p>
                Você deverá responder cada questão antes de prosseguir para a próxima. Não será possível 
                retornar a questões anteriores após avançar.
              </p>
              
              <p>
                Ao final da avaliação, você receberá sua pontuação e poderá revisar as respostas corretas 
                para todas as questões.
              </p>
              
              <p>
                Recomendamos que reserve aproximadamente {exam.timeLimit} minutos para completar toda a avaliação 
                sem interrupções.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
