"use client"

import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"
import { AboutSection } from "@/components/about-section"
import { FloatingAssistant } from "@/components/floating-assistant"
import { HorizontalLayout } from "@/components/horizontal-layout"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HorizontalLayout />
      <AboutSection />
      <FloatingAssistant />
    </main>
  )
}
