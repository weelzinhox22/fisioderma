"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Loader2 } from "lucide-react"

interface PdfViewerProps {
  id?: string
}

export function PdfViewer({ id }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [totalPages, setTotalPages] = useState(5) // Exemplo
  const [isLoading, setIsLoading] = useState(id ? true : false)

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      // Simulação de carregamento do PDF
      const timer = setTimeout(() => {
        setIsLoading(false)
        setTotalPages(Math.floor(Math.random() * 10) + 5) // Simulação de número de páginas
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [id])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 25)
    }
  }

  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom(zoom - 25)
    }
  }

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={currentPage === 1 || isLoading}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isLoading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoom <= 50 || isLoading}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm">{zoom}%</span>
          <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoom >= 200 || isLoading}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled={isLoading}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-0 h-[600px] overflow-auto flex items-center justify-center bg-gray-100">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 text-teal-500 animate-spin mb-4" />
            <p className="text-gray-600">Carregando documento...</p>
          </div>
        ) : (
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center top",
              transition: "transform 0.2s",
            }}
            className="bg-white shadow-lg my-4"
          >
            {id ? (
              // Simulação de conteúdo do PDF
              <div className="w-[595px] h-[842px] p-12">
                <div className="border-b pb-4 mb-6">
                  <h1 className="text-2xl font-bold text-teal-700">Técnicas Avançadas de Drenagem Linfática</h1>
                  <p className="text-gray-600 mt-2">Dra. Ana Silva | Publicado em 15/05/2023</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Introdução</h2>
                  <p className="text-gray-800">
                    A drenagem linfática é uma técnica de massagem que estimula o sistema linfático a trabalhar de forma
                    mais eficiente. Este documento apresenta técnicas avançadas aplicadas à fisioterapia
                    dermatofuncional, com foco em procedimentos pós-cirúrgicos.
                  </p>

                  <h2 className="text-xl font-semibold mt-6">Benefícios da Técnica</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-800">
                    <li>Redução de edemas e inchaços</li>
                    <li>Melhora da circulação sanguínea e linfática</li>
                    <li>Eliminação de toxinas</li>
                    <li>Redução da retenção de líquidos</li>
                    <li>Alívio da sensação de pernas pesadas</li>
                    <li>Prevenção de fibroses pós-cirúrgicas</li>
                  </ul>

                  <p className="text-gray-800 mt-4">
                    As técnicas apresentadas neste documento são resultado de anos de pesquisa e prática clínica,
                    combinando abordagens tradicionais com inovações recentes no campo da fisioterapia dermatofuncional.
                  </p>
                </div>
              </div>
            ) : (
              // Placeholder quando nenhum documento está selecionado
              <div className="w-[595px] h-[842px] flex items-center justify-center">
                <div className="text-center p-8">
                  <h2 className="text-2xl font-bold mb-4">Selecione um documento</h2>
                  <p className="text-gray-500">Escolha um documento da biblioteca para visualizá-lo aqui.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
