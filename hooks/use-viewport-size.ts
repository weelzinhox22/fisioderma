import { useState, useEffect } from 'react'

export function useViewportSize() {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    // Função para atualizar o tamanho
    function updateSize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Adicionar listener para redimensionamento
    window.addEventListener('resize', updateSize)

    // Limpar ao desmontar
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
} 