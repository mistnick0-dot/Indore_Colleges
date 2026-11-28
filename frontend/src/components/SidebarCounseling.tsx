/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, FileText, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Institute } from '../types';

interface SidebarCounselingProps {
  selectedInstitute: Institute | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SidebarCounseling({
  selectedInstitute,
  onClose,
  onSuccess
}: SidebarCounselingProps) {
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [classOrDegree, setClassOrDegree] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (9 AM - 12 PM)');
  const [date, setDate] = useState('');
  const [query, setQuery] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !classOrDegree || !phone || !date) return;

    setSubmitting(true);
    try {
      const fullQuery = selectedInstitute 
        ? `[Inquiry regarding ${selectedInstitute.name}] ${query}`.trim()
        : query;

      const res = await fetch('/api/counseling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName,
          studentName,
          studentClassOrDegree: classOrDegree,
          phone,
          email: email || '',
          preferredSlot,
          date,
          query: fullQuery
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        onSuccess();
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          // Reset states
          setParentName('');
          setStudentName('');
          setClassOrDegree('');
          setPhone('');
          setEmail('');
          setQuery('');
          setDate('');
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting counseling request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex max-w-full sm:pl-10 pl-0">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full sm:w-screen sm:max-w-md bg-white shadow-2xl flex flex-col relative z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-900 text-white">
          <div>
            <h2 className="text-md font-bold">Schedule Counselling</h2>
            <p className="text-[11px] text-gray-300">
              {selectedInstitute 
                ? `Admissions inquiry for ${selectedInstitute.name}` 
                : 'Free general academic selection counsel'}
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-gray-800 transition text-gray-300 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12"
              >
                <div className="rounded-full bg-emerald-50 p-3 text-emerald-600 border border-emerald-100">
                  <CheckCircle className="h-10 w-10 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Slot Requested!</h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1 leading-relaxed">
                    We have reserved your preferred counseling slot. A personal advisor from Indore Colleges will contact you within 2 business hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Parent Name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
                    <User className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    Student / Parent Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>

                {/* Student Name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
                    <User className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    Student Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter student's name"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>

                {/* Class or degree */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    Target Grade / Course *
                  </label>
                  <input
                    type="text"
                    required
                    value={classOrDegree}
                    onChange={(e) => setClassOrDegree(e.target.value)}
                    placeholder="e.g. Class 9, B.Tech CSE, MBA"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
                    <Phone className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    Mobile Number *
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-1 focus-within:ring-red-600 focus-within:border-red-600">
                    <span className="bg-gray-50 border-r border-gray-100 text-xs text-gray-500 px-3 flex items-center font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter 10-digit mobile"
                      className="flex-1 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    Preferred Counseling Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>

                {/* Preferred Slot */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    Time Slot *
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                  >
                    <option>Morning (9 AM - 12 PM)</option>
                    <option>Afternoon (12 PM - 4 PM)</option>
                    <option>Evening (4 PM - 7 PM)</option>
                  </select>
                </div>

                {/* Query/Message */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center">
                    <FileText className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    Describe your requirements
                  </label>
                  <textarea
                    rows={3}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tell us about student interests, hostel requirements, or fee budget..."
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50 mt-4"
                >
                  {submitting ? 'Submitting Slot...' : 'Schedule Personal Counselling'}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
