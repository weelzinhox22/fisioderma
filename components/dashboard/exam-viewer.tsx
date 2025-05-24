"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Clock, AlertCircle, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ExamViewerProps {
  id: string
}

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer?: number
}

export function ExamViewer({ id }: ExamViewerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hora em segundos
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false)
  const [isTimeUpDialogOpen, setIsTimeUpDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Exemplo de questões
  const questions: Question[] = [
    {
      id: 1,
      text: "Qual das seguintes técnicas é mais indicada para tratamento de fibroses pós-operatórias em cirurgias estéticas?",
      options: ["Drenagem linfática manual", "Ultrassom terapêutico", "Radiofrequência", "Eletroestimulação"],
      correctAnswer: 1,
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
    },
    {
      id: 4,
      text: "Em qual fase do processo de cicatrização é mais indicado iniciar o tratamento com laser de baixa potência?",
      options: ["Fase inflamatória", "Fase proliferativa", "Fase de remodelação", "Fase hemostática"],
      correctAnswer: 0,
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
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsTimeUpDialogOpen(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion]: Number.parseInt(value),
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleFinishExam = () => {
    setIsFinishDialogOpen(true)
  }

  const submitExam = () => {
    setIsSubmitting(true)

    // Simulação de envio para o servidor
    setTimeout(() => {
      setIsSubmitting(false)
      setIsFinishDialogOpen(false)

      toast({
        title: "Prova enviada com sucesso!",
        description: "Suas respostas foram registradas. Você será redirecionado para os resultados.",
      })

      // Redirecionar para a página de resultados
      router.push(`/dashboard/provas/${id}/resultado`)
    }, 1500)
  }

  const progress = (Object.keys(answers).length / questions.length) * 100

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Avaliação de Fundamentos</CardTitle>
            <div className="flex items-center text-amber-600">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Progresso</span>
              <span>
                {Object.keys(answers).length} de {questions.length} questões respondidas
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-4">
              Questão {currentQuestion + 1}: {questions[currentQuestion].text}
            </h3>

            <RadioGroup
              value={answers[currentQuestion]?.toString()}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <RadioGroupItem value={index.toString()} id={`q${currentQuestion}-option${index}`} />
                  <Label htmlFor={`q${currentQuestion}-option${index}`} className="text-gray-700">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>

            {currentQuestion < questions.length - 1 ? (
              <Button onClick={handleNextQuestion}>
                Próxima <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleFinishExam} className="bg-green-600 hover:bg-green-700">
                Finalizar Prova <CheckCircle className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 text-sm text-gray-500">
          <div className="flex items-start">
            <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
            <p>
              Certifique-se de responder todas as questões antes de finalizar. Você não poderá retornar à prova após o
              envio.
            </p>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {questions.map((_, index) => (
          <Button
            key={index}
            variant={answers[index] !== undefined ? "default" : "outline"}
            className={`h-10 w-10 p-0 ${currentQuestion === index ? "ring-2 ring-offset-2 ring-teal-500" : ""} ${
              answers[index] !== undefined ? "bg-teal-500 hover:bg-teal-600" : ""
            }`}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {/* Diálogo de confirmação para finalizar a prova */}
      <AlertDialog open={isFinishDialogOpen} onOpenChange={setIsFinishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Finalizar Prova?</AlertDialogTitle>
            <AlertDialogDescription>
              Você respondeu {Object.keys(answers).length} de {questions.length} questões.
              {Object.keys(answers).length < questions.length && (
                <span className="block mt-2 text-amber-600 font-medium">
                  Atenção: Existem questões não respondidas.
                </span>
              )}
              Após finalizar, você não poderá retornar à prova.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar à Prova</AlertDialogCancel>
            <AlertDialogAction onClick={submitExam} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                </>
              ) : (
                "Finalizar e Enviar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de tempo esgotado */}
      <AlertDialog open={isTimeUpDialogOpen} onOpenChange={setIsTimeUpDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tempo Esgotado!</AlertDialogTitle>
            <AlertDialogDescription>
              O tempo para realização da prova acabou. Suas respostas serão enviadas automaticamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={submitExam} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                </>
              ) : (
                "Entendi"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
