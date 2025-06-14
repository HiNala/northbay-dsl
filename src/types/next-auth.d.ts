import "next-auth"
import "next-auth/jwt"
import NextAuth from 'next-auth'

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      roleLevel: number
      avatar?: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
    roleLevel: number
    avatar?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    roleLevel?: number
    avatar?: string
  }
} 