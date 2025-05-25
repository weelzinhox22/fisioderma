"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Waves, ChevronRight, CheckCircle, AlertTriangle, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LipocavitacaoConteudo() {
  const pageRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (pageRef.current) {
      // Animações existentes
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
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 py-10">
      <div className="container mx-auto px-4 mt-10">
        {/* Header com navegação de breadcrumb */}
        <div className="mb-10 pt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-green-100/30 text-base group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Voltar para Dashboard</span>
              </Button>
            </Link>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Link href="/dashboard" className="hover:text-green-600 transition-colors">Dashboard</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <Link href="/conteudos" className="hover:text-green-600 transition-colors">Conteúdos</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="text-green-600 font-medium">Lipocavitação</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 bg-green-100/50 px-4 py-2 rounded-lg">
            <Waves className="h-5 w-5 text-green-500" />
            <span className="font-medium text-green-700">Técnicas Avançadas</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-green-500 text-white rounded-full mb-4">
            <Waves className="h-8 w-8" />
          </div>
          <h1 className="main-title text-4xl md:text-6xl font-bold text-green-800 mb-4 leading-tight">
            Lipocavitação
          </h1>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Uma Abordagem Detalhada
          </p>
        </div>

        <motion.div 
          className="content-section max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 mb-12 border border-green-100"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariant}
        >
          <div className="mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-4 mt-1">1</span>
              <div>
                <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                  Olá a todos! Sejam bem-vindos a mais uma aula de fisioterapia dermatofuncional. Hoje, vamos nos aprofundar no estudo da Lipocavitação.
                </p>

                <h2 className="subtitle text-2xl font-semibold text-green-700 mb-6 flex items-center">
                  <Waves className="mr-2 h-5 w-5 text-green-500" />
                  Lipocavitação: Uma Abordagem Detalhada
                </h2>
                
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg mb-8 border-l-4 border-green-400">
                  <p className="content-p text-lg mb-0 leading-relaxed text-gray-700">
                    A lipocavitação é uma modalidade de ultrassom que utiliza os mesmos princípios do ultrassom estético. Também conhecida como ultracavitação, ela se destaca pela emissão de ondas sonoras em um nível ultrassônico elevado, com frequências que variam entre 27 KHz e 3 KHz. Devido a essas características, as ondas emitidas são absorvidas com maior intensidade, tornando a lipocavitação especialmente indicada para procedimentos superficiais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-4 mt-1">2</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Efeitos da Lipocavitação
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Os efeitos da lipocavitação são notáveis e incluem:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="list-item p-5 bg-green-50 rounded-lg border-b-2 border-green-300 transform transition-transform hover:scale-105">
                    <div className="text-green-700 font-semibold mb-2">Lipólise Seletiva</div>
                    <p className="text-sm text-gray-700">
                      Atua diretamente na quebra das células de gordura.
                    </p>
                  </div>
                  
                  <div className="list-item p-5 bg-green-50 rounded-lg border-b-2 border-green-300 transform transition-transform hover:scale-105">
                    <div className="text-green-700 font-semibold mb-2">Melhora da Textura</div>
                    <p className="text-sm text-gray-700">
                      Contribui para um aspecto mais liso e uniforme da pele.
                    </p>
                  </div>
                  
                  <div className="list-item p-5 bg-green-50 rounded-lg border-b-2 border-green-300 transform transition-transform hover:scale-105">
                    <div className="text-green-700 font-semibold mb-2">Redução de Medidas</div>
                    <p className="text-sm text-gray-700">
                      Promove a diminuição do volume na área tratada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-4 mt-1">3</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Indicações da Lipocavitação
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  A lipocavitação é particularmente eficaz e recomendada para:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      title: "Gordura Localizada Resistente",
                      description: "Ideal para áreas onde a gordura é difícil de eliminar com métodos tradicionais."
                    },
                    {
                      title: "Modelagem Corporal",
                      description: "Permite um contorno corporal mais definido."
                    },
                    {
                      title: "Alternativa Não Invasiva",
                      description: "Apresenta-se como uma opção para quem busca resultados sem cirurgia."
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="list-item p-5 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg shadow-sm"
                      variants={fadeInRightVariant}
                      custom={index}
                    >
                      <div className="flex items-center mb-2">
                        <div className="bg-green-100 p-1 rounded-full mr-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-semibold text-green-700">{item.title}</span>
                      </div>
                      <p className="text-sm text-gray-700 pl-7">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-8">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-4 mt-1">4</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                  Cuidados e Contraindicações da Lipocavitação
                </h3>
                
                <div className="flex items-center p-4 bg-blue-50 rounded-lg mb-6 border-l-4 border-blue-400">
                  <Droplets className="h-10 w-10 text-blue-500 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-1">Hidratação Adequada</h4>
                    <p className="text-gray-700 text-sm">O paciente deve estar bem hidratado antes e após o procedimento para otimizar os resultados e minimizar os riscos.</p>
                  </div>
                </div>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Contraindicações importantes a serem consideradas:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {[
                    "Gestantes",
                    "Portadores de doenças hepáticas",
                    "Portadores de doenças renais",
                    "Portadores de dislipidemias graves"
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
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border-l-4 border-gray-300">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
                    Avaliação do Histórico
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Verificar histórico de cirurgias ou presença de dispositivos eletrônicos implantados para garantir a segurança do procedimento.
                  </p>
                </div>
                
                <p className="content-p text-lg italic bg-green-50 p-4 rounded-lg border-l-4 border-green-200">
                  Espero que esta aula detalhada sobre lipocavitação tenha sido enriquecedora e útil para a prática clínica de vocês!
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
          <Card className="border-green-200 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-5 text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Material Complementar</h3>
              </div>
              <div className="p-6">
                <p className="mb-6 text-gray-700">Para aprofundar seus conhecimentos em Lipocavitação, recomendamos os seguintes materiais:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-green-700 mb-2">Artigos Científicos</h4>
                    <p className="text-sm text-gray-600">Sobre a eficácia da lipocavitação</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-green-700 mb-2">Vídeos Demonstrativos</h4>
                    <p className="text-sm text-gray-600">Da técnica e aplicação</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-green-700 mb-2">Estudos Comparativos</h4>
                    <p className="text-sm text-gray-600">Entre diferentes técnicas</p>
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