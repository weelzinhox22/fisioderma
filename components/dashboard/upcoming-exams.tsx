"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { gsap } from "gsap"
import { FileText, Calendar } from "lucide-react"
import Link from "next/link"

export function UpcomingExams() {
  const examsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (examsRef.current) {
      const items = examsRef.current.querySelectorAll(".exam-item")

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

  const upcomingExams = [
    {
      title: "Avaliação de Fundamentos",
      date: "10 de Junho, 2023",
      time: "14:00 - 16:00",
      status: "Pendente",
    },
    {
      title: "Prova de Técnicas Avançadas",
      date: "15 de Junho, 2023",
      time: "10:00 - 12:00",
      status: "Pendente",
    },
    {
      title: "Avaliação Final do Módulo",
      date: "30 de Junho, 2023",
      time: "09:00 - 11:00",
      status: "Pendente",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <FileText className="h-5 w-5 mr-2 text-purple-500" />
          Próximas Provas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={examsRef} className="space-y-4">
          {upcomingExams.map((exam, index) => (
            <div key={index} className="exam-item">
              <Link href="/dashboard/provas" className="block hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{exam.title}</h4>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>{exam.date}</span>
                      <span className="mx-2">•</span>
                      <span>{exam.time}</span>
                    </div>
                  </div>
                  <div className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs">{exam.status}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
