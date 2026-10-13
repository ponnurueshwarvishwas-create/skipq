'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { useAuth } from '@/context/AuthContext';
import { Booking, AssistantProfile, ServiceCategory } from '@/types';
import {
  ShieldCheck,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  MapPin,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  BarChart3
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [assistants, setAssistants] = useState<AssistantProfile[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'BOOKINGS' | 'ASSISTANTS' | 'CATEGORIES'>('BOOKINGS');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bRes, aRes, cRes, sRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/assistants'),
        fetch('/api/categories'),
        fetch('/api/stats')
      ]);

      const [bData, aData, cData, sData] = await Promise.all([
        bRes.json(),
        aRes.json(),
        cRes.json(),
        sRes.json()
      ]);

      if (bData.success) setBookings(bData.bookings);
      if (aData.success) setAssistants(aData.assistants);
      if (cData.success) setCategories(cData.categories);
      if (sData.success) setStats(sData.stats);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOverrideStatus = async (bookingId: string, status: string) => {
    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          note: `Admin override to ${status}`,
          updatedBy: 'Admin Ops Desk'
        })
      });
      fetchData();
    } catch (err) {
      console.error('Error overriding status:', err);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.bookingNumber.toLowerCase().includes(q) ||
      b.serviceLocation.toLowerCase().includes(q) ||
      (b.customer?.name && b.customer.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FF]">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        
        {/* Admin Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-gray-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E9E7FF] text-[#7357FF] text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SkipQ Admin Command Hub</span>
              </span>
              <span className="text-xs text-gray-500 font-medium">Pilot Ops: Bhimavaram</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#10152E]">
              Operational Oversight
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Monitor live bookings, verified assistants, and pilot metrics in Bhimavaram.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
              title="Refresh platform data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Real-Time Platform Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase">Total Requests</span>
            <div className="text-2xl font-black text-[#10152E] mt-1">
              {stats?.totalBookings ?? bookings.length}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase">Active In Progress</span>
            <div className="text-2xl font-black text-[#4169FF] mt-1">
              {stats?.activeRequests ?? 1}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase">Pending Match</span>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {stats?.pendingRequests ?? 1}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase">Total Hours Saved</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {stats?.totalHoursSaved ?? 1.8}h
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm col-span-2 lg:col-span-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Active Assistants</span>
            <div className="text-2xl font-black text-[#7357FF] mt-1">
              {assistants.length} Vetted
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('BOOKINGS')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'BOOKINGS'
                ? 'border-[#4169FF] text-[#4169FF]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('ASSISTANTS')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'ASSISTANTS'
                ? 'border-[#4169FF] text-[#4169FF]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Verified Assistants ({assistants.length})
          </button>
          <button
            onClick={() => setActiveTab('CATEGORIES')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'CATEGORIES'
                ? 'border-[#4169FF] text-[#4169FF]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Service Categories ({categories.length})
          </button>
        </div>

        {/* TAB 1: Bookings Management */}
        {activeTab === 'BOOKINGS' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg">
            
            {/* Search Input */}
            <div className="mb-6 max-w-md relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search booking number, location, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#4169FF] outline-none"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] uppercase font-bold text-gray-400 border-b border-gray-200 bg-gray-50/50">
                  <tr>
                    <th className="py-3 px-4">Booking #</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Assistant</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Fee</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#4169FF]">
                        {b.bookingNumber}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-800">
                        {b.category?.name || 'Queue Help'}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">
                        {b.serviceLocation}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-gray-700">
                        {b.customer?.name || 'Customer'}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {b.assistant ? (
                          <span className="font-semibold text-[#10152E]">{b.assistant.name}</span>
                        ) : (
                          <span className="text-gray-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            b.status === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'IN_PROGRESS'
                              ? 'bg-cyan-100 text-cyan-800'
                              : b.status === 'PENDING'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {b.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-gray-800">₹{b.serviceFee}</td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={b.status}
                          onChange={(e) => handleOverrideStatus(b.id, e.target.value)}
                          className="text-[11px] font-semibold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none hover:border-[#4169FF]"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="ACCEPTED">ACCEPTED</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: Assistants Management */}
        {activeTab === 'ASSISTANTS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assistants.map((ast) => (
              <div
                key={ast.id}
                className="glass-card rounded-3xl p-6 border border-gray-200/80 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4169FF] to-[#45DFFF] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {ast.name?.slice(0, 2) || 'SN'}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#10152E] flex items-center gap-1.5">
                        <span>{ast.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#4169FF]" />
                      </h4>
                      <p className="text-xs text-gray-500">{ast.serviceArea}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      ast.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {ast.isAvailable ? 'Available' : 'Offline'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-gray-50 text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Rating</span>
                    <strong className="text-amber-600">{ast.rating}★</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">Tasks Done</span>
                    <strong>{ast.completedTasks}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">Earnings</span>
                    <strong className="text-emerald-600">₹{ast.totalEarnings}</strong>
                  </div>
                </div>

                {ast.bio && <p className="text-xs text-gray-600">{ast.bio}</p>}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Categories Management */}
        {activeTab === 'CATEGORIES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="glass-card rounded-3xl p-6 border border-gray-200/80 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-bold text-[#10152E]">{cat.name}</h4>
                  <span className="px-3 py-1 rounded-full bg-[#E9E7FF] text-[#4169FF] font-bold text-xs">
                    ₹{cat.baseFee} Base
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-4">{cat.description}</p>

                <div className="border-t border-gray-100 pt-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1.5">
                    Popular Pilot Venues
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.popularLocations.map((loc, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-gray-50 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
