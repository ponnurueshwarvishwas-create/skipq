'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  MapPin,
  UserCheck,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface InteractiveDemoProps {
  onOpenBooking: () => void;
}

export function InteractiveDemo({ onOpenBooking }: InteractiveDemoProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stages = [
    {
      title: 'Booking Dispatched',
      time: '10:15 AM',
      location: 'Aadhaar Seva Kendra, Bhimavaram',
      status: 'Broadcasting to nearby verified assistants',
      assistant: 'Matching available local agents...',
      progress: 25,
      badge: 'Request Dispatched',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      title: 'Assistant Assigned',
      time: '10:18 AM',
      location: 'Aadhaar Seva Kendra, Bhimavaram',
      status: 'Assistant Suresh Naidu en route to counter',
      assistant: 'Suresh Naidu (Verified Assistant)',
      progress: 50,
      badge: 'Assistant En Route',
      badgeColor: 'bg-blue-100 text-[#4169FF]'
    },
    {
      title: 'Holding Spot in Queue',
      time: '10:26 AM',
      location: 'Aadhaar Seva Kendra, Token Desk #2',
      status: 'Holding queue position. Spot turn advancing.',
      assistant: 'Suresh Naidu • In Queue at Desk #2',
      progress: 78,
      badge: 'In Progress • Turn Approaching',
      badgeColor: 'bg-cyan-100 text-cyan-800'
    },
    {
      title: 'Handover Ready',
      time: '10:52 AM',
      location: 'Aadhaar Seva Kendra, Desk #2',
      status: 'Customer arrived for turn #1. Spot transferred.',
      assistant: 'Suresh Naidu • Handover Completed',
      progress: 100,
      badge: 'Completed • Time Reclaimed',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStage((prev) => (prev + 1) % stages.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, stages.length]);

  const activeStage = stages[currentStage];

  return (
    <section id="demo" className="py-28 relative overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECEBFF] text-[#4169FF] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>INTERACTIVE SIMULATOR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0F1F] tracking-tight leading-[1.1]">
            See Your Time{' '}
            <span className="bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] bg-clip-text text-transparent">
              Come Back.
            </span>
          </h2>

          <p className="mt-4 text-base text-[#0B0F1F]/60 font-normal">
            Walk through a simulated queue assistance lifecycle to see how SkipQ coordinates local assistance step-by-step.
          </p>
        </div>

        {/* Console Box */}
        <div className="glass-surface rounded-3xl p-7 sm:p-10 relative overflow-hidden border border-black/[0.06]">
          
          {/* Console Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-black/[0.05] gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B0F1F]/50">
                LIVE DEMO SIMULATION • NON-FABRICATED WORKFLOW
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                  isPlaying
                    ? 'bg-[#4169FF] text-white shadow-md'
                    : 'bg-black/5 hover:bg-black/10 text-[#0B0F1F]'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPlaying ? 'Pause Simulation' : 'Auto-Play Simulation'}</span>
              </button>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStage(0);
                }}
                className="p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
            {stages.map((st, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStage(idx);
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  currentStage === idx
                    ? 'bg-white border-[#4169FF] shadow-[0_6px_20px_rgba(65,105,255,0.15)] ring-1 ring-[#4169FF]'
                    : 'bg-white/40 border-black/[0.05] hover:bg-white text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      currentStage === idx ? 'text-[#4169FF]' : 'text-gray-400'
                    }`}
                  >
                    Phase 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">{st.time}</span>
                </div>
                <p
                  className={`text-xs font-bold line-clamp-1 ${
                    currentStage === idx ? 'text-[#0B0F1F]' : 'text-gray-500'
                  }`}
                >
                  {st.title}
                </p>
              </button>
            ))}
          </div>

          {/* Simulated View */}
          <div className="bg-gradient-to-br from-white to-[#F8FAFF] rounded-2xl p-6 sm:p-8 border border-white shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/[0.05] gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-gray-400">
                    #SQ-DEMO-2026
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeStage.badgeColor}`}>
                    {activeStage.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0B0F1F]">
                  {activeStage.title}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
              <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#4169FF]" />
                  <span>Target Location</span>
                </div>
                <p className="text-sm font-bold text-[#0B0F1F]">{activeStage.location}</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#45DFFF]" />
                  <span>Assistant</span>
                </div>
                <p className="text-sm font-bold text-[#0B0F1F]">{activeStage.assistant}</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#7357FF]" />
                  <span>Status Note</span>
                </div>
                <p className="text-sm font-bold text-[#0B0F1F]">{activeStage.status}</p>
              </div>
            </div>

            {/* Progression Bar */}
            <div className="space-y-2 mt-6">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-500">Queue Lifecycle</span>
                <span className="text-[#4169FF] font-mono">{activeStage.progress}% Complete</span>
              </div>
              <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] rounded-full transition-all duration-700"
                  style={{ width: `${activeStage.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Trigger Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              Ready to experience this in reality across Bhimavaram?
            </p>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#4169FF] to-[#7357FF] shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Try SkipQ for Real</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
