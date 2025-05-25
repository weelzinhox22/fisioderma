"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { createSupabaseClient, SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/client"

type SupabaseContext = {
  supabase: SupabaseClient | null
  user: User | null
  loading: boolean
  userRole: string | null
  errorMessage: string | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        console.log("Inicializando Supabase...")
        
        // Verificar usuário especial (modo offline) primeiro
        const specialUserStr = localStorage.getItem("specialUser")
        if (specialUserStr) {
          try {
            const specialUser = JSON.parse(specialUserStr)
            if (specialUser && specialUser.isSpecialUser) {
              console.log("Usuário especial encontrado:", specialUser.role)
              setUserRole(specialUser.role)
              setLoading(false)
              return
            }
          } catch (e) {
            console.warn("Erro ao processar usuário especial:", e)
            localStorage.removeItem("specialUser")
          }
        }
        
        // Criar cliente Supabase com credenciais fixas para garantir funcionamento
        console.log("Criando cliente Supabase...")
        const supabaseClient = createSupabaseClient()
        
        console.log("Cliente Supabase criado com sucesso")
        setSupabase(supabaseClient)

        // Verificar sessão atual
        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession()
        
        if (sessionError) {
          console.error("Erro ao obter sessão:", sessionError)
          throw sessionError
        }

        console.log("Sessão obtida:", !!session)
        setUser(session?.user ?? null)

        if (session?.user) {
          // Definir role padrão para evitar consultas que estão falhando
          setUserRole("user")
          
          // Configurar listener de mudança de autenticação
          const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
            console.log("Mudança de estado de autenticação:", event)
            setUser(session?.user ?? null)
            
            // Definir role padrão quando o usuário estiver autenticado
            if (session?.user) {
              setUserRole("user")
            } else {
              setUserRole(null)
            }
            
            router.refresh()
          })
          
          return () => {
            subscription.unsubscribe()
          }
        }
      } catch (error: any) {
        console.error("Erro na inicialização do Supabase:", error)
        setErrorMessage(error.message)
      } finally {
        setLoading(false)
      }
    }

    initializeSupabase()
  }, [router])

  return (
    <Context.Provider value={{ 
      supabase, 
      user, 
      loading, 
      userRole, 
      errorMessage 
    }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}
