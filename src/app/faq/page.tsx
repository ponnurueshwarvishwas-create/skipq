'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { FaqSection } from '@/components/sections/FaqSection';
import { BookingModal } from '@/components/booking/BookingModal';
import { Sparkles, MessageCircleQuestion } from 'lucide-react';

export default function FaqPage() {
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
              <span>Questions & Answers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0B0F1F] tracking-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-[#0B0F1F]/70 leading-relaxed">
              Everything you need to know about how SkipQ works, proxy etiquette, security guarantees, and assistant safety in Bhimavaram.
            </p>
          </div>

          <FaqSection />

          {/* Need help banner */}
          <div className="mt-16 text-center p-10 rounded-3xl bg-white border border-black/[0.06] shadow-sm max-w-2xl mx-auto">
            <MessageCircleQuestion className="w-10 h-10 text-[#4169FF] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#0B0F1F] mb-2">Have a question not listed here?</h3>
            <p className="text-xs sm:text-sm text-[#0B0F1F]/65 mb-6">
              Our pilot dispatch team in Bhimavaram is available 8:30 AM – 7:00 PM IST daily to help you coordinate your queue request.
            </p>
            <a
              href="mailto:support@skipq.in"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-[#4169FF] hover:bg-[#3558e0] shadow-md transition-all"
            >
              Contact Pilot Desk
            </a>
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
