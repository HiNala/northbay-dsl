"use client"

import { useState, useEffect } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, ChevronLeft, ChevronRight, Shield, Users, User, Building2, Mail, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type UserType = 'employee' | 'manager' | 'admin' | 'super_admin'

export default function ModernLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedUserType, setSelectedUserType] = useState<UserType>('employee')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  // Demo credentials for quick access
  const demoCredentials = {
    employee: { email: 'employee@nbkb.com', password: 'password123' },
    manager: { email: 'manager@nbkb.com', password: 'password123' },
    admin: { email: 'admin@nbkb.com', password: 'password123' },
    super_admin: { email: 'admin@nbkb.com', password: 'password123' } // Using admin for super_admin demo
  }

  // Featured project images for background carousel
  const backgroundImages = [
    {
      url: '/website_images/Kenwood Project/photos25.jpg',
      title: 'Kenwood Estate Kitchen',
      description: 'Luxury kitchen design with custom cabinetry'
    },
    {
      url: '/website_images/San Rafael Project- Modern Kitchen/Peacock09.jpg',
      title: 'San Rafael Modern Kitchen',
      description: 'Contemporary design with premium appliances'
    },
    {
      url: '/website_images/Petaluma - Bathroom Remodel/Petaluma Bath3.jpg',
      title: 'Petaluma Spa Bathroom',
      description: 'Elegant bathroom renovation'
    },
    {
      url: '/website_images/Kenwood Project/Primary Bath photos23.jpg',
      title: 'Kenwood Primary Bath',
      description: 'Luxury master bathroom suite'
    }
  ]

  const userTypes = [
    {
      type: 'employee' as UserType,
      label: 'Employee',
      description: 'Sales & Customer Service',
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-200 hover:border-blue-300'
    },
    {
      type: 'manager' as UserType,
      label: 'Manager',
      description: 'Operations & Team Lead',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      borderColor: 'border-purple-200 hover:border-purple-300'
    },
    {
      type: 'admin' as UserType,
      label: 'Administrator',
      description: 'Business Administration',
      icon: Shield,
      color: 'text-luxury-gold-600',
      bgColor: 'bg-luxury-gold-50 hover:bg-luxury-gold-100',
      borderColor: 'border-luxury-gold-200 hover:border-luxury-gold-300'
    },
    {
      type: 'super_admin' as UserType,
      label: 'Super Admin',
      description: 'System Administration',
      icon: Building2,
      color: 'text-charcoal-600',
      bgColor: 'bg-charcoal-50 hover:bg-charcoal-100',
      borderColor: 'border-charcoal-200 hover:border-charcoal-300'
    }
  ]

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password. Please check your credentials.")
      } else {
        // Get the session to determine redirect path based on role
        const session = await getSession()
        
        if (session?.user?.roles?.includes('super_admin')) {
          router.push('/super-admin')
        } else if (session?.user?.roles?.includes('admin')) {
          router.push('/admin')
        } else if (session?.user?.roles?.includes('manager')) {
          router.push('/manager')
        } else if (session?.user?.roles?.includes('employee')) {
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

  const fillDemoCredentials = (userType: UserType) => {
    setEmail(demoCredentials[userType].email)
    setPassword(demoCredentials[userType].password)
    setSelectedUserType(userType)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-16 py-8 lg:py-0"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <Link href="/" className="inline-flex items-center mb-4 lg:mb-6">
              <ChevronLeft className="h-4 w-4 mr-2 text-charcoal-500" />
              <span className="text-sm text-charcoal-600 hover:text-luxury-gold-600 transition-colors">
                Back to Website
              </span>
            </Link>
            
            <div className="flex items-center mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-luxury-gold-500 to-luxury-gold-600 rounded-xl flex items-center justify-center mr-3 lg:mr-4">
                <span className="text-white font-serif font-bold text-lg lg:text-xl">NB</span>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-light text-charcoal-900 font-serif">North Bay</h1>
                <p className="text-xs lg:text-sm text-luxury-gold-600 font-medium">Kitchen & Bath</p>
              </div>
            </div>
            
            <div className="mb-4 lg:mb-6">
              <h2 className="text-2xl lg:text-3xl font-light text-charcoal-900 mb-2">Welcome back</h2>
              <p className="text-sm lg:text-base text-charcoal-600">Sign in to access your workspace</p>
            </div>
          </div>

          {/* Quick Access Buttons */}
          <div className="mb-6 lg:mb-8">
            <p className="text-xs lg:text-sm text-charcoal-600 mb-3 lg:mb-4">Quick access for demo:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
              {userTypes.map((userType) => {
                const Icon = userType.icon
                return (
                  <button
                    key={userType.type}
                    onClick={() => fillDemoCredentials(userType.type)}
                    className={`p-2 lg:p-3 border-2 rounded-lg text-left transition-all duration-200 ${userType.bgColor} ${userType.borderColor}`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-4 h-4 ${userType.color}`} />
                      <div>
                        <div className="text-xs lg:text-sm font-medium text-charcoal-900">{userType.label}</div>
                        <div className="text-xs text-charcoal-500">{userType.description}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mb-4 lg:mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-charcoal-500">Or continue with email</span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 lg:p-4 rounded-lg bg-red-50 border border-red-200"
              >
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}
            
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-charcoal-700 mb-2">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={loading}
                  className="pl-10 h-10 lg:h-12 border-stone-300 focus:border-luxury-gold-500 focus:ring-luxury-gold-500/20"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-charcoal-700 mb-2">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="pl-10 pr-10 h-10 lg:h-12 border-stone-300 focus:border-luxury-gold-500 focus:ring-luxury-gold-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-stone-300 text-luxury-gold-600 focus:ring-luxury-gold-500" />
                <span className="ml-2 text-sm text-charcoal-600">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-luxury-gold-600 hover:text-luxury-gold-700">
                Forgot password?
              </Link>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-10 lg:h-12 bg-luxury-gold-600 hover:bg-luxury-gold-700 text-white font-medium transition-all duration-300 group"
              disabled={loading}
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </div>
      </motion.div>

      {/* Right Side - Project Showcase */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:flex flex-1 relative bg-gradient-to-br from-luxury-gold-50 via-luxury-gold-100 to-luxury-gold-200 overflow-hidden"
      >
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover"
                quality={90}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold-900/60 via-luxury-gold-800/40 to-charcoal-900/60" />
            </motion.div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h3 className="text-3xl font-light font-serif mb-4">
                {backgroundImages[currentImageIndex].title}
              </h3>
              <p className="text-lg text-white/90 mb-6">
                {backgroundImages[currentImageIndex].description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <span>• Premium Materials</span>
                <span>• Expert Craftsmanship</span>
                <span>• Luxury Design</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {backgroundImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={prevImage}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20 p-6">
          <div className="text-center text-white">
            <h4 className="font-medium mb-2">Latest Projects</h4>
            <p className="text-sm text-white/80">
              Explore our portfolio of luxury kitchen and bathroom transformations
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 