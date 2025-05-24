"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { CheckCircle, XCircle, Award, ArrowLeft, Download, Share2 } from "lucide-react"
import { motion } from "framer-motion"

interface ExamResultProps {
  id: string
}

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  userAnswer?: number
}

export function ExamResult({ id }: ExamResultProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    // Simulação de carregamento dos resultados
    const timer = setTimeout(() => {
      // Dados simulados
      const mockQuestions: Question[] = [
        {
          id: 1,
          text: "Qual das seguintes técnicas é mais indicada para tratamento de fibroses pós-operatórias em cirurgias estéticas?",
          options: ["Drenagem linfática manual", "Ultrassom terapêutico", "Radiofrequência", "Eletroestimulação"],
          correctAnswer: 1,
          userAnswer: 1,
        },
        {
          id: 2,
          text: "Quais são os principais benefícios da drenagem linfática no pós-operatório de lipoaspiração?",
          options: [
            "Aumento da circulação sanguínea e redução de edemas",
            "Fortalecimento muscular e aumento da amplitude de movimento",
            "Redução de cicatrizes e clareamento da pele",
            "Aumento da elasticidade da pele e redução de rugas",
          ],
          correctAnswer: 0,
          userAnswer: 0,
        },
        {
          id: 3,
          text: "Qual é o principal mecanismo de ação da radiofrequência no tratamento da flacidez cutânea?",
          options: [
            "Estimulação da produção de melanina",
            "Aumento da circulação linfática",
            "Estimulação da produção de colágeno através do aquecimento profundo",
            "Redução da camada de gordura subcutânea",
          ],
          correctAnswer: 2,
          userAnswer: 3,
        },
        {
          id: 4,
          text: "Em qual fase do processo de cicatrização é mais indicado iniciar o tratamento com laser de baixa potência?",
          options: ["Fase inflamatória", "Fase proliferativa", "Fase de remodelação", "Fase hemostática"],
          correctAnswer: 0,
          userAnswer: 0,
        },
        {
          id: 5,
          text: "Qual das seguintes condições é uma contraindicação absoluta para a aplicação de ultrassom terapêutico?",
          options: [
            "Presença de implantes metálicos",
            "Áreas com sensibilidade alterada",
            "Sobre áreas de trombose ou tromboflebite",
            "Tecidos cicatriciais",
          ],
          correctAnswer: 2,
          userAnswer: 2,
        },
      ]

      setQuestions(mockQuestions)

      // Calcular pontuação
      const correctAnswers = mockQuestions.filter((q) => q.userAnswer === q.correctAnswer).length
      const calculatedScore = (correctAnswers / mockQuestions.length) * 100
      setScore(calculatedScore)

      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [id])

  const isPassed = score >= 70

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Carregando resultados...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="mb-8 overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardTitle className="text-xl">Resultado Final</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mb-6"
            >
              {isPassed ? (
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <Award className="h-12 w-12 text-green-600" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                  <XCircle className="h-12 w-12 text-amber-600" />
                </div>
              )}
            </motion.div>

            <h3 className="text-2xl font-bold mb-2">
              {isPassed ? "Parabéns! Você foi aprovado!" : "Você não atingiu a pontuação mínima."}
            </h3>
            <p className="text-gray-600 mb-6">
              {isPassed
                ? "Você demonstrou um bom conhecimento sobre o tema avaliado."
                : "Continue estudando e tente novamente quando estiver preparado."}
            </p>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Sua pontuação</span>
                <span>{Math.round(score)}%</span>
              </div>
              <Progress value={score} className="h-3" indicatorClassName={isPassed ? "bg-green-500" : "bg-amber-500"} />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>0%</span>
                <span className={isPassed ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                  Mínimo para aprovação: 70%
                </span>
                <span>100%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Questões corretas</p>
                <p className="text-2xl font-bold text-green-600">
                  {questions.filter((q) => q.userAnswer === q.correctAnswer).length}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Questões incorretas</p>
                <p className="text-2xl font-bold text-red-600">
                  {questions.filter((q) => q.userAnswer !== q.correctAnswer).length}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <Link href="/dashboard/provas">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Provas
            </Button>
          </Link>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Baixar Certificado
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" /> Compartilhar
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Revisão das Questões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {questions.map((question, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {question.userAnswer === question.correctAnswer ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium mb-3">
                      Questão {index + 1}: {question.text}
                    </h4>

                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-md ${
                            optIndex === question.correctAnswer
                              ? "bg-green-50 border border-green-200"
                              : optIndex === question.userAnswer && optIndex !== question.correctAnswer
                                ? "bg-red-50 border border-red-200"
                                : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-2">
                              {optIndex === question.correctAnswer ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : optIndex === question.userAnswer && optIndex !== question.correctAnswer ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : (
                                <div className="h-5 w-5"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p
                                className={`${
                                  optIndex === question.correctAnswer
                                    ? "text-green-800"
                                    : optIndex === question.userAnswer && optIndex !== question.correctAnswer
                                      ? "text-red-800"
                                      : "text-gray-700"
                                }`}
                              >
                                {option}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {question.userAnswer !== question.correctAnswer && (
                      <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                        <p className="text-blue-800 font-medium">Explicação:</p>
                        <p className="text-blue-800">
                          A resposta correta é a opção {question.correctAnswer + 1} porque esta técnica é a mais eficaz
                          para o tratamento mencionado, conforme estudos recentes na área.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
