import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // Allow access to login page
    if (pathname === '/dashboard/login') {
      return NextResponse.next()
    }

    // Redirect unauthenticated users to login
    if (!token && pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard/login', req.url))
    }

    // Check role-based access for admin routes
    if (pathname.startsWith('/dashboard/admin')) {
      if (token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    // Allow authenticated users to access dashboard
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Always allow access to login page
        if (pathname === '/dashboard/login') {
          return true
        }

        // Require authentication for dashboard routes
        if (pathname.startsWith('/dashboard')) {
          return !!token
        }

        // Allow access to public routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/dashboard/:path*'
  ]
}
