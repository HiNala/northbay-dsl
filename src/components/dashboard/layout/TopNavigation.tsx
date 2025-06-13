"use client";

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface TopNavigationProps {
  user: any;
  title?: string;
  subtitle?: string;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const TopNavigation = ({ 
  user, 
  title, 
  subtitle, 
  onToggleSidebar, 
  sidebarCollapsed 
}: TopNavigationProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/dashboard/login' });
  };

  return (
    <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
      {/* Left: Logo + Current Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <svg className="w-5 h-5 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-luxury-gold-500 rounded-lg flex items-center justify-center">
            <span className="text-charcoal-900 font-bold text-sm">NB</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-charcoal-900 font-semibold text-lg">Northbay</div>
          </div>
        </Link>

        {/* Current Section */}
        {title && (
          <div className="border-l border-stone-300 pl-4 hidden md:block">
            <h1 className="text-lg font-semibold text-charcoal-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-stone-600">{subtitle}</p>
            )}
          </div>
        )}
      </div>
      
      {/* Right: Search + Notifications + User */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <input 
            type="search" 
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-8 pl-8 pr-4 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-luxury-gold-500 focus:border-transparent transition-all duration-200"
          />
          <svg className="absolute left-2 top-2 h-4 w-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <svg className="h-5 w-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5L15 17zM9 17H4l3.5-3.5L9 17zm6-10a3 3 0 11-6 0v1.5a2.5 2.5 0 005 0V7z" />
            </svg>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-stone-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-stone-100">
                <h3 className="text-sm font-semibold text-charcoal-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-stone-50 cursor-pointer">
                  <p className="text-sm text-charcoal-900">New product inquiry received</p>
                  <p className="text-xs text-stone-500 mt-1">2 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-stone-50 cursor-pointer">
                  <p className="text-sm text-charcoal-900">Project status updated</p>
                  <p className="text-xs text-stone-500 mt-1">1 hour ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-stone-50 cursor-pointer">
                  <p className="text-sm text-charcoal-900">New customer lead assigned</p>
                  <p className="text-xs text-stone-500 mt-1">3 hours ago</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-stone-100">
                <button className="text-sm text-luxury-gold-600 hover:text-luxury-gold-700">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <div className="w-8 h-8 bg-luxury-gold-100 rounded-full flex items-center justify-center">
              <span className="text-luxury-gold-700 font-medium text-sm">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-charcoal-900">
                {user?.name || 'User'}
              </div>
              <div className="text-xs text-stone-600">
                {user?.role || 'Employee'}
              </div>
            </div>
            <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-stone-100">
                <p className="text-sm font-medium text-charcoal-900">{user?.name}</p>
                <p className="text-xs text-stone-600">{user?.email}</p>
              </div>
              
              <Link
                href="/dashboard/profile"
                className="block px-4 py-2 text-sm text-charcoal-700 hover:bg-stone-50 transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                Profile Settings
              </Link>
              
              <Link
                href="/dashboard/preferences"
                className="block px-4 py-2 text-sm text-charcoal-700 hover:bg-stone-50 transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                Preferences
              </Link>
              
              <div className="border-t border-stone-100 mt-2 pt-2">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavigation; 