'use client';

import React from 'react';
import { Check, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onOpenBooking: () => void;
}

export function PricingSection({ onOpenBooking }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-28 relative overflow-hidden bg-white">
      {/* Subtle atmospheric glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#4169FF]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECEBFF] text-[#4169FF] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>TRANSPARENT PILOT RATES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0F1F] tracking-tight leading-[1.1]">
            Simple Pricing.{' '}
            <span className="bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] bg-clip-text text-transparent">
              More Freedom.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#0B0F1F]/60 font-normal">
            SkipQ follows a transparent, pay-per-task model during our Bhimavaram pilot. No subscriptions required for individual users.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl">
          
          {/* Card 1: Free Platform Access */}
          <div className="glass-card-editorial rounded-3xl p-8 sm:p-9 flex flex-col justify-between border border-black/[0.06]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#0B0F1F]">Free Access</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/5 text-[#0B0F1F]/60">
                  Starter
                </span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-black text-[#0B0F1F]">₹0</span>
                  <span className="text-xs text-[#0B0F1F]/50 ml-1.5 font-medium">/ lifetime</span>
                </div>
                <p className="text-xs text-[#0B0F1F]/60 mt-2 font-normal">
                  Explore and access the SkipQ platform without any subscription fee.
                </p>
              </div>

              <div className="space-y-3.5 pt-6 border-t border-black/[0.05] text-xs text-[#0B0F1F]/70 font-medium">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Browse active Bhimavaram service venues</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Submit standard queue requests</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Track live request lifecycle in dashboard</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-10 w-full py-3 rounded-full text-xs font-bold text-[#0B0F1F] bg-black/5 hover:bg-black/10 transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Card 2: Premium Service (Highlighted with glowing blue-violet border) */}
          <div className="relative glass-surface rounded-3xl p-8 sm:p-10 flex flex-col justify-between border-2 border-[#4169FF] shadow-[0_20px_50px_rgba(65,105,255,0.18)] bg-gradient-to-b from-white via-white to-[#F8FAFF] transform lg:-translate-y-2">
            {/* Glowing Pill Tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
              PILOT STANDARD
            </div>

            <div>
              <div className="flex justify-between items-center mb-6 mt-1">
                <h3 className="text-xl font-bold text-[#0B0F1F]">On-Demand Task</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ECEBFF] text-[#4169FF]">
                  Pay Per Task
                </span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-xs text-[#0B0F1F]/50 mr-1.5 font-medium">from</span>
                  <span className="text-4xl sm:text-5xl font-black text-[#4169FF]">₹49</span>
                  <span className="text-xs text-[#0B0F1F]/50 ml-1.5 font-medium">/ verified task</span>
                </div>
                <p className="text-xs text-[#0B0F1F]/60 mt-2 font-normal">
                  Pay only when your queue spot is secured and handed over.
                </p>
              </div>

              <div className="space-y-3.5 pt-6 border-t border-black/[0.05] text-xs text-[#0B0F1F]/80 font-medium">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#4169FF] flex-shrink-0 mt-0.5" />
                  <span>Verified assistant matched in Bhimavaram</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#4169FF] flex-shrink-0 mt-0.5" />
                  <span>Real-time spot tracking & advance turn alert</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#4169FF] flex-shrink-0 mt-0.5" />
                  <span>Direct communication with assigned assistant</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#4169FF] flex-shrink-0 mt-0.5" />
                  <span>Zero cancellation fee prior to check-in</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-10 w-full py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#4169FF] via-[#4870FF] to-[#7357FF] hover:from-[#3558e0] hover:to-[#6142f0] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Skip a Queue Now (₹49)
            </button>
          </div>

          {/* Card 3: Business Plan */}
          <div className="glass-card-editorial rounded-3xl p-8 sm:p-9 flex flex-col justify-between border border-black/[0.06]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#0B0F1F]">Merchant / Retail</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-100 text-[#7357FF]">
                  Proposed Pilot
                </span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-black text-[#0B0F1F]">₹999</span>
                  <span className="text-xs text-[#0B0F1F]/50 ml-1.5 font-medium">/ month</span>
                </div>
                <p className="text-xs text-[#0B0F1F]/60 mt-2 font-normal">
                  Proposed pilot pricing for retail stores and service centers.
                </p>
              </div>

              <div className="space-y-3.5 pt-6 border-t border-black/[0.05] text-xs text-[#0B0F1F]/70 font-medium">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#7357FF] flex-shrink-0 mt-0.5" />
                  <span>Store pickup coordination tools</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#7357FF] flex-shrink-0 mt-0.5" />
                  <span>Customer pickup token management</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#7357FF] flex-shrink-0 mt-0.5" />
                  <span>Store crowd analytics & peak hour tracking</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-10 w-full py-3 rounded-full text-xs font-bold text-[#0B0F1F] bg-black/5 hover:bg-black/10 transition-colors"
            >
              Register Merchant Interest
            </button>
          </div>

        </div>

        {/* Startup Transparency Disclaimer */}
        <div className="mt-14 max-w-2xl p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
          <p>
            <strong>Pilot Phase Transparency Notice:</strong> SkipQ is currently in early-stage pilot validation in Bhimavaram, Andhra Pradesh. Rates and assistant coverage times apply to initial test sectors and may evolve as platform capacity expands.
          </p>
        </div>

      </div>
    </section>
  );
}
