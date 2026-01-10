import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Pegamos o endereço (host) que o usuário digitou
  const hostname = request.headers.get('host')

  // 2. Definimos qual é o domínio da comunidade
  const linkComunidade = 'letras-pastoraldamusica.vercel.app'

  // 3. Se o usuário estiver vindo pelo link de letras...
  if (hostname === linkComunidade) {
    const url = request.nextUrl.clone()
    
    // ...e se ele estiver tentando acessar a página inicial "/"
    if (url.pathname === '/') {
      // Nós "forçamos" ele a ver o conteúdo da página /letras
      url.pathname = '/letras' 
      return NextResponse.rewrite(url)
    }
  }

  // Se for o domínio oficial, o sistema segue o fluxo normal
  return NextResponse.next()
}

// 4. Configuração para o Middleware não rodar em imagens ou arquivos internos
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
