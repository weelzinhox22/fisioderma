"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Flame, ChevronRight, AlertTriangle, CheckCircle, Sparkles, ScrollText, FileSymlink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function QueimadosConteudo() {
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
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 py-10">
      <div className="container mx-auto px-4 mt-10">
        {/* Header com navegação de breadcrumb */}
        <div className="mb-10 pt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-rose-100/30 text-base group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Voltar para Dashboard</span>
              </Button>
            </Link>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Link href="/dashboard" className="hover:text-rose-600 transition-colors">Dashboard</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <Link href="/conteudos" className="hover:text-rose-600 transition-colors">Conteúdos</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="text-rose-600 font-medium">Queimados</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 bg-rose-100/50 px-4 py-2 rounded-lg">
            <Flame className="h-5 w-5 text-rose-500" />
            <span className="font-medium text-rose-700">Tratamento Especializado</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-rose-500 text-white rounded-full mb-4">
            <Flame className="h-8 w-8" />
          </div>
          <h1 className="main-title text-4xl md:text-6xl font-bold text-rose-800 mb-4 leading-tight">
            Fisioterapia em Queimados
          </h1>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-rose-400 to-rose-600 rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Abordagens Terapêuticas e Reabilitação
          </p>
        </div>

        <motion.div 
          className="content-section max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 mb-12 border border-rose-100"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariant}
        >
          <div className="mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-rose-100 text-rose-600 mr-4 mt-1">1</span>
              <div>
                <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                  Olá a todos! Sejam bem-vindos à nossa aula sobre fisioterapia dermatofuncional em queimados.
                </p>

                <h2 className="subtitle text-2xl font-semibold text-rose-700 mb-6 flex items-center">
                  <Flame className="mr-2 h-5 w-5 text-rose-500" />
                  Introdução à Fisioterapia Dermatofuncional em Queimados
                </h2>
                
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg mb-8 border-l-4 border-rose-400">
                  <p className="content-p text-lg mb-0 leading-relaxed text-gray-700">
                    Primeiramente, é crucial entender que uma queimadura é um trauma de origem térmica que pode lesar diversas camadas da pele, como a epiderme, derme, tela subcutânea, e até mesmo atingir músculos e órgãos internos. As sequelas de queimaduras podem ter um impacto significativo nas funções físicas e na autoestima dos pacientes, levando a desordens físicas, sociais e emocionais, e em casos extremos, podem ser fatais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-rose-100 text-rose-600 mr-4 mt-1">2</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-rose-700 mb-4 flex items-center">
                  <ScrollText className="mr-2 h-5 w-5 text-rose-500" />
                  Classificação das Queimaduras
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  As queimaduras são classificadas em diferentes graus, dependendo da profundidade da lesão:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="list-item p-5 bg-rose-50 rounded-lg border-b-2 border-rose-300 transform transition-all hover:shadow-md">
                    <div className="text-rose-700 font-semibold mb-2">1º grau (Eritema)</div>
                    <p className="text-sm text-gray-700">
                      Atinge apenas a epiderme, causando vermelhidão.
                    </p>
                    <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-rose-300 h-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div className="list-item p-5 bg-rose-50 rounded-lg border-b-2 border-rose-300 transform transition-all hover:shadow-md">
                    <div className="text-rose-700 font-semibold mb-2">2º grau</div>
                    <p className="text-sm text-gray-700">
                      Atinge a epiderme e partes variadas da derme, formando bolhas (superficial) ou apresentando uma superfície branca (profundo).
                    </p>
                    <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-rose-400 h-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div className="list-item p-5 bg-rose-50 rounded-lg border-b-2 border-rose-300 transform transition-all hover:shadow-md">
                    <div className="text-rose-700 font-semibold mb-2">3º grau</div>
                    <p className="text-sm text-gray-700">
                      Destrói a epiderme e toda a derme, resultando em escara.
                    </p>
                    <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="list-item p-5 bg-rose-50 rounded-lg border-b-2 border-rose-300 transform transition-all hover:shadow-md">
                    <div className="text-rose-700 font-semibold mb-2">4º grau</div>
                    <p className="text-sm text-gray-700">
                      Atinge a epiderme, derme, tecido subcutâneo, tendões, músculos e ossos.
                    </p>
                    <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-rose-600 h-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-rose-100 text-rose-600 mr-4 mt-1">3</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-rose-700 mb-4 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-rose-500" />
                  Extensão e Etiologia das Queimaduras
                </h3>
                
                <div className="bg-rose-50 p-6 rounded-lg mb-6 border-l-4 border-rose-300">
                  <h4 className="font-semibold text-rose-700 mb-3">Extensão das Queimaduras</h4>
                  <p className="text-lg text-gray-700 mb-0">
                    Para avaliar a extensão da área queimada, utilizamos a "regra dos nove", que divide o corpo em múltiplos de 9%. Essa regra ajuda a estimar a porcentagem da área corporal total (ACT) afetada, facilitando a determinação da gravidade da queimadura e o planejamento do tratamento adequado.
                  </p>
                </div>
                
                <div className="bg-rose-50/50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-rose-700 mb-3">Etiologia</h4>
                  <p className="text-lg text-gray-700 mb-0">
                    A etiologia das queimaduras é bastante variada, podendo ser causada por agentes físicos, químicos ou biológicos. As queimaduras podem resultar de acidentes de trabalho, acidentes domésticos ou até mesmo de causas voluntárias.
                  </p>
                </div>
                
                <div className="bg-rose-50/30 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-rose-700 mb-3">Riscos Associados</h4>
                  <p className="text-lg text-gray-700 mb-0">
                    Queimaduras extensas podem levar a sérios riscos, como hipotermia, hipovolemia e infecções.
                  </p>
                </div>
                
                <div className="bg-rose-50/10 p-6 rounded-lg mb-0">
                  <h4 className="font-semibold text-rose-700 mb-3">Impactos das Queimaduras</h4>
                  <p className="text-lg text-gray-700 mb-0">
                    As queimaduras podem causar limitações nas amplitudes de movimento, impactando a força e a função do paciente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-rose-100 text-rose-600 mr-4 mt-1">4</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-rose-700 mb-4 flex items-center">
                  <FileSymlink className="mr-2 h-5 w-5 text-rose-500" />
                  Intervenções Médicas
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  O tratamento de queimaduras frequentemente envolve intervenções médicas como o debridamento, que é a remoção do tecido necrosado. Este procedimento é fundamental para evitar infecções e preparar o leito da ferida para enxertia ou cicatrização.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <motion.div 
                    className="list-item p-5 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg shadow-sm"
                    variants={fadeInRightVariant}
                    custom={0}
                  >
                    <h4 className="flex items-center text-rose-700 font-semibold mb-3">
                      <div className="bg-rose-100 p-1 rounded-full mr-2">
                        <CheckCircle className="h-4 w-4 text-rose-600" />
                      </div>
                      Debridamento Cirúrgico
                    </h4>
                    <p className="text-sm text-gray-700 ml-7">
                      Utilização de bisturi ou tesoura para remover o tecido morto.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="list-item p-5 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg shadow-sm"
                    variants={fadeInRightVariant}
                    custom={1}
                  >
                    <h4 className="flex items-center text-rose-700 font-semibold mb-3">
                      <div className="bg-rose-100 p-1 rounded-full mr-2">
                        <CheckCircle className="h-4 w-4 text-rose-600" />
                      </div>
                      Debridamento Enzimático
                    </h4>
                    <p className="text-sm text-gray-700 ml-7">
                      Aplicação de substâncias, como colagenase, para dissolver o tecido necrosado.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="list-item p-5 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg shadow-sm"
                    variants={fadeInRightVariant}
                    custom={2}
                  >
                    <h4 className="flex items-center text-rose-700 font-semibold mb-3">
                      <div className="bg-rose-100 p-1 rounded-full mr-2">
                        <CheckCircle className="h-4 w-4 text-rose-600" />
                      </div>
                      Debridamento Autolítico
                    </h4>
                    <p className="text-sm text-gray-700 ml-7">
                      Uso de curativos que mantêm o meio úmido, favorecendo a autodegradação dos tecidos necrosados.
                    </p>
                  </motion.div>
                </div>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Em alguns casos, pode ser necessário realizar enxertos. Os enxertos podem ser:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  {[
                    {
                      title: "Autólogos",
                      description: "Retirados do próprio paciente, o que minimiza o risco de rejeição imunológica."
                    },
                    {
                      title: "Alogenóicos",
                      description: "Obtidos de outro ser humano."
                    },
                    {
                      title: "Xenogênicos",
                      description: "Obtidos de animais, geralmente suínos."
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="list-item flex items-center p-3 bg-white border border-rose-100 rounded-lg"
                      variants={fadeInRightVariant}
                      custom={index}
                    >
                      <div className="bg-rose-100 p-1 rounded-full mr-2">
                        <CheckCircle className="h-4 w-4 text-rose-600" />
                      </div>
                      <div>
                        <span className="font-medium text-rose-700">{item.title}:</span>
                        <span className="text-sm text-gray-700 ml-1">{item.description}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-8">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-rose-100 text-rose-600 mr-4 mt-1">5</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-rose-700 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-rose-500" />
                  Tipos de Cicatriz e Fases da Cicatrização
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  A cicatrização de queimaduras pode resultar em diferentes tipos de cicatrizes:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {[
                    "Normotrófica: Cicatrização ordenada, com superfície plana e sem alterações funcionais significativas.",
                    "Hipertrófica: Elevação acima do nível da pele, limitada ao local original da lesão. Comum em áreas de alta tensão.",
                    "Quelóide: Crescimento desorganizado e exagerado de tecido cicatricial que ultrapassa os limites da lesão original.",
                    "Hipotrófica: Pele afundada ou com depressões devido à falta de tecido.",
                    "Contratura cicatricial: Retração do tecido cicatricial, limitando o movimento articular e prejudicando a função."
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="list-item flex items-start p-3 bg-rose-50 rounded-lg"
                      variants={fadeInRightVariant}
                      custom={index}
                    >
                      <AlertTriangle className="h-4 w-4 text-rose-500 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
                
                <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                  O processo de cicatrização das queimaduras frequentemente leva à formação de cicatrizes hipertróficas e contraturas, devido ao aumento da vascularização e deposição de colágeno.
                </p>
                
                <div className="bg-rose-50 p-5 rounded-lg mb-6 border-l-4 border-rose-300">
                  <h4 className="font-semibold text-rose-700 mb-3">Fases da Cicatrização</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-medium text-rose-600 mb-2">1. Fase Inflamatória</div>
                      <p className="text-sm text-gray-700">
                        Inicia-se imediatamente após a lesão e pode durar até 4 dias. Caracteriza-se pela presença de rubor, calor, edema e dor.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-medium text-rose-600 mb-2">2. Fase Proliferativa</div>
                      <p className="text-sm text-gray-700">
                        Ocorre do 4º ao 21º dia, com formação de tecido de granulação e início da contração da ferida.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-medium text-rose-600 mb-2">3. Fase de Remodelação</div>
                      <p className="text-sm text-gray-700">
                        Começa por volta do 21º dia e pode se estender por até 2 anos, com reorganização do colágeno.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="content-p text-lg italic bg-gray-50 p-4 rounded-lg border-l-4 border-gray-200 mt-6">
                  Espero que esta aula sobre fisioterapia em queimados tenha sido esclarecedora. A compreensão dessas lesões e de seus tratamentos é fundamental para a reabilitação eficaz dos pacientes, minimizando sequelas e melhorando sua qualidade de vida.
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
          <Card className="border-rose-200 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-5 text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Material Complementar</h3>
              </div>
              <div className="p-6">
                <p className="mb-6 text-gray-700">Para aprofundar seus conhecimentos em Fisioterapia em Queimados, recomendamos os seguintes materiais:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-rose-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-rose-600" />
                    </div>
                    <h4 className="font-medium text-rose-700 mb-2">Artigos Científicos</h4>
                    <p className="text-sm text-gray-600">Sobre tratamentos atuais para queimaduras</p>
                  </div>
                  
                  <div className="bg-rose-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-rose-600" />
                    </div>
                    <h4 className="font-medium text-rose-700 mb-2">Protocolos Clínicos</h4>
                    <p className="text-sm text-gray-600">Para reabilitação de pacientes queimados</p>
                  </div>
                  
                  <div className="bg-rose-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-rose-600" />
                    </div>
                    <h4 className="font-medium text-rose-700 mb-2">Estudos de Caso</h4>
                    <p className="text-sm text-gray-600">Exemplos de intervenções bem-sucedidas</p>
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