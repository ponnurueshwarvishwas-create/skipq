'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is SkipQ?',
      a: 'SkipQ is an on-demand queue assistance platform connecting customers with verified local assistants. When you need to visit a busy office, billing desk, or service center in Bhimavaram, an assistant can hold your physical spot or collect your order so you never waste productive morning hours waiting.'
    },
    {
      q: 'How does queue assistance work?',
      a: 'Submit a request specifying your location (e.g. Aadhaar Seva Kendra or an electricity billing counter). A verified local assistant accepts the task, checks in at the venue, acquires a token or holds your line spot, and provides live status updates. When your turn is only 2-3 people away, you arrive for a seamless handover.'
    },
    {
      q: 'How do I book a service?',
      a: 'Simply click "Skip a Queue", select the service category, choose your location in Bhimavaram, specify your preferred date and time, and confirm. The entire booking takes under 60 seconds.'
    },
    {
      q: 'Is SkipQ free?',
      a: 'Browsing the platform, checking venue waiting estimates, and exploring the directory is completely free. When an assistant is deployed to hold your spot, a nominal pilot fee starting from ₹49 applies. There are no recurring subscriptions for individual users.'
    },
    {
      q: 'How are assistants assigned?',
      a: 'When you submit a request, vetted assistants in Bhimavaram receive an alert. An available assistant accepts the booking. You will see their verified status, name, and live check-in timeline on your dashboard.'
    },
    {
      q: 'Can I cancel a booking?',
      a: 'Yes. You can cancel any booking free of charge from your Customer Dashboard before the assistant has physically checked into the venue.'
    },
    {
      q: 'Which locations are supported?',
      a: 'SkipQ is currently piloting in Bhimavaram, Andhra Pradesh. We support key locations including Aadhaar Seva Kendra, MRO and Sub-Registrar offices, the Head Post Office, railway ticket counters, Apollo Pharmacy, and authorized smartphone service centers.'
    },
    {
      q: 'How can I become an assistant?',
      a: 'If you reside in Bhimavaram and want to earn flexible income, you can apply through our Assistant Desk. We verify government identification, conduct an onboarding check, and provide queue management guidelines.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-28 relative overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECEBFF] text-[#4169FF] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0F1F] tracking-tight leading-[1.1]">
            Got Questions?{' '}
            <span className="bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] bg-clip-text text-transparent">
              Clear Answers.
            </span>
          </h2>

          <p className="mt-4 text-base text-[#0B0F1F]/60 font-normal">
            Everything you need to know about our early-stage queue assistance service in Bhimavaram.
          </p>
        </div>

        {/* Minimal Accordion */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#4169FF]/30 bg-[#F8FAFF]'
                    : 'border-black/[0.06] bg-white hover:border-black/[0.12]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-7 py-5 flex items-center justify-between text-left gap-4"
                >
                  <span className="text-base sm:text-lg font-bold text-[#0B0F1F]">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#4169FF] text-white rotate-180' : 'bg-black/5 text-gray-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-7 pb-6 pt-1 text-sm sm:text-base text-[#0B0F1F]/70 leading-relaxed border-t border-black/[0.04]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
