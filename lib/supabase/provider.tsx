"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useRef } from "react"
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
  
  // Usar um ref para controlar se já estamos processando uma mudança de autenticação
  const isProcessingAuth = useRef(false)
  // Usar um ref para armazenar a última vez que processamos uma mudança de autenticação
  const lastAuthChange = useRef(0)

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
        
        // Verificar se já temos dados do usuário no localStorage
        const userDataStr = localStorage.getItem("userData")
        if (userDataStr) {
          try {
            const userData = JSON.parse(userDataStr)
            if (userData && userData.email) {
              console.log("Dados do usuário encontrados no localStorage")
              setUserRole(userData.role || "user")
              setLoading(false)
            }
          } catch (e) {
            console.warn("Erro ao processar dados do usuário:", e)
            localStorage.removeItem("userData")
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
          
          // Configurar listener de mudança de autenticação com debounce
          const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
            // Ignorar eventos muito frequentes (debounce de 1 segundo)
            const now = Date.now()
            if (now - lastAuthChange.current < 1000) {
              console.log("Ignorando mudança de estado de autenticação (muito frequente):", event)
              return
            }
            lastAuthChange.current = now
            
            // Evitar processamento simultâneo de múltiplos eventos
            if (isProcessingAuth.current) {
              console.log("Já processando uma mudança de autenticação, ignorando:", event)
              return
            }
            
            isProcessingAuth.current = true
            console.log("Processando mudança de estado de autenticação:", event)
            
            try {
              setUser(session?.user ?? null)
              
              // Definir role padrão quando o usuário estiver autenticado
              if (session?.user) {
                setUserRole("user")
              } else {
                setUserRole(null)
              }
            } finally {
              isProcessingAuth.current = false
            }
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
