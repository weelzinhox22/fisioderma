import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingAssistant } from "@/components/floating-assistant"
import { ServicesSection } from "@/components/services-section"

export default function ServicosPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos uma variedade completa de recursos e serviços para profissionais e estudantes de fisioterapia
              dermatofuncional.
            </p>
          </div>
        </div>
        <ServicesSection />
      </div>
      <Footer />
      <FloatingAssistant />
    </div>
  )
}
