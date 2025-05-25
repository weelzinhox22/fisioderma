"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

// Constantes do Supabase
const SUPABASE_URL = "https://htmkhefvctwmbrgeejkh.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA"

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
        
        // Criar cliente Supabase com as credenciais fixas
        console.log("Criando cliente Supabase com credenciais fixas...")
        const supabaseClient = createClientComponentClient({
          supabaseUrl: SUPABASE_URL,
          supabaseKey: SUPABASE_ANON_KEY,
        })
        
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
          // Buscar perfil do usuário
          try {
            // Primeiro tentar tabela user_profiles
            const { data: userProfileData, error: userProfileError } = await supabaseClient
              .from("user_profiles")
              .select("role")
              .eq("id", session.user.id)
              .single()
              
            if (!userProfileError && userProfileData) {
              console.log("Perfil obtido de user_profiles:", userProfileData)
              setUserRole(userProfileData?.role ?? null)
            } else {
              console.warn("Erro ou sem dados em user_profiles, tentando profiles:", userProfileError)
              
              // Fallback para tabela profiles
              const { data: profileData, error: profileError } = await supabaseClient
                .from("profiles")
                .select("role")
                .eq("id", session.user.id)
                .single()

              if (profileError) {
                console.warn("Erro ao buscar perfil em profiles:", profileError)
              } else {
                console.log("Perfil obtido de profiles:", profileData)
                setUserRole(profileData?.role ?? null)
              }
            }
          } catch (profileErr) {
            console.error("Erro ao buscar dados de perfil:", profileErr)
          }
        }

        // Configurar listener de mudança de autenticação
        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
          console.log("Mudança de estado de autenticação:", event)
          setUser(session?.user ?? null)

          if (session?.user) {
            try {
              // Tentar ambas as tabelas para buscar o perfil
              const { data: profileData } = await supabaseClient
                .from("user_profiles")
                .select("role")
                .eq("id", session.user.id)
                .single()
                
              if (profileData) {
                setUserRole(profileData?.role ?? null)
              } else {
                const { data: oldProfileData } = await supabaseClient
                  .from("profiles")
                  .select("role")
                  .eq("id", session.user.id)
                  .single()
                  
                setUserRole(oldProfileData?.role ?? null)
              }
            } catch (profileErr) {
              console.error("Erro ao buscar perfil em onAuthStateChange:", profileErr)
            }
          } else {
            setUserRole(null)
          }

          router.refresh()
        })

        return () => {
          subscription.unsubscribe()
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
