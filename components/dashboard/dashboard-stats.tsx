"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { BookOpen, FileText, Clock, Award } from "lucide-react"

export function DashboardStats() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll(".stat-card")

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
      )
    }
  }, [])

  const stats = [
    {
      title: "Conteúdos Disponíveis",
      value: "24",
      icon: <BookOpen className="h-8 w-8 text-teal-500" />,
      color: "from-teal-50 to-teal-100",
      textColor: "text-teal-700",
    },
    {
      title: "Provas Realizadas",
      value: "7",
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      color: "from-purple-50 to-purple-100",
      textColor: "text-purple-700",
    },
    {
      title: "Horas de Estudo",
      value: "32",
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      color: "from-blue-50 to-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Certificados",
      value: "3",
      icon: <Award className="h-8 w-8 text-amber-500" />,
      color: "from-amber-50 to-amber-100",
      textColor: "text-amber-700",
    },
  ]

  return (
    <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className={`stat-card overflow-hidden`}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className={`text-3xl font-bold mt-2 ${stat.textColor}`}>{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color}`}>{stat.icon}</div>
            </div>
          </CardContent>
          <div
            className={`h-1 w-full bg-gradient-to-r ${stat.color.replace("from-", "from-").replace("to-", "to-")}`}
          />
        </Card>
      ))}
    </div>
  )
}
