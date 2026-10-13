'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import {
  Building2,
  Users,
  Clock,
  TrendingUp,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Store,
  Sparkles
} from 'lucide-react';

interface PartnerStore {
  id: string;
  name: string;
  category: string;
  location: string;
  activeQueueCount: number;
  averageWaitMins: number;
  status: 'ACTIVE' | 'PEAK' | 'CLOSED';
}

const SAMPLE_PARTNERS: PartnerStore[] = [
  {
    id: 'store-1',
    name: 'Apollo Pharmacy — Main Road',
    category: 'Pharmacy & Medicine Dispatch',
    location: 'Main Road, Bhimavaram',
    activeQueueCount: 8,
    averageWaitMins: 22,
    status: 'PEAK'
  },
  {
    id: 'store-2',
    name: 'Samsung Service Hub',
    category: 'Authorized Electronics Service',
    location: 'Mavullamma Temple Road',
    activeQueueCount: 4,
    averageWaitMins: 40,
    status: 'ACTIVE'
  },
  {
    id: 'store-3',
    name: 'D-Mart Pickup Desk #2',
    category: 'Retail Grocery Pickups',
    location: 'J.P. Road Commercial Hub',
    activeQueueCount: 12,
    averageWaitMins: 35,
    status: 'PEAK'
  }
];

export default function BusinessPortalPage() {
  const [partners, setPartners] = useState<PartnerStore[]>(SAMPLE_PARTNERS);
  const [selectedPartner, setSelectedPartner] = useState<PartnerStore>(SAMPLE_PARTNERS[0]);
  const [requestedAssistant, setRequestedAssistant] = useState(false);

  const handleRequestQueueAssistant = () => {
    setRequestedAssistant(true);
    setTimeout(() => setRequestedAssistant(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFF] text-[#0B0F1F]">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4169FF]/10 text-[#4169FF] text-xs font-bold uppercase tracking-wider mb-3">
                <Store className="w-3.5 h-3.5" />
                <span>Bhimavaram Merchant & Clinic Partner Hub</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0B0F1F] tracking-tight">
                SkipQ for Business & Counter Managers
              </h1>
              <p className="text-sm text-[#0B0F1F]/65 mt-1">
                Eliminate store congestion and empower your patrons with on-demand queue delegation.
              </p>
            </div>

            <button
              onClick={handleRequestQueueAssistant}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#4169FF] to-[#7357FF] text-white text-xs font-bold shadow-lg shadow-[#4169FF]/20 hover:shadow-xl transition-all flex items-center gap-2 self-start md:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Deploy Dedicated Queue Assistant</span>
            </button>
          </div>

          {requestedAssistant && (
            <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Dedicated SkipQ assistant dispatched to {selectedPartner.name}! ETA: 12 minutes.</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-mono">DISPATCH #SQ-BIZ-9912</span>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
              <div className="flex items-center justify-between text-[#0B0F1F]/50 mb-3">
                <span className="text-xs font-semibold">Registered Counters</span>
                <Building2 className="w-4 h-4 text-[#4169FF]" />
              </div>
              <p className="text-3xl font-black text-[#0B0F1F]">18</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Active across Bhimavaram</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
              <div className="flex items-center justify-between text-[#0B0F1F]/50 mb-3">
                <span className="text-xs font-semibold">Patrons Assisted Today</span>
                <Users className="w-4 h-4 text-[#45DFFF]" />
              </div>
              <p className="text-3xl font-black text-[#0B0F1F]">142</p>
              <p className="text-[11px] text-[#0B0F1F]/50 font-medium mt-1">+18% vs last Tuesday</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
              <div className="flex items-center justify-between text-[#0B0F1F]/50 mb-3">
                <span className="text-xs font-semibold">Average Counter Wait</span>
                <Clock className="w-4 h-4 text-[#7357FF]" />
              </div>
              <p className="text-3xl font-black text-[#0B0F1F]">28m</p>
              <p className="text-[11px] text-purple-600 font-medium mt-1">Reduced by proxy handoffs</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
              <div className="flex items-center justify-between text-[#0B0F1F]/50 mb-3">
                <span className="text-xs font-semibold">Store Footfall Retention</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-3xl font-black text-[#0B0F1F]">94.2%</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Fewer queue walkouts</p>
            </div>
          </div>

          {/* Active Partner Counters */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* List */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-lg font-bold text-[#0B0F1F] mb-4">Partner Storefronts & Counters</h2>
              
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                    selectedPartner.id === partner.id
                      ? 'bg-white border-[#4169FF] shadow-md ring-2 ring-[#4169FF]/10'
                      : 'bg-white/80 border-black/[0.06] hover:bg-white shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base text-[#0B0F1F]">{partner.name}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      partner.status === 'PEAK'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {partner.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#0B0F1F]/60 mb-4">{partner.category} • {partner.location}</p>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-black/[0.05]">
                    <div className="flex items-center gap-4">
                      <span><strong>{partner.activeQueueCount}</strong> in line</span>
                      <span>Avg wait: <strong>{partner.averageWaitMins}m</strong></span>
                    </div>
                    <span className="text-[#4169FF] font-semibold text-xs flex items-center gap-1">
                      Manage Counter <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Store Inspector */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm sticky top-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#4169FF]/10 text-[#4169FF] flex items-center justify-center font-bold text-lg">
                    {selectedPartner.name.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0B0F1F]">{selectedPartner.name}</h3>
                    <p className="text-xs text-[#0B0F1F]/60">{selectedPartner.location}</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs mb-8">
                  <div className="p-4 rounded-2xl bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Current Line Estimate</span>
                    <span className="font-bold text-[#0B0F1F]">{selectedPartner.activeQueueCount} Patrons (~{selectedPartner.averageWaitMins} mins)</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-600 font-medium">SkipQ Proxy In Line</span>
                    <span className="font-bold text-emerald-600">2 Verified Assistants Active</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Digital Token Sync</span>
                    <span className="font-bold text-[#4169FF]">Connected (Token #41-#49)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleRequestQueueAssistant}
                    className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-[#4169FF] hover:bg-[#3558e0] shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Request Floor Assistant</span>
                  </button>

                  <a
                    href="mailto:partner@skipq.in"
                    className="w-full py-3.5 rounded-xl text-xs font-bold text-[#0B0F1F] bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    Contact Merchant Support
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
