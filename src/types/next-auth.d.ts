import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      roles: string[]
      level: number
      avatar?: string
      // Backward compatibility
      role: string
      roleLevel: number
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    roles: string[]
    level: number
    avatar?: string
    // Backward compatibility
    role: string
    roleLevel: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles: string[]
    level: number
    avatar?: string
    // Backward compatibility
    role: string
    roleLevel: number
  }
} 