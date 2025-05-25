"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AuthRedirectPage() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"
  const [message, setMessage] = useState("Redirecionando...")
  
  useEffect(() => {
    // Verificar se há um usuário autenticado no localStorage
    const userDataStr = localStorage.getItem("userData")
    const specialUserStr = localStorage.getItem("specialUser")
    
    if (userDataStr || specialUserStr) {
      // Redirecionar para a página de destino
      setMessage(`Redirecionando para ${redirectTo}...`)
      
      // Pequeno atraso para garantir que os cookies sejam processados
      setTimeout(() => {
        window.location.href = redirectTo
      }, 500)
    } else {
      // Se não houver usuário autenticado, redirecionar para a página de login
      setMessage("Sessão não encontrada. Redirecionando para a página de login...")
      
      setTimeout(() => {
        window.location.href = `/login?redirectTo=${encodeURIComponent(redirectTo)}`
      }, 1000)
    }
  }, [redirectTo])
  
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#B38E6A]" />
        <p className="text-lg text-neutral-700">{message}</p>
      </div>
    </div>
  )
} 