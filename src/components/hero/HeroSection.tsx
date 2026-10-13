'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Hero3DFallback } from './Hero3DFallback';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

const Hero3DCanvas = dynamic(
  () => import('./Hero3DCanvas').then((mod) => mod.Hero3DCanvas),
  {
    ssr: false,
    loading: () => <Hero3DFallback />
  }
);

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 lg:pt-0 bg-[#F8FAFF]">
      {/* Soft atmospheric background illumination */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[750px] h-[750px] hero-glow-backlight pointer-events-none blur-3xl opacity-80" />
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-ambient-glow pointer-events-none blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column (43% on Desktop) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-20">
            
            {/* Minimalist Micro-Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/[0.06] shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4169FF] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0B0F1F]/70">
                ON-DEMAND QUEUE ASSISTANCE
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-black text-[#0B0F1F] tracking-tight leading-[1.05] mb-6">
              Skip the Queue. <br />
              <span className="bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] bg-clip-text text-transparent inline-block">
                Keep Your Time.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#0B0F1F]/70 leading-relaxed max-w-md mb-8 font-normal">
              Less waiting. More living. Get convenient queue assistance and spend your time where it matters.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#4169FF] via-[#4870FF] to-[#7357FF] hover:from-[#3558e0] hover:to-[#6142f0] shadow-[0_12px_28px_rgba(65,105,255,0.32)] hover:shadow-[0_16px_36px_rgba(65,105,255,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                <span>Skip a Queue</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-7 py-4 rounded-full text-sm font-semibold text-[#0B0F1F]/80 hover:text-[#4169FF] bg-white/70 hover:bg-white border border-black/[0.06] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <span>Explore SkipQ</span>
              </a>
            </div>

            {/* Pilot City Sub-indicator */}
            <div className="mt-10 pt-6 border-t border-black/[0.06] flex items-center gap-2 text-xs text-[#0B0F1F]/50 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#45DFFF]" />
              <span>Initial pilot deployment active in <strong>Bhimavaram, Andhra Pradesh</strong></span>
            </div>

          </div>

          {/* Right Column: Monumental 3D Artwork (57% on Desktop) */}
          <div className="lg:col-span-7 w-full h-full flex items-center justify-center relative min-h-[540px] lg:min-h-[740px]">
            <Hero3DCanvas />
          </div>

        </div>
      </div>
    </section>
  );
}
