'use client';

import React from 'react';
import { ArrowRight, MapPin, UserCheck, BellRing, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export function HowItWorks({ onOpenBooking }: HowItWorksProps) {
  const steps = [
    {
      number: '01',
      title: 'Book Your Queue',
      subtitle: 'Specify venue & time',
      description:
        'Select a supported counter, service center, or pickup venue in Bhimavaram. Submit your task requirements in under 60 seconds.',
      icon: MapPin,
      gradient: 'from-[#4169FF] to-[#45DFFF]',
      tag: 'Step 01 • Instant Dispatch'
    },
    {
      number: '02',
      title: 'Get Matched',
      subtitle: 'Verified local assistant',
      description:
        'A vetted nearby assistant claims your request, checks into the physical location, and holds your spot or token turn diligently.',
      icon: UserCheck,
      gradient: 'from-[#45DFFF] to-[#4169FF]',
      tag: 'Step 02 • Local Match'
    },
    {
      number: '03',
      title: 'Stay Updated',
      subtitle: 'Live turn alerts',
      description:
        'Follow progress on your dashboard. Receive an advance notification when your turn approaches, and step in right as you are called.',
      icon: BellRing,
      gradient: 'from-[#4169FF] to-[#7357FF]',
      tag: 'Step 03 • Zero Waiting'
    }
  ];

  return (
    <section id="how-it-works" className="py-28 relative overflow-hidden bg-white">
      {/* Atmospheric illumination */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#45DFFF]/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#7357FF]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECEBFF] text-[#4169FF] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>HOW SKIPQ WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0F1F] tracking-tight leading-[1.1]">
            Your Time.{' '}
            <span className="bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] bg-clip-text text-transparent">
              Back in Three Steps.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#0B0F1F]/60 leading-relaxed font-normal">
            Physical queues transformed into a frictionless on-demand service. No long waits on hard floors.
          </p>
        </div>

        {/* 3 Step Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.number}
                className="glass-card-editorial rounded-3xl p-8 sm:p-9 flex flex-col justify-between relative group text-left border border-black/[0.05]"
              >
                {/* Large Oversized Monospace Number */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-[#0B0F1F]/10 group-hover:text-[#4169FF]/20 transition-colors">
                    {st.number}
                  </span>

                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${st.gradient} text-white flex items-center justify-center shadow-[0_8px_20px_rgba(65,105,255,0.25)] group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4169FF] block mb-2">
                    {st.tag}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-[#0B0F1F] tracking-tight mb-1">
                    {st.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#0B0F1F]/40 mb-3">
                    {st.subtitle}
                  </p>

                  <p className="text-sm text-[#0B0F1F]/70 leading-relaxed font-normal">
                    {st.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-[#4169FF]">
                  <span>Pilot workflow verified</span>
                  <span className="w-2 h-2 rounded-full bg-[#4169FF]/40 group-hover:bg-[#4169FF] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Trigger */}
        <div className="mt-16 text-left">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#4169FF] hover:text-[#3256e0] transition-colors group"
          >
            <span>Ready to skip a line in Bhimavaram? Request now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
