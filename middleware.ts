import {NextRequest, NextResponse} from 'next/server';

const protectedRoutes = ['/contracts-list'];

export async function middleware(req: NextRequest) {
  const session = req.cookies.get('session');
  const pathname = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(pathname);

  if(isProtected && !session?.value) {
      return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}