'use client';

import React from 'react';
import Link from 'next/link';
import { SkipQLogo, SkipQLogoIcon } from '@/components/brand/SkipQLogo';
import { MapPin, Mail, Phone, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-[#0B0F1F] text-white pt-20 pb-12 overflow-hidden">
      {/* Huge subtle glowing 3D-style SkipQ logo watermark */}
      <div className="absolute -bottom-24 -right-24 opacity-[0.035] pointer-events-none transform scale-150 rotate-12">
        <SkipQLogoIcon size="xl" variant="white" />
      </div>

      {/* Atmospheric lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4169FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#7357FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          
          {/* Brand Info (Col 5) */}
          <div className="lg:col-span-5 text-left">
            <div className="mb-4">
              <SkipQLogo variant="white" size="lg" />
            </div>

            <p className="text-sm font-semibold text-[#45DFFF] mb-3">
              Skip the Queue. Save Your Time.
            </p>

            <p className="text-xs text-white/55 leading-relaxed max-w-sm mb-6 font-normal">
              SkipQ is an on-demand queue assistance startup helping people reclaim their mornings with verified local proxy line support.
            </p>

            <div className="flex items-center gap-2 text-xs text-white/80 bg-white/[0.05] border border-white/[0.08] rounded-full px-3.5 py-1.5 w-fit">
              <MapPin className="w-3.5 h-3.5 text-[#45DFFF]" />
              <span>Pilot Operations: Bhimavaram, Andhra Pradesh</span>
            </div>
          </div>

          {/* Platform Links (Col 2) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#45DFFF] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white transition-colors">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pilot Rates
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals (Col 2) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#45DFFF] mb-4">
              Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-white transition-colors">
                  Assistant Desk
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-white transition-colors">
                  Business Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Command Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (Col 3) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#45DFFF] mb-4">
              Pilot Coordination
            </h4>
            <div className="space-y-2.5 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#45DFFF]" />
                <span>support@skipq.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#45DFFF]" />
                <span>+91 8816 220011 (Bhimavaram Desk)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] mt-3 text-[11px] text-white/50">
                Pilot Desk: 8:30 AM – 7:00 PM IST (Mon – Sat)
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <p>© 2026 SkipQ Technologies. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Pilot Notice</span>
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Designed with</span>
            <Heart className="w-3 h-3 text-[#45DFFF] fill-current" />
            <span>in Bhimavaram</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
