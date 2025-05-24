"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, BookMarked, FileText, Video } from "lucide-react"

export function ContentList() {
  const [searchQuery, setSearchQuery] = useState("")

  const contentCategories = [
    {
      id: "fundamentos",
      title: "Fundamentos",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "tecnicas",
      title: "Técnicas",
      icon: <BookMarked className="h-4 w-4" />,
    },
    {
      id: "estudos",
      title: "Estudos de Caso",
      icon: <FileText className="h-4 w-4" />,
    },
  ]

  const contentItems = [
    {
      id: "1",
      title: "Introdução à Fisioterapia Dermatofuncional",
      type: "PDF",
      category: "fundamentos",
      icon: <FileText className="h-4 w-4 text-red-500" />,
    },
    {
      id: "2",
      title: "Anatomia da Pele e Tecido Subcutâneo",
      type: "PDF",
      category: "fundamentos",
      icon: <FileText className="h-4 w-4 text-red-500" />,
    },
    {
      id: "3",
      title: "Técnicas de Drenagem Linfática",
      type: "Vídeo",
      category: "tecnicas",
      icon: <Video className="h-4 w-4 text-blue-500" />,
    },
    {
      id: "4",
      title: "Protocolos para Tratamento de Celulite",
      type: "PDF",
      category: "tecnicas",
      icon: <FileText className="h-4 w-4 text-red-500" />,
    },
    {
      id: "5",
      title: "Estudo de Caso: Tratamento Pós-Cirúrgico",
      type: "PDF",
      category: "estudos",
      icon: <FileText className="h-4 w-4 text-red-500" />,
    },
  ]

  const filteredContent = contentItems.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-teal-500" />
          Biblioteca de Conteúdos
        </CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar conteúdo..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="fundamentos">
          <TabsList className="mb-4 w-full">
            {contentCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                {category.icon}
                <span className="ml-2">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {contentCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="space-y-2">
                {filteredContent
                  .filter((item) => item.category === category.id)
                  .map((item) => (
                    <button
                      key={item.id}
                      className="w-full text-left p-3 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                    >
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                      <span className="ml-auto text-xs text-gray-500">{item.type}</span>
                    </button>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
