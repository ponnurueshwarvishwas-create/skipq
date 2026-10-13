'use client';

import React from 'react';
import { Clock, Smartphone, UserCheck, Shield, Layers, ThumbsUp, Sparkles } from 'lucide-react';

export function WhySkipQ() {
  const points = [
    {
      num: '01',
      title: 'Reclaim Daily Hours',
      desc: 'Physical queues take away anywhere from 30 to 90 minutes of valuable morning focus. SkipQ returns that productive time to you.',
      icon: Clock
    },
    {
      num: '02',
      title: 'Transparent Flat Rates',
      desc: 'Pay only for what you request with clear pilot rates starting at ₹49. No opaque surge multiples or hidden platform surcharges.',
      icon: Smartphone
    },
    {
      num: '03',
      title: 'Native Bhimavaram Assistants',
      desc: 'Our assistants are verified residents of Bhimavaram who know the exact counter procedures, token rules, and peak hours.',
      icon: UserCheck
    },
    {
      num: '04',
      title: 'Timely Advance Alerts',
      desc: 'Never wonder when your turn is. Receive a heads-up alert when spot #3 is reached so you walk right up with zero wait time.',
      icon: Shield
    },
    {
      num: '05',
      title: 'Flexible Everyday Services',
      desc: 'Whether it is municipal registrations, electricity bill counters, pharmacy pickups, or device warranty drop-offs.',
      icon: Layers
    },
    {
      num: '06',
      title: 'Apple-Grade Simplicity',
      desc: 'Designed with radical minimalism and zero clutter. A clean 60-second booking experience built for effortless everyday convenience.',
      icon: ThumbsUp
    }
  ];

  return (
    <section className="py-28 relative overflow-hidden bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECEBFF] text-[#4169FF] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>THE SKIPQ PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0F1F] tracking-tight leading-[1.1]">
            Make Time for{' '}
            <span className="bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] bg-clip-text text-transparent">
              What Matters.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#0B0F1F]/60 font-normal">
            Your time is your most finite asset. We designed SkipQ around one unwavering principle: nobody should lose hours standing still.
          </p>
        </div>

        {/* 6 High-Contrast Editorial Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="glass-card-editorial rounded-3xl p-8 sm:p-9 flex flex-col justify-between group border border-black/[0.05]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-[#0B0F1F]/15 group-hover:text-[#4169FF]/30 transition-colors">
                      {p.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#ECEBFF] text-[#4169FF] flex items-center justify-center group-hover:bg-[#4169FF] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-[#0B0F1F] mb-2 tracking-tight">
                    {p.title}
                  </h3>

                  <p className="text-sm text-[#0B0F1F]/65 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-black/[0.04] text-[11px] font-semibold text-[#4169FF]">
                  Verified pilot feature
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
