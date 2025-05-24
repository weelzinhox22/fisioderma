"use client"

import { useRef, useEffect, useState } from 'react'

const TOTAL_SLIDES = 4 // Número total de slides
const SCROLL_THRESHOLD = 50 // Mínimo de movimento para trigger em pixels
const SCROLL_COOLDOWN = 500 // Tempo de espera entre scrolls em ms

export function useHorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isScrolling) return

      setIsScrolling(true)
      
      // Determina a direção do scroll
      const direction = e.deltaY > 0 ? 1 : -1
      
      // Calcula o próximo índice
      const nextIndex = Math.max(0, Math.min(TOTAL_SLIDES - 1, activeIndex + direction))
      
      // Scroll para o próximo slide
      container.scrollTo({
        left: nextIndex * container.clientWidth,
        behavior: 'smooth'
      })

      // Atualiza o índice ativo
      setActiveIndex(nextIndex)

      // Reseta o flag de scrolling após a animação
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, SCROLL_COOLDOWN)
    }

    const handleScroll = () => {
      if (!container || isScrolling) return
      const index = Math.round(container.scrollLeft / container.clientWidth)
      if (index !== activeIndex) {
        setActiveIndex(index)
      }
    }

    // Adiciona suporte a touch events para dispositivos móveis
    let touchStart = 0
    let touchEnd = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEnd = e.changedTouches[0].screenX
      const direction = touchStart - touchEnd > 0 ? 1 : -1
      
      if (Math.abs(touchStart - touchEnd) > SCROLL_THRESHOLD) {
        const nextIndex = Math.max(0, Math.min(TOTAL_SLIDES - 1, activeIndex + direction))
        container.scrollTo({
          left: nextIndex * container.clientWidth,
          behavior: 'smooth'
        })
        setActiveIndex(nextIndex)
      }
    }

    // Adiciona suporte a navegação por teclado
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      let direction = 0
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        direction = 1
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        direction = -1
      }

      if (direction !== 0) {
        e.preventDefault()
        const nextIndex = Math.max(0, Math.min(TOTAL_SLIDES - 1, activeIndex + direction))
        container.scrollTo({
          left: nextIndex * container.clientWidth,
          behavior: 'smooth'
        })
        setActiveIndex(nextIndex)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('scroll', handleScroll)
    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [activeIndex, isScrolling])

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current
    if (!container || index < 0 || index >= TOTAL_SLIDES) return

    container.scrollTo({
      left: index * container.clientWidth,
      behavior: 'smooth'
    })
    setActiveIndex(index)
  }

  return {
    scrollRef,
    activeIndex,
    scrollToIndex,
    totalSlides: TOTAL_SLIDES
  }
} 