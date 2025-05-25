"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, Share2, Bookmark, Clock, Calendar, FileText } from "lucide-react"
import { useSupabase } from "@/lib/supabase/provider"
import { useToast } from "@/hooks/use-toast"

interface ContentDetailsProps {
  id: string
}

export function ContentDetails({ id }: ContentDetailsProps) {
  const [content, setContent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const { supabase } = useSupabase()
  const { toast } = useToast()

  useEffect(() => {
    // Simulação de dados - em um ambiente real, buscaríamos do Supabase
    const fetchContent = async () => {
      setIsLoading(true)

      // Simulação de busca de dados
      setTimeout(() => {
        setContent({
          id,
          title: "Técnicas Avançadas de Drenagem Linfática",
          type: "PDF",
          category: "Técnicas",
          description:
            "Este material apresenta técnicas avançadas de drenagem linfática aplicadas à fisioterapia dermatofuncional, com foco em procedimentos pós-cirúrgicos.",
          author: "Dra. Ana Silva",
          publishedAt: "15/05/2023",
          readTime: "25 minutos",
          tags: ["Drenagem Linfática", "Pós-Cirúrgico", "Técnicas Avançadas"],
        })
        setIsLoading(false)
      }, 1000)
    }

    fetchContent()
  }, [id])

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Conteúdo removido dos salvos" : "Conteúdo salvo com sucesso",
      description: isSaved
        ? "O conteúdo foi removido da sua lista de salvos."
        : "O conteúdo foi adicionado à sua lista de salvos.",
    })
  }

  const handleCopyLink = useCallback(() => {
    try {
      navigator.clipboard.writeText(`${window.location.origin}/conteudos/${id}`)
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      })
    } catch (error) {
      console.error("Erro ao copiar link:", error)
      toast({
        title: "Erro ao copiar link",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive",
      })
    }
  }, [id, toast])

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-teal-500" />
            Carregando...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!content) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-teal-500" />
            Conteúdo não encontrado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">O conteúdo solicitado não foi encontrado ou não está disponível.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-teal-500" />
          Detalhes do Conteúdo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-bold">{content.title}</h3>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Badge variant="outline" className="mr-2 bg-teal-50 text-teal-700 border-teal-200">
              {content.category}
            </Badge>
            <span>{content.type}</span>
          </div>
        </div>

        <div>
          <p className="text-gray-700">{content.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <FileText className="h-4 w-4 mr-2" />
            <span>Autor: {content.author}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Publicado em: {content.publishedAt}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Tempo de leitura: {content.readTime}</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {content.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="bg-gray-100">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Button className="w-full bg-teal-500 hover:bg-teal-600">
            <Download className="h-4 w-4 mr-2" /> Baixar PDF
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleSave}>
              <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Salvo" : "Salvar"}
            </Button>
            <Button variant="outline" onClick={handleCopyLink}>
              <Share2 className="h-4 w-4 mr-2" /> Compartilhar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
