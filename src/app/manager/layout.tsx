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
  MessageSquare,
  TrendingUp,
  Calendar,
  FileText,
  DollarSign,
  BarChart3,
  Package,
  Settings,
  Menu,
  Bell,
  User,
  LogOut,
  Search,
  Target,
  Clock,
  Award
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Navigation items for the manager sidebar
const navItems = [
  {
    title: "Dashboard",
    href: "/manager",
    icon: Home,
    badge: null,
  },
  {
    title: "Team Management",
    href: "/manager/team",
    icon: Users,
    badge: "3",
  },
  {
    title: "Leads & Sales",
    href: "/manager/leads",
    icon: MessageSquare,
    badge: "15",
  },
  {
    title: "Performance",
    href: "/manager/performance",
    icon: TrendingUp,
    badge: null,
  },
  {
    title: "Schedule & Tasks",
    href: "/manager/schedule",
    icon: Calendar,
    badge: "5",
  },
  {
    title: "Reports",
    href: "/manager/reports",
    icon: FileText,
    badge: null,
  },
  {
    title: "Revenue",
    href: "/manager/revenue",
    icon: DollarSign,
    badge: null,
  },
  {
    title: "Product Oversight",
    href: "/manager/products",
    icon: Package,
    badge: null,
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
                "bg-luxury-gold-100 text-luxury-gold-700 border-l-4 border-luxury-gold-500": isActive,
              }
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
            {item.badge && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-luxury-gold-500">
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
        <Button variant="secondary" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {session?.user?.name || 'Manager'}
          <div className="text-xs text-muted-foreground">Business Operations</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Target className="mr-2 h-4 w-4" />
          Goals & KPIs
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
    <header className="flex h-14 items-center gap-4 border-b bg-white/50 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
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
            <h2 className="text-lg font-semibold">Manager Portal</h2>
            <p className="text-sm text-muted-foreground">North Bay Kitchen & Bath</p>
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
            placeholder="Search teams, leads, reports..."
            className="w-full bg-background pl-8 pr-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-luxury-gold-500 md:w-[400px] lg:w-[600px]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Quick stats for managers */}
        <div className="hidden md:flex items-center gap-4 mr-4 text-sm">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            <span className="font-medium">15</span>
            <span className="text-muted-foreground">active leads</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-green-500" />
            <span className="font-medium">8</span>
            <span className="text-muted-foreground">team members</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-luxury-gold-500" />
            <span className="font-medium">$125K</span>
            <span className="text-muted-foreground">this month</span>
          </div>
        </div>
        
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <UserMenu />
      </div>
    </header>
  )
}

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-gradient-to-b from-luxury-gold-50 to-white md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* Logo/Header */}
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/manager" className="flex items-center gap-2 font-semibold">
              <div className="h-8 w-8 bg-luxury-gold-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg">Manager Portal</span>
                <div className="text-xs text-muted-foreground">Business Operations</div>
              </div>
            </Link>
          </div>
          
          {/* Performance indicators */}
          <div className="px-4 py-2">
            <div className="rounded-lg bg-white border p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly Goal</span>
                <Badge variant="default" className="bg-green-500">
                  On Track
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Revenue: $125K / $150K</span>
                  <span className="font-medium">83%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-luxury-gold-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Team Performance</span>
                <div className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-luxury-gold-500" />
                  <span className="font-medium">Excellent</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 px-2">
            <Navigation />
          </div>
          
          {/* Quick Actions */}
          <div className="mt-auto p-4">
            <div className="rounded-lg bg-luxury-gold-50 border border-luxury-gold-200 p-3 space-y-3">
              <h4 className="text-sm font-medium text-luxury-gold-700">Manager Tools</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start h-8 border-luxury-gold-200">
                  <Users className="mr-2 h-3 w-3" />
                  Team Meeting
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8 border-luxury-gold-200">
                  <FileText className="mr-2 h-3 w-3" />
                  Daily Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8 border-luxury-gold-200">
                  <Clock className="mr-2 h-3 w-3" />
                  Schedule Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col">
        <TopBar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gradient-to-br from-warm-white-50 to-stone-50">
          {children}
        </main>
      </div>
    </div>
  )
} 