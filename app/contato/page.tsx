import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingAssistant } from "@/components/floating-assistant"
import { ContactSection } from "@/components/contact-section"

export default function ContatoPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
            </p>
          </div>
        </div>
        <ContactSection />
      </div>
      <Footer />
      <FloatingAssistant />
    </div>
  )
}
