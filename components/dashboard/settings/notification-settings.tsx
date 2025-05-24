"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Mail, Info, Clock, Settings } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function NotificationSettings() {
  // Estados para as configurações de notificações
  const [emailNotifications, setEmailNotifications] = useState({
    atualizacoes: true,
    novosConteudos: true,
    lembretes: true,
    boletimMensal: false
  })
  
  const [pushNotifications, setPushNotifications] = useState({
    atualizacoes: true,
    mensagens: true
  })
  
  const [frequencia, setFrequencia] = useState("diaria")
  const [saving, setSaving] = useState(false)
  
  // Funções para gerenciar alterações
  const handleEmailChange = (key: keyof typeof emailNotifications) => (checked: boolean) => {
    setEmailNotifications(prev => ({ ...prev, [key]: checked }))
  }
  
  const handlePushChange = (key: keyof typeof pushNotifications) => (checked: boolean) => {
    setPushNotifications(prev => ({ ...prev, [key]: checked }))
  }
  
  // Função para salvar as alterações
  const handleSave = () => {
    setSaving(true)
    
    // Simulando uma requisição
    setTimeout(() => {
      setSaving(false)
      // Integração com backend
    }, 1000)
  }

  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const switchVariants = {
    checked: { scale: 1.05 },
    unchecked: { scale: 1 }
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* E-mail Notifications */}
      <motion.div variants={itemVariants}>
        <Card className="p-8 border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-full mr-3">
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Notificações por E-mail</h2>
            </div>
            
            <Separator className="bg-gradient-to-r from-blue-100 to-transparent" />
            
            <div className="space-y-5">
              {Object.entries(emailNotifications).map(([key, value], index) => {
                const labels = {
                  atualizacoes: {
                    title: "Atualizações do sistema",
                    description: "Receba informações sobre atualizações da plataforma"
                  },
                  novosConteudos: {
                    title: "Novos conteúdos",
                    description: "Seja notificado quando novos cursos ou materiais forem disponibilizados"
                  },
                  lembretes: {
                    title: "Lembretes",
                    description: "Lembretes sobre cursos e provas agendadas"
                  },
                  boletimMensal: {
                    title: "Boletim mensal",
                    description: "Receba um resumo mensal com novidades e conteúdos destacados"
                  }
                };
                
                return (
                  <motion.div 
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={`email-${key}`} className="text-base font-medium flex items-center">
                        {labels[key as keyof typeof labels].title}
                        {key === "atualizacoes" && (
                          <Badge className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-200">Importante</Badge>
                        )}
                      </Label>
                      <p className="text-sm text-gray-500">{labels[key as keyof typeof labels].description}</p>
                    </div>
                    <motion.div
                      variants={switchVariants}
                      animate={value ? "checked" : "unchecked"}
                    >
                      <Switch 
                        id={`email-${key}`} 
                        checked={value}
                        onCheckedChange={handleEmailChange(key as keyof typeof emailNotifications)}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-10"
            style={{ filter: "blur(60px)" }}
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
          />
        </Card>
      </motion.div>
      
      {/* Push Notifications */}
      <motion.div variants={itemVariants}>
        <Card className="p-8 border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center">
              <div className="p-2 bg-amber-50 rounded-full mr-3">
                <Bell className="h-6 w-6 text-amber-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Notificações Push</h2>
            </div>
            
            <Separator className="bg-gradient-to-r from-amber-100 to-transparent" />
            
            <div className="space-y-5">
              {Object.entries(pushNotifications).map(([key, value], index) => {
                const labels = {
                  atualizacoes: {
                    title: "Atualizações do sistema",
                    description: "Receba notificações sobre atualizações da plataforma"
                  },
                  mensagens: {
                    title: "Mensagens",
                    description: "Notificações sobre novas mensagens e respostas"
                  }
                };
                
                return (
                  <motion.div 
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={`push-${key}`} className="text-base font-medium flex items-center">
                        {labels[key as keyof typeof labels].title}
                        {key === "mensagens" && (
                          <Badge className="ml-2 bg-amber-100 text-amber-700 hover:bg-amber-200">Recomendado</Badge>
                        )}
                      </Label>
                      <p className="text-sm text-gray-500">{labels[key as keyof typeof labels].description}</p>
                    </div>
                    <motion.div
                      variants={switchVariants}
                      animate={value ? "checked" : "unchecked"}
                    >
                      <Switch 
                        id={`push-${key}`} 
                        checked={value}
                        onCheckedChange={handlePushChange(key as keyof typeof pushNotifications)}
                        className="data-[state=checked]:bg-amber-500"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-amber-100 rounded-full opacity-10"
            style={{ filter: "blur(60px)" }}
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
          />
        </Card>
      </motion.div>
      
      {/* Frequency Settings */}
      <motion.div variants={itemVariants}>
        <Card className="p-8 border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-full mr-3">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Frequência de Notificações</h2>
            </div>
            
            <Separator className="bg-gradient-to-r from-green-100 to-transparent" />
            
            <RadioGroup value={frequencia} onValueChange={setFrequencia} className="space-y-4 pt-2">
              {[
                { value: "tempo-real", label: "Em tempo real", description: "Receba notificações assim que eventos ocorrerem" },
                { value: "diaria", label: "Resumo diário", description: "Receba um resumo diário de todas as notificações" },
                { value: "semanal", label: "Resumo semanal", description: "Receba um resumo semanal de todas as notificações" }
              ].map((option, index) => (
                <motion.div 
                  key={option.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                    frequencia === option.value 
                      ? "border-green-200 bg-green-50" 
                      : "border-transparent hover:bg-gray-50"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: frequencia === option.value ? 1 : 1.02 }}
                >
                  <RadioGroupItem value={option.value} id={option.value} className="text-green-500" />
                  <div>
                    <Label htmlFor={option.value} className="font-medium">{option.label}</Label>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </motion.div>
              ))}
            </RadioGroup>
            
            <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
              <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                A configuração de frequência afeta apenas notificações agrupadas e resumos. 
                Alertas críticos ainda serão entregues em tempo real.
              </p>
            </div>
          </div>
          
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full opacity-10"
            style={{ filter: "blur(60px)" }}
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
          />
        </Card>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="flex justify-end gap-3 pt-2"
      >
        <Button 
          variant="outline"
          className="border-gray-200 hover:bg-gray-50"
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-[#B38E6A] to-[#D4B595] hover:from-[#A47D5D] hover:to-[#C3A484] text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              Salvando...
            </>
          ) : (
            <>
              <Settings className="h-4 w-4 mr-2" />
              Salvar alterações
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  )
} 