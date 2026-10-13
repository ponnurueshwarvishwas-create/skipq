'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SkipQLogo } from '@/components/brand/SkipQLogo';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Live Demo', href: '/demo' },
    { name: 'Business', href: '/business' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-white/75 backdrop-blur-2xl border-b border-black/[0.04] shadow-[0_10px_35px_-10px_rgba(11,15,31,0.04)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Left: SkipQ Logo */}
          <div className="flex-shrink-0">
            <SkipQLogo size="md" href="/" />
          </div>

          {/* Center: Clean Minimal Links */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium text-[#0B0F1F]/70 hover:text-[#4169FF] transition-colors relative py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: Sign In & Primary Action */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/dashboard"
              className="text-[13px] font-medium text-[#0B0F1F]/75 hover:text-[#4169FF] transition-colors px-2 py-1.5"
            >
              Sign In
            </Link>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full text-[13px] font-semibold text-white bg-gradient-to-r from-[#4169FF] via-[#4870FF] to-[#7357FF] hover:from-[#3558e0] hover:to-[#6142f0] shadow-[0_8px_20px_rgba(65,105,255,0.28)] hover:shadow-[0_12px_28px_rgba(65,105,255,0.42)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[#4169FF]"
            >
              Skip
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#0B0F1F] hover:bg-black/5 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-3 pb-6 bg-white/95 backdrop-blur-2xl border-b border-black/[0.05] shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-[#0B0F1F]/80 hover:text-[#4169FF]"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px bg-black/[0.05] my-1" />

            <div className="flex items-center justify-between pt-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-gray-600 hover:text-[#4169FF]"
              >
                Dashboard
              </Link>
              <Link
                href="/assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-gray-600 hover:text-[#4169FF]"
              >
                Assistant Portal
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-gray-600 hover:text-[#7357FF]"
              >
                Admin
              </Link>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full mt-2 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#4169FF] to-[#7357FF] shadow-lg flex items-center justify-center gap-1.5"
            >
              <span>Skip a Queue Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
