import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingAssistant } from "@/components/floating-assistant"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Lock } from "lucide-react"
import Link from "next/link"

export default function ConteudosPage() {
  const conteudos = [
    {
      title: "Introdução à Fisioterapia Dermatofuncional",
      description: "Conceitos básicos e fundamentos da especialidade",
      category: "Fundamentos",
      isPublic: true,
    },
    {
      title: "Anatomia da Pele e Tecido Subcutâneo",
      description: "Estrutura e função dos tecidos tratados",
      category: "Anatomia",
      isPublic: true,
    },
    {
      title: "Técnicas Avançadas de Drenagem Linfática",
      description: "Protocolos especializados para diferentes condições",
      category: "Técnicas",
      isPublic: false,
    },
    {
      title: "Tratamento Pós-Cirúrgico",
      description: "Cuidados e protocolos para recuperação",
      category: "Especialização",
      isPublic: false,
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Biblioteca de Conteúdos</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Acesse materiais educacionais de alta qualidade sobre fisioterapia dermatofuncional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conteudos.map((conteudo, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{conteudo.title}</CardTitle>
                    {!conteudo.isPublic && <Lock className="h-5 w-5 text-gray-400" />}
                  </div>
                  <div className="text-sm text-teal-600 font-medium">{conteudo.category}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{conteudo.description}</p>
                  {conteudo.isPublic ? (
                    <Button className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Acessar Conteúdo
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
