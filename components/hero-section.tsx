"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"

// Definindo as cores em tons bege/nude
const colors = {
  primary: '#B38E6A',           // Bege mais escuro / Nude
  primaryTransparent: 'rgba(179, 142, 106, 0.2)',
  primaryHover: '#9F7D5D',      // Versão mais escura
  lightBg: '#F3E9E0',           // Fundo claro para hover
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Garantir que o vídeo seja reproduzido automaticamente
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Erro ao reproduzir o vídeo:", error)
      })
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Vídeo fullscreen em loop */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        >
          <source src="/images/hero/hero-bg.mp4" type="video/mp4" />
          {/* Fallback para navegadores que não suportam vídeo */}
          Seu navegador não suporta o elemento de vídeo.
        </video>
        {/* Overlay com gradiente suave para melhorar legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>
      
      {/* Conteúdo centralizado - z-index menor que a navbar */}
      <div className="relative z-10 h-full w-full flex items-center justify-center text-white">
        <div className="container mx-auto px-4 text-center">
          <span 
            className="inline-block py-1.5 px-6 mb-6 text-white font-medium text-sm rounded-full shadow-lg"
            style={{ backgroundColor: 'rgba(179, 142, 106, 0.8)', backdropFilter: 'blur(4px)' }}
          >
            Portal educacional
          </span>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white drop-shadow-md">Fisioterapia</span><br />
            <span style={{ color: '#D9C5B2' }} className="drop-shadow-md">Neonatal</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/95 drop-shadow-sm">
            Portal educacional dedicado ao estudo e prática da fisioterapia em 
            recém-nascidos e crianças, com foco em desenvolvimento neuromotor.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
              className="text-white shadow-lg border-0 rounded-full px-8"
              style={{ 
                backgroundColor: colors.primary,
                borderColor: colors.primary
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.primary}
            >
              Explorar Recursos <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            
            <Button 
              variant="outline"
              size="lg" 
              className="rounded-full px-8 shadow-md"
              style={{ 
                backgroundColor: 'rgba(179, 142, 106, 0.2)', 
                backdropFilter: 'blur(4px)',
                borderColor: colors.primary,
                color: colors.lightBg,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = colors.lightBg;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(179, 142, 106, 0.2)';
                e.currentTarget.style.color = colors.lightBg;
              }}
            >
              Saiba Mais
                </Button>
          </div>
        </div>
      </div>

      {/* Indicador de scroll horizontal */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-white/80 text-sm font-medium drop-shadow-md">Deslize para explorar</p>
        <div className="mt-2 mx-auto w-10 h-6 border-2 border-white/50 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse mr-2 ml-1"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse ml-2"></div>
        </div>
      </div>
    </div>
  )
}
