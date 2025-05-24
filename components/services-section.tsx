"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap, Heart, Award, Users, Lightbulb } from "lucide-react"

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".service-card")

      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
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

  const services = [
    {
      icon: <Sparkles className="h-10 w-10 text-teal-500" />,
      title: "Tratamentos Estéticos",
      description: "Procedimentos avançados para melhorar a aparência da pele e contorno corporal.",
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
      icon: <Award className="h-10 w-10 text-amber-500" />,
      title: "Certificações",
      description: "Obtenha certificados reconhecidos ao concluir nossos módulos de estudo.",
    },
    {
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: "Comunidade Profissional",
      description: "Conecte-se com outros profissionais e compartilhe experiências e conhecimentos.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-yellow-500" />,
      title: "Conteúdo Exclusivo",
      description: "Acesso a materiais educacionais atualizados e baseados em evidências científicas.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos uma variedade de recursos e serviços para profissionais e estudantes de fisioterapia
            dermatofuncional.
          </p>
        </motion.div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="service-card overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-8">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
              <div className="h-1 bg-gradient-to-r from-teal-400 to-purple-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
