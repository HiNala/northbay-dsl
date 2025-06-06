import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Allow access to login page
    if (pathname.startsWith('/auth/login')) {
      return NextResponse.next()
    }

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
      const isAdmin = token?.roles?.includes('admin') || token?.roles?.includes('super_admin')
      const isManager = token?.roles?.includes('manager')
      
      if (!isAdmin && !isManager) {
        return NextResponse.redirect(new URL('/auth/login?error=unauthorized', req.url))
      }
    }

    // Protect employee routes
    if (pathname.startsWith('/employee')) {
      const hasEmployeeAccess = token?.roles?.includes('employee') || 
                               token?.roles?.includes('admin') || 
                               token?.roles?.includes('manager') ||
                               token?.roles?.includes('super_admin')
      
      if (!hasEmployeeAccess) {
        return NextResponse.redirect(new URL('/auth/login?error=unauthorized', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        // Allow public routes
        if (
          pathname === '/' ||
          pathname.startsWith('/products') ||
          pathname.startsWith('/about') ||
          pathname.startsWith('/contact') ||
          pathname.startsWith('/services') ||
          pathname.startsWith('/portfolio') ||
          pathname.startsWith('/design-services') ||
          pathname.startsWith('/auth/login') ||
          pathname.startsWith('/api/auth') ||
          pathname.startsWith('/_next') ||
          pathname.startsWith('/favicon.ico')
        ) {
          return true
        }

        // Require authentication for protected routes
        if (pathname.startsWith('/admin') || pathname.startsWith('/employee')) {
          return !!token
        }

        return true
      },
    },
  }
)

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
} 