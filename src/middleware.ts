import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // Public routes that don't require authentication
    const publicRoutes = ['/auth/login', '/dashboard/login', '/', '/about', '/contact', '/products', '/portfolio', '/services', '/design-services']
    
    // Allow access to public routes
    if (publicRoutes.some(route => pathname === route || pathname.startsWith('/api/products') || pathname.startsWith('/api/categories') || pathname.startsWith('/api/brands'))) {
      return NextResponse.next()
    }

    // Redirect unauthenticated users to unified login
    if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/employee') || pathname.startsWith('/manager') || pathname.startsWith('/dashboard'))) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // Extract user roles and level
    const userRoles = token?.roles as string[] || []
    const userLevel = token?.level as number || 0

    // Helper functions
    const hasRole = (role: string) => userRoles.includes(role)
    const hasMinLevel = (minLevel: number) => userLevel >= minLevel

    // Super Admin Routes (Level 100) - Full system access
    if (pathname.startsWith('/super-admin')) {
      if (!hasRole('super_admin')) {
        return NextResponse.redirect(new URL(getDefaultRoute(userRoles), req.url))
      }
      return NextResponse.next()
    }

    // Admin Routes (Level 80+) - Business management
    if (pathname.startsWith('/admin')) {
      if (!hasMinLevel(80)) {
        return NextResponse.redirect(new URL(getDefaultRoute(userRoles), req.url))
      }
      return NextResponse.next()
    }

    // Manager Routes (Level 70+) - Operations management
    if (pathname.startsWith('/manager')) {
      if (!hasMinLevel(70)) {
        return NextResponse.redirect(new URL(getDefaultRoute(userRoles), req.url))
      }
      return NextResponse.next()
    }

    // Employee Routes (Level 50+) - Basic operations
    if (pathname.startsWith('/employee')) {
      if (!hasMinLevel(50)) {
        return NextResponse.redirect(new URL(getDefaultRoute(userRoles), req.url))
      }
      return NextResponse.next()
    }

    // Dashboard fallback routes
    if (pathname.startsWith('/dashboard')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
      
      // Redirect to appropriate dashboard based on role
      if (pathname === '/dashboard' || pathname === '/dashboard/') {
        return NextResponse.redirect(new URL(getDefaultRoute(userRoles), req.url))
      }
      
      return NextResponse.next()
    }

    // API Route Protection
    if (pathname.startsWith('/api/admin')) {
      if (!hasMinLevel(80)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    if (pathname.startsWith('/api/manager')) {
      if (!hasMinLevel(70)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    if (pathname.startsWith('/api/employee')) {
      if (!hasMinLevel(50)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Always allow access to public routes
        const publicRoutes = ['/auth/login', '/dashboard/login', '/', '/about', '/contact', '/products', '/portfolio', '/services', '/design-services']
        if (publicRoutes.some(route => pathname === route || pathname.startsWith('/api/products') || pathname.startsWith('/api/categories') || pathname.startsWith('/api/brands'))) {
          return true
        }

        // Require authentication for protected routes
        if (pathname.startsWith('/admin') || pathname.startsWith('/employee') || pathname.startsWith('/manager') || pathname.startsWith('/dashboard') || pathname.startsWith('/super-admin')) {
          return !!token
        }

        // Allow access to other routes
        return true
      },
    },
  }
)

// Helper function to determine default route based on user roles
function getDefaultRoute(roles: string[]): string {
  if (roles.includes('super_admin')) return '/super-admin'
  if (roles.includes('admin')) return '/admin'
  if (roles.includes('manager')) return '/manager'
  if (roles.includes('employee')) return '/employee'
  return '/'
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/employee/:path*',
    '/manager/:path*',
    '/super-admin/:path*',
    '/dashboard/:path*',
    '/api/admin/:path*',
    '/api/manager/:path*',
    '/api/employee/:path*'
  ]
}
