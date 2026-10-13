'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { BookingModal } from '@/components/booking/BookingModal';
import { useAuth } from '@/context/AuthContext';
import { Booking, BookingStatus } from '@/types';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  XCircle,
  Bell,
  User,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Eye
} from 'lucide-react';

export default function CustomerDashboardPage() {
  const { currentUser, switchRole } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
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

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this queue assistance request?')) return;
    try {
      setActionLoading(true);
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CANCEL',
          reason: 'Cancelled by customer',
          updatedBy: currentUser.name
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking(data.booking);
        }
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const activeBookings = bookings.filter(
    (b) => b.status === 'ACCEPTED' || b.status === 'IN_PROGRESS' || b.status === 'PENDING'
  );
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED');
  const totalMinutesSaved = bookings.reduce(
    (acc, b) => acc + (b.status === 'COMPLETED' ? b.timeSavedMins || 30 : 0),
    0
  );

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'ALL') return true;
    return b.status === filterStatus;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Pending Match
          </span>
        );
      case 'ACCEPTED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-[#4169FF] border border-blue-200">
            Assistant Assigned
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-200 animate-pulse">
            In Queue Spot
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Completed
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FF]">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header & Role Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-gray-200/80 gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E9E7FF] text-[#4169FF] text-xs font-bold">
                Customer Portal
              </span>
              <span className="text-xs text-gray-500">Bhimavaram Pilot</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#10152E]">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Track your real-time queue requests, assistant check-ins, and reclaimed time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="p-2.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
              title="Refresh requests"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4169FF] to-[#7357FF] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Request Queue Assistance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="glass-card rounded-3xl p-6 border border-[#4169FF]/15">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Active Requests
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#4169FF] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#10152E]">{activeBookings.length}</span>
              <span className="text-xs text-blue-600 font-semibold">in progress</span>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-emerald-400/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Completed Queues
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#10152E]">{completedBookings.length}</span>
              <span className="text-xs text-emerald-600 font-semibold">tasks fulfilled</span>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-[#7357FF]/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Time Reclaimed
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7357FF] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#7357FF]">{totalMinutesSaved}</span>
              <span className="text-xs text-gray-500 font-medium">minutes saved</span>
            </div>
          </div>
        </div>

        {/* Requests Management Section */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg text-left">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#10152E]">My Queue Bookings</h2>
              <p className="text-xs text-gray-500">Real-time status lifecycle in Bhimavaram</p>
            </div>

            {/* Status Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                    filterStatus === st
                      ? 'bg-[#4169FF] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Table / List */}
          {loading ? (
            <div className="py-12 text-center text-sm text-gray-500 flex flex-col items-center justify-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-[#4169FF]" />
              <span>Loading your bookings...</span>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="py-16 text-center max-w-sm mx-auto">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#10152E]">No bookings found</h3>
              <p className="text-xs text-gray-500 mt-1 mb-5">
                {filterStatus === 'ALL'
                  ? 'You have not submitted any queue assistance requests yet.'
                  : `No requests with status "${filterStatus}".`}
              </p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#4169FF] text-white text-xs font-bold shadow-md hover:bg-[#3256e0]"
              >
                Skip a Queue Now
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-white border border-gray-200/80 hover:border-[#4169FF]/40 shadow-sm transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-lg">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-xs text-[#4169FF]">
                        {b.bookingNumber}
                      </span>
                      {getStatusBadge(b.status)}
                      <span className="text-[11px] text-gray-400">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#10152E]">
                      {b.category?.name || 'Queue Assistance'}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-[#4169FF] flex-shrink-0" />
                      <span className="line-clamp-1">{b.serviceLocation}</span>
                    </div>

                    {b.assistant && (
                      <div className="flex items-center gap-2 text-xs text-gray-700 pt-1">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-[#4169FF] font-bold text-[10px] flex items-center justify-center">
                          SN
                        </span>
                        <span>
                          Assistant: <strong>{b.assistant.name}</strong> ({b.assistant.rating}★)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 justify-between lg:justify-end">
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">Service Fee</span>
                      <span className="text-sm font-black text-[#10152E]">₹{b.serviceFee}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-[#E9E7FF] text-[#10152E] hover:text-[#4169FF] text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Timeline</span>
                      </button>

                      {(b.status === 'PENDING' || b.status === 'ACCEPTED') && (
                        <button
                          disabled={actionLoading}
                          onClick={() => handleCancelBooking(b.id)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors border border-rose-200"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </main>

      {/* Booking Details & Status History Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#10152E]/60 backdrop-blur-sm"
            onClick={() => setSelectedBooking(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#4169FF]">
                  {selectedBooking.bookingNumber}
                </span>
                <h3 className="text-lg font-black text-[#10152E]">
                  {selectedBooking.category?.name || 'Queue Request'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-gray-50 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span>{getStatusBadge(selectedBooking.status)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-bold text-gray-800 text-right">{selectedBooking.serviceLocation}</span>
                </div>
                {selectedBooking.notes && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Notes:</span>
                    <span className="text-gray-700 text-right max-w-[65%]">{selectedBooking.notes}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Scheduled:</span>
                  <span className="font-bold text-gray-800">
                    {new Date(selectedBooking.targetTime).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200/60 pt-2 font-bold">
                  <span>Pilot Fee:</span>
                  <span className="text-[#4169FF]">₹{selectedBooking.serviceFee}</span>
                </div>
              </div>

              {/* Status Timeline History */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Progress Timeline
                </h4>
                <div className="space-y-3 relative pl-4 border-l-2 border-blue-200">
                  {selectedBooking.statusHistory?.map((hist, i) => (
                    <div key={hist.id || i} className="relative">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4169FF] absolute -left-[21px] top-1" />
                      <p className="font-bold text-gray-800">{hist.status.replace('_', ' ')}</p>
                      {hist.note && <p className="text-gray-600 mt-0.5">{hist.note}</p>}
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        {new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • by {hist.updatedBy || 'System'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2 rounded-full bg-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          fetchBookings();
        }}
      />

      <Footer />
    </div>
  );
}
