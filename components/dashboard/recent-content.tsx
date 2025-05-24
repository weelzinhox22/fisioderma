"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { gsap } from "gsap"
import { BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/lib/supabase/provider"

export function RecentContent() {
  const contentRef = useRef<HTMLDivElement>(null)
  const { userRole } = useSupabase()

  useEffect(() => {
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll(".content-item")

      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.3,
        },
      )
    }
  }, [])

  const recentContent = [
    {
      title: "Introdução à Fisioterapia Dermatofuncional",
      category: "Fundamentos",
      date: "2 dias atrás",
      progress: 75,
    },
    {
      title: "Técnicas de Drenagem Linfática",
      category: "Técnicas",
      date: "1 semana atrás",
      progress: 40,
    },
    {
      title: "Avaliação Dermatofuncional",
      category: "Avaliação",
      date: "2 semanas atrás",
      progress: 100,
    },
  ]

  const isPremium = userRole === "premium" || userRole === "admin"

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-teal-500" />
          Conteúdos Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isPremium ? (
          <div ref={contentRef} className="space-y-4">
            {recentContent.map((content, index) => (
              <div key={index} className="content-item">
                <Link href="/dashboard/conteudos" className="block hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{content.title}</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs">
                          {content.category}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{content.date}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${content.progress}%` }} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Conteúdo Bloqueado</h3>
            <p className="text-gray-500 mb-4">Faça upgrade para o plano Premium para acessar todos os conteúdos.</p>
            <Button variant="outline" className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-none">
              Fazer Upgrade
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
