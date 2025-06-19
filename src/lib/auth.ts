import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
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

        try {
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

          if (!user || !user.password) {
            return null
          }

          // Check if user has admin, employee, or manager role
          const hasBusinessRole = user.roles.some(userRole => 
            ['admin', 'employee', 'manager', 'super_admin'].includes(userRole.Role.name)
          )

          if (!hasBusinessRole) {
            return null
          }

          // Check password
          const isPasswordValid = await compare(credentials.password, user.password)
          
          if (!isPasswordValid) {
            return null
          }

          // Update last login tracking
          await prisma.user.update({
            where: { id: user.id },
            data: { 
              lastLoginAt: new Date(),
              loginCount: { increment: 1 }
            }
          })

          // Get user roles and level
          const roles = user.roles.map(ur => ur.Role.name)
          const level = Math.max(...user.roles.map(ur => ur.Role.level))

          // Return user with all required properties
          return {
            id: user.id,
            email: user.email || "",
            name: user.Profile?.fullName || user.email || "",
            roles,
            level,
            avatar: user.Profile?.avatarUrl || undefined,
            // Backward compatibility
            role: roles[0] || 'employee',
            roleLevel: level,
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles
        token.level = user.level
        token.avatar = user.avatar
        // Backward compatibility
        token.role = user.role
        token.roleLevel = user.roleLevel
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.roles = token.roles
        session.user.level = token.level
        session.user.avatar = token.avatar
        // Backward compatibility
        session.user.role = token.role
        session.user.roleLevel = token.roleLevel
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