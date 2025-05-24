"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  BookOpen, 
  FileText, 
  Search, 
  Play,
  Download,
  Bookmark,
  Zap,
  Snowflake,
  Waves,
  Speaker,
  Flame,
  Scissors,
  ChevronRight
} from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'

// Registrando plugins do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

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
      featured: true
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
      featured: false
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
      featured: true
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
      featured: false
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
      featured: true
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
      featured: false
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
      featured: true
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
      featured: true
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
  
  // Efeito para animações GSAP
  useEffect(() => {
    if (pageRef.current) {
      // Animação do título e descrição
      gsap.fromTo(
        ".content-header", 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      
      // Animação das categorias
      gsap.fromTo(
        ".category-item", 
        { opacity: 0, y: 10 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.08, 
          ease: "power2.out",
          delay: 0.2
        }
      );
      
      // Animação dos cards em destaque
      gsap.fromTo(
        ".featured-card", 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.1, 
          ease: "power2.out",
          delay: 0.4
        }
      );
      
      // Animação da lista de conteúdos
      gsap.fromTo(
        ".content-item", 
        { opacity: 0, x: -20 }, 
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.08, 
          ease: "power2.out",
          delay: 0.6
        }
      );
    }
    
    return () => {
      // Limpar animações ao desmontar
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(".content-header");
      gsap.killTweensOf(".category-item");
      gsap.killTweensOf(".featured-card");
      gsap.killTweensOf(".content-item");
    };
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex min-h-screen bg-gray-50" ref={pageRef}>
      <DashboardSidebar />
      
      <div className="flex-1 p-8 pt-16 pb-16 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho da página */}
          <div className="content-header mb-12">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#B38E6A] mr-4">
                <span className="font-medium text-lg text-white">F</span>
              </div>
              <h1 className="text-4xl font-light text-[#B38E6A] tracking-wide">
                FisioDerma
              </h1>
            </div>
            <p className="text-neutral-500 mt-2 ml-16 text-sm">Plataforma de Fisioterapia Dermatofuncional</p>
          </div>
          
          {/* Título da seção */}
          <div className="content-header flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-[#B38E6A] rounded-full"></div>
            <h2 className="text-2xl font-light text-neutral-700 tracking-wide">Conteúdos</h2>
          </div>
          
          {/* Barra de pesquisa */}
          <div className="content-header mb-8">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Pesquisar conteúdos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#B38E6A] focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-neutral-400" />
            </div>
          </div>
          
          {/* Filtro por categorias */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-item px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-200 ${
                    selectedCategory === category.id 
                      ? 'bg-[#B38E6A] text-white shadow-md' 
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                  whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  whileTap={{ y: 0 }}
                >
                  {category.icon && <category.icon className="h-4 w-4" />}
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Conteúdos em destaque */}
          {searchQuery === "" && selectedCategory === "todos" && (
            <div className="mb-12">
              <h3 className="content-header text-xl font-light mb-5 text-neutral-700 tracking-wide flex items-center">
                <Bookmark className="h-5 w-5 mr-2 text-[#B38E6A]" />
                Destaques
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredContent.slice(0, 3).map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="featured-card bg-white border border-neutral-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 25px rgba(179, 142, 106, 0.1)",
                      borderColor: item.color, 
                      borderLeftWidth: "4px"
                    }}
                    onClick={() => setSelectedContent(item)}
                  >
                    <div className="flex items-center mb-4">
                      <div 
                        className="p-2.5 rounded-md mr-3"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <item.icon className="h-5 w-5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <span className="text-sm font-medium" style={{ color: item.color }}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-neutral-800 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-neutral-500 mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <div className="flex items-center">
                        {item.type === "pdf" && <FileText className="h-3.5 w-3.5 mr-1" />}
                        {item.type === "video" && <Play className="h-3.5 w-3.5 mr-1" />}
                        {item.type === "artigo" && <BookOpen className="h-3.5 w-3.5 mr-1" />}
                        <span>{item.duration}</span>
                      </div>
                      <span>{item.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Lista de conteúdos */}
          <div>
            <h3 className="content-header text-xl font-light mb-5 text-neutral-700 tracking-wide flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-[#B38E6A]" />
              {filteredContent.length === 0 
                ? "Nenhum resultado encontrado" 
                : `${filteredContent.length} ${filteredContent.length === 1 ? 'resultado' : 'resultados'}`}
            </h3>
            
            <div className="space-y-3">
              {filteredContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="content-item bg-white border border-neutral-100 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  whileHover={{ 
                    backgroundColor: `${item.color}05`,
                    borderColor: item.color,
                    x: 3
                  }}
                  onClick={() => setSelectedContent(item)}
                >
                  <div className="flex items-start md:items-center">
                    <div 
                      className="p-2.5 rounded-md mr-4 hidden md:flex"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ 
                          backgroundColor: `${item.color}15`,
                          color: item.color
                        }}>
                          {item.category}
                        </span>
                        <span className="text-xs text-neutral-400 ml-3">{item.type.toUpperCase()}</span>
                      </div>
                      
                      <h3 className="text-base font-medium text-neutral-800">{item.title}</h3>
                      <p className="text-sm text-neutral-500 mt-1 hidden md:block">{item.subtitle}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-neutral-400">{item.author}</span>
                        <span className="text-xs text-neutral-400">{item.date}</span>
                      </div>
                    </div>
                    
                    <motion.div
                      className="ml-4"
                      whileHover={{ x: 3 }}
                    >
                      <ChevronRight className="h-5 w-5 text-neutral-300" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}
