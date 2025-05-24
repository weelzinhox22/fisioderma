import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Criar cliente Supabase
  const supabase = createMiddlewareClient({ req, res })

  try {
    // Verificar sessão
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Verificar se existe um usuário especial no localStorage (apenas para cliente)
  const hasSpecialUser = req.cookies.has("specialUser")

  // Rotas que requerem autenticação
  const authRoutes = ["/dashboard", "/conteudos", "/provas"]

  // Rotas que requerem autenticação especial (admin ou professor)
  const specialRoutes = ["/banco-questoes"]

  const path = req.nextUrl.pathname

  // Verificar se a rota atual requer autenticação
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route))
  const isSpecialRoute = specialRoutes.some((route) => path.startsWith(route))

  // Se for uma rota que requer autenticação especial
  if (isSpecialRoute) {
    // Verificar se o usuário está autenticado como usuário especial
    if (!hasSpecialUser && !session) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirectTo", path)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Se for uma rota que requer autenticação normal
  if (isAuthRoute && !session && !hasSpecialUser) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirectTo", path)
    return NextResponse.redirect(redirectUrl)
  }

  return res
  } catch (error) {
    console.error("Erro no middleware:", error)
    return res
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/conteudos/:path*", "/provas/:path*", "/banco-questoes/:path*"],
}
