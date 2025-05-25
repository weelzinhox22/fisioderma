import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Verificar se a rota é do banco de questões
  if (req.nextUrl.pathname.startsWith('/banco-questoes') && 
      !req.nextUrl.pathname.includes('banco-questoes-login')) {
    
    // Verificar se o cookie de acesso especial existe
    const specialUser = req.cookies.get('specialUser')
    
    // Se não existir cookie, redirecionar para a página de login
    if (!specialUser) {
      return NextResponse.redirect(new URL('/banco-questoes-login', req.url))
    }
  }
  
  // Permitir acesso a outras rotas
  return NextResponse.next()
  }

// Manter o matcher para que o middleware seja executado nas rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/conteudos/:path*", "/provas/:path*", "/banco-questoes/:path*"],
}
