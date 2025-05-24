"use client"

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Paleta de cores mais minimalista, usando variáveis CSS para melhor integração
export function HorizontalInfoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const totalSections = 4

  // Conteúdo das seções
  const sections = [
    {
      id: 'sobre',
      title: 'Sobre',
      content: 'Nossa plataforma de fisioterapia dermatofuncional foi desenvolvida para oferecer conteúdo de alta qualidade, baseado em evidências científicas e práticas clínicas atualizadas.',
      image: '/images/placeholder.jpg'
    },
    {
      id: 'cursos',
      title: 'Cursos',
      content: 'Oferecemos treinamentos especializados em todas as áreas da fisioterapia dermatofuncional, desde procedimentos básicos até técnicas avançadas.',
      image: '/images/placeholder.jpg'
    },
    {
      id: 'blog',
      title: 'Artigos',
      content: 'Mantenha-se atualizado com nossos artigos sobre os mais recentes avanços e pesquisas na área da fisioterapia dermatofuncional.',
      image: '/images/placeholder.jpg'
    },
    {
      id: 'contato',
      title: 'Contato',
      content: 'Entre em contato conosco para mais informações sobre nossos serviços e como podemos ajudar em sua formação profissional.',
      links: [
        { label: 'Email', url: 'mailto:contato@fisiodermatofuncional.com' },
        { label: 'Telefone', url: 'tel:+55XXXXXXXXXX' },
        { label: 'Instagram', url: '#' },
        { label: 'Facebook', url: '#' }
      ]
    }
  ]
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (!isScrolling) {
        setIsScrolling(true)
        
        const direction = e.deltaY > 0 ? 1 : -1
        const nextSection = Math.max(0, Math.min(totalSections - 1, activeSection + direction))
        
        if (nextSection !== activeSection) {
          setActiveSection(nextSection)
          
          const sectionElem = container.querySelector(`[data-section="${nextSection}"]`)
          if (sectionElem) {
            sectionElem.scrollIntoView({ behavior: 'smooth', inline: 'start' })
          }
          
          setTimeout(() => setIsScrolling(false), 800)
        } else {
          setIsScrolling(false)
        }
      }
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isScrolling) {
          const section = Number(entry.target.getAttribute('data-section'))
          if (section !== activeSection) {
            setActiveSection(section)
          }
        }
      })
    }, { threshold: 0.7, root: container })
    
    container.querySelectorAll('.section').forEach(section => {
      observer.observe(section)
    })
    
    container.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.querySelectorAll('.section').forEach(section => {
        observer.unobserve(section)
      })
    }
  }, [activeSection, isScrolling])
  
  const goToSection = (index: number) => {
    if (index === activeSection || isScrolling) return
    
    setIsScrolling(true)
    setActiveSection(index)
    
    const sectionElem = containerRef.current?.querySelector(`[data-section="${index}"]`)
    if (sectionElem) {
      sectionElem.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    }
    
    setTimeout(() => setIsScrolling(false), 800)
  }
  
  return (
    <div className="relative overflow-hidden bg-neutral-50 min-h-screen">
      <style jsx global>{`
        .horizontal-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .horizontal-container::-webkit-scrollbar {
          display: none;
        }
        
        .section-wrapper {
          scroll-snap-type: x mandatory;
        }
        
        .section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .footer-item {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      
      {/* Painel de indicadores lateral */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center space-y-6">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSection 
                ? 'bg-neutral-800' 
                : 'bg-neutral-300 hover:bg-neutral-400'
            }`}
            aria-label={`Ir para seção ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Container principal */}
      <div
        ref={containerRef}
        className="horizontal-container section-wrapper w-full h-screen flex overflow-x-scroll snap-x snap-mandatory"
      >
        {sections.map((section, index) => (
          <div
            key={section.id}
            data-section={index}
            className={`section min-w-full h-full flex items-center justify-center px-8 ${
              index === totalSections - 1 ? 'bg-neutral-900' : 'bg-neutral-50'
            }`}
          >
            {index === totalSections - 1 ? (
              // Footer (última seção)
              <div className="container mx-auto max-w-5xl text-neutral-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="col-span-1">
                    <h2 className="text-3xl font-light mb-8">Fisioterapia Dermatofuncional</h2>
                    <p className="text-neutral-400 mb-8 font-light">
                      Plataforma especializada para estudantes e profissionais 
                      da área de fisioterapia dermatofuncional.
                    </p>
                    <div className="mt-auto">
                      <p className="text-neutral-500 text-sm">
                        © {new Date().getFullYear()} Todos os direitos reservados
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-light mb-6">Links Rápidos</h3>
                        <ul className="space-y-3">
                          {['Home', 'Sobre', 'Recursos', 'Blog', 'Contato'].map((item, i) => (
                            <li
                              key={i}
                              className="footer-item"
                              style={{ animationDelay: `${i * 100}ms` }}
                            >
                              <Link href={`/${item === 'Home' ? '' : item.toLowerCase()}`} 
                                    className="text-neutral-400 hover:text-white transition-colors">
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-light mb-6">Contato</h3>
                        <ul className="space-y-3">
                          {section.links?.map((link, i) => (
                            <li
                              key={i}
                              className="footer-item"
                              style={{ animationDelay: `${(i + 5) * 100}ms` }}
                            >
                              <Link href={link.url}
                                    className="text-neutral-400 hover:text-white transition-colors">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Seções regulares
              <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="max-w-md">
                      <h2 className="text-5xl font-extralight mb-8 text-neutral-800">{section.title}</h2>
                      <p className="text-lg mb-8 text-neutral-600">{section.content}</p>
                      <Link href={`/${section.id}`} 
                        className="inline-flex items-center text-neutral-900 hover:text-neutral-600 font-medium group transition-colors">
                        Saiba mais 
                        <ArrowRight 
                          size={16} 
                          className="ml-2 transform group-hover:translate-x-1 transition-transform" 
                        />
                      </Link>
                    </div>
                  </div>
                  
                  <div className={`aspect-[4/3] ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="w-full h-full bg-neutral-200 rounded-lg overflow-hidden relative">
                      {/* Aqui você pode adicionar uma imagem real */}
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                        <span className="text-xl">Imagem {index + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 