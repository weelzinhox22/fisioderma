"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Eye, 
  EyeOff, 
  Shield, 
  Check,
  X,
  Lock,
  AlertTriangle,
  Key
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export function SecuritySettings() {
  // Estados para as configurações de segurança
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [saving, setSaving] = useState(false)
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  
  // Função para atualizar os campos de senha
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }
  
  // Função para alternar a visibilidade das senhas
  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    if (field === 'current') setShowCurrentPassword(!showCurrentPassword)
    if (field === 'new') setShowNewPassword(!showNewPassword)
    if (field === 'confirm') setShowConfirmPassword(!showConfirmPassword)
  }
  
  // Verificar a força da senha
  const getPasswordStrength = (password: string) => {
    if (!password) return 0
    
    let strength = 0
    
    // Comprimento
    if (password.length >= 8) strength += 1
    if (password.length >= 12) strength += 1
    
    // Complexidade
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    
    return Math.min(strength, 5)
  }
  
  const passwordStrength = getPasswordStrength(passwordData.newPassword)
  
  // Classes para a barra de força da senha
  const getStrengthClasses = (strength: number) => {
    const baseClass = "h-2 rounded transition-all duration-300"
    
    if (strength === 0) return `${baseClass} bg-gray-200 w-full`
    if (strength === 1) return `${baseClass} bg-red-500 w-1/5`
    if (strength === 2) return `${baseClass} bg-orange-500 w-2/5`
    if (strength === 3) return `${baseClass} bg-yellow-500 w-3/5`
    if (strength === 4) return `${baseClass} bg-blue-500 w-4/5`
    return `${baseClass} bg-green-500 w-full`
  }
  
  // Mensagem de força da senha
  const getStrengthMessage = (strength: number) => {
    if (strength === 0) return ""
    if (strength === 1) return "Muito fraca"
    if (strength === 2) return "Fraca"
    if (strength === 3) return "Média"
    if (strength === 4) return "Forte"
    return "Muito forte"
  }
  
  const getStrengthColor = (strength: number) => {
    if (strength === 0) return "text-gray-400"
    if (strength === 1) return "text-red-500"
    if (strength === 2) return "text-orange-500"
    if (strength === 3) return "text-yellow-500"
    if (strength === 4) return "text-blue-500"
    return "text-green-500"
  }
  
  // Simulação de atualização de senha
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    
    setSaving(true)
    
    // Simulando requisição
    setTimeout(() => {
      setSaving(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
      // Aqui iria a integração com o backend
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  }

  const inputIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    tap: { scale: 0.9 }
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="p-8 border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-purple-50 rounded-full mr-3">
                <Lock className="h-6 w-6 text-purple-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Alterar senha</h2>
            </div>
            
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <motion.div 
                className="space-y-5"
                variants={fadeInVariants}
              >
                <div className="relative">
                  <Label htmlFor="currentPassword" className="text-gray-700 flex items-center">
                    <Key size={16} className="mr-2 text-gray-400" />
                    Senha atual
                  </Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="pr-10 border-gray-200 focus:border-purple-400 focus:ring-purple-200"
                      required
                    />
                    <motion.button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => togglePasswordVisibility('current')}
                      variants={inputIconVariants}
                      initial="hidden"
                      animate="visible"
                      whileTap="tap"
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.button>
                  </div>
                </div>
                
                <div className="relative">
                  <Label htmlFor="newPassword" className="text-gray-700 flex items-center">
                    <Lock size={16} className="mr-2 text-gray-400" />
                    Nova senha
                  </Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="pr-10 border-gray-200 focus:border-purple-400 focus:ring-purple-200"
                      required
                    />
                    <motion.button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => togglePasswordVisibility('new')}
                      variants={inputIconVariants}
                      initial="hidden"
                      animate="visible"
                      whileTap="tap"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.button>
                  </div>
                  
                  {passwordData.newPassword && (
                    <motion.div 
                      className="mt-3 space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full bg-gray-100 rounded-full overflow-hidden h-2">
                        <motion.div 
                          className={getStrengthClasses(passwordStrength).replace('w-full', 'w-0')}
                          initial={{ width: 0 }}
                          animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className={`text-xs font-medium ${getStrengthColor(passwordStrength)}`}>
                          {getStrengthMessage(passwordStrength)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {passwordStrength}/5
                        </p>
                      </div>
                      
                      <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {[
                          { 
                            check: passwordData.newPassword.length >= 8,
                            label: "Mínimo de 8 caracteres"
                          },
                          { 
                            check: /[A-Z]/.test(passwordData.newPassword),
                            label: "Uma letra maiúscula"
                          },
                          { 
                            check: /[0-9]/.test(passwordData.newPassword),
                            label: "Um número"
                          },
                          { 
                            check: /[^A-Za-z0-9]/.test(passwordData.newPassword),
                            label: "Um caractere especial"
                          }
                        ].map((requirement, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                          >
                            {requirement.check ? (
                              <Check size={14} className="text-green-500 mr-1.5" />
                            ) : (
                              <X size={14} className="text-red-500 mr-1.5" />
                            )}
                            <span className={requirement.check ? "text-green-700" : "text-gray-600"}>
                              {requirement.label}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </div>
                
                <div className="relative">
                  <Label htmlFor="confirmPassword" className="text-gray-700 flex items-center">
                    <Shield size={16} className="mr-2 text-gray-400" />
                    Confirmar nova senha
                  </Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`pr-10 border-gray-200 focus:border-purple-400 focus:ring-purple-200 ${
                        passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : ""
                      }`}
                      required
                    />
                    <motion.button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => togglePasswordVisibility('confirm')}
                      variants={inputIconVariants}
                      initial="hidden"
                      animate="visible"
                      whileTap="tap"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.button>
                  </div>
                  
                  {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                    <motion.p 
                      className="text-xs text-red-500 mt-1 flex items-center"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertTriangle size={12} className="mr-1" />
                      As senhas não coincidem
                    </motion.p>
                  )}
                  
                  {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword && (
                    <motion.p 
                      className="text-xs text-green-500 mt-1 flex items-center"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check size={12} className="mr-1" />
                      As senhas coincidem
                    </motion.p>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="pt-2"
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword || passwordData.newPassword !== passwordData.confirmPassword}
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                      <span>Alterando senha...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      <span>Alterar senha</span>
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
          
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-10"
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
        className="pt-2"
      >
        <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
          <Shield className="h-5 w-5 text-blue-500" />
          <AlertTitle className="font-medium">Dicas de segurança</AlertTitle>
          <AlertDescription className="text-blue-700">
            Para sua segurança, recomendamos alterar sua senha regularmente e não utilizar a mesma senha em diferentes serviços.
            Use uma combinação de letras, números e símbolos para criar senhas mais seguras.
          </AlertDescription>
        </Alert>
      </motion.div>
    </motion.div>
  )
} 