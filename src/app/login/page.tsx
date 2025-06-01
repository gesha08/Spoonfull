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
      <div className="bg-white rounded-2xl border-4 border-[#FFD93D] p-8 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-[#4A4A4A] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-[#FFD93D] p-4 text-lg text-[#4A4A4A] placeholder-[#B5B5B5] focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-[#4A4A4A] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-2 border-[#FFD93D] p-4 text-lg text-[#4A4A4A] placeholder-[#B5B5B5] focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#FF6B6B] hover:bg-[#FFD93D] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </PageLayout>
  );
} 