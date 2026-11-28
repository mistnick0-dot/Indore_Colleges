/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';
import { 
  Building, 
  Users, 
  Award, 
  Compass, 
  Target, 
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Sparkles
} from 'lucide-react';

export default function AboutUsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50/50 min-h-screen py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <Logo size="xl" />
          </div>
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-red-600 border border-red-100"
          >
            Our Mission & Story
          </motion.span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Guiding Indore's Future Generations Since 2018
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
            We are Central India's leading specialized admissions consulting desk, dedicated to making local college, university, and professional school selection fully transparent, verified, and stress-free.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Verified Institutes', value: '100+' },
            { label: 'Counselled Students', value: '15,000+' },
            { label: 'Indore Sectors Covered', value: '48+' },
            { label: 'Years of Excellence', value: '8+' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-xs">
              <span className="block text-3xl sm:text-4xl font-black text-red-600">{stat.value}</span>
              <span className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Two-Column Story & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="h-6 w-6 text-red-600" />
              <span>Why We Built Indore Colleges</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              Historically, students and families navigating higher education in Madhya Pradesh faced fragmented fee schedules, incomplete placement records, and high-pressure commission-driven sales tactics.

              Indore Colleges was founded by a coalition of local educators, alumni, and tech developers to solve this. We maintain a non-biased, standardized index of every school and college in the Indore region—complete with coordinates, facilities auditing, real verified review comment threads, and easy basket applications.
            </p>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-amber-900/90 text-xs font-semibold leading-relaxed">
              <span className="font-bold block mb-1 flex items-center gap-1">
                <Award className="h-4 w-4 text-amber-700" /> Our Absolute Guarantee
              </span>
              We never accept premium backend placement commissions from colleges. Every piece of advice is matched directly to your budget, score merits, and location preferences.
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200/50 aspect-video md:aspect-square relative shadow-xs">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Indore Colleges Team Working Together" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* FULL-STACK ECOSYSTEM SECTION */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
              <Building className="h-4 w-4" />
              <span>Full-Stack Ecosystem</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0F244C] font-outfit">
              One Portal. Complete Admission Alignment.
            </h2>
            <p className="text-sm text-gray-500 mt-2.5 font-normal">
              We make academic research, choice comparisons, direct expert consultations, and application locking fully seamless.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-6">
            
            {/* Block 1: Verified Colleges (Col-Span 6) */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-100 rounded-[2rem] p-8 flex flex-col justify-between group hover:border-slate-200 transition duration-300 shadow-xs">
              <div className="space-y-5">
                <div className="h-11 w-11 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-red-600 shadow-xs">
                  <ShieldCheck className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] font-outfit">2,500+ Verified Higher Institutes</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2.5 font-light">
                    Make critical higher education decisions with pure confidence using our meticulously verified, audited, and updated catalog of top colleges in Indore.
                  </p>
                </div>
              </div>
            </div>

            {/* Block 2: Admission Support (Col-Span 6) */}
            <div className="lg:col-span-6 bg-red-600/5 border border-red-600/10 rounded-[2rem] p-8 flex flex-col justify-between group hover:bg-red-600/10 transition duration-300 shadow-xs">
              <div className="space-y-5">
                <div className="h-11 w-11 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 shadow-xs">
                  <GraduationCap className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F244C] font-outfit">Expert Admission Support</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2.5 font-light">
                    Harness the power of direct dean interfaces and unified counsel callback desks. Never settle for less when choosing your future career route.
                  </p>
                </div>
              </div>
            </div>

            {/* Block 3: Compare Choose Apply (Col-Span 6) */}
            <div className="lg:col-span-6 bg-[#0F244C] text-white rounded-[2rem] p-8 flex flex-col justify-between group transition duration-300 shadow-xs">
              <div className="space-y-5">
                <div className="h-11 w-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-300 shadow-xs">
                  <Award className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-outfit">Compare, Choose & Apply</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mt-2.5 font-light">
                    Save top targets in your Admissions Basket, request bulk callbacks, and let our senior advisors manage direct submissions for you.
                  </p>
                </div>
              </div>
            </div>

            {/* Block 4: Institute Search (Col-Span 6) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0F244C] to-[#142d5c] text-white rounded-[2rem] p-8 flex flex-col justify-between group transition duration-300 shadow-xs">
              <div className="space-y-5">
                <div className="h-11 w-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-red-400 shadow-xs">
                  <BookOpen className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-outfit">Intelligent Matchmaking</h3>
                  <p className="text-xs text-red-200 leading-relaxed mt-2.5 font-light">
                    Filter by exact location areas in Indore, campus facility sets, fee ranges, and specific academic affiliations in seconds.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* DEDICATED PORTALS SECTION */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Dedicated Portals</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0F244C] font-outfit">
              We Accompany You At Every Step
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition"
            >
              <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-lg mb-5 shadow-xs">
                🎓
              </div>
              <h3 className="text-sm font-bold text-[#0F244C] font-outfit">Bespoke Alignments</h3>
              <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-light">
                Get a customized layout of Engineering, Management, or Medical streams in Indore aligned strictly to your career aspirations.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition"
            >
              <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-lg mb-5 shadow-xs">
                👥
              </div>
              <h3 className="text-sm font-bold text-[#0F244C] font-outfit">Direct Counselling</h3>
              <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-light">
                Secure 1-on-1 interaction with senior local guides to demystify complex fee metrics and campus placement charts.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition"
            >
              <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-lg mb-5 shadow-xs">
                ✨
              </div>
              <h3 className="text-sm font-bold text-[#0F244C] font-outfit">Complete Alignment</h3>
              <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-light">
                We handle college comparative charts, dean interaction setups, hostel verification audits, and documentation checks.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition"
            >
              <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-lg mb-5 shadow-xs">
                🛡️
              </div>
              <h3 className="text-sm font-bold text-[#0F244C] font-outfit">End-to-End Guarantee</h3>
              <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-light">
                From drafting primary query tickets down to finalized seat booking confirmation, our support is always active.
              </p>
            </motion.div>

          </div>
        </div>



        {/* Our Values Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-xs grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="h-10 w-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-bold">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Unbiased Accuracy</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We catalog real tuition rates, official affiliation documents, and physical amenities. No sponsored overrides.
            </p>
          </div>
          <div className="space-y-3">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Student First Focus</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every counseling form, checklist callback, and admission basket action is tailored to individual academic and geographic needs.
            </p>
          </div>
          <div className="space-y-3">
            <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Localized Expertise</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              From Sanwer Road industrial belts to the Simrol high-tech IIT corridor, our advisors know Indore inside out.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

