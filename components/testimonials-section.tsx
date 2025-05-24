"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelector(".section-title"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
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

  const testimonials = [
    {
      name: "Ana Silva",
      role: "Fisioterapeuta",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "A plataforma transformou minha prática clínica. Os conteúdos são de altíssima qualidade e as técnicas ensinadas são baseadas em evidências científicas atualizadas.",
    },
    {
      name: "Carlos Mendes",
      role: "Estudante de Fisioterapia",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Como estudante, encontrei na DermaFisio um complemento perfeito para minha formação acadêmica. O material é didático e os professores são excelentes.",
    },
    {
      name: "Patrícia Oliveira",
      role: "Especialista em Dermatofuncional",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Mesmo sendo especialista há anos, sempre encontro conteúdos relevantes e atualizados que me ajudam a aprimorar minhas técnicas e oferecer melhores resultados aos meus pacientes.",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-teal-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 section-title"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Dizem Nossos Usuários</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja o que profissionais e estudantes estão falando sobre nossa plataforma.
          </p>
        </motion.div>

        <div ref={cardsRef} className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-teal-200">
              <Quote className="h-20 w-20" />
            </div>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-teal-100">
                      <Image
                        src={testimonials[activeIndex].image || "/placeholder.svg"}
                        alt={testimonials[activeIndex].name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
                      "{testimonials[activeIndex].content}"
                    </p>

                    <div>
                      <h4 className="text-lg font-bold">{testimonials[activeIndex].name}</h4>
                      <p className="text-gray-600">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? "bg-teal-500" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Ver depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-12 space-x-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full h-10 w-10">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full h-10 w-10">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
