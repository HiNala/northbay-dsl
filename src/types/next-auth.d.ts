import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      roles: string[]
      level: number
    }
  }

  interface User {
    id: string
    email: string
    name: string
    roles: string[]
    level: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles: string[]
    level: number
  }
} 