"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Palette, Monitor, Moon, Sun, Check, Layout, Layers } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select"

export function AppearanceSettings() {
  // Estados para as configurações de aparência
  const [theme, setTheme] = useState("system")
  const [accentColor, setAccentColor] = useState("#B38E6A")
  const [fontSize, setFontSize] = useState("normal")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [sidebarLayout, setSidebarLayout] = useState("expanded")
  const [saving, setSaving] = useState(false)
  
  // Opções de cores de destaque
  const accentColors = [
    { name: "Bronze", value: "#B38E6A" },
    { name: "Azul", value: "#3B82F6" },
    { name: "Verde", value: "#10B981" },
    { name: "Roxo", value: "#8B5CF6" },
    { name: "Rosa", value: "#EC4899" },
    { name: "Âmbar", value: "#F59E0B" },
    { name: "Vermelho", value: "#EF4444" }
  ]
  
  // Função para salvar as configurações
  const handleSave = () => {
    setSaving(true)
    
    // Simulando uma requisição
    setTimeout(() => {
      setSaving(false)
      // Aqui iria a integração com o backend
    }, 2000)
  }
  
  // Função para aplicar uma cor de destaque
  const applyAccentColor = (color: string) => {
    setAccentColor(color)
    
    // Em um aplicativo real, você aplicaria a cor ao tema
    // Por exemplo, atualizando variáveis CSS
    document.documentElement.style.setProperty('--primary', color)
  }
  
  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Tema */}
      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center">
              <Palette className="h-6 w-6 mr-2 text-[#B38E6A]" />
              <h2 className="text-xl font-semibold text-gray-800">Tema</h2>
            </div>
            
            <Separator />
            
            <RadioGroup 
              value={theme} 
              onValueChange={setTheme}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="theme-light" 
                  className="cursor-pointer border rounded-lg p-4 w-full h-28 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors data-[state=checked]:border-[#B38E6A] data-[state=checked]:ring-1 data-[state=checked]:ring-[#B38E6A]"
                  data-state={theme === "light" ? "checked" : "unchecked"}
                >
                  <Sun className={`h-6 w-6 ${theme === "light" ? "text-[#B38E6A]" : "text-gray-600"}`} />
                  <div className="text-center">
                    <span className="block font-medium text-sm">Claro</span>
                    <span className="block text-xs text-gray-500">Aparência clara para ambientes com bastante luz</span>
                  </div>
                  <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                </Label>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="theme-dark" 
                  className="cursor-pointer border rounded-lg p-4 w-full h-28 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors data-[state=checked]:border-[#B38E6A] data-[state=checked]:ring-1 data-[state=checked]:ring-[#B38E6A]"
                  data-state={theme === "dark" ? "checked" : "unchecked"}
                >
                  <Moon className={`h-6 w-6 ${theme === "dark" ? "text-[#B38E6A]" : "text-gray-600"}`} />
                  <div className="text-center">
                    <span className="block font-medium text-sm">Escuro</span>
                    <span className="block text-xs text-gray-500">Aparência escura para ambientes com pouca luz</span>
                  </div>
                  <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                </Label>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="theme-system" 
                  className="cursor-pointer border rounded-lg p-4 w-full h-28 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors data-[state=checked]:border-[#B38E6A] data-[state=checked]:ring-1 data-[state=checked]:ring-[#B38E6A]"
                  data-state={theme === "system" ? "checked" : "unchecked"}
                >
                  <Monitor className={`h-6 w-6 ${theme === "system" ? "text-[#B38E6A]" : "text-gray-600"}`} />
                  <div className="text-center">
                    <span className="block font-medium text-sm">Sistema</span>
                    <span className="block text-xs text-gray-500">Segue as configurações do seu dispositivo</span>
                  </div>
                  <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                </Label>
              </div>
            </RadioGroup>
          </div>
        </Card>
      </motion.div>
      
      {/* Cores de destaque */}
      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Cor de destaque</h2>
            
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  className="relative h-12 rounded-md overflow-hidden group"
                  style={{ backgroundColor: color.value }}
                  onClick={() => applyAccentColor(color.value)}
                  aria-label={`Cor ${color.name}`}
                >
                  {accentColor === color.value && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black bg-opacity-10 transition-opacity">
                    <span className="text-xs font-medium text-white shadow-sm">
                      {color.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Configurações adicionais */}
      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Configurações adicionais</h2>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="font-size" className="text-base">Tamanho da fonte</Label>
                  <p className="text-sm text-gray-500">Ajuste o tamanho do texto em toda a interface</p>
                </div>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                    <SelectItem value="x-large">Extra grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion" className="text-base">Reduzir movimento</Label>
                  <p className="text-sm text-gray-500">Diminui ou remove animações e transições</p>
                </div>
                <Switch 
                  id="reduced-motion" 
                  checked={reducedMotion}
                  onCheckedChange={setReducedMotion}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast" className="text-base">Alto contraste</Label>
                  <p className="text-sm text-gray-500">Aumenta o contraste para melhor legibilidade</p>
                </div>
                <Switch 
                  id="high-contrast" 
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Layout */}
      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center">
              <Layout className="h-6 w-6 mr-2 text-[#B38E6A]" />
              <h2 className="text-xl font-semibold text-gray-800">Layout</h2>
            </div>
            
            <Separator />
            
            <RadioGroup 
              value={sidebarLayout} 
              onValueChange={setSidebarLayout}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="layout-expanded" 
                  className="cursor-pointer border rounded-lg p-4 w-full h-36 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors data-[state=checked]:border-[#B38E6A] data-[state=checked]:ring-1 data-[state=checked]:ring-[#B38E6A]"
                  data-state={sidebarLayout === "expanded" ? "checked" : "unchecked"}
                >
                  <div className="w-full h-20 flex border rounded">
                    <div className="w-1/4 h-full bg-gray-200 border-r"></div>
                    <div className="w-3/4 h-full flex flex-col p-2">
                      <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                      <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                      <div className="flex-grow"></div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="block font-medium text-sm">Barra lateral expandida</span>
                    <span className="block text-xs text-gray-500">Nomes de menu sempre visíveis</span>
                  </div>
                  <RadioGroupItem value="expanded" id="layout-expanded" className="sr-only" />
                </Label>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="layout-compact" 
                  className="cursor-pointer border rounded-lg p-4 w-full h-36 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors data-[state=checked]:border-[#B38E6A] data-[state=checked]:ring-1 data-[state=checked]:ring-[#B38E6A]"
                  data-state={sidebarLayout === "compact" ? "checked" : "unchecked"}
                >
                  <div className="w-full h-20 flex border rounded">
                    <div className="w-10 h-full bg-gray-200 border-r flex flex-col items-center py-2 gap-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="flex-grow h-full flex flex-col p-2">
                      <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                      <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                      <div className="flex-grow"></div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="block font-medium text-sm">Barra lateral compacta</span>
                    <span className="block text-xs text-gray-500">Apenas ícones visíveis</span>
                  </div>
                  <RadioGroupItem value="compact" id="layout-compact" className="sr-only" />
                </Label>
              </div>
            </RadioGroup>
          </div>
        </Card>
      </motion.div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Restaurar padrões</Button>
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#B38E6A] hover:bg-[#A47D5D]"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              Salvando...
            </>
          ) : "Salvar alterações"}
        </Button>
      </div>
    </motion.div>
  )
} 