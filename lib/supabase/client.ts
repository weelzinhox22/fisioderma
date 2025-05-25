import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs"

// Credenciais fixas do Supabase
export const SUPABASE_URL = "https://htmkhefvctwmbrgeejkh.supabase.co"
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA"

// Função para criar um cliente Supabase com as credenciais fixas
export function createSupabaseClient(): SupabaseClient {
  return createClientComponentClient({
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_ANON_KEY,
  })
}

// Singleton para o cliente Supabase
let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient()
  }
  return supabaseInstance
}

// Função para fazer login e redirecionar com sucesso
export async function loginAndRedirect(email: string, password: string, redirectTo: string = "/dashboard") {
  try {
    const supabase = createSupabaseClient()
    
    // Fazer login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      throw error
    }
    
    if (!data?.user) {
      throw new Error("Usuário não encontrado")
    }
    
    // Armazenar dados do usuário no localStorage
    localStorage.setItem("userData", JSON.stringify({
      id: data.user.id,
      email: data.user.email,
      role: "user"
    }))
    
    // Forçar atualização do cookie de sessão
    await supabase.auth.refreshSession()
    
    // Construir URL absoluta para o redirecionamento
    const baseUrl = window.location.origin
    
    // Redirecionar para a página de redirecionamento, que vai garantir que os cookies sejam processados
    setTimeout(() => {
      window.location.href = `${baseUrl}/auth-redirect?redirectTo=${encodeURIComponent(redirectTo)}`
    }, 300)
    
    return { success: true, user: data.user }
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    return { success: false, error }
  }
} 