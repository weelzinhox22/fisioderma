"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export function ExamsList() {
  const [activeTab, setActiveTab] = useState("pendentes")

  const pendingExams = [
    {
      id: "1",
      title: "Avaliação de Fundamentos",
      date: "10 de Junho, 2023",
      time: "14:00 - 16:00",
      duration: "2 horas",
      questions: 30,
    },
    {
      id: "2",
      title: "Prova de Técnicas Avançadas",
      date: "15 de Junho, 2023",
      time: "10:00 - 12:00",
      duration: "2 horas",
      questions: 25,
    },
    {
      id: "3",
      title: "Avaliação Final do Módulo",
      date: "30 de Junho, 2023",
      time: "09:00 - 11:00",
      duration: "2 horas",
      questions: 40,
    },
  ]

  const completedExams = [
    {
      id: "4",
      title: "Introdução à Fisioterapia Dermatofuncional",
      date: "15 de Maio, 2023",
      score: "85%",
      status: "Aprovado",
    },
    {
      id: "5",
      title: "Avaliação de Técnicas Básicas",
      date: "1 de Maio, 2023",
      score: "92%",
      status: "Aprovado",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <FileText className="h-5 w-5 mr-2 text-purple-500" />
          Provas e Avaliações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pendentes" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="pendentes" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Pendentes
            </TabsTrigger>
            <TabsTrigger value="concluidas" className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Concluídas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pendentes">
            <div className="space-y-4">
              {pendingExams.map((exam) => (
                <div key={exam.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{exam.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span>Data: {exam.date}</span>
                        <span className="mx-2">•</span>
                        <span>Horário: {exam.time}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span>Duração: {exam.duration}</span>
                        <span className="mx-2">•</span>
                        <span>Questões: {exam.questions}</span>
                      </div>
                    </div>
                    <Link href={`/dashboard/provas/${exam.id}`}>
                      <Button
                        variant="outline"
                        className="bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
                      >
                        Iniciar Prova
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="concluidas">
            <div className="space-y-4">
              {completedExams.map((exam) => (
                <div key={exam.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{exam.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span>Realizada em: {exam.date}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs mr-2">
                          {exam.status}
                        </div>
                        <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Nota: {exam.score}</div>
                      </div>
                    </div>
                    <Link href={`/dashboard/provas/${exam.id}/resultado`}>
                      <Button variant="outline" size="sm">
                        Ver Resultado
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
