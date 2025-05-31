'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '../../components/PageLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TODO: Implement actual login logic here
    try {
      // Placeholder login logic
      console.log('Login attempted with:', { email, password });
      router.push('/'); // Redirect to home page after login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <PageLayout
      title="Welcome Back!"
      emoji="👋"
      description="Login to access your personalized food preferences and recommendations."
    >
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl border-4 border-[#FFD93D] p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-[#4A4A4A] mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                  ✉️
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border-2 border-[#FFD93D] p-4 pl-12 text-lg text-[#4A4A4A] placeholder-[#B5B5B5] focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-[#4A4A4A] mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                  🔒
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-2 border-[#FFD93D] p-4 pl-12 text-lg text-[#4A4A4A] placeholder-[#B5B5B5] focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-[#FF6B6B] text-sm flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#FF6B6B] hover:bg-[#FFD93D] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>🚀</span>
              Login
            </button>

            <div className="text-center text-[#4A4A4A]">
              <p className="text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/signup')}
                  className="text-[#FF6B6B] hover:text-[#FFD93D] font-bold transition-colors duration-300"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
} 