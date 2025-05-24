"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { User, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProfileSettings() {
  const router = useRouter()
  
  // Redirecionar para a página de perfil quando o usuário clicar no botão
  const handleRedirect = () => {
    router.push("/dashboard/perfil")
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 border shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-[#B38E6A]/10 rounded-full">
            <User className="h-10 w-10 text-[#B38E6A]" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800">Gerenciamento de Perfil</h2>
          
          <p className="text-gray-600 max-w-md mx-auto">
            As configurações de perfil foram movidas para uma página dedicada para melhor organização e experiência do usuário.
          </p>
          
          <Button 
            onClick={handleRedirect}
            className="mt-4 bg-gradient-to-r from-[#B38E6A] to-[#D4B595] hover:from-[#A47D5D] hover:to-[#C3A484] text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
          >
            Ir para página de perfil
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
} 