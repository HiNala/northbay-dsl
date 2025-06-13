"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TopNavigation from './TopNavigation';
import Sidebar from './Sidebar';

interface DashboardShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const DashboardShell = ({ children, title, subtitle }: DashboardShellProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-luxury-gold-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-charcoal-900 font-bold text-xl">NB</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-gold-500 mx-auto"></div>
          <p className="text-sm text-stone-600 mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Navigation */}
      <TopNavigation 
        user={session.user}
        title={title}
        subtitle={subtitle}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          collapsed={sidebarCollapsed}
          isMobile={isMobile}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Main Content */}
        <main 
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
          } mt-16`}
        >
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default DashboardShell; 