import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingAssistant } from "@/components/floating-assistant"
import { ContactSection } from "@/components/contact-section"
import { Instagram, MessageCircle } from "lucide-react"

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f9f5f0] to-white">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#8A6D50]">Entre em Contato</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
            </p>
            
            {/* Botões de ação rápida */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://instagram.com/welziinho" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Instagram className="h-5 w-5" />
                <span className="font-medium">Instagram</span>
                <span className="opacity-80">@welziinho</span>
              </a>
              
              <a 
                href="https://wa.me/5571991373142?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20plataforma%20DermaFisio." 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">WhatsApp</span>
                <span className="opacity-80">(71) 99137-3142</span>
              </a>
            </div>
          </div>
        </div>
        <ContactSection />
      </div>
      <Footer />
      <FloatingAssistant />
    </div>
  )
}
