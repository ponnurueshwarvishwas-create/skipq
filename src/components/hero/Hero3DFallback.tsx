'use client';

import React from 'react';
import { SkipQLogoIcon } from '@/components/brand/SkipQLogo';

export function Hero3DFallback() {
  return (
    <div className="w-full h-full min-h-[580px] lg:min-h-[760px] xl:min-h-[820px] relative flex items-center justify-center select-none">
      {/* Radiant atmospheric backlight */}
      <div className="absolute inset-0 hero-glow-backlight opacity-90 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center p-8 text-center z-10">
        {/* Enormous concentric glowing rings */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#45DFFF]/25 animate-[spin_25s_linear_infinite]" />
          <div className="absolute inset-6 rounded-full border border-[#4169FF]/20 animate-[spin_18s_linear_infinite_reverse]" />
          <div className="absolute inset-12 rounded-full border border-[#7357FF]/15 animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-[#4169FF]/10 via-[#45DFFF]/15 to-[#7357FF]/10 backdrop-blur-xl shadow-2xl" />

          {/* Central 3D Mark */}
          <div className="relative z-10 transform scale-150">
            <SkipQLogoIcon size="xl" variant="gradient" />
          </div>
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-[#4169FF]">
          3D Interactive Simulation
        </p>
      </div>
    </div>
  );
}
