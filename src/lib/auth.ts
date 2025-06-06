import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user by email with their roles
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            Profile: true,
            roles: {
              include: {
                Role: true,
              },
            },
          },
        })

        if (!user) {
          return null
        }

        // Check if user has admin, employee, or manager role
        const hasBusinessRole = user.roles.some(userRole => 
          ['admin', 'employee', 'manager', 'super_admin'].includes(userRole.Role.name)
        )

        if (!hasBusinessRole) {
          return null
        }

        // For demo purposes, we'll use a simple password check
        // In production, you'd compare hashed passwords
        const isPasswordValid = await compare(credentials.password, user.password || "")
        
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email || "",
          name: user.Profile?.fullName || user.email || "",
          roles: user.roles.map(ur => ur.Role.name),
          level: Math.max(...user.roles.map(ur => ur.Role.level)),
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles
        token.level = user.level
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.roles = token.roles as string[]
        session.user.level = token.level as number
      }
      return session
    },
  },
}

// Helper functions for role checking
export const isAdmin = (user: any) => {
  return user?.roles?.includes('admin') || user?.roles?.includes('super_admin')
}

export const isEmployee = (user: any) => {
  return user?.roles?.includes('employee')
}

export const isManager = (user: any) => {
  return user?.roles?.includes('manager')
}

export const hasBusinessAccess = (user: any) => {
  return isAdmin(user) || isEmployee(user) || isManager(user)
}

export const getHighestRole = (user: any) => {
  if (isAdmin(user)) return 'admin'
  if (isManager(user)) return 'manager'
  if (isEmployee(user)) return 'employee'
  return 'customer'
} 