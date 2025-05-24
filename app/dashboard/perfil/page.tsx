"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Camera, 
  Trash2, 
  Edit2, 
  Check, 
  X,
  Save
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PerfilPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Dados fictícios do usuário para demonstração
  const [formData, setFormData] = useState({
    nome: "Ana Silva",
    email: "ana.silva@exemplo.com",
    telefone: "(11) 98765-4321",
    bio: "Especialista em fisioterapia dermatofuncional com 10 anos de experiência.",
    endereco: "São Paulo, SP",
    perfilPublico: true
  })
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Função para lidar com o upload de imagem de perfil
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploading(true)
      
      // Simulando upload
      setTimeout(() => {
        const reader = new FileReader()
        reader.onload = (event) => {
          setProfileImage(event.target?.result as string)
          setUploading(false)
        }
        reader.readAsDataURL(file)
      }, 1000)
    }
  }
  
  // Função para remover a imagem de perfil
  const handleRemoveProfileImage = () => {
    setProfileImage(null)
  }
  
  // Função para atualizar os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Função para lidar com o switch de perfil público
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, perfilPublico: checked }))
  }
  
  // Função para salvar as alterações
  const handleSave = () => {
    setSaving(true)
    
    // Simulando uma requisição
    setTimeout(() => {
      setSaving(false)
      setIsEditing(false)
      // Aqui você faria a integração com o backend
    }, 1000)
  }

  // Função para ativar o modo de edição
  const handleEditMode = () => {
    setIsEditing(true)
  }

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setIsEditing(false)
    // Aqui você poderia restaurar os dados originais se necessário
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

  if (!mounted) return null

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Cabeçalho da página */}
      <motion.div 
        variants={itemVariants}
        className="mb-8 flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-gray-800">Meu Perfil</h1>
        
        {!isEditing ? (
          <Button 
            onClick={handleEditMode}
            className="bg-[#B38E6A] hover:bg-[#A47D5D] text-white flex items-center gap-2 px-4 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Edit2 size={16} />
            <span>Editar Perfil</span>
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={handleCancelEdit}
              className="border-gray-300 text-gray-700 flex items-center gap-2"
            >
              <X size={16} />
              <span>Cancelar</span>
            </Button>
            
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="bg-[#B38E6A] hover:bg-[#A47D5D] text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Salvar Alterações</span>
                </>
              )}
            </Button>
          </div>
        )}
      </motion.div>
      
      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna da esquerda - Avatar e status */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-1"
        >
          <Card className="p-6 flex flex-col items-center text-center border-none bg-gradient-to-b from-[#F8F5F1] to-white shadow-md">
            {/* Avatar com opções de edição */}
            <div className="relative mb-4 group">
              <Avatar className="h-36 w-36 border-4 border-white shadow-lg">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt="Foto de perfil" />
                ) : (
                  <AvatarFallback className="text-5xl bg-gradient-to-br from-[#B38E6A] to-[#D4B595] text-white">
                    {formData.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              
              {isEditing && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <label htmlFor="profile-image" className="cursor-pointer p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">
                          <Camera size={24} className="text-white" />
                          <input 
                            id="profile-image" 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleProfileImageUpload}
                          />
                        </label>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Alterar foto de perfil</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 border-3 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
              )}
              
              {isEditing && profileImage && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={handleRemoveProfileImage}
                        className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remover foto</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            
            {/* Nome do usuário */}
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              {isEditing ? (
                <Input 
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="text-center font-bold text-xl border-b-2 border-t-0 border-x-0 rounded-none px-0 focus:border-[#B38E6A] focus:ring-0 shadow-none"
                />
              ) : (
                formData.nome
              )}
            </h2>
            
            {/* Status de visibilidade */}
            <div className="flex items-center mt-4 space-x-2 bg-gray-50 px-4 py-2 rounded-full">
              <Switch 
                id="perfil-publico" 
                checked={formData.perfilPublico}
                onCheckedChange={handleSwitchChange}
                disabled={!isEditing}
                className={isEditing ? "" : "opacity-60"}
              />
              <Label htmlFor="perfil-publico" className={`text-sm ${isEditing ? 'text-gray-800' : 'text-gray-500'}`}>
                {formData.perfilPublico ? 'Perfil público' : 'Perfil privado'}
              </Label>
            </div>
            
            {formData.perfilPublico && (
              <Alert className="mt-4 bg-green-50 border-green-100 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700">
                  Seu perfil está visível publicamente
                </AlertDescription>
              </Alert>
            )}
          </Card>
        </motion.div>
        
        {/* Coluna da direita - Informações do usuário */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 space-y-6"
        >
          {/* Sobre */}
          <Card className="border-none shadow-md overflow-hidden">
            <div className="bg-[#B38E6A]/10 px-6 py-3 flex items-center">
              <User className="h-5 w-5 text-[#B38E6A] mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Sobre</h2>
            </div>
            
            <div className="p-6">
              {isEditing ? (
                <Textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Conte um pouco sobre você" 
                  rows={4}
                  className="border-gray-200 focus:border-[#B38E6A] focus:ring-[#B38E6A]/20 resize-none"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
              )}
            </div>
          </Card>
          
          {/* Informações de Contato */}
          <Card className="border-none shadow-md overflow-hidden">
            <div className="bg-[#B38E6A]/10 px-6 py-3 flex items-center">
              <FileText className="h-5 w-5 text-[#B38E6A] mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Informações de Contato</h2>
            </div>
            
            <div className="p-6 divide-y divide-gray-100">
              <div className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-[#B38E6A] mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">E-mail</p>
                    {isEditing ? (
                      <Input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 border-gray-200 focus:border-[#B38E6A] focus:ring-[#B38E6A]/20"
                      />
                    ) : (
                      <p className="text-gray-800">{formData.email}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="py-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-[#B38E6A] mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Telefone</p>
                    {isEditing ? (
                      <Input 
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="mt-1 border-gray-200 focus:border-[#B38E6A] focus:ring-[#B38E6A]/20"
                      />
                    ) : (
                      <p className="text-gray-800">{formData.telefone}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="py-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#B38E6A] mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Localização</p>
                    {isEditing ? (
                      <Input 
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        className="mt-1 border-gray-200 focus:border-[#B38E6A] focus:ring-[#B38E6A]/20"
                      />
                    ) : (
                      <p className="text-gray-800">{formData.endereco}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Botão de edição para telas pequenas */}
          <div className="md:hidden mt-6">
            {!isEditing ? (
              <Button 
                onClick={handleEditMode}
                className="w-full bg-[#B38E6A] hover:bg-[#A47D5D] text-white flex items-center justify-center gap-2 py-6"
              >
                <Edit2 size={18} />
                <span className="font-medium">Editar Perfil</span>
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex-1 border-gray-300 text-gray-700 flex items-center justify-center gap-2 py-6"
                >
                  <X size={18} />
                  <span className="font-medium">Cancelar</span>
                </Button>
                
                <Button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-[#B38E6A] hover:bg-[#A47D5D] text-white flex items-center justify-center gap-2 py-6"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      <span className="font-medium">Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span className="font-medium">Salvar</span>
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 