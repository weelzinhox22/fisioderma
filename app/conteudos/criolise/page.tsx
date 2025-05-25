"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Snowflake, ChevronRight, Sparkles, Check, AlertTriangle, ThermometerSnowflake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CrioliseConteudo() {
  const pageRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (pageRef.current) {
      // Animação do título principal
      gsap.fromTo(
        ".main-title",
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      )
      
      // Animação dos subtítulos
      gsap.fromTo(
        ".subtitle",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".content-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
      
      // Animação dos parágrafos
      gsap.fromTo(
        ".content-p",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".content-section",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      )
      
      // Animação dos itens de lista
      gsap.fromTo(
        ".list-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".list-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }
    
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const fadeInRightVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 py-10">
      <div className="container mx-auto px-4 mt-10">
        {/* Header com navegação de breadcrumb */}
        <div className="mb-10 pt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-teal-100/30 text-base group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Voltar para Dashboard</span>
              </Button>
            </Link>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Link href="/dashboard" className="hover:text-teal-600 transition-colors">Dashboard</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <Link href="/conteudos" className="hover:text-teal-600 transition-colors">Conteúdos</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="text-teal-600 font-medium">Criolipólise</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 bg-teal-100/50 px-4 py-2 rounded-lg">
            <Snowflake className="h-5 w-5 text-teal-500" />
            <span className="font-medium text-teal-700">Técnicas Avançadas</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-teal-500 text-white rounded-full mb-4">
            <ThermometerSnowflake className="h-8 w-8" />
          </div>
          <h1 className="main-title text-4xl md:text-6xl font-bold text-teal-800 mb-4 leading-tight">
            Criolipólise
          </h1>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Resfriamento Controlado para Redução de Gordura Localizada
          </p>
        </div>

        <motion.div 
          className="content-section max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 mb-12 border border-teal-100"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariant}
        >
          <div className="mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mr-4 mt-1">1</span>
              <div>
                <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                  Olá a todos! Vamos iniciar nossa aula sobre Criolipólise, um tratamento estético não invasivo muito utilizado na fisioterapia dermatofuncional.
                </p>

                <h2 className="subtitle text-2xl font-semibold text-teal-700 mb-6 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-teal-500" />
                  Criolipólise: Resfriamento Controlado para Redução de Gordura Localizada
                </h2>
                
                <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                  A criolipólise é um procedimento estético não invasivo que utiliza o resfriamento controlado para reduzir a gordura localizada em áreas específicas do corpo.
                </p>

                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg mb-8 border-l-4 border-teal-400">
                  <h3 className="subtitle text-xl font-semibold text-teal-700 mb-4 flex items-center">
                    <Snowflake className="mr-2 h-5 w-5 text-teal-500" />
                    Mecanismo de Ação da Criolipólise
                  </h3>
                  
                  <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                    O mecanismo de ação da criolipólise baseia-se na aplicação de temperaturas muito baixas que promovem o congelamento das células de gordura. Esse congelamento induz a cristalização da gordura, levando as células adiposas a entrarem em apoptose, que é a morte celular programada. As células danificadas são então eliminadas gradualmente pelo sistema linfático ao longo de várias semanas após o tratamento.
                  </p>
                  
                  <p className="content-p text-lg mb-0 leading-relaxed text-gray-700">
                    Durante o procedimento, utiliza-se um aparelho de sucção e resfriamento. A área a ser tratada é levemente succionada para dentro de um aplicador, onde é resfriada através de placas especiais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mr-4 mt-1">2</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-teal-700 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                  Efeitos Colaterais da Criolipólise
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  É importante estarmos cientes dos possíveis efeitos colaterais da criolipólise, que incluem:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {[
                    "Eritema (vermelhidão) após a sessão",
                    "Hiperpigmentação da pele",
                    "Formação de bolhas na região tratada",
                    "Edema (inchaço)",
                    "Dor",
                    "Redução da sensibilidade na área tratada",
                    "Hiperplasia paradoxal (aumento do volume)"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="list-item flex items-center p-3 bg-red-50 rounded-lg"
                      variants={fadeInRightVariant}
                      custom={index}
                    >
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mr-4 mt-1">3</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-teal-700 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                  Contraindicações da Criolipólise
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  A criolipólise possui algumas contraindicações importantes que devemos sempre considerar:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {[
                    "Dislipidemia",
                    "Hipertensão",
                    "Esteatose hepática",
                    "Diabetes",
                    "Pele não íntegra",
                    "Doenças de coagulação e autoimunes",
                    "Obesidade",
                    "Presença de implantes metálicos na área",
                    "Gestação",
                    "Hérnias no local de aplicação",
                    "Cirurgias recentes na área",
                    "Doenças vasculares",
                    "Hipersensibilidade ao frio",
                    "Distúrbios circulatórios graves"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="list-item flex items-center p-3 bg-amber-50 rounded-lg"
                      variants={fadeInRightVariant}
                      custom={index}
                    >
                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mr-4 mt-1">4</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-teal-700 mb-4 flex items-center">
                  <Snowflake className="mr-2 h-5 w-5 text-teal-500" />
                  Parâmetros da Criolipólise
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Os parâmetros utilizados na criolipólise incluem:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="list-item p-5 bg-teal-50 rounded-lg text-center">
                    <div className="text-teal-700 font-semibold mb-2">Vácuo</div>
                    <div className="text-2xl font-bold text-teal-600">600 mmHg</div>
                    <div className="text-sm text-gray-500">ou 50 cmHg</div>
                  </div>
                  
                  <div className="list-item p-5 bg-teal-50 rounded-lg text-center">
                    <div className="text-teal-700 font-semibold mb-2">Tempo</div>
                    <div className="text-2xl font-bold text-teal-600">30-60 min</div>
                    <div className="text-sm text-gray-500">por sessão</div>
                  </div>
                  
                  <div className="list-item p-5 bg-teal-50 rounded-lg text-center">
                    <div className="text-teal-700 font-semibold mb-2">Temperatura</div>
                    <div className="text-2xl font-bold text-teal-600">-7 a -10°C</div>
                    <div className="text-sm text-gray-500">resfriamento controlado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mr-4 mt-1">5</span>
              <div>
                <h3 className="subtitle text-xl font-semibold text-teal-700 mb-4 flex items-center">
                  <Snowflake className="mr-2 h-5 w-5 text-teal-500" />
                  Procedimentos Pós-Sessão de Criolipólise
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Após a sessão de criolipólise, é crucial realizar os seguintes procedimentos:
                </p>
                
                <ul className="mb-6">
                  <li className="list-item flex items-center mb-3">
                    <Check className="h-5 w-5 text-teal-500 mr-3 flex-shrink-0" />
                    <span className="text-lg text-gray-700">Massagem manual na área tratada por 5 minutos</span>
                  </li>
                  <li className="list-item flex items-center mb-3">
                    <Check className="h-5 w-5 text-teal-500 mr-3 flex-shrink-0" />
                    <span className="text-lg text-gray-700">Reperfusão</span>
                  </li>
                </ul>
                
                <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400 mb-6">
                  <p className="content-p text-lg leading-relaxed text-gray-700">
                    A reperfusão é essencial para evitar danos teciduais graves. Após o resfriamento, é fundamental que o sangue volte a circular normalmente na área tratada para evitar necrose da pele e outros tecidos não adiposos, além de restaurar a oxigenação e nutrição dos tecidos. A reperfusão também ativa o processo inflamatório que elimina a gordura, permitindo que o sistema imune identifique e remova as células de gordura danificadas. Esse processo envolve o recrutamento de macrófagos e o início de um processo inflamatório controlado, que culmina na eliminação da gordura ao longo de semanas. A falta de reperfusão adequada pode levar a isquemia prolongada, resultando em lesões graves como necrose tecidual, dor intensa e cicatrizes permanentes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mr-4 mt-1">6</span>
              <div>
                <h3 className="subtitle text-xl font-semibold text-teal-700 mb-4 flex items-center">
                  <Snowflake className="mr-2 h-5 w-5 text-teal-500" />
                  Cuidados Pós-Tratamento de Criolipólise
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Os cuidados pós-tratamento são importantes para otimizar os resultados e evitar complicações:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {[
                    "Evitar a exposição direta ao calor nas primeiras 24 horas",
                    "Manter uma hidratação adequada",
                    "Evitar atividades físicas intensas nas primeiras 24-48 horas",
                    "Manter uma dieta balanceada"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="list-item flex items-center p-3 bg-teal-50 rounded-lg"
                      variants={fadeInRightVariant}
                      custom={index}
                    >
                      <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
                
                <p className="content-p text-lg italic bg-gray-50 p-4 rounded-lg border-l-4 border-gray-200">
                  Espero que esta aula detalhada sobre criolipólise tenha sido esclarecedora e útil para a prática clínica de vocês!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-teal-200 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-5 text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Material Complementar</h3>
              </div>
              <div className="p-6">
                <p className="mb-6 text-gray-700">Para aprofundar seus conhecimentos em Criolipólise, recomendamos os seguintes materiais:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-teal-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-teal-600" />
                    </div>
                    <h4 className="font-medium text-teal-700 mb-2">Artigos Científicos</h4>
                    <p className="text-sm text-gray-600">Sobre a eficácia da criolipólise</p>
                  </div>
                  
                  <div className="bg-teal-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-teal-600" />
                    </div>
                    <h4 className="font-medium text-teal-700 mb-2">Vídeos Demonstrativos</h4>
                    <p className="text-sm text-gray-600">Da técnica e aplicação</p>
                  </div>
                  
                  <div className="bg-teal-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-teal-600" />
                    </div>
                    <h4 className="font-medium text-teal-700 mb-2">Estudos de Caso</h4>
                    <p className="text-sm text-gray-600">Com resultados comprovados</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 