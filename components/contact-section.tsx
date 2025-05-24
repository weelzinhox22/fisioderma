"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle, HelpCircle } from "lucide-react"
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
                      <MapPin className="h-6 w-6 mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium">Localização</h4>
                        <p className="mt-1">Salvador, Bahia - Brasil</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h4 className="font-medium mb-4">Siga-nos</h4>
                    <div className="flex space-x-4">
                      <a
                        href="https://instagram.com/welziinho"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <span className="sr-only">Instagram</span>
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <button
                        onClick={handleWhatsApp}
                        className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <span className="sr-only">WhatsApp</span>
                        <MessageCircle className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <HelpCircle className="h-5 w-5 text-teal-500 mr-2" />
                  <h3 className="text-lg font-semibold">Perguntas Frequentes</h3>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Como acesso os conteúdos premium?</AccordionTrigger>
                    <AccordionContent>
                      Para acessar os conteúdos premium, você precisa criar uma conta e fazer login. Alguns conteúdos
                      estão disponíveis apenas para assinantes do plano premium.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Como obtenho certificados?</AccordionTrigger>
                    <AccordionContent>
                      Os certificados são emitidos automaticamente após a conclusão de cursos e aprovação nas
                      avaliações. Você pode acessá-los na área "Meus Certificados" do seu dashboard.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Posso sugerir novos temas para conteúdos?</AccordionTrigger>
                    <AccordionContent>
                      Sim! Adoramos receber sugestões. Você pode enviar suas ideias através do formulário de contato
                      selecionando "Sugestão" no campo assunto.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Como funciona o banco de questões?</AccordionTrigger>
                    <AccordionContent>
                      O banco de questões é uma ferramenta para professores e administradores criarem e gerenciarem
                      questões para as provas da plataforma. O acesso é restrito a usuários autorizados.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
