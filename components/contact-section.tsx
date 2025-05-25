"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle, HelpCircle, Instagram } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset do formulário após alguns segundos
      setTimeout(() => {
        setIsSuccess(false)
        setSubject("")
        setMessage("")
      }, 3000)
    }, 1500)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre a plataforma DermaFisio.")
    window.open(`https://wa.me/5571991373142?text=${message}`, "_blank")
  }

  const handleInstagram = () => {
    window.open("https://instagram.com/welziinho", "_blank")
  }

  const handleSubjectSelect = (value: string) => {
    setSubject(value)

    // Preencher mensagem com template baseado no assunto
    const templates: Record<string, string> = {
      "duvida-conteudo": "Olá, gostaria de saber mais sobre o conteúdo relacionado a...",
      "duvida-provas": "Olá, tenho uma dúvida sobre as provas disponíveis para...",
      sugestao: "Gostaria de sugerir que a plataforma inclua conteúdos sobre...",
      "problema-tecnico": "Estou enfrentando um problema técnico ao tentar...",
      parceria: "Gostaria de propor uma parceria para...",
    }

    if (templates[value]) {
      setMessage(templates[value])
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tem alguma dúvida ou sugestão? Estamos aqui para ajudar você em sua jornada na fisioterapia
            dermatofuncional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-8">
                  <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <a href="mailto:weelzinhox22@gmail.com" className="mt-1 hover:underline">
                          weelzinhox22@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-6 w-6 mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium">WhatsApp</h4>
                        <button onClick={handleWhatsApp} className="mt-1 hover:underline flex items-center">
                          (71) 99137-3142
                          <MessageCircle className="h-4 w-4 ml-2" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Instagram className="h-6 w-6 mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium">Instagram</h4>
                        <a 
                          href="https://instagram.com/welziinho" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-1 hover:underline flex items-center"
                        >
                          @welziinho
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium">Localização</h4>
                        <p className="mt-1">Salvador, Bahia - Brasil</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/20">
                    <h4 className="font-medium mb-4 text-center">Conecte-se Agora</h4>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={handleInstagram}
                        className="group flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                      >
                        <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-medium">Instagram</span>
                        <span className="opacity-80">@welziinho</span>
                      </button>
                      
                      <button
                        onClick={handleWhatsApp}
                        className="group flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                      >
                        <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-medium">WhatsApp</span>
                        <span className="opacity-80">(71) 99137-3142</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Envie uma Mensagem</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Select value={subject} onValueChange={handleSubjectSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duvida-conteudo">Dúvida sobre conteúdos</SelectItem>
                      <SelectItem value="duvida-provas">Dúvida sobre provas</SelectItem>
                      <SelectItem value="sugestao">Sugestão de conteúdo</SelectItem>
                      <SelectItem value="problema-tecnico">Problema técnico</SelectItem>
                      <SelectItem value="parceria">Proposta de parceria</SelectItem>
                      <SelectItem value="outro">Outro assunto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua mensagem aqui..."
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                    </>
                  ) : isSuccess ? (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Mensagem Enviada!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
