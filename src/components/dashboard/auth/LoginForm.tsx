"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading';
import { AlertCircle, Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: 'Invalid credentials. Please check your email and password.' });
      } else {
        // Successful login - redirect to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
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
    
    setFormData(credentials[role]);
    setErrors({});
  };

  return (
    <Card variant="luxury" className="w-full max-w-md mx-auto shadow-luxury">
      <CardHeader className="text-center space-y-4">
        {/* Logo */}
        <div className="mx-auto h-12 w-12 bg-nb-gold-500 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-xl">N</div>
        </div>
        
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold text-nb-neutral-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-nb-neutral-600">
            Sign in to access your dashboard
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          )}

          {/* Email Field */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            leftIcon={<Mail className="h-4 w-4" />}
            variant="luxury"
            disabled={isLoading}
          />

          {/* Password Field */}
          <div className="space-y-2">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-nb-neutral-400 hover:text-nb-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              variant="luxury"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isLoading}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
          </Button>
        </form>

        {/* Demo Credentials */}
        <Card variant="gradient" padding="sm" className="mt-6">
          <div className="space-y-3">
            <p className="text-sm font-medium text-nb-neutral-700">
              Quick Demo Access:
            </p>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fillDemoCredentials('admin')}
                disabled={isLoading}
                className="justify-start text-xs"
              >
                <span className="font-medium">Admin:</span>
                <span className="ml-1 text-nb-neutral-600">Full access</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fillDemoCredentials('manager')}
                disabled={isLoading}
                className="justify-start text-xs"
              >
                <span className="font-medium">Manager:</span>
                <span className="ml-1 text-nb-neutral-600">Content & projects</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fillDemoCredentials('employee')}
                disabled={isLoading}
                className="justify-start text-xs"
              >
                <span className="font-medium">Employee:</span>
                <span className="ml-1 text-nb-neutral-600">View only</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Additional Links */}
        <div className="text-center space-y-2">
          <p className="text-xs text-nb-neutral-500">
            Having trouble? Contact your administrator
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm; 