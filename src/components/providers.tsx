"use client"

import { SessionProvider } from "next-auth/react"
import { ToastContext } from "@/components/ui/toast"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastContext>
        {children}
      </ToastContext>
    </SessionProvider>
  )
} 