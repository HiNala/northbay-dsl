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
  Package2,
  Home,
  ShoppingCart,
  Package,
  Users,
  LineChart,
  Menu,
  Bell,
  User,
  Settings,
  LogOut,
  Palette,
  MessageSquare,
  FileText,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Navigation items for the admin sidebar
const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
    badge: null,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    badge: null,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    badge: "3",
  },
  {
    title: "Design Leads",
    href: "/admin/leads",
    icon: MessageSquare,
    badge: "12",
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: Palette,
    badge: null,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    badge: null,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: FileText,
    badge: null,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: LineChart,
    badge: null,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null,
  },
]

function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-4 mb-6">
            <Package2 className="h-6 w-6 text-amber-600" />
            <span className="text-lg font-semibold">North Bay Admin</span>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all hover:text-amber-600",
                  pathname === item.href
                    ? "bg-amber-100 text-amber-600"
                    : "text-gray-500 hover:text-amber-600"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <AdminSidebar />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-4 lg:h-[60px] lg:px-6">
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
              <AdminSidebar />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 