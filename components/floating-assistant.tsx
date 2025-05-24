"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, PanInfo } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, X, MessageCircle, Minimize2, Maximize2 } from "lucide-react"
import { AIChat } from "@/components/ai-chat"

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  
  // Posição do botão
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Referência para armazenar a posição no localStorage
  const buttonRef = useRef<HTMLDivElement>(null)
  
  // Carregar posição salva quando o componente montar
  useEffect(() => {
    const savedPosition = localStorage.getItem('assistantPosition')
    if (savedPosition) {
      const { x: savedX, y: savedY } = JSON.parse(savedPosition)
      x.set(savedX)
      y.set(savedY)
    }
  }, [])
  
  // Função para lidar com o fim do arrasto
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Salvar posição no localStorage
    localStorage.setItem('assistantPosition', JSON.stringify({
      x: x.get(),
      y: y.get()
    }))
    
    // Verificar os limites da tela
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      
      // Se o botão estiver muito fora da tela, reposicione-o
      if (rect.right < 60) x.set(-(window.innerWidth - 60))
      if (rect.left > window.innerWidth - 60) x.set(window.innerWidth - 120)
      if (rect.bottom < 60) y.set(-(window.innerHeight - 60))
      if (rect.top > window.innerHeight - 60) y.set(window.innerHeight - 120)
    }
  }

  // Função para minimizar o chat
  const handleMinimize = () => {
    setIsMinimized(true)
  }

  // Função para restaurar o chat
  const handleRestore = () => {
    setIsMinimized(false)
  }

  return (
    <>
      {/* Botão flutuante arrastável */}
      <motion.div
        ref={buttonRef}
        className="fixed bottom-6 right-6 z-50 cursor-grab active:cursor-grabbing"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        drag
        dragConstraints={{ left: -1000, right: 1000, top: -800, bottom: 400 }}
        style={{ x, y }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <Button
          onClick={() => {
            setIsOpen(true)
            setIsMinimized(false)
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-purple-600 shadow-lg flex items-center justify-center"
          aria-label="Assistente IA"
        >
          <Sparkles className="h-6 w-6 text-white" />
        </Button>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          1
        </div>
      </motion.div>

      {/* Janela do assistente */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 bg-gradient-to-r from-teal-500 to-purple-600">
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 text-white mr-2" />
                <h3 className="font-medium text-white">Assistente DermaFisio</h3>
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleMinimize} 
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)} 
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                <X className="h-4 w-4" />
              </Button>
              </div>
            </div>
            <div className="h-[calc(100%-56px)] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
              <AIChat />
            </div>
          </motion.div>
        )}

        {/* Versão minimizada do assistente */}
        {isOpen && isMinimized && (
          <motion.div
            className="fixed bottom-6 left-6 py-1 px-2 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full shadow-lg z-50 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center">
              <MessageCircle className="h-4 w-4 text-white mr-2" />
              <span className="text-xs font-medium text-white mr-3">Assistente DermaFisio</span>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleRestore} 
                  className="h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full"
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)} 
                  className="h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
