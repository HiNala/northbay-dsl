import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
  {
    variants: {
      variant: {
        default: "border-nb-neutral-200 bg-white text-nb-neutral-900",
        success: "border-green-200 bg-green-50 text-green-900",
        error: "border-red-200 bg-red-50 text-red-900", 
        warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
        info: "border-blue-200 bg-blue-50 text-blue-900",
        luxury: "border-nb-gold-200 bg-nb-gold-50 text-nb-neutral-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const ToastProvider = React.createContext<{
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
} | null>(null)

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'luxury'
  duration?: number
  action?: React.ReactNode
}

const ToastContext = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }
    
    setToasts((prev) => [...prev, newToast])
    
    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastProvider.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport />
    </ToastProvider.Provider>
  )
}

const useToast = () => {
  const context = React.useContext(ToastProvider)
  if (!context) {
    throw new Error('useToast must be used within a ToastContext')
  }
  return context
}

const ToastViewport = () => {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <ToastRoot key={toast.id} {...toast} />
      ))}
    </div>
  )
}

interface ToastRootProps extends Toast {}

const ToastRoot = ({ id, title, description, variant = "default", action }: ToastRootProps) => {
  const { removeToast } = useToast()

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />
      case 'luxury':
        return <CheckCircle className="h-5 w-5 text-nb-gold-600" />
      default:
        return null
    }
  }

  return (
    <div
      className={cn(toastVariants({ variant }))}
      data-state="open"
    >
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="grid gap-1">
          {title && (
            <div className="text-sm font-semibold">
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm opacity-90">
              {description}
            </div>
          )}
        </div>
      </div>
      
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
      
      <button
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        onClick={() => removeToast(id)}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// Convenient toast functions
const toast = {
  success: (message: string, options?: Partial<Toast>) => {
    const { addToast } = useToast()
    addToast({
      variant: 'success',
      title: 'Success',
      description: message,
      ...options,
    })
  },
  
  error: (message: string, options?: Partial<Toast>) => {
    const { addToast } = useToast()
    addToast({
      variant: 'error',
      title: 'Error',
      description: message,
      duration: 0, // Don't auto-dismiss errors
      ...options,
    })
  },
  
  warning: (message: string, options?: Partial<Toast>) => {
    const { addToast } = useToast()
    addToast({
      variant: 'warning',
      title: 'Warning',
      description: message,
      ...options,
    })
  },
  
  info: (message: string, options?: Partial<Toast>) => {
    const { addToast } = useToast()
    addToast({
      variant: 'info',
      title: 'Info',
      description: message,
      ...options,
    })
  },
  
  luxury: (message: string, options?: Partial<Toast>) => {
    const { addToast } = useToast()
    addToast({
      variant: 'luxury',
      title: 'Northbay',
      description: message,
      ...options,
    })
  },
}

// Hook to provide toast functions
const useToastActions = () => {
  const { addToast } = useToast()
  
  return {
    success: (message: string, options?: Partial<Toast>) =>
      addToast({
        variant: 'success',
        title: 'Success',
        description: message,
        ...options,
      }),
    
    error: (message: string, options?: Partial<Toast>) =>
      addToast({
        variant: 'error',
        title: 'Error',
        description: message,
        duration: 0,
        ...options,
      }),
    
    warning: (message: string, options?: Partial<Toast>) =>
      addToast({
        variant: 'warning',
        title: 'Warning',
        description: message,
        ...options,
      }),
    
    info: (message: string, options?: Partial<Toast>) =>
      addToast({
        variant: 'info',
        title: 'Info', 
        description: message,
        ...options,
      }),
    
    luxury: (message: string, options?: Partial<Toast>) =>
      addToast({
        variant: 'luxury',
        title: 'Northbay',
        description: message,
        ...options,
      }),
      
    custom: (toast: Omit<Toast, 'id'>) => addToast(toast),
  }
}

export {
  ToastContext,
  useToast,
  useToastActions,
  toast,
  ToastViewport,
  ToastRoot,
  toastVariants,
} 