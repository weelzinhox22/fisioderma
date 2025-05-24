"use client"

import { useRef, useEffect, useState } from 'react'
import { HeroSection } from "@/components/hero-section"
import { ArrowRight, X, InfoIcon } from 'lucide-react'
import Link from 'next/link'

export function HorizontalLayout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [direction, setDirection] = useState(0) // -1 para esquerda, 1 para direita
  const [showPopup, setShowPopup] = useState(false)
  const [popupMounted, setPopupMounted] = useState(false)
  
  // Definindo as cores principais em tons bege/nude (para manter consistência com HeroSection)
  const colors = {
    primary: '#B38E6A',          // Bege mais escuro / Nude
    primaryLight: '#D9C5B2',     // Versão mais clara para backgrounds
    primaryTransparent: 'rgba(179, 142, 106, 0.2)',
  }
  
  // Conteúdo das seções (igual ao HorizontalInfoSection)
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
  
  // Incluindo o hero como primeira seção
  const totalSections = sections.length + 1
  
  // Gerenciamento do popup - Garantir montagem suave
  useEffect(() => {
    // Primeiro, garantir que o componente está montado no client-side
    setPopupMounted(true)
    
    // Depois de uma pequena espera para garantir que os estilos foram aplicados
    const showTimer = setTimeout(() => {
      setShowPopup(true)
    }, 500);
    
    // Timer para esconder o popup
    const hideTimer = setTimeout(() => {
      setShowPopup(false)
    }, 10500);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    }
  }, [])
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (!isScrolling) {
        setIsScrolling(true)
        
        const dir = e.deltaY > 0 ? 1 : -1
        setDirection(dir)
        
        const nextSection = Math.max(0, Math.min(totalSections - 1, activeSection + dir))
        
        if (nextSection !== activeSection) {
          setActiveSection(nextSection)
          
          const sectionElem = container.querySelector(`[data-section="${nextSection}"]`)
          if (sectionElem) {
            sectionElem.scrollIntoView({ 
              behavior: 'smooth', 
              inline: 'start',
              block: 'nearest'
            })
          }
          
          setTimeout(() => setIsScrolling(false), 1200)
        } else {
          setIsScrolling(false)
        }
      }
    }
    
    // Adicionar suporte a gestos de toque para dispositivos móveis
    let touchStartX = 0
    let touchEndX = 0
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX
      
      if (!isScrolling) {
        setIsScrolling(true)
        
        const diff = touchStartX - touchEndX
        const dir = diff > 50 ? 1 : diff < -50 ? -1 : 0
        setDirection(dir)
        
        if (dir !== 0) {
          const nextSection = Math.max(0, Math.min(totalSections - 1, activeSection + dir))
          
          if (nextSection !== activeSection) {
            setActiveSection(nextSection)
            
            const sectionElem = container.querySelector(`[data-section="${nextSection}"]`)
            if (sectionElem) {
              sectionElem.scrollIntoView({ 
                behavior: 'smooth', 
                inline: 'start',
                block: 'nearest'
              })
            }
            
            setTimeout(() => setIsScrolling(false), 1200)
          } else {
            setIsScrolling(false)
          }
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
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    // Melhorar o comportamento de teclas de seta
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isScrolling) {
        let dir = 0
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          dir = 1
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          dir = -1
        }
        
        if (dir !== 0) {
          e.preventDefault()
          setIsScrolling(true)
          setDirection(dir)
          
          const nextSection = Math.max(0, Math.min(totalSections - 1, activeSection + dir))
          
          if (nextSection !== activeSection) {
            setActiveSection(nextSection)
            
            const sectionElem = container.querySelector(`[data-section="${nextSection}"]`)
            if (sectionElem) {
              sectionElem.scrollIntoView({ 
                behavior: 'smooth', 
                inline: 'start',
                block: 'nearest' 
              })
            }
            
            setTimeout(() => setIsScrolling(false), 1200)
          } else {
            setIsScrolling(false)
          }
        }
      }
    }
    
    window.addEventListener('keydown', handleKeydown)
    
    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeydown)
      container.querySelectorAll('.section').forEach(section => {
        observer.unobserve(section)
      })
    }
  }, [activeSection, isScrolling, totalSections])
  
  const goToSection = (index: number) => {
    const container = containerRef.current
    if (!container) return
    
    if (index === activeSection || isScrolling) return
    
    setIsScrolling(true)
    setActiveSection(index)
    
    const sectionElem = container.querySelector(`[data-section="${index}"]`)
    if (sectionElem) {
      sectionElem.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    }
    
    setTimeout(() => setIsScrolling(false), 1200)
  }
  
  return (
    <div className="relative overflow-hidden min-h-screen">
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
          scroll-behavior: smooth;
        }
        
        .section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
          transform-origin: center center;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .section-content {
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          transition: 
            opacity 1s cubic-bezier(0.19, 1, 0.22, 1), 
            transform 1s cubic-bezier(0.19, 1, 0.22, 1);
          will-change: transform, opacity;
        }
        
        .section.active .section-content {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Efeito parallax nos fundos e elementos */
        .section:not(.active) .section-content {
          transform: scale(0.95) translateY(30px);
        }
        
        /* Animações para cada elemento dentro das seções */
        .section-item {
          opacity: 0;
          transform: translateY(20px);
          transition: 
            opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), 
            transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .section.active .section-item {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section.active .section-item:nth-child(1) {
          transition-delay: 0.2s;
        }
        
        .section.active .section-item:nth-child(2) {
          transition-delay: 0.35s;
        }
        
        .section.active .section-item:nth-child(3) {
          transition-delay: 0.5s;
        }
        
        /* Efeito de profundidade */
        .perspective-container {
          perspective: 1000px;
        }
        
        /* Efeito de transição do fundo */
        .bg-transition {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.05);
          opacity: 0;
          transition: opacity 1s ease;
          pointer-events: none;
          z-index: 1;
        }
        
        .section.active .bg-transition {
          opacity: 0;
        }
        
        .section:not(.active) .bg-transition {
          opacity: 1;
        }
        
        /* Efeito suave de entrada com fade para o footer */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .footer-item {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        
        /* Efeito de hover nos links */
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
        }
        
        /* Popup de créditos - Versão redesenhada */
        @keyframes popupGlow {
          0%, 100% { box-shadow: 0 8px 24px rgba(179, 142, 106, 0.15); }
          50% { box-shadow: 0 8px 28px rgba(179, 142, 106, 0.25); }
        }
        
        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        
        .popup {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%) translateY(120px);
          z-index: 100;
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(179, 142, 106, 0.2);
          width: 90%;
          max-width: 440px;
          opacity: 0;
          overflow: hidden;
          animation: popupGlow 3s ease-in-out infinite;
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
        }
        
        .popup.show {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        
        .popup-header {
          padding: 20px 24px 6px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .popup-content {
          padding: 0 24px 20px;
        }
        
        .popup-icon {
          background-color: rgba(179, 142, 106, 0.15);
          padding: 8px;
          border-radius: 50%;
          color: rgb(179, 142, 106);
          animation: pulseIcon 2s ease-in-out infinite;
        }
        
        .popup-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          color: #8E8E8E;
          background-color: rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: none;
          outline: none;
        }
        
        .popup-close:hover {
          background-color: rgba(179, 142, 106, 0.15);
          color: rgb(179, 142, 106);
        }
        
        .popup-title {
          font-size: 1rem;
          font-weight: 500;
          color: rgb(179, 142, 106);
          margin: 0;
        }
        
        .popup-message {
          font-size: 0.9375rem;
          line-height: 1.5;
          color: #4A4A4A;
          margin: 0;
          font-weight: 300;
        }
        
        .popup-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, rgba(179, 142, 106, 0.3), rgba(179, 142, 106, 0.9), rgba(179, 142, 106, 0.3));
        }
      `}</style>
      
      {/* Popup de créditos - Renderiza apenas quando montado corretamente */}
      {popupMounted && (
        <div className={`popup ${showPopup ? 'show' : ''}`}>
          <div className="popup-accent"></div>
          <button 
            className="popup-close" 
            onClick={() => setShowPopup(false)}
            aria-label="Fechar notificação"
          >
            <X size={18} />
          </button>
          
          <div className="popup-header">
            <div className="popup-icon">
              <InfoIcon size={18} />
            </div>
            <h4 className="popup-title">Nota Importante</h4>
          </div>
          
          <div className="popup-content">
            <p className="popup-message">
              Todo o conteúdo e questões das provas foram retirados dos materiais da professora Adriana Dias.
            </p>
          </div>
        </div>
      )}
      
      {/* Container principal com efeito de perspectiva */}
      <div className="perspective-container">
        <div
          ref={containerRef}
          className="horizontal-container section-wrapper w-full h-screen flex overflow-x-scroll snap-x snap-mandatory"
        >
          {/* Seção Hero */}
          <div
            data-section={0}
            className={`section min-w-full h-full flex ${activeSection === 0 ? 'active' : ''}`}
          >
            <div className="bg-transition"></div>
            <HeroSection />
          </div>
          
          {/* Seções de informação */}
          {sections.map((section, index) => (
            <div
              key={section.id}
              data-section={index + 1}
              className={`section min-w-full h-full flex items-center justify-center px-8 ${
                activeSection === index + 1 ? 'active' : ''
              } ${
                index === sections.length - 1 ? 'bg-neutral-900' : 'bg-neutral-50'
              }`}
            >
              <div className="bg-transition"></div>
              
              <div className="section-content w-full max-w-6xl mx-auto py-12 px-6 md:px-8 lg:px-12">
                {index === sections.length - 1 ? (
                  // Última seção (contato) com estilo diferente
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
                    <div className="md:col-span-1 section-item">
                      <h2 className="text-4xl font-light mb-6">{section.title}</h2>
                      <p className="text-neutral-300 mb-8">{section.content}</p>
                      
                      {section.links && (
                        <div className="space-y-4 mt-8">
                          {section.links.map((link, i) => (
                            <a 
                              key={i}
                              href={link.url}
                              className="flex items-center text-neutral-300 hover:text-white transition-colors hover-lift"
                              style={{ animationDelay: `${i * 100}ms` }}
                            >
                              <ArrowRight className="mr-2 h-4 w-4" />
                              <span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="col-span-2 section-item" style={{transitionDelay: '0.2s'}}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-light mb-6">Links Rápidos</h3>
                          <ul className="space-y-3">
                            {['Home', 'Sobre', 'Recursos', 'Blog', 'Contato'].map((item, i) => (
                              <li
                                key={i}
                                className="footer-item hover-lift"
                                style={{ animationDelay: `${i * 100 + 300}ms` }}
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
                          <h3 className="text-xl font-light mb-6">Recursos</h3>
                          <ul className="space-y-3">
                            {['Artigos', 'Tutoriais', 'Vídeos', 'FAQ', 'Suporte'].map((item, i) => (
                              <li
                                key={i}
                                className="footer-item hover-lift"
                                style={{ animationDelay: `${i * 100 + 300}ms` }}
                              >
                                <Link href={`/${item.toLowerCase()}`} 
                                      className="text-neutral-400 hover:text-white transition-colors">
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-12">
                        <h3 className="text-xl font-light mb-6">Inscreva-se para receber novidades</h3>
                        <div className="flex max-w-md">
                          <input 
                            type="email"
                            placeholder="Seu email"
                            className="flex-1 bg-neutral-800 border border-neutral-700 rounded-l-md px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#B38E6A]"
                          />
                          <button className="bg-[#B38E6A] hover:bg-[#9F7D5D] text-white px-4 py-2 rounded-r-md transition-colors">
                            Inscrever
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Seções normais
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="section-item">
                      <h2 className="text-3xl md:text-4xl font-light mb-6">{section.title}</h2>
                      <p className="text-neutral-600 mb-8 text-lg">{section.content}</p>
                      <button 
                        className="inline-flex items-center text-[#B38E6A] hover:text-[#9F7D5D] transition-colors"
                      >
                        <span className="mr-2">Saiba mais</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="section-item order-first lg:order-last">
                      <div className="aspect-video bg-neutral-200 rounded-lg overflow-hidden">
                        {/* Placeholder para imagem/vídeo */}
                        <div className="w-full h-full flex items-center justify-center text-neutral-400">
                          Imagem/Vídeo
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Painel de indicadores lateral */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center space-y-6">
        {[...Array(totalSections)].map((_, index) => (
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
    </div>
  )
} 