'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Users,
  ShoppingBag,
  Wrench,
  Clock,
  MapPin,
  Calendar,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ServiceCategory } from '@/types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategoryId?: string;
}

const CATEGORIES: {
  id: string;
  name: string;
  description: string;
  fee: number;
  icon: any;
  popularLocations: string[];
}[] = [
  {
    id: 'cat-queue',
    name: 'Queue Assistance',
    description: 'Proxy line-holding for counters, tokens, bills, or office desks.',
    fee: 49,
    icon: Users,
    popularLocations: [
      'Aadhaar Seva Kendra, Old Bus Stand Road',
      'Somaram Temple Darshan Ticket Counter',
      'MRO & Sub-Registrar Office, Bhimavaram',
      'APEPDCL Electricity Billing Hub'
    ]
  },
  {
    id: 'cat-pickup',
    name: 'Store Pickup Assistance',
    description: 'Collect pre-ordered items, medicine prescriptions, or bakery parcels.',
    fee: 59,
    icon: ShoppingBag,
    popularLocations: [
      'Apollo Pharmacy, Main Road',
      'D-Mart Supermarket, J.P. Road',
      'Varma Sweets & Bakery, Sunday Market',
      'MedPlus Pharmacy, Mavullamma Temple Road'
    ]
  },
  {
    id: 'cat-service',
    name: 'Service Center Assistance',
    description: 'Drop off electronics, retrieve repaired gadgets, or hold token turns.',
    fee: 79,
    icon: Wrench,
    popularLocations: [
      'Samsung Authorized Service, Mavullamma Road',
      'Xiaomi Service Hub, J.P. Road',
      'Hero MotoCorp Service Center',
      'Bajaj Care Service Lounge'
    ]
  },
  {
    id: 'cat-errand',
    name: 'Errand Assistance',
    description: 'On-demand local task queue management & parcel courier drop-off.',
    fee: 69,
    icon: Clock,
    popularLocations: [
      'Head Post Office, Near Collectorate Road',
      'DTDC Express Hub, Gandhi Nagar',
      'RTA Driving Test Registration Desk',
      'Government General Hospital Token Hall'
    ]
  }
];

export function BookingModal({
  isOpen,
  onClose,
  initialCategoryId
}: BookingModalProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<any>(null);

  // Form State
  const [selectedCatId, setSelectedCatId] = useState(initialCategoryId || 'cat-queue');
  const [serviceLocation, setServiceLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [targetDate, setTargetDate] = useState('2026-10-15');
  const [targetTime, setTargetTime] = useState('11:00');
  const [notes, setNotes] = useState('');
  const [customerName, setCustomerName] = useState('Arun Varma');
  const [customerPhone, setCustomerPhone] = useState('+91 98480 12345');
  const [customerEmail, setCustomerEmail] = useState('arun.varma@example.com');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const currentCategory =
    CATEGORIES.find((c) => c.id === selectedCatId) || CATEGORIES[0];

  const handleNext = () => {
    setErrorMessage('');
    if (step === 2 && !serviceLocation.trim()) {
      setErrorMessage('Please select or specify a service location in Bhimavaram.');
      return;
    }
    if (step === 3 && (!targetDate || !targetTime)) {
      setErrorMessage('Please specify your preferred date and time.');
      return;
    }
    if (step === 4 && (!customerName.trim() || !customerPhone.trim())) {
      setErrorMessage('Please provide your name and contact phone number.');
      return;
    }
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setErrorMessage('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: selectedCatId,
          serviceLocation,
          destination,
          targetTime: `${targetDate}T${targetTime}:00.000Z`,
          notes,
          customerName,
          customerPhone,
          customerEmail,
          customerId: 'usr-customer-1'
        })
      });

      const data = await response.json();

      if (data.success && data.booking) {
        setCreatedBooking(data.booking);
        setStep(6);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMessage(data.error || 'Failed to confirm booking.');
      }
    } catch {
      setErrorMessage('Network error while creating booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#10152E]/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_25px_60px_-15px_rgba(16,21,46,0.3)] overflow-hidden z-10 my-8">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-white via-[#F7F9FF] to-[#E9E7FF]/40">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#E9E7FF] text-[#4169FF] flex items-center justify-center font-bold text-sm">
              Q
            </span>
            <div>
              <h3 className="text-base font-bold text-[#10152E]">
                {step === 6 ? 'Booking Confirmed!' : 'Request Queue Assistance'}
              </h3>
              <p className="text-xs text-gray-500">
                {step < 6 ? `Step ${step} of 5 — Instant pilot booking` : 'Your request is now in queue'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 6 && (
          <div className="w-full bg-gray-100 h-1">
            <div
              className="h-full bg-gradient-to-r from-[#4169FF] via-[#45DFFF] to-[#7357FF] transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto">
          
          {/* STEP 1: Select Service Category */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-left">
                <h4 className="text-lg font-bold text-[#10152E]">Choose Service Type</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Select the type of assistance you require in Bhimavaram
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCatId === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCatId(cat.id)}
                      className={`p-4 rounded-2xl cursor-pointer border text-left transition-all ${
                        isSelected
                          ? 'border-[#4169FF] bg-[#E9E7FF]/40 shadow-[0_8px_20px_rgba(65,105,255,0.12)]'
                          : 'border-gray-200/80 bg-white hover:border-[#4169FF]/40 hover:bg-gray-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-[#4169FF] text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-[#4169FF] bg-white px-2 py-0.5 rounded-full border border-[#4169FF]/20">
                          ₹{cat.fee}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-[#10152E]">{cat.name}</h5>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Location Details */}
          {step === 2 && (
            <div className="space-y-4 text-left">
              <div>
                <h4 className="text-lg font-bold text-[#10152E]">Specify Service Location</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Where should the assistant report or hold a spot in Bhimavaram?
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Popular Hubs (Quick Select)
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentCategory.popularLocations.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setServiceLocation(loc)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        serviceLocation === loc
                          ? 'bg-[#4169FF] text-white border-[#4169FF]'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#4169FF]/40'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Exact Location / Counter Name
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={serviceLocation}
                    onChange={(e) => setServiceLocation(e.target.value)}
                    placeholder="e.g. Aadhaar Seva Kendra, Old Bus Stand Road"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#4169FF] focus:ring-1 focus:ring-[#4169FF] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Destination / Delivery Point (Optional)
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Handover to me outside hall or Deliver to Gandhi Nagar"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#4169FF] outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Date & Preferred Time */}
          {step === 3 && (
            <div className="space-y-4 text-left">
              <div>
                <h4 className="text-lg font-bold text-[#10152E]">Preferred Schedule</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Select when you need the queue assistance
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#4169FF] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="time"
                      value={targetTime}
                      onChange={(e) => setTargetTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#4169FF] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#E9E7FF]/50 border border-[#4169FF]/15 flex items-start gap-2.5 text-xs text-[#10152E]">
                <Sparkles className="w-4 h-4 text-[#4169FF] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Pilot Guarantee:</strong> Local verified assistants in Bhimavaram check-in 10-15 minutes prior to secure your spot.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Contact & Specific Instructions */}
          {step === 4 && (
            <div className="space-y-4 text-left">
              <div>
                <h4 className="text-lg font-bold text-[#10152E]">Task Details & Contact</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Provide instructions so your assistant knows exactly what to do
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#4169FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#4169FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Task Requirements / Instructions
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Please take token for electricity billing counter #2. I will arrive when 3 people remain ahead."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#4169FF] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Confirm */}
          {step === 5 && (
            <div className="space-y-5 text-left">
              <div>
                <h4 className="text-lg font-bold text-[#10152E]">Review Request Details</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Confirm your booking summary before dispatching to assistants
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Service Category</span>
                  <span className="font-bold text-[#10152E]">{currentCategory.name}</span>
                </div>
                <div className="flex justify-between items-start py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Location</span>
                  <span className="font-bold text-[#10152E] max-w-[60%] text-right">{serviceLocation}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Schedule</span>
                  <span className="font-bold text-[#10152E]">{targetDate} at {targetTime}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-200/60">
                  <span className="text-gray-500 font-medium">Customer</span>
                  <span className="font-bold text-[#10152E]">{customerName} ({customerPhone})</span>
                </div>
                {notes && (
                  <div className="flex justify-between items-start py-1 border-b border-gray-200/60">
                    <span className="text-gray-500 font-medium">Notes</span>
                    <span className="text-gray-700 max-w-[60%] text-right">{notes}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 text-sm font-black text-[#10152E]">
                  <span>Total Pilot Service Fee</span>
                  <span className="text-[#4169FF] text-base">₹{currentCategory.fee}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>No advance payment needed. Pay in person upon successful spot handover.</span>
              </div>
            </div>
          )}

          {/* STEP 6: Confirmation Screen */}
          {step === 6 && createdBooking && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#10152E]">
                  Booking Successfully Placed!
                </h4>
                <p className="text-sm font-semibold text-[#4169FF] mt-1 font-mono">
                  {createdBooking.bookingNumber}
                </p>
                <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto">
                  Your request is live for verified assistants in Bhimavaram. You will receive real-time updates as soon as an assistant accepts.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 text-xs text-left max-w-md mx-auto space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-bold text-amber-600 uppercase">PENDING ASSIGNMENT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-bold text-gray-800">{createdBooking.serviceLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Scheduled:</span>
                  <span className="font-bold text-gray-800">
                    {new Date(createdBooking.targetTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    router.push('/dashboard');
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4169FF] to-[#7357FF] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Track in Customer Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        {step < 6 && (
          <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-white transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-[#4169FF] hover:bg-[#3256e0] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer relative z-20 select-none active:scale-95"
              >
                <span>Continue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirmBooking}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4169FF] to-[#7357FF] hover:from-[#3558e0] hover:to-[#6142f0] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 disabled:opacity-50 cursor-pointer relative z-20 select-none active:scale-95"
              >
                {loading ? (
                  <span>Dispatching...</span>
                ) : (
                  <>
                    <span>Confirm Booking (₹{currentCategory.fee})</span>
                    <Check className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
