import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingAssistant } from "@/components/floating-assistant"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Lock, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function ProvasPage() {
  const provas = [
    {
      title: "Avaliação Básica de Fundamentos",
      description: "Teste seus conhecimentos básicos em fisioterapia dermatofuncional",
      duration: "30 minutos",
      questions: 15,
      difficulty: "Básico",
      isPublic: true,
    },
    {
      title: "Quiz de Anatomia da Pele",
      description: "Avalie seu conhecimento sobre estruturas anatômicas",
      duration: "20 minutos",
      questions: 10,
      difficulty: "Básico",
      isPublic: true,
    },
    {
      title: "Prova de Técnicas Avançadas",
      description: "Avaliação completa sobre técnicas especializadas",
      duration: "60 minutos",
      questions: 30,
      difficulty: "Avançado",
      isPublic: false,
    },
    {
      title: "Certificação Profissional",
      description: "Prova oficial para certificação na área",
      duration: "90 minutos",
      questions: 50,
      difficulty: "Profissional",
      isPublic: false,
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Provas e Avaliações</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Teste seus conhecimentos e obtenha certificações reconhecidas no mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {provas.map((prova, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{prova.title}</CardTitle>
                    {!prova.isPublic && <Lock className="h-5 w-5 text-gray-400" />}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      prova.difficulty === "Básico"
                        ? "text-green-600"
                        : prova.difficulty === "Avançado"
                          ? "text-orange-600"
                          : "text-red-600"
                    }`}
                  >
                    {prova.difficulty}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{prova.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Duração: {prova.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Questões: {prova.questions}</span>
                    </div>
                  </div>

                  {prova.isPublic ? (
                    <Button className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Iniciar Prova
                    </Button>
                  ) : (
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        <Lock className="h-4 w-4 mr-2" />
                        Fazer Login para Acessar
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <FloatingAssistant />
    </div>
  )
}
