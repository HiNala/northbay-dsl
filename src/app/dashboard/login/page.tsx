import { Metadata } from 'next';
import LoginForm from '@/components/dashboard/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Dashboard Login | Northbay Kitchen & Bath',
  description: 'Access your internal dashboard workspace',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-900 to-charcoal-800 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-luxury-gold-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-charcoal-900 font-bold text-xl">NB</span>
          </div>
          <h1 className="text-2xl font-semibold text-charcoal-900 mb-2">Design Studio Portal</h1>
          <p className="text-sm text-stone-600">Access your workspace</p>
        </div>
        
        <LoginForm />
        
        {/* Additional Options */}
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-luxury-gold-600 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
} 