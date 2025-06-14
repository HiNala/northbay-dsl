import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Allow access to login page
    if (pathname.startsWith('/auth/login') || pathname.startsWith('/dashboard/login')) {
      return NextResponse.next()
    }

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
      const roles = token?.roles as string[] || []
      const level = token?.level as number || 0
      
      // Check if user has admin/manager level access (level 80+ or specific roles)
      const hasAdminAccess = level >= 80 || 
                           roles.includes('admin') || 
                           roles.includes('super_admin') || 
                           roles.includes('manager')
      
      if (!hasAdminAccess) {
        return NextResponse.redirect(new URL('/dashboard/login?error=unauthorized', req.url))
      }
    }

    // Protect employee routes
    if (pathname.startsWith('/employee') || pathname.startsWith('/dashboard')) {
      const roles = token?.roles as string[] || []
      const level = token?.level as number || 0
      
      // Check if user has employee level access or higher (level 50+ or specific roles)
      const hasEmployeeAccess = level >= 50 || 
                               roles.includes('employee') || 
                               roles.includes('manager') ||
                               roles.includes('admin') || 
                               roles.includes('super_admin')
      
      if (!hasEmployeeAccess) {
        return NextResponse.redirect(new URL('/dashboard/login?error=unauthorized', req.url))
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
          pathname.startsWith('/search') ||
          pathname.startsWith('/auth/login') ||
          pathname.startsWith('/dashboard/login') ||
          pathname.startsWith('/api/auth') ||
          pathname.startsWith('/_next') ||
          pathname.startsWith('/favicon.ico') ||
          pathname === '/favicon.ico'
        ) {
          return true
        }

        // Require authentication for protected routes
        if (pathname.startsWith('/admin') || pathname.startsWith('/employee') || pathname.startsWith('/dashboard')) {
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