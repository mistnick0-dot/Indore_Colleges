/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  MessageSquare,
  Sparkles,
  Youtube,
  Instagram,
  ExternalLink
} from 'lucide-react';

export default function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('counseling');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message
        })
      });

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setTimeout(() => setSuccess(false), 5000);
      } else {
        console.error('Failed to submit contact request');
      }
    } catch (err) {
      console.error('Error submitting contact request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50/50 min-h-screen py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-red-600 border border-red-100"
          >
            Get In Touch
          </motion.span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Contact Our Indore Advising Desk
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
            Have questions about fees, affiliation boards, or campus counseling? Reach out directly to our central offices at Scheme 54, Vijay Nagar.
          </p>
        </div>

        {/* Quick Contacts Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs text-center space-y-2">
            <div className="mx-auto h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">Support Email</h4>
            <p className="font-extrabold text-xs sm:text-sm text-red-600 select-all break-all">
              <a href="mailto:Indorecollegeshub@gmail.com" className="hover:underline">
                Indorecollegeshub@gmail.com
              </a>
            </p>
            <p className="text-[10px] text-gray-400">Response within 4 working hours</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs text-center space-y-2">
            <div className="mx-auto h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">HQ Address</h4>
            <p className="font-extrabold text-xs text-gray-950 leading-snug">Plot 124, Scheme 54, Vijay Nagar</p>
            <p className="text-[10px] text-gray-400">Indore, M.P. - 452010</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs text-center space-y-2">
            <div className="mx-auto h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider">Office Hours</h4>
            <p className="font-extrabold text-sm text-gray-900">09:30 AM - 06:30 PM</p>
            <p className="text-[10px] text-gray-400">Sunday Closed</p>
          </div>
        </div>

        {/* Two Columns: Inquiry Form & HQ Map Info */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <MessageSquare className="h-5 w-5 text-red-600" />
                <span>Submit a Consultation Request</span>
              </h2>
              <p className="text-xs text-gray-400">Ask us anything about admissions basket, coordinate locations, or stream guides.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@gmail.com"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Subject Matter</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                  >
                    <option value="counseling">Private Admissions Counseling</option>
                    <option value="fees">Fee structures & Board Queries</option>
                    <option value="tech">Website Bug or Tech Support</option>
                    <option value="other">General Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Detailed Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your query. Mention any specific Indore colleges or streams you are targeting..."
                  rows={5}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center justify-center space-x-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <Send className="h-4 w-4" />
                <span>{submitting ? 'Sending Request...' : 'Send Message'}</span>
              </button>

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-center flex items-center justify-center gap-1.5 text-xs font-semibold"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Your consultation message has been submitted successfully!</span>
                </motion.div>
              )}
            </form>
          </div>

          {/* RIGHT: HQ Info & Map directions guide */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-800 shadow-sm">
              <h3 className="font-extrabold text-sm text-red-400 flex items-center gap-1 uppercase tracking-wide">
                <Sparkles className="h-4 w-4" />
                <span>Visit Our Center</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                Our main advising studio has free parking and high-speed Wi-Fi, where our advisors can demonstrate stream options and coordinate matching systems.
              </p>
              
              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-gray-400 font-semibold">
                <div>
                  <span className="block text-[10px] text-gray-500 uppercase font-bold">Directions Key landmark</span>
                  <p className="text-white">Opposite Vijay Nagar Police Station, near C21 Mall Corridor.</p>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-500 uppercase font-bold">Local Transits</span>
                  <p className="text-white">Vijay Nagar BRTS Bus Stop is exactly a 3-minute walk.</p>
                </div>
              </div>
            </div>

            {/* Official Social Media Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3.5">
              <h4 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider flex items-center justify-between">
                <span>Official Social Accounts</span>
                <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded font-bold">VERIFIED</span>
              </h4>
              <p className="text-xs text-gray-500 font-medium">
                Follow our channels for daily Indore college notifications, campus walk-throughs, and cut-off updates.
              </p>
              
              <div className="space-y-2 pt-1">
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@Indorecolleges"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-red-100 hover:border-red-300 hover:bg-red-50/50 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                      <Youtube className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 group-hover:text-red-600 transition">YouTube</p>
                      <p className="text-[11px] text-gray-500">@Indorecolleges</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-600 transition" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/indorecolleges?stkn=bHhwNHpzYjg0Ym4z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-pink-100 hover:border-pink-300 hover:bg-pink-50/50 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 group-hover:text-pink-600 transition">Instagram</p>
                      <p className="text-[11px] text-gray-500">@indorecolleges</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-pink-600 transition" />
                </a>

                {/* Email */}
                <a
                  href="mailto:Indorecollegeshub@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 transition group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 group-hover:text-purple-600 transition">Email Desk</p>
                      <p className="text-[11px] text-gray-500 truncate">Indorecollegeshub@gmail.com</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 transition shrink-0" />
                </a>
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-xs text-red-600/90 leading-relaxed font-semibold">
              <h4 className="font-bold mb-1 text-red-600 flex items-center gap-1">
                <HelpCircle className="h-4 w-4 text-red-600" />
                Need immediate response?
              </h4>
              You can also click on our Virtual Advisor orb chatbot at the bottom-right of the screen to receive real-time response guides for standard stream questions instantly!
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
