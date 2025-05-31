import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  emoji?: string;
  description?: string;
}

export default function PageLayout({ children, title, emoji = '🥄', description }: PageLayoutProps) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#FFE5E5] py-12 px-4 relative overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 bg-yellow-300 rounded-full -top-20 -left-20 blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute w-64 h-64 bg-pink-300 rounded-full top-1/2 left-1/2 blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute w-64 h-64 bg-blue-300 rounded-full -bottom-20 -right-20 blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-[#FF6B6B] mb-6 transform hover:scale-105 transition-transform duration-300">
            {title}
            <span className="inline-block animate-bounce ml-2">{emoji}</span>
          </h1>
          {description && (
            <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-12">
          {children}
        </div>
      </div>
    </div>
  );
} 