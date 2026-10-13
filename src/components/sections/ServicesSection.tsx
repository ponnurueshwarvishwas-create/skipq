'use client';

import React from 'react';
import { Users, ShoppingBag, Wrench, Clock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (categoryId: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-28 relative overflow-hidden bg-[#F8FAFF]">
      {/* Background illumination */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-ambient-glow pointer-events-none blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECEBFF] text-[#4169FF] text-[11px] font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              <span>CORE ON-DEMAND SERVICES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0F1F] tracking-tight leading-[1.1]">
              Less Waiting.{' '}
              <span className="bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] bg-clip-text text-transparent">
                More Living.
              </span>
            </h2>

            <p className="mt-4 text-base text-[#0B0F1F]/60 max-w-xl font-normal">
              Purpose-built queue management and local task assistance for high-footfall venues and busy service desks.
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs font-semibold text-[#0B0F1F]/40 uppercase tracking-widest block">
              Pilot Rates Starting At
            </span>
            <span className="text-3xl font-black text-[#4169FF]">From ₹49</span>
          </div>
        </div>

        {/* Asymmetric Bento Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          
          {/* Main Showcase Service: Queue Assistance (Span 7) */}
          <div className="lg:col-span-7 glass-surface rounded-3xl p-8 sm:p-11 flex flex-col justify-between text-left relative overflow-hidden group">
            {/* Ambient Radial Corner Glow */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br from-[#4169FF]/20 to-[#45DFFF]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#4169FF] to-[#45DFFF] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(65,105,255,0.3)] group-hover:scale-105 transition-transform">
                  <Users className="w-7 h-7" />
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-[#ECEBFF] text-[#4169FF] text-xs font-bold">
                  Flagship Service • ₹49
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#0B0F1F] tracking-tight mb-3">
                Queue Assistance
              </h3>

              <p className="text-[#0B0F1F]/70 text-base leading-relaxed mb-8 max-w-xl font-normal">
                Get dedicated physical line proxy support for high-demand municipal offices,
                electricity billing hubs, hospital token halls, and railway ticket reservation counters.
                Your assistant holds your spot until you arrive for seamless turn handover.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10 text-xs font-semibold text-[#0B0F1F]/80">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4169FF]" />
                  <span>Real-time spot verification</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4169FF]" />
                  <span>Advance notification at turn #3</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4169FF]" />
                  <span>Average 35+ mins reclaimed</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4169FF]" />
                  <span>Pay upon successful handover</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-[#0B0F1F]/50">
                Active in Bhimavaram: Aadhaar Kendra, MRO, Post Office
              </span>
              <button
                onClick={() => onSelectService('cat-queue')}
                className="px-6 py-3 rounded-full bg-[#4169FF] hover:bg-[#3256e0] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Book Assistance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 2: Store Pickup Assistance (Span 5) */}
          <div className="lg:col-span-5 glass-card-editorial rounded-3xl p-8 flex flex-col justify-between text-left group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#45DFFF] to-[#4169FF] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#4169FF] bg-[#ECEBFF] px-3 py-1 rounded-full">
                  From ₹59
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0B0F1F] tracking-tight mb-2">
                Store Pickup Assistance
              </h3>

              <p className="text-sm text-[#0B0F1F]/65 leading-relaxed mb-6 font-normal">
                Avoid crowded collection counters at supermarkets, bakeries, and pharmacies.
                An assistant collects your pre-ordered items and delivers them directly to you.
              </p>

              <div className="space-y-2.5 text-xs text-[#0B0F1F]/75 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#45DFFF]" />
                  <span>Pre-ordered grocery collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#45DFFF]" />
                  <span>Urgent pharmacy prescription pickups</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectService('cat-pickup')}
              className="w-full py-3 rounded-full bg-white hover:bg-[#ECEBFF]/60 text-[#0B0F1F] hover:text-[#4169FF] border border-black/[0.06] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Book Store Pickup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 3: Service Center Assistance (Span 6) */}
          <div className="lg:col-span-6 glass-card-editorial rounded-3xl p-8 flex flex-col justify-between text-left group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7357FF] to-[#4169FF] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#7357FF] bg-[#ECEBFF] px-3 py-1 rounded-full">
                  From ₹79
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0B0F1F] tracking-tight mb-2">
                Service Center Assistance
              </h3>

              <p className="text-sm text-[#0B0F1F]/65 leading-relaxed mb-6 font-normal">
                Drop off devices, submit warranty slips, or track queue tokens at authorized brand customer support centers without waiting in crowded lounges.
              </p>

              <div className="space-y-2.5 text-xs text-[#0B0F1F]/75 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7357FF]" />
                  <span>Smartphone & electronics repair intake</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7357FF]" />
                  <span>Token management & receipt handover</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectService('cat-service')}
              className="w-full py-3 rounded-full bg-white hover:bg-[#ECEBFF]/60 text-[#0B0F1F] hover:text-[#7357FF] border border-black/[0.06] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Book Service Center Help</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 4: Errand Assistance (Span 6) */}
          <div className="lg:col-span-6 glass-card-editorial rounded-3xl p-8 flex flex-col justify-between text-left group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#4169FF] to-[#7357FF] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#4169FF] bg-[#ECEBFF] px-3 py-1 rounded-full">
                  From ₹69
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0B0F1F] tracking-tight mb-2">
                Errand Assistance
              </h3>

              <p className="text-sm text-[#0B0F1F]/65 leading-relaxed mb-6 font-normal">
                Delegate time-consuming local errand queues, parcel courier dispatches, document verification counters, and application queues to dependable local assistants.
              </p>

              <div className="space-y-2.5 text-xs text-[#0B0F1F]/75 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4169FF]" />
                  <span>Speed post & parcel courier drop-off</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4169FF]" />
                  <span>Document registration line proxy</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectService('cat-errand')}
              className="w-full py-3 rounded-full bg-white hover:bg-[#ECEBFF]/60 text-[#0B0F1F] hover:text-[#4169FF] border border-black/[0.06] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Book Errand Help</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
