'use client';

import React from 'react';
import Link from 'next/link';

interface SkipQLogoProps {
  variant?: 'gradient' | 'white' | 'monochrome' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  href?: string;
}

export function SkipQLogoIcon({
  variant = 'gradient',
  size = 'md',
  className = ''
}: Omit<SkipQLogoProps, 'showText' | 'href'>) {
  const sizeMap = {
    sm: 28,
    md: 38,
    lg: 52,
    xl: 72
  };
  const dimension = sizeMap[size];

  // Colors based on variant
  const getGradientIds = () => {
    switch (variant) {
      case 'white':
        return {
          ringStroke: '#FFFFFF',
          arrowFill: '#FFFFFF',
          glowColor: 'rgba(255, 255, 255, 0.4)'
        };
      case 'monochrome':
      case 'dark':
        return {
          ringStroke: '#10152E',
          arrowFill: '#10152E',
          glowColor: 'rgba(16, 21, 46, 0.2)'
        };
      case 'gradient':
      default:
        return {
          ringStroke: 'url(#skipq-brand-grad)',
          arrowFill: 'url(#skipq-arrow-grad)',
          glowColor: 'rgba(65, 105, 255, 0.35)'
        };
    }
  };

  const colors = getGradientIds();

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`relative inline-block transition-transform duration-300 hover:scale-105 ${className}`}
      aria-label="SkipQ Logo Symbol"
    >
      <defs>
        <linearGradient id="skipq-brand-grad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#45DFFF" />
          <stop offset="45%" stopColor="#4169FF" />
          <stop offset="100%" stopColor="#7357FF" />
        </linearGradient>

        <linearGradient id="skipq-arrow-grad" x1="30" y1="30" x2="95" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#45DFFF" />
          <stop offset="100%" stopColor="#4169FF" />
        </linearGradient>

        <filter id="skipq-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Subtle background ambient ring */}
      <circle
        cx="48"
        cy="48"
        r="34"
        stroke={colors.glowColor}
        strokeWidth="10"
        opacity="0.25"
        strokeLinecap="round"
      />

      {/* The main 'Q' body: futuristic open loop */}
      <path
        d="M 48 14
           A 34 34 0 1 0 74 72
           A 34 34 0 0 0 82 48
           C 82 29.22 66.78 14 48 14 Z"
        stroke={colors.ringStroke}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />

      {/* Aerodynamic Forward-Thrust Skip Arrow slicing out through bottom-right of Q */}
      <path
        d="M 46 54 
           L 76 68 
           L 94 48 
           L 82 86 
           L 58 76 
           L 68 70 
           L 46 54 Z"
        fill={colors.arrowFill}
        filter={variant === 'gradient' ? 'url(#skipq-glow)' : undefined}
      />

      {/* Speed dash accent inside the loop */}
      <circle
        cx="48"
        cy="48"
        r="6"
        fill={colors.arrowFill}
        opacity="0.8"
      />
    </svg>
  );
}

export function SkipQLogo({
  variant = 'gradient',
  size = 'md',
  showText = true,
  className = '',
  href = '/'
}: SkipQLogoProps) {
  const content = (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      <SkipQLogoIcon variant={variant} size={size} />

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center font-bold tracking-tight">
            <span
              className={`text-xl sm:text-2xl font-black tracking-tight font-heading ${
                variant === 'white'
                  ? 'text-white'
                  : 'text-[#10152E]'
              }`}
            >
              Skip
            </span>
            <span
              className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] bg-clip-text text-transparent ml-0.5"
            >
              Q
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#45DFFF] ml-1 animate-pulse shadow-[0_0_8px_#45DFFF]" />
          </div>
          <span
            className={`text-[9px] uppercase tracking-widest font-semibold mt-0.5 ${
              variant === 'white' ? 'text-white/60' : 'text-[#10152E]/60'
            }`}
          >
            Skip The Queue
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
