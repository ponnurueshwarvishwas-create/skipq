'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { BookingModal } from '@/components/booking/BookingModal';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Queue Assistance Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFF] text-[#0B0F1F]">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4169FF]/10 text-[#4169FF] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilot Coordination</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0B0F1F] tracking-tight mb-6">
              Get in Touch with SkipQ
            </h1>
            <p className="text-base sm:text-lg text-[#0B0F1F]/70 leading-relaxed">
              Have questions about our Bhimavaram pilot, want to join as an assistant, or need custom queue coordination? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
                <h3 className="font-bold text-xl text-[#0B0F1F] mb-6">Pilot Operations Office</h3>
                
                <div className="space-y-6 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4169FF] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B0F1F]">Bhimavaram Central Desk</h4>
                      <p className="text-xs text-[#0B0F1F]/65 mt-0.5 leading-relaxed">
                        Near Mavullamma Temple Road, J.P. Road Junction, Bhimavaram, West Godavari, Andhra Pradesh 534201
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7357FF] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B0F1F]">Helpline & WhatsApp</h4>
                      <p className="text-xs text-[#0B0F1F]/65 mt-0.5">+91 8816 220011</p>
                      <p className="text-[11px] text-[#0B0F1F]/45 mt-0.5">Mon–Sat: 8:30 AM – 7:00 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#45DFFF] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#4169FF]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B0F1F]">Email Support</h4>
                      <p className="text-xs text-[#0B0F1F]/65 mt-0.5">support@skipq.in</p>
                      <p className="text-[11px] text-[#0B0F1F]/45 mt-0.5">Response within 2 business hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#4169FF]/5 border border-[#4169FF]/15 text-xs text-[#0B0F1F]/70">
                <p className="font-semibold text-[#4169FF] mb-1">Applying as an Assistant?</p>
                <p>Visit the <a href="/assistant" className="underline font-bold text-[#0B0F1F]">Assistant Desk</a> or drop in at our J.P. Road office with your original Aadhaar and college/voter ID.</p>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-[#0B0F1F] mb-2">Message Dispatched!</h3>
                    <p className="text-sm text-[#0B0F1F]/70 max-w-md mx-auto mb-6">
                      Thank you for reaching out. A SkipQ pilot coordinator in Bhimavaram will get in touch with you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full text-xs font-bold text-[#4169FF] bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-bold text-xl text-[#0B0F1F] mb-4">Send Us a Direct Message</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B0F1F]/75 mb-1.5">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rajesh Varma"
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/15 text-sm outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0B0F1F]/75 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98480 XXXXX"
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/15 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B0F1F]/75 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rajesh@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/15 text-sm outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0B0F1F]/75 mb-1.5">Inquiry Type</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/15 text-sm outline-none transition-all bg-white"
                        >
                          <option>Queue Assistance Inquiry</option>
                          <option>Assistant Partnership</option>
                          <option>Merchant / Business Partnership</option>
                          <option>Feedback or Issue Report</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B0F1F]/75 mb-1.5">Message / Details</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you need or which venue queue you need help with..."
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#4169FF] focus:ring-2 focus:ring-[#4169FF]/15 text-sm outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#4169FF] to-[#7357FF] hover:from-[#3558e0] hover:to-[#6142f0] shadow-lg shadow-[#4169FF]/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message to Pilot Desk</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
