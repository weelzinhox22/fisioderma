"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Trash2, Search, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

// Tipo para questão
interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  category: string
  difficulty: string
  createdAt: string
  createdBy: string
}

export default function BancoQuestoesPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const { toast } = useToast()
  const router = useRouter()

  // Verificar autenticação
  useEffect(() => {
    const storedUser = localStorage.getItem("specialUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.role === "admin" || user.role === "professor") {
        setCurrentUser(user)
      } else {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  // Carregar questões (simulado)
  useEffect(() => {
    if (currentUser) {
      // Simulação de carregamento de dados
      setTimeout(() => {
        const mockQuestions: Question[] = [
          {
            id: "1",
            text: "Qual das seguintes técnicas é mais indicada para tratamento de fibroses pós-operatórias em cirurgias estéticas?",
            options: ["Drenagem linfática manual", "Ultrassom terapêutico", "Radiofrequência", "Eletroestimulação"],
            correctAnswer: 1,
            category: "Técnicas",
            difficulty: "Intermediário",
            createdAt: "2023-05-15",
            createdBy: "Profa. Adriana",
          },
          {
            id: "2",
            text: "Quais são os principais benefícios da drenagem linfática no pós-operatório de lipoaspiração?",
            options: [
              "Aumento da circulação sanguínea e redução de edemas",
              "Fortalecimento muscular e aumento da amplitude de movimento",
              "Redução de cicatrizes e clareamento da pele",
              "Aumento da elasticidade da pele e redução de rugas",
            ],
            correctAnswer: 0,
            category: "Pós-operatório",
            difficulty: "Básico",
            createdAt: "2023-06-10",
            createdBy: "Profa. Adriana",
          },
          {
            id: "3",
            text: "Qual é o principal mecanismo de ação da radiofrequência no tratamento da flacidez cutânea?",
            options: [
              "Estimulação da produção de melanina",
              "Aumento da circulação linfática",
              "Estimulação da produção de colágeno através do aquecimento profundo",
              "Redução da camada de gordura subcutânea",
            ],
            correctAnswer: 2,
            category: "Equipamentos",
            difficulty: "Avançado",
            createdAt: "2023-07-05",
            createdBy: "Weelzinho Admin",
          },
          {
            id: "4",
            text: "Em qual fase do processo de cicatrização é mais indicado iniciar o tratamento com laser de baixa potência?",
            options: ["Fase inflamatória", "Fase proliferativa", "Fase de remodelação", "Fase hemostática"],
            correctAnswer: 0,
            category: "Cicatrização",
            difficulty: "Avançado",
            createdAt: "2023-08-20",
            createdBy: "Profa. Adriana",
          },
          {
            id: "5",
            text: "Qual das seguintes condições é uma contraindicação absoluta para a aplicação de ultrassom terapêutico?",
            options: [
              "Presença de implantes metálicos",
              "Áreas com sensibilidade alterada",
              "Sobre áreas de trombose ou tromboflebite",
              "Tecidos cicatriciais",
            ],
            correctAnswer: 2,
            category: "Contraindicações",
            difficulty: "Intermediário",
            createdAt: "2023-09-15",
            createdBy: "Weelzinho Admin",
          },
        ]

        setQuestions(mockQuestions)
        setIsLoading(false)
      }, 1000)
    }
  }, [currentUser])

  // Filtrar questões
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter ? question.category === categoryFilter : true
    const matchesDifficulty = difficultyFilter ? question.difficulty === difficultyFilter : true

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Categorias únicas para o filtro
  const categories = Array.from(new Set(questions.map((q) => q.category)))

  // Níveis de dificuldade únicos para o filtro
  const difficulties = Array.from(new Set(questions.map((q) => q.difficulty)))

  // Adicionar nova questão
  const handleAddQuestion = (newQuestion: Omit<Question, "id" | "createdAt" | "createdBy">) => {
    const question: Question = {
      ...newQuestion,
      id: (questions.length + 1).toString(),
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: currentUser.name || currentUser.email,
    }

    setQuestions([...questions, question])
    toast({
      title: "Questão adicionada",
      description: "A questão foi adicionada com sucesso ao banco de questões.",
    })
  }

  // Editar questão
  const handleEditQuestion = (id: string, updatedQuestion: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updatedQuestion } : q)))
    toast({
      title: "Questão atualizada",
      description: "A questão foi atualizada com sucesso.",
    })
  }

  // Excluir questão
  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
    toast({
      title: "Questão excluída",
      description: "A questão foi excluída permanentemente.",
    })
  }

  if (!currentUser) {
    return null // Aguardando verificação de autenticação
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Banco de Questões</h1>
            <p className="text-gray-600">Gerencie as questões utilizadas nas provas e avaliações da plataforma.</p>
          </div>

          <Tabs defaultValue="list" className="space-y-6">
            <TabsList>
              <TabsTrigger value="list">Lista de Questões</TabsTrigger>
              <TabsTrigger value="add">Adicionar Questão</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle>Questões Disponíveis</CardTitle>
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          type="search"
                          placeholder="Buscar questão..."
                          className="pl-8 w-full md:w-64"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger className="w-full md:w-40">
                            <SelectValue placeholder="Categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas categorias</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                          <SelectTrigger className="w-full md:w-40">
                            <SelectValue placeholder="Dificuldade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas dificuldades</SelectItem>
                            {difficulties.map((difficulty) => (
                              <SelectItem key={difficulty} value={difficulty}>
                                {difficulty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="w-8 h-8 border-4 border-t-transparent border-teal-500 rounded-full animate-spin"></div>
                    </div>
                  ) : filteredQuestions.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma questão encontrada</h3>
                      <p className="text-gray-500 mb-4">
                        {searchQuery || categoryFilter || difficultyFilter
                          ? "Tente ajustar os filtros de busca."
                          : "Adicione questões ao banco para começar."}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50%]">Questão</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Dificuldade</TableHead>
                            <TableHead>Criado por</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredQuestions.map((question) => (
                            <TableRow key={question.id}>
                              <TableCell className="font-medium">
                                {question.text.length > 80 ? `${question.text.substring(0, 80)}...` : question.text}
                              </TableCell>
                              <TableCell>{question.category}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    question.difficulty === "Básico"
                                      ? "bg-green-100 text-green-800"
                                      : question.difficulty === "Intermediário"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-purple-100 text-purple-800"
                                  }`}
                                >
                                  {question.difficulty}
                                </span>
                              </TableCell>
                              <TableCell>{question.createdBy}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="icon">
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                      <DialogHeader>
                                        <DialogTitle>Editar Questão</DialogTitle>
                                        <DialogDescription>
                                          Faça as alterações necessárias na questão abaixo.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <QuestionForm
                                        initialData={question}
                                        onSubmit={(data) => {
                                          handleEditQuestion(question.id, data)
                                        }}
                                      />
                                    </DialogContent>
                                  </Dialog>

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="icon" className="text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Excluir Questão</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Tem certeza que deseja excluir esta questão? Esta ação não pode ser desfeita.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDeleteQuestion(question.id)}
                                          className="bg-red-500 hover:bg-red-600"
                                        >
                                          Excluir
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Nova Questão</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuestionForm onSubmit={handleAddQuestion} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// Componente de formulário para adicionar/editar questões
interface QuestionFormProps {
  initialData?: Question
  onSubmit: (data: any) => void
}

function QuestionForm({ initialData, onSubmit }: QuestionFormProps) {
  const [formData, setFormData] = useState({
    text: initialData?.text || "",
    options: initialData?.options || ["", "", "", ""],
    correctAnswer: initialData?.correctAnswer || 0,
    category: initialData?.category || "all",
    difficulty: initialData?.difficulty || "all",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="text">Texto da Questão</Label>
        <Textarea
          id="text"
          name="text"
          placeholder="Digite o enunciado da questão..."
          rows={3}
          value={formData.text}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-4">
        <Label>Alternativas</Label>
        {formData.options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <input
                type="radio"
                id={`correct-${index}`}
                name="correctAnswer"
                value={index}
                checked={formData.correctAnswer === index}
                onChange={() => setFormData({ ...formData, correctAnswer: index })}
                className="mr-2"
              />
              <Label htmlFor={`correct-${index}`} className="sr-only">
                Alternativa correta
              </Label>
            </div>
            <Input
              placeholder={`Alternativa ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas categorias</SelectItem>
              <SelectItem value="Técnicas">Técnicas</SelectItem>
              <SelectItem value="Equipamentos">Equipamentos</SelectItem>
              <SelectItem value="Anatomia">Anatomia</SelectItem>
              <SelectItem value="Pós-operatório">Pós-operatório</SelectItem>
              <SelectItem value="Cicatrização">Cicatrização</SelectItem>
              <SelectItem value="Contraindicações">Contraindicações</SelectItem>
              <SelectItem value="Avaliação">Avaliação</SelectItem>
              <SelectItem value="Fundamentos">Fundamentos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Nível de Dificuldade</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas dificuldades</SelectItem>
              <SelectItem value="Básico">Básico</SelectItem>
              <SelectItem value="Intermediário">Intermediário</SelectItem>
              <SelectItem value="Avançado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
          {initialData ? "Salvar Alterações" : "Adicionar Questão"}
        </Button>
      </div>
    </form>
  )
}
