import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Constantes do Supabase - definidas explicitamente para garantir funcionamento
const SUPABASE_URL = "https://htmkhefvctwmbrgeejkh.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  try {
    // Verificar se existe um usuário especial no cookie
    const hasSpecialUserCookie = req.cookies.has("specialUser")
    const path = req.nextUrl.pathname
    
    // Rotas que requerem autenticação
    const authRoutes = ["/dashboard", "/conteudos", "/provas"]
    // Rotas que requerem autenticação especial (admin ou professor)
    const specialRoutes = ["/banco-questoes"]
    
    // Verificar se a rota atual requer autenticação
    const isAuthRoute = authRoutes.some((route) => path.startsWith(route))
    const isSpecialRoute = specialRoutes.some((route) => path.startsWith(route))
    
    // Se o usuário tem cookie de usuário especial, permitir acesso
    if (hasSpecialUserCookie) {
      console.log("Usuário especial detectado via cookie, permitindo acesso")
      return res
    }
    
    // Criar cliente Supabase
    // Nota: O middleware client não aceita supabaseUrl e supabaseKey diretamente
    // Ele usa as variáveis de ambiente automaticamente
    const supabase = createMiddlewareClient({ req, res })
    
    // Verificar sessão
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Se for uma rota que requer autenticação especial
    if (isSpecialRoute && !session) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirectTo", path)
      return NextResponse.redirect(redirectUrl)
    }

    // Se for uma rota que requer autenticação normal
    if (isAuthRoute && !session) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirectTo", path)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error("Erro no middleware:", error)
    
    // Em caso de erro, verificar se o usuário está tentando acessar uma rota protegida
    const path = req.nextUrl.pathname
    const authRoutes = ["/dashboard", "/conteudos", "/provas", "/banco-questoes"]
    const isProtectedRoute = authRoutes.some(route => path.startsWith(route))
    
    if (isProtectedRoute) {
      // Se for uma rota protegida e houve erro, redirecionar para login
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirectTo", path)
      redirectUrl.searchParams.set("error", "connection")
      return NextResponse.redirect(redirectUrl)
    }
    
    return res
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/conteudos/:path*", "/provas/:path*", "/banco-questoes/:path*"],
}
