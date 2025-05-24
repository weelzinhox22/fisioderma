"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap, Heart, BookOpen, FileText, Brain } from "lucide-react"

const FeatureCard = ({ icon, title, description, index }: any) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-4 relative">
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-teal-50 rounded-full opacity-70" />
            <div className="relative">{icon}</div>
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
        <div className="h-1 bg-gradient-to-r from-teal-400 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </Card>
    </motion.div>
  )
}

export function AnimatedFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current.querySelectorAll(".char"),
        {
          opacity: 0,
          y: 20,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "back.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-teal-500" />,
      title: "Técnicas Avançadas",
      description: "Procedimentos e protocolos eficazes para diversos tratamentos dermatofuncionais.",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: "Reabilitação Pós-Cirúrgica",
      description: "Técnicas especializadas para recuperação após procedimentos cirúrgicos.",
    },
    {
      icon: <Heart className="h-10 w-10 text-red-500" />,
      title: "Tratamento de Cicatrizes",
      description: "Métodos eficazes para reduzir a aparência de cicatrizes e melhorar a textura da pele.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-amber-500" />,
      title: "Fundamentos Científicos",
      description: "Base teórica e evidências científicas atualizadas para sua prática profissional.",
    },
    {
      icon: <Brain className="h-10 w-10 text-blue-500" />,
      title: "Raciocínio Clínico",
      description: "Desenvolvimento da capacidade de análise e tomada de decisão em casos clínicos.",
    },
    {
      icon: <FileText className="h-10 w-10 text-yellow-500" />,
      title: "Materiais de Estudo",
      description: "Acesso a conteúdos educacionais gratuitos e baseados em evidências científicas.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-4" data-splitting="chars">
            {"Conteúdos Gratuitos".split("").map((char, i) => (
              <span key={i} className="char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore nossa biblioteca completa de recursos gratuitos para aprimorar seus conhecimentos 
            em fisioterapia dermatofuncional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
