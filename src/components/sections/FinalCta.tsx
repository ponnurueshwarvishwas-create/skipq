'use client';

import React from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

interface FinalCtaProps {
  onOpenBooking: () => void;
}

export function FinalCta({ onOpenBooking }: FinalCtaProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-[#F8FAFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Glowing High-Impact Glass Bento Box */}
        <div className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden border border-[#4169FF]/20 bg-gradient-to-br from-white via-white to-[#ECEBFF]/60 shadow-[0_30px_70px_-20px_rgba(65,105,255,0.18)]">
          
          {/* Internal atmospheric glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-br from-[#4169FF]/15 to-[#45DFFF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#7357FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECEBFF] text-[#4169FF] text-[11px] font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" />
              <span>START SAVING TIME TODAY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0F1F] tracking-tight leading-[1.08] mb-6">
              Skip the Queue. <br />
              <span className="bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] bg-clip-text text-transparent">
                Keep Your Time.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#0B0F1F]/65 leading-relaxed mb-10 max-w-lg mx-auto font-normal">
              Book a verified assistant in Bhimavaram in under 60 seconds. Flat pilot pricing from ₹49 per task.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#4169FF] via-[#4870FF] to-[#7357FF] hover:from-[#3558e0] hover:to-[#6142f0] shadow-[0_12px_28px_rgba(65,105,255,0.32)] hover:shadow-[0_16px_36px_rgba(65,105,255,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>Skip a Queue Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-4 rounded-full text-sm font-semibold text-[#0B0F1F]/80 hover:text-[#4169FF] bg-white border border-black/[0.06] shadow-sm hover:shadow transition-all flex items-center justify-center"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#0B0F1F]/50">
              <MapPin className="w-3.5 h-3.5 text-[#4169FF]" />
              <span>Serving key civic and retail hubs across Bhimavaram</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
