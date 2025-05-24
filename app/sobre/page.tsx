import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingAssistant } from "@/components/floating-assistant"
import { AboutSection } from "@/components/about-section"

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre a DermaFisio</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça nossa missão de transformar a educação em fisioterapia dermatofuncional através de tecnologia e
              conteúdo de qualidade.
            </p>
          </div>
        </div>
        <AboutSection />
      </div>
      <Footer />
      <FloatingAssistant />
    </div>
  )
}
