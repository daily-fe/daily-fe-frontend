import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    
    // TODO
    if (req.nextUrl.pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const protectedRoutes = [
          '/profile',
          '/article/liked',
        ];
        
        const isProtectedRoute = protectedRoutes.some(route => 
          req.nextUrl.pathname.startsWith(route)
        );
        
        if (isProtectedRoute) {
          return !!token;
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 