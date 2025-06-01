'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/products', label: 'Products', icon: '🥫' },
  { href: '/allergies', label: 'Allergies', icon: '🚫' },
  { href: '/preferences', label: 'Preferences', icon: '😋' }
];

export default function Navigation() {
  const pathname = usePathname();

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

          {/* Login Button Container */}
          <div className="w-[100px] flex justify-end">
            <Link
              href="/login"
              className="text-[#4A4A4A] hover:text-[#FF6B6B] transition-colors duration-300"
            >
              <span className="text-2xl">👤</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 