import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host');
  
  // URL que você criou para a comunidade
  const communityHost = 'letras-pastoraldamusica.vercel.app';

  // Se o acesso for pelo domínio de letras e estiver na raiz
  if (hostname === communityHost && req.nextUrl.pathname === '/') {
    // Redireciona internamente para a página de letras
    return NextResponse.rewrite(new URL('/letras', req.url));
  }

  return NextResponse.next();
}

// Configuração crucial para evitar erros de módulos não suportados
export const config = {
  matcher: [
    /*
     * Aplica o middleware apenas em páginas, ignorando:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
