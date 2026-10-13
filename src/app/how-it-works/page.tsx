'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { BookingModal } from '@/components/booking/BookingModal';
import { ShieldCheck, Clock, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function HowItWorksPage() {
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
              <span>Frictionless Queue Delegation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0B0F1F] tracking-tight mb-6">
              How SkipQ Reclaims Your Time in Bhimavaram
            </h1>
            <p className="text-base sm:text-lg text-[#0B0F1F]/70 leading-relaxed">
              Skip waiting in grueling queues at billing counters, Aadhaar centers, medical halls, and supermarkets. Here is exactly how our verified assistant proxy system works.
            </p>
          </div>

          {/* Core Interactive Steps Section */}
          <HowItWorks onOpenBooking={() => setIsBookingOpen(true)} />

          {/* Deep Protocol Breakdown */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#4169FF]/10 text-[#4169FF] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B0F1F] mb-3">100% Verified Assistants</h3>
              <p className="text-sm text-[#0B0F1F]/70 leading-relaxed">
                Every assistant undergoes Aadhaar and local police verification, emergency contact checks, and customer service training before accepting bookings.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#45DFFF]/15 text-[#4169FF] flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B0F1F] mb-3">Live Token & ETA Tracking</h3>
              <p className="text-sm text-[#0B0F1F]/70 leading-relaxed">
                Get real-time token count updates, queue photos, and arrival notifications so you only reach the counter 5 minutes before your turn.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#7357FF]/10 text-[#7357FF] flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B0F1F] mb-3">Seamless Spot Handoff</h3>
              <p className="text-sm text-[#0B0F1F]/70 leading-relaxed">
                Meet your assistant directly at the counter or queue position. They verify your booking OTP and step aside as you complete your transaction.
              </p>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="mt-20 p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#4169FF] to-[#7357FF] text-white text-center relative overflow-hidden shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">Ready to save hours every week?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
              Book a verified assistant in Bhimavaram starting from just ₹49.
            </p>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-8 py-4 rounded-full text-sm font-bold text-[#0B0F1F] bg-white hover:bg-white/90 shadow-xl transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <span>Book Your First Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
