'use client';

import React from 'react';
import { Target, MapPin, HeartHandshake, Sparkles } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-28 relative overflow-hidden bg-[#F8FAFF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECEBFF] text-[#4169FF] text-[11px] font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              <span>EARLY-STAGE STARTUP STORY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0F1F] tracking-tight leading-[1.1] mb-6">
              Built Around One Simple Idea:{' '}
              <span className="bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] bg-clip-text text-transparent">
                Your Time Matters.
              </span>
            </h2>

            <div className="space-y-5 text-base text-[#0B0F1F]/70 leading-relaxed max-w-xl font-normal">
              <p>
                SkipQ began with a simple observation: people spend too much of their day waiting for everyday services — whether it is an electricity billing desk, a token queue at a hospital, a crowded ticket window, or an electronics service center.
              </p>
              <p>
                We want to make those experiences more convenient by connecting customers with reliable local assistance. Instead of wasting productive morning hours standing on hard floors, you can carry on with your work or spend time with family while a verified assistant holds your spot.
              </p>
              <p>
                As an early-stage venture, we are purposefully beginning our journey with a focused pilot in <strong>Bhimavaram, Andhra Pradesh</strong>. We believe in getting the real-world operational details right on the ground before scaling outward.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-black/[0.06]">
              <div className="p-4 rounded-2xl bg-white border border-black/[0.05] shadow-sm">
                <Target className="w-5 h-5 text-[#4169FF] mb-2" />
                <h4 className="text-xs font-bold text-[#0B0F1F]">Focused Scope</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">High-impact queues</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/[0.05] shadow-sm">
                <MapPin className="w-5 h-5 text-[#45DFFF] mb-2" />
                <h4 className="text-xs font-bold text-[#0B0F1F]">Pilot Region</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Bhimavaram, AP</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/[0.05] shadow-sm col-span-2 sm:col-span-1">
                <HeartHandshake className="w-5 h-5 text-[#7357FF] mb-2" />
                <h4 className="text-xs font-bold text-[#0B0F1F]">Local Trust</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Vetted assistants</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Card */}
          <div className="lg:col-span-5">
            <div className="glass-surface rounded-3xl p-8 sm:p-10 border border-black/[0.05] shadow-xl relative overflow-hidden">
              <div className="space-y-6 relative z-10 text-left">
                <div className="p-4 rounded-2xl bg-[#0B0F1F] text-white flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#45DFFF] animate-pulse" />
                    <div>
                      <p className="text-xs font-bold">Pilot Status: Active</p>
                      <p className="text-[10px] text-gray-400">West Godavari District</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#45DFFF]">Bhimavaram</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-black/[0.05] shadow-sm space-y-3">
                  <h4 className="text-sm font-bold text-[#0B0F1F]">Our Commitments</h4>
                  <ul className="space-y-2 text-xs text-[#0B0F1F]/70">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4169FF]" />
                      <span>Respect the customer&apos;s personal time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4169FF]" />
                      <span>Fair compensation for local queue assistants</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4169FF]" />
                      <span>Clear, honest status reporting at all stages</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#ECEBFF]/60 border border-[#4169FF]/15 text-xs text-[#0B0F1F]/70 italic">
                  &ldquo;We don&apos;t just hold spots in lines. We give people back the hours they need to live, work, and thrive.&rdquo;
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
