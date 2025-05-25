"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Zap, ChevronRight, AlertTriangle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function RadiofrequenciaConteudo() {
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
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50 py-10">
      <div className="container mx-auto px-4">
        {/* Header com navegação de breadcrumb */}
        <div className="mb-10 pt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-red-100/30 text-base group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Voltar para Dashboard</span>
              </Button>
            </Link>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Link href="/dashboard" className="hover:text-red-600 transition-colors">Dashboard</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <Link href="/conteudos" className="hover:text-red-600 transition-colors">Conteúdos</Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="text-red-600 font-medium">Radiofrequência</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 bg-red-100/50 px-4 py-2 rounded-lg">
            <Zap className="h-5 w-5 text-red-500" />
            <span className="font-medium text-red-700">Técnicas Avançadas</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-red-500 text-white rounded-full mb-4">
            <Zap className="h-8 w-8" />
          </div>
          <h1 className="main-title text-4xl md:text-6xl font-bold text-red-800 mb-4 leading-tight">
            Radiofrequência
          </h1>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-red-400 to-red-600 rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            Princípios e Aplicações Terapêuticas
          </p>
        </div>

        <motion.div 
          className="content-section max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 mb-12 border border-red-100"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariant}
        >
          <div className="mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-4 mt-1">1</span>
              <div>
                <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                  Olá a todos! Sejam bem-vindos à nossa aula sobre Radiofrequência. Hoje, vamos explorar os princípios e aplicações da radiofrequência com base no material que temos disponível.
                </p>

                <h2 className="subtitle text-2xl font-semibold text-red-700 mb-6 flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-red-500" />
                  Conceito e Mecanismo de Ação
                </h2>
                
                <div className="bg-gradient-to-r from-red-50 to-amber-50 p-6 rounded-lg mb-8 border-l-4 border-red-400">
                  <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                    A radiofrequência é uma tecnologia estética originada nos Estados Unidos, utilizada para o tratamento da flacidez facial sem a necessidade de intervenção cirúrgica. O equipamento emite ondas de energia de alta frequência que, ao entrarem em contato com as camadas mais profundas da pele, promovem a aceleração das moléculas de água e um aquecimento controlado. Esse aquecimento causa a contração das moléculas de colágeno, resultando em um efeito tensor imediato e estimulando a produção de novo colágeno a longo prazo.
                  </p>
                  
                  <p className="content-p text-lg mb-6 leading-relaxed text-gray-700">
                    O tratamento com radiofrequência é indolor, não invasivo e não ablativo, o que significa que não danifica a superfície da pele. Ele pode ser realizado em qualquer época do ano e em qualquer fototipo de pele, tornando-o uma opção versátil para diversos pacientes.
                  </p>
                  
                  <p className="content-p text-lg mb-0 leading-relaxed text-gray-700">
                    Ao aumentar a temperatura do tecido na área tratada, geralmente entre 40°C e 43°C, desencadeamos uma série de reações fisiológicas, incluindo a vasodilatação local, que estimula a neocolagênese progressiva, ou seja, a formação de novo colágeno.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-4 mt-1">2</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-red-700 mb-4 flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-red-500" />
                  Tipos de Manoplas
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Existem diferentes tipos de manoplas utilizadas na radiofrequência, cada uma com características e indicações específicas:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="list-item p-5 bg-red-50 rounded-lg border-b-2 border-red-300">
                    <div className="text-red-700 font-semibold mb-2">Monopolar</div>
                    <p className="text-sm text-gray-700">
                      Um único eletrodo ativo e uma placa de retorno. Ideal para tratamentos mais profundos, atingindo até 6mm de profundidade.
                    </p>
                  </div>
                  
                  <div className="list-item p-5 bg-red-50 rounded-lg border-b-2 border-red-300">
                    <div className="text-red-700 font-semibold mb-2">Bipolar</div>
                    <p className="text-sm text-gray-700">
                      Dois eletrodos, um de saída e outro de retorno, no mesmo cabeçote. Indicada para tratamentos superficiais, atingindo até 2mm.
                    </p>
                  </div>
                  
                  <div className="list-item p-5 bg-red-50 rounded-lg border-b-2 border-red-300">
                    <div className="text-red-700 font-semibold mb-2">Tripolar</div>
                    <p className="text-sm text-gray-700">
                      Três eletrodos no mesmo cabeçote, permitindo uma maior área de tratamento. Energia distribuída de forma menos homogênea.
                    </p>
                  </div>
                </div>
                
                <p className="content-p text-lg mb-0 leading-relaxed text-gray-700 bg-amber-50 p-4 rounded-lg">
                  É importante ressaltar que, apesar das diferentes configurações, as interações entre a corrente e os tecidos são similares para qualquer tipo de equipamento utilizado. Atualmente, não existem estudos comparativos definitivos entre os diferentes equipamentos.
                </p>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-4 mt-1">3</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-red-700 mb-4 flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-red-500" />
                  Frequência e Temperatura
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  A frequência utilizada na radiofrequência influencia a profundidade de atuação no tecido:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="list-item p-5 bg-gradient-to-br from-red-50 to-amber-50 rounded-lg text-center">
                    <div className="text-red-700 font-semibold mb-2">2.4 MHz</div>
                    <div className="text-sm text-gray-700">Mais superficial, ideal para tratar flacidez e estrias</div>
                  </div>
                  
                  <div className="list-item p-5 bg-gradient-to-br from-red-50 to-amber-50 rounded-lg text-center">
                    <div className="text-red-700 font-semibold mb-2">1.2 MHz</div>
                    <div className="text-sm text-gray-700">Intermediária, adequada para celulite ou gordura</div>
                  </div>
                  
                  <div className="list-item p-5 bg-gradient-to-br from-red-50 to-amber-50 rounded-lg text-center">
                    <div className="text-red-700 font-semibold mb-2">0.8 MHz</div>
                    <div className="text-sm text-gray-700">Mais profunda, utilizada para tratar gordura</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-amber-50 p-6 rounded-lg mb-6 border-l-4 border-amber-400">
                  <h4 className="font-semibold text-red-700 mb-3">Temperatura de Tratamento</h4>
                  <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                    A temperatura é um fator crucial no tratamento:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-amber-100 p-1 rounded-full mt-1 mr-2">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-gray-700"><span className="font-medium">37°C - 38°C:</span> Para fibroses, cicatrizes e celulite inflamatória</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-100 p-1 rounded-full mt-1 mr-2">
                        <Check className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-gray-700"><span className="font-medium">40°C - 42°C:</span> Para estimular a síntese de colágeno em casos de flacidez</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="list-section mb-12">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-4 mt-1">4</span>
              <div className="w-full">
                <h3 className="subtitle text-xl font-semibold text-red-700 mb-4 flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-red-500" />
                  Contraindicações
                </h3>
                
                <p className="content-p text-lg mb-4 leading-relaxed text-gray-700">
                  Existem algumas contraindicações importantes para o tratamento com radiofrequência:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  {[
                    "Gestantes",
                    "Portadores de marcapasso",
                    "Câncer ou metástase",
                    "Pacientes que já fizeram radioterapia",
                    "Artrite",
                    "Pacientes imunodeprimidos",
                    "Próteses metálicas",
                    "Área cirúrgica sem cicatrização",
                    "Doenças dermatológicas"
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
                
                <p className="content-p text-lg italic bg-gray-50 p-4 rounded-lg border-l-4 border-gray-200">
                  Espero que esta aula tenha sido esclarecedora. A radiofrequência é uma ferramenta poderosa na fisioterapia dermatofuncional, e o conhecimento aprofundado de seus princípios e técnicas é essencial para obtermos os melhores resultados para nossos pacientes.
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
          <Card className="border-red-200 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Material Complementar</h3>
              </div>
              <div className="p-6">
                <p className="mb-6 text-gray-700">Para aprofundar seus conhecimentos em Radiofrequência, recomendamos os seguintes materiais:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-red-600" />
                    </div>
                    <h4 className="font-medium text-red-700 mb-2">Artigos Científicos</h4>
                    <p className="text-sm text-gray-600">Sobre os efeitos na neocolagênese</p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-red-600" />
                    </div>
                    <h4 className="font-medium text-red-700 mb-2">Vídeos Demonstrativos</h4>
                    <p className="text-sm text-gray-600">Das técnicas de aplicação</p>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-red-600" />
                    </div>
                    <h4 className="font-medium text-red-700 mb-2">Estudos Comparativos</h4>
                    <p className="text-sm text-gray-600">Entre diferentes equipamentos</p>
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