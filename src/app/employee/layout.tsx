"use client"

import React from 'react'
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
  MessageSquare,
  Calendar,
  Users,
  Package,
  ClipboardList,
  Menu,
  Bell,
  User,
  Settings,
  LogOut,
  Search,
  Plus,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Navigation items for the employee sidebar
const navItems = [
  {
    title: "Dashboard",
    href: "/employee",
    icon: Home,
    badge: null,
  },
  {
    title: "My Leads",
    href: "/employee/leads",
    icon: MessageSquare,
    badge: "5",
  },
  {
    title: "Appointments",
    href: "/employee/appointments",
    icon: Calendar,
    badge: "2",
  },
  {
    title: "Client Projects",
    href: "/employee/projects",
    icon: ClipboardList,
    badge: null,
  },
  {
    title: "Product Lookup",
    href: "/employee/products",
    icon: Package,
    badge: null,
  },
  {
    title: "Clients",
    href: "/employee/clients",
    icon: Users,
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
                "bg-muted text-primary": isActive,
              }
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
            {item.badge && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Sarah Chen</DropdownMenuLabel>
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
          <Calendar className="mr-2 h-4 w-4" />
          My Schedule
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function TopBar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
            <h2 className="text-lg font-semibold">Employee Portal</h2>
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
            placeholder="Search clients, leads, or products..."
            className="w-full bg-background pl-8 pr-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring md:w-[400px] lg:w-[600px]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Quick stats */}
        <div className="hidden md:flex items-center gap-4 mr-4 text-sm">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            <span className="font-medium">5</span>
            <span className="text-muted-foreground">new leads</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-green-500" />
            <span className="font-medium">2</span>
            <span className="text-muted-foreground">today</span>
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

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* Logo/Header */}
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/employee" className="flex items-center gap-2 font-semibold">
              <div className="h-6 w-6 bg-primary rounded-md flex items-center justify-center">
                <Home className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm">Employee Portal</span>
            </Link>
          </div>
          
          {/* Status indicators */}
          <div className="px-4 py-2">
            <div className="rounded-lg bg-background p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="default" className="h-5">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-1" />
                  Available
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Today's Goals</span>
                <span className="font-medium">3/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 px-2">
            <Navigation />
          </div>
          
          {/* Quick Actions */}
          <div className="mt-auto p-4">
            <div className="rounded-lg bg-primary/10 p-3 space-y-2">
              <h4 className="text-sm font-medium">Quick Actions</h4>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="w-full justify-start h-8">
                  <Plus className="mr-2 h-3 w-3" />
                  New Lead
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8">
                  <Calendar className="mr-2 h-3 w-3" />
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col">
        <TopBar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 