import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingAssistant } from "@/components/floating-assistant"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Lock, Flame, Snowflake, Waves, Zap, Speaker, Leaf, BookOpenCheck } from "lucide-react"
import Link from "next/link"

export default function ConteudosPage() {
  const conteudos = [
    {
      title: "Criolipólise",
      description: "Resfriamento Controlado para Redução de Gordura Localizada",
      category: "Técnicas",
      isPublic: true,
      link: "/conteudos/criolise",
      icon: Snowflake,
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
      textColor: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      title: "Lipocavitação",
      description: "Técnica de ultrassom para redução de gordura localizada",
      category: "Técnicas",
      isPublic: true,
      link: "/conteudos/lipocavitacao",
      icon: Waves,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Ultrassom",
      description: "Fundamentos e Aplicações na Fisioterapia Dermatofuncional",
      category: "Técnicas",
      isPublic: true,
      link: "/conteudos/ultrassom",
      icon: Speaker,
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Queimados",
      description: "Fisioterapia Dermatofuncional para Tratamento de Queimaduras",
      category: "Técnicas",
      isPublic: true,
      link: "/conteudos/queimados",
      icon: Flame,
      color: "bg-gradient-to-br from-rose-500 to-rose-600",
      textColor: "text-rose-600",
      bgColor: "bg-rose-50"
    },
    {
      title: "Radiofrequência",
      description: "Tecnologia para tratamento de flacidez e rejuvenescimento",
      category: "Técnicas",
      isPublic: true,
      link: "/conteudos/radiofrequencia",
      icon: Zap,
      color: "bg-gradient-to-br from-red-500 to-red-600",
      textColor: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Introdução à Fisioterapia Dermatofuncional",
      description: "Conceitos básicos e fundamentos da especialidade",
      category: "Fundamentos",
      isPublic: true,
      icon: BookOpenCheck,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Anatomia da Pele e Tecido Subcutâneo",
      description: "Estrutura e função dos tecidos tratados",
      category: "Anatomia",
      isPublic: true,
      icon: Leaf,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Técnicas Avançadas de Drenagem Linfática",
      description: "Protocolos especializados para diferentes condições",
      category: "Técnicas",
      isPublic: false,
      icon: Waves,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Tratamento Pós-Cirúrgico",
      description: "Cuidados e protocolos para recuperação",
      category: "Especialização",
      isPublic: false,
      icon: BookOpen,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <Navbar />
      <div className="pt-36 mt-8">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#B38E6A] to-[#D9C5B2]">
                Biblioteca de Conteúdos
              </span>
            </h1>
            <div className="w-20 h-1 mx-auto bg-gradient-to-r from-[#B38E6A] to-[#D9C5B2] rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Acesse materiais educacionais de alta qualidade sobre fisioterapia dermatofuncional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conteudos.map((conteudo, index) => (
              <Card 
                key={index} 
                className={`h-full overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 ${
                  conteudo.isPublic ? 
                    conteudo.color ? `border-t-${conteudo.color.split(' ').pop()?.replace('to-', '')}` : 'border-t-gray-300' 
                    : 'border-t-gray-300'
                }`}
              >
                <CardHeader className={`${conteudo.bgColor} pb-4`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${conteudo.color} text-white`}>
                        {conteudo.icon && <conteudo.icon className="h-5 w-5" />}
                      </div>
                      <CardTitle className="text-lg">{conteudo.title}</CardTitle>
                    </div>
                    {!conteudo.isPublic && <Lock className="h-5 w-5 text-gray-400" />}
                  </div>
                  <div className={`text-xs font-medium mt-2 inline-block px-2 py-1 rounded-full ${conteudo.textColor} ${conteudo.bgColor}`}>
                    {conteudo.category}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600 mb-6 text-sm">{conteudo.description}</p>
                  {conteudo.isPublic ? (
                    conteudo.link ? (
                      <Link href={conteudo.link}>
                        <Button className={`w-full transition-all duration-300 hover:translate-y-[-2px] ${conteudo.color} text-white`}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Acessar Conteúdo
                        </Button>
                      </Link>
                    ) : (
                      <Button className={`w-full transition-all duration-300 hover:translate-y-[-2px] ${conteudo.color} text-white`}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Acessar Conteúdo
                      </Button>
                    )
                  ) : (
                    <Link href="/login">
                      <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-100">
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
