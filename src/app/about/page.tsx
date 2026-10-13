'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { AboutSection } from '@/components/sections/AboutSection';
import { BookingModal } from '@/components/booking/BookingModal';
import { Sparkles, Heart, Users, MapPin } from 'lucide-react';

export default function AboutPage() {
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
              <span>Our Bhimavaram Pilot</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0B0F1F] tracking-tight mb-6">
              About SkipQ: Reclaiming Everyday Time
            </h1>
            <p className="text-base sm:text-lg text-[#0B0F1F]/70 leading-relaxed">
              We started with a simple observation: millions of hours are lost every day standing in lines that could easily be delegated to verified local community assistants.
            </p>
          </div>

          <AboutSection />

          {/* Core Values */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4169FF] flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Empathy & Respect</h3>
              <p className="text-xs sm:text-sm text-[#0B0F1F]/65 leading-relaxed">
                We believe nobody should have to spend their Saturday morning standing in an Aadhaar office or hospital billing line while caring for family or work.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7357FF] flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Empowering Local Youth</h3>
              <p className="text-xs sm:text-sm text-[#0B0F1F]/65 leading-relaxed">
                SkipQ creates flexible, dignified micro-earning opportunities for college students and local youth across Bhimavaram neighborhoods.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#45DFFF] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-[#4169FF]" />
              </div>
              <h3 className="font-bold text-lg mb-2">Grassroots Focus</h3>
              <p className="text-xs sm:text-sm text-[#0B0F1F]/65 leading-relaxed">
                By focusing deeply on Bhimavaram first, we master the real-world operational logistics of Tier-2 town queues before expanding regionally.
              </p>
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
