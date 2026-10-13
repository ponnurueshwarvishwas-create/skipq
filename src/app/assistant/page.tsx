'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { useAuth } from '@/context/AuthContext';
import { Booking } from '@/types';
import {
  UserCheck,
  CheckCircle,
  Clock,
  MapPin,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Power,
  RefreshCw,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function AssistantDashboardPage() {
  const { assistantProfile, currentUser, switchRole } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleToggleAvailability = async () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    try {
      await fetch('/api/assistants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistantId: assistantProfile?.id || 'ast-1',
          isAvailable: nextState
        })
      });
    } catch (err) {
      console.error('Error toggling availability:', err);
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ASSIGN',
          assistantId: assistantProfile?.id || 'ast-1',
          assistantName: assistantProfile?.name || 'Suresh Naidu'
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
      }
    } catch (err) {
      console.error('Error accepting booking:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateStatus = async (
    bookingId: string,
    nextStatus: 'IN_PROGRESS' | 'COMPLETED',
    note: string
  ) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus,
          note,
          updatedBy: assistantProfile?.name || 'Suresh Naidu'
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Filter bookings
  const availablePendingBookings = bookings.filter((b) => b.status === 'PENDING');
  const myAssignedActive = bookings.filter(
    (b) =>
      (b.assistantId === (assistantProfile?.id || 'ast-1') || b.status === 'IN_PROGRESS') &&
      b.status !== 'COMPLETED' &&
      b.status !== 'CANCELLED'
  );
  const myCompleted = bookings.filter(
    (b) => b.assistantId === (assistantProfile?.id || 'ast-1') && b.status === 'COMPLETED'
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FF]">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        
        {/* Assistant Header & Status Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-gray-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E9E7FF] text-[#4169FF] text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Assistant Desk</span>
              </span>
              <span className="text-xs text-gray-500">Bhimavaram Central</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#10152E]">
              {assistantProfile?.name || 'Suresh Naidu'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Rating: <strong>4.92★</strong> • 148 Tasks Completed • Active in Bhimavaram Hubs
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Availability Toggle */}
            <button
              onClick={handleToggleAvailability}
              className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                isOnline
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{isOnline ? 'Online (Accepting Tasks)' : 'Offline'}</span>
            </button>

            <button
              onClick={fetchBookings}
              className="p-2.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
              title="Refresh tasks"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Top Earnings & Task Performance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase">Total Earnings</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-[#4169FF]">₹8,420</span>
              <span className="text-[10px] text-emerald-600 font-bold">+₹140 today</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase">Completed Queues</span>
            <div className="text-2xl font-black text-[#10152E] mt-1">148</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase">Active Assigned</span>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {myAssignedActive.length}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase">Available Nearby</span>
            <div className="text-2xl font-black text-[#7357FF] mt-1">
              {availablePendingBookings.length}
            </div>
          </div>
        </div>

        {/* Section 1: Active Tasks Assigned To Me */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#4169FF]/20 shadow-lg mb-10">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-[#10152E] flex items-center gap-2">
                <span>My Active Queue Tasks</span>
                {myAssignedActive.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#4169FF] text-xs font-mono">
                    {myAssignedActive.length}
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-500">Tasks currently assigned to you for execution</p>
            </div>
          </div>

          {myAssignedActive.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400">
              No active tasks assigned right now. Accept a pending request below to get started!
            </div>
          ) : (
            <div className="space-y-4">
              {myAssignedActive.map((task) => (
                <div
                  key={task.id}
                  className="p-5 rounded-2xl bg-white border border-blue-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#4169FF]">
                        {task.bookingNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-100 text-cyan-800">
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#10152E]">
                      {task.category?.name || 'Queue Proxy'}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-[#4169FF]" />
                      <span>{task.serviceLocation}</span>
                    </div>

                    {task.notes && (
                      <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-xl">
                        <strong>Customer Note:</strong> {task.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    {task.status === 'ACCEPTED' && (
                      <button
                        disabled={actionLoading}
                        onClick={() =>
                          handleUpdateStatus(
                            task.id,
                            'IN_PROGRESS',
                            'Assistant checked in at queue location and holding spot.'
                          )
                        }
                        className="px-4 py-2 rounded-full bg-[#4169FF] hover:bg-[#3256e0] text-white text-xs font-bold transition-all shadow-md"
                      >
                        Check-in at Queue
                      </button>
                    )}

                    {task.status === 'IN_PROGRESS' && (
                      <button
                        disabled={actionLoading}
                        onClick={() =>
                          handleUpdateStatus(
                            task.id,
                            'COMPLETED',
                            'Queue spot handed over to customer successfully.'
                          )
                        }
                        className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 justify-center"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Complete & Handover (Earn ₹{Math.round(task.serviceFee * 0.8)})</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Available Nearby Requests (Open for acceptance) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-[#10152E]">Available Requests in Bhimavaram</h2>
              <p className="text-xs text-gray-500">Unassigned customer requests awaiting an assistant</p>
            </div>
            <span className="text-xs font-bold text-[#4169FF] bg-[#E9E7FF] px-3 py-1 rounded-full">
              {availablePendingBookings.length} Available
            </span>
          </div>

          {availablePendingBookings.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">
              No pending requests at this moment. You will be notified as new bookings are submitted!
            </div>
          ) : (
            <div className="space-y-3.5">
              {availablePendingBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-white border border-gray-200/80 hover:border-[#4169FF]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-600">
                        {b.bookingNumber}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Target Time: {new Date(b.targetTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#10152E]">
                      {b.category?.name || 'Queue Task'}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-[#4169FF]" />
                      <span>{b.serviceLocation}</span>
                    </div>

                    {b.notes && (
                      <p className="text-xs text-gray-500 italic max-w-lg">&ldquo;{b.notes}&rdquo;</p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block uppercase">Payout</span>
                      <span className="text-sm font-black text-emerald-600">
                        ₹{Math.round(b.serviceFee * 0.8)}
                      </span>
                    </div>

                    <button
                      disabled={actionLoading || !isOnline}
                      onClick={() => handleAcceptBooking(b.id)}
                      className="px-5 py-2.5 rounded-full bg-[#4169FF] hover:bg-[#3256e0] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <span>Accept Task</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
