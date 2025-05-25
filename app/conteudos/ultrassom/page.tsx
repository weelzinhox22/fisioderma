"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Speaker, ChevronRight, CheckCircle, AlertTriangle, Sparkles, Waves, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function UltrassomConteudo() {
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
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 py-10">
      <div className="container mx-auto px-4 mt-10">
        {/* Header com navegação de breadcrumb */}
        <div className="mb-10 pt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-amber-100/30 text-base group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Voltar para Dashboard</span>
              </Button>
            </Link>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Link href="/dashboard" className="hover:text-amber-600 transition-colors">Dashboard</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <Link href="/conteudos" className="hover:text-amber-600 transition-colors">Conteúdos</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="text-amber-600 font-medium">Ultrassom</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 bg-amber-100/50 px-4 py-2 rounded-lg">
            <Speaker className="h-5 w-5 text-amber-500" />
            <span className="font-medium text-amber-700">Técnicas Avançadas</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-amber-500 text-white rounded-full mb-4">
            <Speaker className="h-8 w-8" />
          </div>
          <h1 className="main-title text-4xl md:text-6xl font-bold text-amber-800 mb-4 leading-tight">
            Ultrassom
          </h1>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Fundamentos e Aplicações na Fisioterapia Dermatofuncional
          </p>
        </div>

        <motion.div 
          className="content-section max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 mb-12 border border-amber-100"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariant}
        >
          <div className="mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mr-4 mt-1">1</span>
              <div>
                <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                  Olá a todos! Sejam bem-vindos à nossa aula sobre Ultrassom na fisioterapia dermatofuncional. Hoje, vamos explorar em detalhes o uso do ultrassom estético, seus parâmetros, efeitos e aplicações.
                </p>

                <h2 className="subtitle text-2xl font-semibold text-amber-700 mb-6 flex items-center">
                  <Waves className="mr-2 h-5 w-5 text-amber-500" />
                  Ultrassom Estético: Uma Visão Geral
                </h2>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg mb-8 border-l-4 border-amber-400">
                  <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                    O ultrassom estético é um recurso terapêutico que utiliza ondas ultrassônicas para promover efeitos biofísicos nos tecidos. Essas ondas, ao entrarem em contato com o tecido, são capazes de produzir alterações por meio de mecanismos térmicos e mecânicos. É uma modalidade terapêutica de penetração profunda, o que significa que pode atingir camadas mais internas da pele e tecidos adjacentes.
                  </p>
                  
                  <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                    O ultrassom é definido como uma forma de vibração acústica com frequências tão altas que são imperceptíveis ao ouvido humano.
                  </p>
                  
                  <p className="content-p text-lg mb-0 leading-relaxed text-gray-700">
                    Na fisioterapia dermatofuncional, o ultrassom terapêutico (UST) tem sido amplamente utilizado no tratamento da adiposidade localizada.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mr-4 mt-1">2</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-amber-700 mb-4 flex items-center">
                  <Info className="mr-2 h-5 w-5 text-amber-500" />
                  Parâmetros Físicos do Ultrassom
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Para utilizarmos o ultrassom de forma eficaz, é crucial entendermos seus parâmetros físicos.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="list-item p-5 bg-amber-50 rounded-lg border-b-2 border-amber-300 transform transition-all hover:shadow-md">
                    <div className="text-amber-700 font-semibold mb-2">Frequência</div>
                    <p className="text-sm text-gray-700">
                      Varia de 1,0 MHz a 3,0 MHz. Quanto maior a frequência, mais superficial será o tratamento.
                    </p>
                    <div className="text-xs mt-2 bg-amber-100 p-1 rounded text-amber-700 inline-block">
                      Ultrassom 3 MHz: Penetra entre 1 e 2 cm
                    </div>
                  </div>
                  
                  <div className="list-item p-5 bg-amber-50 rounded-lg border-b-2 border-amber-300 transform transition-all hover:shadow-md">
                    <div className="text-amber-700 font-semibold mb-2">Modo de Aplicação</div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Pulsado:</span> Aplicado em pulsos, com tempos de "liga" e "desliga".
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-medium">Contínuo:</span> Aplicado continuamente, promovendo maior aumento da temperatura.
                    </p>
                  </div>
                  
                  <div className="list-item p-5 bg-amber-50 rounded-lg border-b-2 border-amber-300 transform transition-all hover:shadow-md">
                    <div className="text-amber-700 font-semibold mb-2">Intensidade</div>
                    <p className="text-sm text-gray-700">
                      Medida em Watts por centímetro quadrado (W/cm²). Representa a força das ondas sonoras.
                    </p>
                    <div className="text-xs mt-2 bg-amber-100 p-1 rounded text-amber-700 inline-block">
                      Variação: 0,5 a 5 W/cm²
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg mb-6 border-l-4 border-orange-300">
                  <h4 className="font-semibold text-amber-700 mb-3 flex items-center">
                    <Sparkles className="mr-2 h-4 w-4 text-orange-500" />
                    Cálculo da Intensidade
                  </h4>
                  
                  <p className="text-gray-700 mb-4">
                    Para calcular a intensidade ideal, podemos usar a seguinte proporção, baseada na espessura da gordura do paciente medida com um adipômetro:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="list-item bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-medium text-amber-600 mb-2">Modo Contínuo</div>
                      <p className="text-sm">5,0 cm (fixo) está para 2 W/cm² (fixo) assim como 3,5 cm (medida do paciente) está para x.</p>
                      <div className="mt-2 p-2 bg-amber-100/50 text-center rounded font-mono">
                        x = (3,5 × 2) / 5 = 1,4 W/cm²
                      </div>
                    </div>
                    
                    <div className="list-item bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-medium text-amber-600 mb-2">Modo Pulsado</div>
                      <p className="text-sm">5,0 cm está para 3 W/cm² assim como 3,5 cm está para x.</p>
                      <div className="mt-2 p-2 bg-amber-100/50 text-center rounded font-mono">
                        x = (3,5 × 3) / 5 = 2,1 W/cm²
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mr-4 mt-1">3</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-amber-700 mb-4 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
                  Efeitos Físicos e Fisiológicos do Ultrassom
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Quando o ultrassom penetra no organismo, ele exerce efeitos sobre as células e tecidos através de dois mecanismos principais: térmicos e atérmicos.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.div 
                    className="list-item p-6 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm"
                    variants={fadeInRightVariant}
                    custom={0}
                  >
                    <h4 className="flex items-center text-amber-700 font-semibold mb-3">
                      <div className="bg-amber-100 p-1 rounded-full mr-2">
                        <Sparkles className="h-4 w-4 text-amber-600" />
                      </div>
                      Efeitos Térmicos
                    </h4>
                    <p className="text-gray-700 ml-7">
                      A onda mecânica leva à produção de calor. O efeito térmico do ultrassom é bastante utilizado no alívio da dor, na diminuição da rigidez articular e no aumento do fluxo sanguíneo.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="list-item p-6 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm"
                    variants={fadeInRightVariant}
                    custom={1}
                  >
                    <h4 className="flex items-center text-amber-700 font-semibold mb-3">
                      <div className="bg-amber-100 p-1 rounded-full mr-2">
                        <Waves className="h-4 w-4 text-amber-600" />
                      </div>
                      Efeitos Não Térmicos (Mecânicos)
                    </h4>
                    <p className="text-gray-700 ml-7">
                      O principal efeito não térmico é a cavitação. O efeito mecânico ocorre por meio de uma micromassagem no tecido, que favorece o aumento da circulação sanguínea e linfática. A microvibração celular também é um efeito importante.
                    </p>
                  </motion.div>
                </div>
                
                <div className="bg-amber-50 p-5 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold text-amber-700 mb-3">Efeitos Fisiológicos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Aumento da circulação sanguínea",
                      "Aumento da permeabilidade da membrana celular",
                      "Aumento do metabolismo local",
                      "Estimulação da atividade fibroblástica",
                      "Redução de edemas e infiltrados inflamatórios",
                      "Melhora da nutrição celular",
                      "Diminuição da dor"
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="list-item flex items-center p-3 bg-white rounded-lg shadow-sm"
                        variants={fadeInRightVariant}
                        custom={index}
                      >
                        <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-8">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mr-4 mt-1">4</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-amber-700 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                  Cuidados e Contraindicações
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Ao utilizar o ultrassom, devemos estar atentos às seguintes contraindicações:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  {[
                    "Áreas de tromboflebite",
                    "Sobre áreas tumorais",
                    "Em gestantes",
                    "Sobre epífises ósseas em crescimento",
                    "Sobre testículos e olhos",
                    "Sobre implantes eletrônicos",
                    "Sobre o coração",
                    "Em áreas isquêmicas",
                    "Em pacientes com osteoporose grave"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="list-item flex items-center p-3 bg-orange-50 rounded-lg"
                      variants={fadeInRightVariant}
                      custom={index}
                    >
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
                
                <p className="content-p text-lg italic bg-gray-50 p-4 rounded-lg border-l-4 border-gray-200 mt-6">
                  Espero que esta aula sobre ultrassom tenha sido esclarecedora. O domínio deste recurso terapêutico é fundamental para a prática clínica na fisioterapia dermatofuncional.
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
          <Card className="border-amber-200 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Material Complementar</h3>
              </div>
              <div className="p-6">
                <p className="mb-6 text-gray-700">Para aprofundar seus conhecimentos em Ultrassom, recomendamos os seguintes materiais:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-amber-600" />
                    </div>
                    <h4 className="font-medium text-amber-700 mb-2">Artigos Científicos</h4>
                    <p className="text-sm text-gray-600">Sobre a eficácia do ultrassom terapêutico</p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-amber-600" />
                    </div>
                    <h4 className="font-medium text-amber-700 mb-2">Vídeos Demonstrativos</h4>
                    <p className="text-sm text-gray-600">Da técnica e aplicação</p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-amber-600" />
                    </div>
                    <h4 className="font-medium text-amber-700 mb-2">Protocolos Clínicos</h4>
                    <p className="text-sm text-gray-600">Para diferentes condições</p>
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