'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { InteractiveDemo } from '@/components/sections/InteractiveDemo';
import { WhySkipQ } from '@/components/sections/WhySkipQ';
import { PricingSection } from '@/components/sections/PricingSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/navigation/Footer';
import { BookingModal } from '@/components/booking/BookingModal';

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('cat-queue');

  const handleOpenBooking = (categoryId?: string) => {
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFF] text-[#0B0F1F] selection:bg-[#4169FF] selection:text-white">
      {/* Refined Minimalist Floating Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-grow">
        {/* Monumental 3D Hero Section */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* 3-Step Editorial How SkipQ Works */}
        <HowItWorks onOpenBooking={() => handleOpenBooking()} />

        {/* Asymmetric Core Services Grid */}
        <ServicesSection
          onSelectService={(catId) => handleOpenBooking(catId)}
        />

        {/* Interactive Live Queue Simulator */}
        <InteractiveDemo onOpenBooking={() => handleOpenBooking()} />

        {/* Why SkipQ (Editorial Advantage Blocks) */}
        <WhySkipQ />

        {/* Transparent Pilot Pricing */}
        <PricingSection onOpenBooking={() => handleOpenBooking()} />

        {/* About SkipQ (Bhimavaram Pilot Story) */}
        <AboutSection />

        {/* Clean Accordion FAQ */}
        <FaqSection />

        {/* High-Impact Final CTA */}
        <FinalCta onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Atmospheric Footer */}
      <Footer />

      {/* 6-Step Interactive Booking Wizard */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialCategoryId={selectedCategoryId}
      />
    </div>
  );
}
