"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current && layersRef.current) {
      const layers = layersRef.current.querySelectorAll(".parallax-layer")

      layers.forEach((layer, i) => {
        const depth = i / layers.length

        gsap.to(layer, {
          y: `${depth * 100}%`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 0 },
          {
            y: "30%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div ref={layersRef} className="absolute inset-0">
        <div className="parallax-layer absolute inset-0 bg-gradient-to-b from-teal-900 to-purple-900 opacity-80" />
        <div
          className="parallax-layer absolute inset-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.4,
          }}
        />
        <div className="parallax-layer absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
      </div>

      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div ref={contentRef} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Transforme sua carreira com conhecimento especializado
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Acesse conteúdos exclusivos, participe de avaliações e obtenha certificações reconhecidas no mercado.
              Nossa plataforma oferece tudo o que você precisa para se destacar na fisioterapia dermatofuncional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/registro">
                <Button size="lg" className="bg-white text-teal-900 hover:bg-gray-100">
                  Comece agora
                </Button>
              </Link>
              <Link href="/sobre">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Saiba mais
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
