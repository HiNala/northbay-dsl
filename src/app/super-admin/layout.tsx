"use client"

import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Home,
  Users,
  Database,
  Settings,
  Shield,
  Activity,
  BarChart3,
  Server,
  FileText,
  Globe,
  Bell,
  Menu,
  User,
  LogOut,
  Search,
  Crown,
  Lock,
  Zap,
  AlertTriangle,
  Key,
  Eye,
  Cpu,
  HardDrive
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Navigation items for the super admin sidebar
const navItems = [
  {
    title: "Dashboard",
    href: "/super-admin",
    icon: Home,
    badge: null,
  },
  {
    title: "System Management",
    href: "/super-admin/system",
    icon: Server,
    badge: "Critical",
  },
  {
    title: "User Administration",
    href: "/super-admin/users",
    icon: Users,
    badge: "5",
  },
  {
    title: "Database Control",
    href: "/super-admin/database",
    icon: Database,
    badge: null,
  },
  {
    title: "Security Center",
    href: "/super-admin/security",
    icon: Shield,
    badge: "2",
  },
  {
    title: "System Analytics",
    href: "/super-admin/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Activity Monitoring",
    href: "/super-admin/monitoring",
    icon: Activity,
    badge: "Live",
  },
  {
    title: "Site Configuration",
    href: "/super-admin/config",
    icon: Settings,
    badge: null,
  },
  {
    title: "API Management",
    href: "/super-admin/api",
    icon: Globe,
    badge: null,
  },
  {
    title: "System Logs",
    href: "/super-admin/logs",
    icon: FileText,
    badge: "999+",
  },
]

function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              {
                "bg-gradient-to-r from-charcoal-100 to-charcoal-200 text-charcoal-700 border-l-4 border-charcoal-600": isActive,
              }
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
            {item.badge && (
              <Badge 
                className={cn(
                  "ml-auto flex h-5 w-auto px-2 shrink-0 items-center justify-center rounded-full text-xs",
                  item.badge === "Critical" ? "bg-red-500 text-white" :
                  item.badge === "Live" ? "bg-green-500 text-white animate-pulse" :
                  "bg-charcoal-600 text-white"
                )}
              >
                {item.badge}
              </Badge>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

function UserMenu() {
  const { data: session } = useSession()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full border-2 border-charcoal-300">
          <Crown className="h-5 w-5 text-charcoal-600" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {session?.user?.name || 'Super Admin'}
          <div className="text-xs text-muted-foreground flex items-center">
            <Crown className="h-3 w-3 mr-1" />
            System Administrator
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Shield className="mr-2 h-4 w-4" />
          Security Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Key className="mr-2 h-4 w-4" />
          Access Keys
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          Audit Trail
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={() => signOut({ callbackUrl: '/' })}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function TopBar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-gradient-to-r from-charcoal-50 to-white backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="mt-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Crown className="h-5 w-5 mr-2 text-charcoal-600" />
              Super Admin Portal
            </h2>
            <p className="text-sm text-muted-foreground">System Administration</p>
          </div>
          <div className="mt-6 flex-1">
            <Navigation />
          </div>
        </SheetContent>
      </Sheet>
      
      <div className="w-full flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search system, users, logs..."
            className="w-full bg-background pl-8 pr-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-charcoal-500 md:w-[400px] lg:w-[600px]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* System status indicators */}
        <div className="hidden md:flex items-center gap-4 mr-4 text-sm">
          <div className="flex items-center gap-1">
            <Cpu className="h-4 w-4 text-blue-500" />
            <span className="font-medium">CPU: 45%</span>
          </div>
          <div className="flex items-center gap-1">
            <HardDrive className="h-4 w-4 text-green-500" />
            <span className="font-medium">Storage: 67%</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="h-4 w-4 text-purple-500" />
            <span className="font-medium">156 users</span>
          </div>
        </div>
        
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="sr-only">System alerts</span>
        </Button>
        <UserMenu />
      </div>
    </header>
  )
}

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* Logo/Header */}
          <div className="flex h-14 items-center border-b border-charcoal-700 px-4 lg:h-[60px] lg:px-6">
            <Link href="/super-admin" className="flex items-center gap-3 font-semibold">
              <div className="h-10 w-10 bg-gradient-to-br from-charcoal-600 to-charcoal-800 rounded-lg flex items-center justify-center border border-charcoal-500">
                <Crown className="h-6 w-6 text-luxury-gold-400" />
              </div>
              <div>
                <span className="text-xl">Super Admin</span>
                <div className="text-xs text-charcoal-400">System Control</div>
              </div>
            </Link>
          </div>
          
          {/* System status panel */}
          <div className="px-4 py-2">
            <div className="rounded-lg bg-charcoal-800 border border-charcoal-700 p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal-300">System Status</span>
                <Badge className="bg-green-600 text-white">
                  <div className="h-2 w-2 bg-green-400 rounded-full mr-1 animate-pulse" />
                  Online
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-charcoal-400">Uptime: 99.9%</span>
                  <span className="text-green-400 font-medium">Excellent</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-charcoal-400">Active Sessions: 156</span>
                  <span className="text-blue-400 font-medium">Normal</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-charcoal-400">Security Level:</span>
                  <span className="text-luxury-gold-400 font-medium">Maximum</span>
                </div>
              </div>
              <div className="pt-2 border-t border-charcoal-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-charcoal-400">Last Backup</span>
                  <span className="text-green-400">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 px-2 text-charcoal-300">
            <Navigation />
          </div>
          
          {/* Emergency Actions */}
          <div className="mt-auto p-4">
            <div className="rounded-lg bg-red-900/30 border border-red-700 p-3 space-y-3">
              <h4 className="text-sm font-medium text-red-400 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Controls
              </h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start h-8 border-red-700 text-red-400 hover:bg-red-900/50">
                  <Lock className="mr-2 h-3 w-3" />
                  Emergency Lock
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8 border-orange-700 text-orange-400 hover:bg-orange-900/50">
                  <Zap className="mr-2 h-3 w-3" />
                  System Restart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col">
        <TopBar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gradient-to-br from-stone-50 to-charcoal-50">
          {children}
        </main>
      </div>
    </div>
  )
} 