"use client"

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  ArrowLeft,
  Snowflake, 
  Download,
  FileText,
  Clock,
  CalendarDays
} from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Registrando plugins do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CrioliseConteudoPage() {
  // Efeito para animações GSAP
  useEffect(() => {
    gsap.fromTo(
      ".animate-content", 
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
    
    return () => {
      // Limpar animações ao desmontar
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(".animate-content");
    }
  }, []);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#F7F2EB]/50 to-white">
      <DashboardSidebar />
      
      <div className="flex-1 p-6 pt-4 pb-16 overflow-auto w-full">
        <div className="max-w-5xl mx-auto">
          {/* Navegação de volta */}
          <div className="mb-6 animate-content">
            <Link href="/dashboard" className="flex items-center text-[#B38E6A] hover:text-[#8A6D50] transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-sm">Voltar para Dashboard</span>
            </Link>
          </div>
          
          {/* Cabeçalho do conteúdo */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8 animate-content">
            <div className="p-6 bg-[#64B5F6]/10 rounded-lg flex items-center justify-center">
              <Snowflake className="h-16 w-16 text-[#64B5F6]" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-medium text-[#8A6D50] tracking-wide mb-2">
                Criolipólise
              </h1>
              <p className="text-neutral-600 mb-4">
                Resfriamento Controlado para Redução de Gordura Localizada
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-[#B38E6A]" />
                  <span>Documento PDF</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-[#B38E6A]" />
                  <span>15 min de leitura</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-[#B38E6A]" />
                  <span>Atualizado em 14/10/2023</span>
                </div>
              </div>
            </div>
            
            <Button className="bg-[#B38E6A] hover:bg-[#8A6D50] text-white">
              <Download className="mr-2 h-4 w-4" />
              <span>Download PDF</span>
            </Button>
          </div>
          
          {/* Conteúdo principal */}
          <div className="bg-white border border-[#D9C5B2] rounded-lg p-6 shadow-sm mb-8 animate-content">
            <h2 className="text-xl font-medium text-[#8A6D50] mb-4">
              O que é Criolipólise?
            </h2>
            
            <div className="prose text-neutral-700 max-w-none">
              <p>
                A criolipólise é uma técnica não invasiva de redução de gordura localizada que utiliza 
                baixas temperaturas para induzir a apoptose (morte celular programada) das células de gordura. 
                O procedimento é baseado no princípio de que as células de gordura são mais suscetíveis ao frio 
                do que os tecidos circundantes.
              </p>
              
              <p>
                Durante o tratamento, um aplicador é colocado na área alvo, que aspira o tecido adiposo 
                e o resfria a temperaturas entre -7°C e -10°C. Esta exposição ao frio provoca a cristalização 
                dos lipídios dentro dos adipócitos, levando à sua morte celular. As células mortas são então 
                gradualmente eliminadas pelo sistema linfático e processadas pelo fígado ao longo de 2-3 meses.
              </p>
              
              <h3 className="text-lg font-medium text-[#8A6D50] mt-6 mb-3">
                Mecanismo de Ação
              </h3>
              
              <p>
                O mecanismo exato pelo qual o resfriamento causa a morte dos adipócitos ainda não está 
                completamente elucidado, mas acredita-se que envolva:
              </p>
              
              <ul className="list-disc ml-6 space-y-2">
                <li>Cristalização dos lipídios intracelulares</li>
                <li>Lesão celular induzida pelo frio</li>
                <li>Inflamação localizada</li>
                <li>Apoptose (morte celular programada)</li>
                <li>Fagocitose das células mortas por macrófagos</li>
                <li>Eliminação gradual através do sistema linfático</li>
              </ul>
              
              <h3 className="text-lg font-medium text-[#8A6D50] mt-6 mb-3">
                Indicações
              </h3>
              
              <p>
                A criolipólise é indicada para redução de gordura localizada em pacientes próximos ao 
                peso ideal, não sendo um tratamento para obesidade. As áreas mais comumente tratadas incluem:
              </p>
              
              <ul className="list-disc ml-6 space-y-2">
                <li>Abdômen</li>
                <li>Flancos ("love handles")</li>
                <li>Costas</li>
                <li>Região submentoniana (papada)</li>
                <li>Face interna e externa das coxas</li>
                <li>Braços</li>
              </ul>
              
              <h3 className="text-lg font-medium text-[#8A6D50] mt-6 mb-3">
                Contraindicações
              </h3>
              
              <p>As principais contraindicações para o procedimento incluem:</p>
              
              <ul className="list-disc ml-6 space-y-2">
                <li>Crioglobulinemia</li>
                <li>Hemoglobinúria paroxística ao frio</li>
                <li>Doença de Raynaud</li>
                <li>Urticária ao frio</li>
                <li>Gestação e lactação</li>
                <li>Hérnias na área de tratamento</li>
                <li>Alterações de sensibilidade na região</li>
                <li>Feridas abertas ou infecções na área</li>
              </ul>
            </div>
          </div>
          
          {/* Bloco adicional de informações */}
          <div className="bg-[#F7F2EB] border border-[#D9C5B2] rounded-lg p-6 animate-content">
            <h3 className="text-lg font-medium text-[#8A6D50] mb-4">
              Informações adicionais
            </h3>
            
            <p className="text-neutral-600 mb-4">
              Este conteúdo é apenas um resumo. Para informações mais detalhadas sobre técnicas de aplicação, 
              protocolos clínicos e estudos científicos, consulte o documento completo disponível para download.
            </p>
            
            <p className="text-sm text-neutral-500">
              Conteúdo baseado nos slides da professora Adriana Dias, sendo utilizado para fins educacionais.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 