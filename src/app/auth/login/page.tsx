"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn, TYPOGRAPHY, SPACING } from "@/lib/design-system"
import { Building2, Loader2, AlertCircle, Users, Shield, User } from "lucide-react"
import Link from "next/link"

type UserType = 'employee' | 'manager' | 'admin'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedUserType, setSelectedUserType] = useState<UserType>('employee')
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const userTypes = [
    {
      type: 'employee' as UserType,
      label: 'Employee',
      description: 'Sales & Customer Service',
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      activeColor: 'bg-blue-100 border-blue-400'
    },
    {
      type: 'manager' as UserType,
      label: 'Manager',
      description: 'Operations & Team Lead',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      activeColor: 'bg-purple-100 border-purple-400'
    },
    {
      type: 'admin' as UserType,
      label: 'Administrator',
      description: 'System & Business Admin',
      icon: Shield,
      color: 'text-gold-600',
      bgColor: 'bg-gold-50 border-gold-200',
      activeColor: 'bg-gold-100 border-gold-400'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        userType: selectedUserType,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password. Please check your credentials.")
      } else {
        // Get the session to determine redirect path based on role
        const session = await getSession()
        
        if (session?.user?.roles?.includes('admin') || selectedUserType === 'admin') {
          router.push('/admin')
        } else if (session?.user?.roles?.includes('manager') || selectedUserType === 'manager') {
          router.push('/admin') // Managers also go to admin dashboard
        } else if (session?.user?.roles?.includes('employee') || selectedUserType === 'employee') {
          router.push('/employee')
        } else {
          router.push('/')
        }
        
        router.refresh()
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-gold-600 to-transparent" />
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-600 to-gold-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-serif font-bold text-2xl">NB</span>
              </div>
            </div>
            
            <CardTitle className={cn(TYPOGRAPHY.heading, "text-3xl font-serif text-navy-900 mb-2")}>
              North Bay
            </CardTitle>
            <div className={cn(TYPOGRAPHY.body, "text-gold-600 font-medium mb-4")}>
              Kitchen & Bath
            </div>
            <p className={cn(TYPOGRAPHY.body, "text-gray-600")}>
              Staff Portal Access
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* User Type Selection */}
            <div className="space-y-4">
              <Label className={cn(TYPOGRAPHY.subheading, "text-base font-medium text-navy-900")}>
                Access Level
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {userTypes.map((userType) => {
                  const Icon = userType.icon
                  const isSelected = selectedUserType === userType.type
                  
                  return (
                    <button
                      key={userType.type}
                      type="button"
                      onClick={() => setSelectedUserType(userType.type)}
                      className={cn(
                        "p-4 border-2 rounded-lg text-left transition-all duration-300 hover:shadow-md",
                        isSelected ? userType.activeColor : userType.bgColor
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={cn("w-5 h-5", userType.color)} />
                        <div>
                          <div className={cn(TYPOGRAPHY.body, "font-medium text-navy-900")}>
                            {userType.label}
                          </div>
                          <div className={cn(TYPOGRAPHY.caption, "text-gray-600")}>
                            {userType.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className={cn(TYPOGRAPHY.body, "font-medium text-navy-900")}>
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  required
                  disabled={loading}
                  className="h-12 border-gray-200 focus:border-gold-600 focus:ring-gold-600/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className={cn(TYPOGRAPHY.body, "font-medium text-navy-900")}>
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="h-12 border-gray-200 focus:border-gold-600 focus:ring-gold-600/20"
                />
              </div>
              
              <Button 
                type="submit" 
                className={cn(
                  "w-full h-12 bg-gold-600 hover:bg-gold-700 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                  TYPOGRAPHY.button
                )}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            
            <div className="text-center space-y-4">
              <p className={cn(TYPOGRAPHY.caption, "text-gray-500")}>
                Staff access only. For customer inquiries, please{" "}
                <Link href="/contact" className="text-gold-600 hover:text-gold-700 hover:underline transition-colors duration-300">
                  contact us
                </Link>
              </p>
              
              <div className="pt-4 border-t border-gray-100">
                <Link 
                  href="/" 
                  className={cn(TYPOGRAPHY.body, "text-navy-600 hover:text-gold-600 transition-colors duration-300")}
                >
                  ← Back to Website
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 