'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { PricingSection } from '@/components/sections/PricingSection';
import { BookingModal } from '@/components/booking/BookingModal';
import { Sparkles, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFF] text-[#0B0F1F]">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4169FF]/10 text-[#4169FF] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilot Rate Card</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0B0F1F] tracking-tight mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-base sm:text-lg text-[#0B0F1F]/70 leading-relaxed">
              No hidden fees, no surge markups. Pay modest per-queue proxy rates designed specifically for our Bhimavaram pilot community.
            </p>
          </div>

          <PricingSection onOpenBooking={() => setIsBookingOpen(true)} />

          {/* Pricing FAQ Table */}
          <div className="mt-20 max-w-4xl mx-auto p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
            <h3 className="text-xl font-bold text-[#0B0F1F] mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#4169FF]" />
              <span>Frequently Asked Pricing Questions</span>
            </h3>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-semibold text-[#0B0F1F] mb-1">What happens if the queue takes longer than 45 minutes?</h4>
                <p className="text-[#0B0F1F]/70 text-xs sm:text-sm">
                  Base fees cover standard wait windows up to 45 minutes. If a government counter or clinic queue exceeds this, extension time is billed at a modest ₹15 per additional 15 minutes with your in-app approval.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#0B0F1F] mb-1">When do I pay for my booking?</h4>
                <p className="text-[#0B0F1F]/70 text-xs sm:text-sm">
                  During our pilot phase, you can book instantly with zero advance payment. You settle the fee directly via UPI QR or cash once your assistant hands over your spot or delivers your parcel.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#0B0F1F] mb-1">Can I cancel my booking if my plans change?</h4>
                <p className="text-[#0B0F1F]/70 text-xs sm:text-sm">
                  Yes, cancellations are 100% free anytime before the assistant arrives at the venue. If cancelled after the assistant reaches the queue, a nominal ₹20 compensation fee is requested to respect the assistant&apos;s travel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
