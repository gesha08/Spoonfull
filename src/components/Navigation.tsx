'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/products', label: 'Products', icon: '🥫' },
  { href: '/allergies', label: 'Allergies', icon: '🚫' },
  { href: '/preferences', label: 'Preferences', icon: '😋' }
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Empty div for spacing */}
          <div className="w-[100px]" /> {/* Same width as login button container */}

          {/* Centered Navigation Items */}
          <div className="flex justify-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-4 font-bold transition-all duration-300 border-b-4 ${
                    isActive
                      ? 'text-[#FF6B6B] border-[#FF6B6B]'
                      : 'text-[#4A4A4A] border-transparent hover:text-[#FFD93D] hover:border-[#FFD93D]'
                  }`}
                >
                  <span className="text-2xl block text-center mb-1">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Login Button */}
          <div className="w-[100px]">
            <button 
              onClick={() => router.push('/login')} 
              className="px-4 py-2 bg-[#FF6B6B] hover:bg-[#FFD93D] text-white rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-bold"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5" 
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 