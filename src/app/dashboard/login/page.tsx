"use client";

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToastActions } from '@/components/ui/toast';
import { Eye, EyeOff, LogIn, Shield, Users, BarChart } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const router = useRouter();
  const { error: showError, success: showSuccess } = useToastActions();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const session = await getSession();
      if (session?.user) {
        setIsRedirecting(true);
        router.push('/dashboard');
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        showError('Invalid credentials. Please try again.');
      } else if (result?.ok) {
        showSuccess('Welcome to the dashboard!');
        router.push('/dashboard');
      }
    } catch (error) {
      showError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role: 'admin' | 'manager' | 'employee') => {
    const credentials = {
      admin: { email: 'admin@northbay.com', password: 'demo123' },
      manager: { email: 'manager@northbay.com', password: 'demo123' },
      employee: { email: 'employee@northbay.com', password: 'demo123' },
    };

    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nb-gold-50 to-nb-neutral-100">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin h-8 w-8 border-3 border-nb-gold-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-nb-neutral-600">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nb-gold-50 to-nb-neutral-100 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-nb-gold-500 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-nb-neutral-900 mb-2">
            NorthBay Dashboard
          </h1>
          <p className="text-nb-neutral-600">
            Sign in to access your business management system
          </p>
        </div>

        {/* Login Form */}
        <Card variant="luxury" className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-nb-neutral-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  variant="luxury"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-nb-neutral-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    variant="luxury"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-nb-neutral-400 hover:text-nb-neutral-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                leftIcon={<LogIn className="h-4 w-4" />}
              >
                Sign In
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="border-t border-nb-neutral-200 pt-6">
              <p className="text-sm text-nb-neutral-600 text-center mb-4">
                Demo Accounts (Password: demo123)
              </p>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => fillDemoCredentials('admin')}
                  disabled={isLoading}
                  leftIcon={<Shield className="h-4 w-4" />}
                >
                  <div className="text-left">
                    <div className="font-medium">Admin Account</div>
                    <div className="text-xs text-nb-neutral-500">Full system access</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => fillDemoCredentials('manager')}
                  disabled={isLoading}
                  leftIcon={<BarChart className="h-4 w-4" />}
                >
                  <div className="text-left">
                    <div className="font-medium">Manager Account</div>
                    <div className="text-xs text-nb-neutral-500">Business operations access</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => fillDemoCredentials('employee')}
                  disabled={isLoading}
                  leftIcon={<Users className="h-4 w-4" />}
                >
                  <div className="text-left">
                    <div className="font-medium">Employee Account</div>
                    <div className="text-xs text-nb-neutral-500">View-only access</div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-nb-neutral-500">
          <p>© 2024 NorthBay DSL. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 