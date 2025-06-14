'use client';

import { SessionProvider } from 'next-auth/react';
import { ToastContext } from '@/components/ui/toast';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ToastContext>
        {children}
      </ToastContext>
    </SessionProvider>
  );
} 