'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { BookingModal } from '@/components/booking/BookingModal';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('cat-queue');

  const handleOpenBooking = (catId?: string) => {
    if (catId) setSelectedCategory(catId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFF] text-[#0B0F1F]">
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4169FF]/10 text-[#4169FF] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Service Coverage</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0B0F1F] tracking-tight mb-6">
              Tailored Queue Services for Bhimavaram
            </h1>
            <p className="text-base sm:text-lg text-[#0B0F1F]/70 leading-relaxed">
              From Somaram Temple darshan counters to Apollo pharmacy pickups, discover our specialized proxy queue and errand services.
            </p>
          </div>

          {/* Interactive Services Section */}
          <ServicesSection onSelectService={(catId) => handleOpenBooking(catId)} />

          {/* Guarantee Banner */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B0F1F] mb-1">Guaranteed Spot Holding</h4>
                  <p className="text-xs text-[#0B0F1F]/65">Your assistant stays in queue until you arrive. If token is missed due to assistant error, 100% refund.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B0F1F] mb-1">Verified OTP Handoff</h4>
                  <p className="text-xs text-[#0B0F1F]/65">Secure digital token exchange ensures only you take your turn at the counter.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B0F1F] mb-1">Fixed Transparent Rates</h4>
                  <p className="text-xs text-[#0B0F1F]/65">Zero hidden surge pricing. Pay only the advertised pilot fee plus nominal extension if wait exceeds 60 mins.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialCategoryId={selectedCategory}
      />
    </div>
  );
}
