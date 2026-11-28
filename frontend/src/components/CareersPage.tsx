/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Send, 
  Heart, 
  Users, 
  Smile, 
  UploadCloud,
  CheckCircle2
} from 'lucide-react';

export default function CareersPage() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formPosition, setFormPosition] = useState('counselor');
  const [formPitch, setFormPitch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone || !formPitch) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
          position: formPosition,
          pitch: formPitch
        })
      });

      if (res.ok) {
        setSuccess(true);
        setFormName('');
        setFormEmail('');
        setFormPhone('');
        setFormPitch('');
        setTimeout(() => setSuccess(false), 5000);
      } else {
        console.error('Failed to submit career application');
      }
    } catch (err) {
      console.error('Error submitting career application:', err);
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
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 border border-emerald-100"
          >
            Careers at Indore Colleges
          </motion.span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Help Students Find Their Perfect Campus Match
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
            Join Central India's fastest-growing admissions advisory desk. Build technologies and advise families to secure future academic excellence in Indore.
          </p>
        </div>

        {/* Why work with us cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-sm text-gray-900">Student First Environment</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We never pitch sponsored courses. Feel proud knowing every advice session is aligned strictly to true merit, coordinates, and family budgets.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Smile className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-sm text-gray-900">Supportive Team & Benefits</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Enjoy premium healthcare, flexible Indore-wide field reporting structures, direct mentorship, and competitive regional compensation schemes.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-sm text-gray-900">Centralized Vijay Nagar Office</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Collaborate on-site at our beautiful, highly accessible corporate headquarters located directly in the bustling heart of Scheme 54, Indore.
            </p>
          </div>
        </div>

        {/* Two Columns: Open Jobs vs. Quick Apply Form */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: Open positions lists */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-600" />
              <span>Current Open Positions</span>
            </h2>
            <p className="text-xs text-gray-400 mb-6">Positions based full-time out of our Scheme 54 HQ with local field travel as required.</p>

            <div className="space-y-4">
              {[
                {
                  title: 'Senior Admissions Counselor',
                  dept: 'Vijay Nagar Advising Desk',
                  location: 'Scheme 54, Indore',
                  type: 'Full-Time',
                  desc: 'Host face-to-face academic sessions for local parents and students. Walk applicants through marksheets, admission coordinates, and entrance score ranges.'
                },
                {
                  title: 'Campus Relations & Field Auditor',
                  dept: 'Institutional Audits & Reviews',
                  location: 'Indore Suburban Corridors',
                  type: 'Full-Time / Travel',
                  desc: 'Visit registered colleges, verify campus labs, take pictures, write coordinate files, and interview on-campus seniors regarding authentic placement records.'
                },
                {
                  title: 'Full-Stack Developer (MERN / React)',
                  dept: 'EduTech Product Team',
                  location: 'Indore (Hybrid)',
                  type: 'Full-Time',
                  desc: 'Maintain the Indore Colleges portal, integrate interactive Google Maps Platform layers, scale reviews databases, and optimize the counseling dashboard state.'
                }
              ].map((job, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-2xs space-y-3 hover:border-emerald-100 transition">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-900">{job.title}</h4>
                      <span className="text-[10px] text-gray-400 font-semibold">{job.dept}</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {job.type}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {job.desc}
                  </p>

                  <div className="flex items-center space-x-4 text-[10px] text-gray-400 font-bold pt-2 border-t border-gray-50">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-emerald-600" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-emerald-600" /> Posted 3 days ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Quick Apply Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6 sticky top-24">
              <div>
                <h2 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-1.5">
                  <UploadCloud className="h-5 w-5 text-emerald-600 animate-pulse" />
                  <span>Quick Institutional Application</span>
                </h2>
                <p className="text-xs text-gray-400">Apply instantly. Our advisory team will reach out via call within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. rahul@gmail.com"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Interested Role</label>
                  <select
                    value={formPosition}
                    onChange={(e) => setFormPosition(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  >
                    <option value="counselor">Senior Admissions Counselor</option>
                    <option value="field">Campus Relations & Field Auditor</option>
                    <option value="developer">Full-Stack Developer</option>
                    <option value="intern">Admissions Coordinator Intern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Brief Pitch / LinkedIn Resume Link</label>
                  <textarea
                    value={formPitch}
                    onChange={(e) => setFormPitch(e.target.value)}
                    placeholder="Introduce yourself or paste a link to your Google Drive resume/LinkedIn profile..."
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition flex items-center justify-center space-x-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  <Send className="h-4 w-4" />
                  <span>{submitting ? 'Submitting Application...' : 'Submit Application'}</span>
                </button>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-center flex items-center justify-center gap-1.5 text-xs font-semibold"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>Application Submitted successfully!</span>
                  </motion.div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
