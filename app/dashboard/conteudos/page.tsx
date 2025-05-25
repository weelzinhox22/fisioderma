"use client"

import { useState, useRef } from 'react'
import { 
  BookOpen, 
  FileText, 
  Search, 
  Play,
  Zap,
  Snowflake,
  Waves,
  Speaker,
  Flame,
  Scissors,
  ChevronRight
} from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import Link from 'next/link'

export default function ConteudosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  
  // Definindo as cores principais em tons bege/nude
  const colors = {
    primary: '#B38E6A',
    primaryLight: '#D9C5B2',
    primaryTransparent: 'rgba(179, 142, 106, 0.2)',
    primaryDark: '#8A6D50',
    text: '#735E44',
  }
  
  // Categorias de conteúdo
  const categories = [
    { id: "todos", label: "Todos" },
    { id: "pdf", label: "Documentos", icon: FileText },
    { id: "video", label: "Vídeos", icon: Play },
    { id: "artigo", label: "Artigos", icon: BookOpen },
  ]
  
  // Array com conteúdos
  const contentItems = [
    { 
      id: "1", 
      title: "Fundamentos da Radiofrequência",
      subtitle: "Princípios e mecanismos de ação",
      description: "Aprenda sobre os princípios físicos da radiofrequência e seus efeitos biológicos nos tecidos.",
      type: "pdf", 
      category: "Radiofrequência",
      color: "#E57373",
      icon: Zap,
      duration: "12 min de leitura",
      date: "28/11/2023",
      author: "Dra. Ana Silva",
      featured: true,
      link: "/conteudos/radiofrequencia"
    },
    { 
      id: "2", 
      title: "Aplicação Prática da Radiofrequência",
      subtitle: "Técnicas e protocolos clínicos",
      description: "Um guia completo sobre protocolos de aplicação em diferentes áreas do corpo.",
      type: "video", 
      category: "Radiofrequência",
      color: "#E57373",
      icon: Zap,
      duration: "18 min",
      date: "02/12/2023", 
      author: "Dr. Carlos Mendes",
      featured: false,
      link: "/conteudos/radiofrequencia"
    },
    { 
      id: "3", 
      title: "Criolipólise: Fundamentos Científicos",
      subtitle: "Base teórica do congelamento de adipócitos",
      description: "Documentação detalhada sobre o processo de apoptose induzida pelo frio.",
      type: "pdf", 
      category: "Criolipólise",
      color: "#64B5F6",
      icon: Snowflake,
      duration: "15 min de leitura",
      date: "14/10/2023", 
      author: "Dr. Ricardo Martins",
      featured: true,
      link: "/conteudos/criolise"
    },
    { 
      id: "4", 
      title: "Criolipólise Avançada",
      subtitle: "Casos clínicos e resultados",
      description: "Análise de resultados em diferentes biótipos e áreas corporais.",
      type: "pdf", 
      category: "Criolipólise",
      color: "#64B5F6",
      icon: Snowflake,
      duration: "10 min de leitura",
      date: "20/11/2023", 
      author: "Dra. Juliana Costa",
      featured: false,
      link: "/conteudos/criolise"
    },
    { 
      id: "5", 
      title: "Técnicas de Lipocavitação",
      subtitle: "Aplicação passo a passo",
      description: "Tutorial em vídeo demonstrando a técnica correta de aplicação do ultrassom cavitacional.",
      type: "video", 
      category: "Lipocavitação",
      color: "#81C784",
      icon: Waves,
      duration: "22 min",
      date: "05/12/2023", 
      author: "Dr. Paulo Henrique",
      featured: true,
      link: "/conteudos/lipocavitacao"
    },
    { 
      id: "6", 
      title: "Lipocavitação e Drenagem Linfática",
      subtitle: "Protocolos combinados",
      description: "Artigo sobre a potencialização de resultados com técnicas complementares.",
      type: "artigo", 
      category: "Lipocavitação",
      color: "#81C784",
      icon: Waves,
      duration: "8 min de leitura",
      date: "15/11/2023", 
      author: "Dra. Fernanda Lima",
      featured: false,
      link: "/conteudos/lipocavitacao"
    },
    { 
      id: "7", 
      title: "Ultrassom Terapêutico",
      subtitle: "Princípios físicos e aplicações",
      description: "Fundamentos do ultrassom e seus efeitos nos tecidos biológicos.",
      type: "pdf", 
      category: "Ultrassom",
      color: "#FFB74D",
      icon: Speaker,
      duration: "14 min de leitura",
      date: "01/12/2023", 
      author: "Dr. Roberto Santos",
      featured: true,
      link: "/conteudos/ultrassom"
    },
    { 
      id: "8", 
      title: "Tratamento de Queimaduras",
      subtitle: "Abordagem fisioterapêutica",
      description: "Protocolos de tratamento para diferentes graus de queimaduras.",
      type: "pdf", 
      category: "Queimados",
      color: "#F06292",
      icon: Flame,
      duration: "20 min de leitura",
      date: "10/11/2023", 
      author: "Dra. Mariana Oliveira",
      featured: true,
      link: "/conteudos/queimados"
    },
    { 
      id: "9", 
      title: "Fisioterapia no Pós-Operatório",
      subtitle: "Recuperação e prevenção de complicações",
      description: "Protocolos para diferentes tipos de cirurgias plásticas e reparadoras.",
      type: "video", 
      category: "Pós-operatório",
      color: "#9575CD",
      icon: Scissors,
      duration: "25 min",
      date: "22/11/2023", 
      author: "Dr. André Gomes",
      featured: true
    },
    { 
      id: "10", 
      title: "Cicatrização e Fibroses",
      subtitle: "Tratamento e prevenção",
      description: "Técnicas para minimizar cicatrizes e evitar fibroses pós-cirúrgicas.",
      type: "artigo", 
      category: "Pós-operatório",
      color: "#9575CD",
      icon: Scissors,
      duration: "11 min de leitura",
      date: "25/11/2023", 
      author: "Dra. Luísa Rocha",
      featured: false
    },
  ]
  
  // Filtragem de conteúdos baseada na pesquisa e categoria
  const filteredContent = contentItems.filter(item => {
    // Filtro por texto de pesquisa
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtro por categoria
    const matchesCategory = selectedCategory === "todos" || item.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Conteúdos em destaque
  const featuredContent = contentItems.filter(item => item.featured);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#F7F2EB]/50 to-white">
      <DashboardSidebar />
      
      <div className="flex-1 p-4 sm:p-6 pt-16 pb-16 overflow-auto w-full mt-6 sm:mt-10" ref={pageRef}>
        <div className="max-w-6xl mx-auto">
          {/* Header da página */}
          <div className="content-header mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#8A6D50] tracking-wide mb-2 sm:mb-3">
              Conteúdos Disponíveis
            </h1>
            <p className="text-sm sm:text-base text-neutral-500 max-w-3xl">
              Explore nossa biblioteca de conteúdos sobre Fisioterapia Dermatofuncional, com artigos, 
              vídeos e documentos para aprimorar seus conhecimentos.
            </p>
          </div>
          
          {/* Barra de pesquisa e categorias */}
          <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar conteúdos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 pl-9 pr-4 w-full sm:w-64 md:w-80 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#B38E6A] text-sm sm:text-base"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-item px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all ${
                    selectedCategory === category.id
                      ? "bg-[#B38E6A] text-white"
                      : "bg-[#F7F2EB] text-neutral-600 hover:bg-[#D9C5B2]/30"
                  }`}
                >
                  {category.icon && <category.icon className="h-3.5 w-3.5" />}
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Conteúdos em destaque */}
          {selectedCategory === "todos" && (
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="h-8 sm:h-10 w-1.5 bg-[#B38E6A] rounded-full"></div>
                <h2 className="text-xl sm:text-2xl font-medium text-[#8A6D50] tracking-wide">Em Destaque</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {featuredContent.slice(0, 3).map((item, index) => (
                  <Link href={item.link || "#"} key={item.id} className="block h-full">
                    <div
                      className="featured-card group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full border border-neutral-100 overflow-hidden flex flex-col"
                    >
                      <div 
                        className="h-3 w-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      
                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="flex items-center">
                            <div className="p-1.5 sm:p-2 rounded-full mr-3" style={{ backgroundColor: `${item.color}15` }}>
                              <item.icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: item.color }} />
                            </div>
                            <span className="text-xs sm:text-sm font-medium" style={{ color: item.color }}>
                              {item.category}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {item.type === "pdf" && <FileText className="h-3.5 w-3.5 text-neutral-400" />}
                            {item.type === "video" && <Play className="h-3.5 w-3.5 text-neutral-400" />}
                            {item.type === "artigo" && <BookOpen className="h-3.5 w-3.5 text-neutral-400" />}
                            <span className="text-xs text-neutral-400">{item.type.toUpperCase()}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-base sm:text-lg font-medium text-neutral-800 mb-1 group-hover:text-[#B38E6A] transition-colors">
                          {item.title}
                        </h3>
                        
                        <p className="text-xs sm:text-sm text-neutral-500 mb-3 sm:mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center justify-between">
                          <span className="text-xs text-neutral-500">{item.duration}</span>
                          <div className="flex items-center text-[#B38E6A] text-xs sm:text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                            <span>Ver mais</span>
                            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Lista completa de conteúdos */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="h-8 sm:h-10 w-1.5 bg-[#B38E6A] rounded-full"></div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#8A6D50] tracking-wide">
                {selectedCategory === "todos" ? "Todos os Conteúdos" : "Conteúdos Filtrados"}
              </h2>
            </div>
            
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {filteredContent.map((item, index) => (
                  <Link href={item.link || "#"} key={item.id} className="block h-full">
                    <div
                      className="content-card group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-full border border-neutral-100 overflow-hidden flex"
                    >
                      <div 
                        className="w-2 h-full flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      
                      <div className="p-4 sm:p-5 flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="p-1.5 rounded-full mr-2" style={{ backgroundColor: `${item.color}15` }}>
                              <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: item.color }} />
                            </div>
                            <span className="text-xs font-medium" style={{ color: item.color }}>
                              {item.category}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {item.type === "pdf" && <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-neutral-400" />}
                            {item.type === "video" && <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-neutral-400" />}
                            {item.type === "artigo" && <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-neutral-400" />}
                            <span className="text-xs text-neutral-400">{item.type.toUpperCase()}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-sm sm:text-base font-medium text-neutral-800 mb-1 group-hover:text-[#B38E6A] transition-colors">
                          {item.title}
                        </h3>
                        
                        {item.subtitle && (
                          <p className="text-xs text-neutral-600 mb-2">{item.subtitle}</p>
                        )}
                        
                        <p className="text-xs text-neutral-500 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-500">{item.duration}</span>
                          <div className="flex items-center text-[#B38E6A] font-medium group-hover:translate-x-0.5 transition-transform">
                            <span>Acessar</span>
                            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-neutral-100 rounded-lg p-8 text-center">
                <p className="text-neutral-500">Nenhum conteúdo encontrado com os filtros atuais.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
