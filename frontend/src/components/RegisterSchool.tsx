/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ClipboardCheck,
  Mail,
  Phone,
  MapPin,
  IndianRupee,
  CheckCircle,
  GraduationCap,
  BookOpen,
  Layers,
  Building2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { INDORE_INSTITUTES } from '../data/indoreData';
import { Institute } from '../types';

interface CourseOption {
  id: string;
  label: string;
  match: (courseName: string, instCategory: string) => boolean;
}

const COURSE_OPTIONS: CourseOption[] = [
  {
    id: 'btech',
    label: 'B.Tech',
    match: (name) => /\b(b\.?\s*tech|b\.?\s*e\b|bachelor of technology|bachelor of engineering)\b/i.test(name),
  },
  {
    id: 'mtech',
    label: 'M.Tech',
    match: (name) => /\b(m\.?\s*tech|m\.?\s*e\b|master of technology|master of engineering)\b/i.test(name),
  },
  {
    id: 'mba',
    label: 'MBA / PGDM',
    match: (name) => /\b(mba|pgdm|pgp\/mba|pgp-hrm|ipm|epgp|pgpmx|master of business administration)\b/i.test(name),
  },
  {
    id: 'bba',
    label: 'BBA',
    match: (name) => /\b(bba|bachelor of business administration)\b/i.test(name) && !/ll\.?b/i.test(name),
  },
  {
    id: 'bca',
    label: 'BCA',
    match: (name) => /\b(bca|bachelor of computer application)\b/i.test(name),
  },
  {
    id: 'mca',
    label: 'MCA',
    match: (name) => /\b(mca|master of computer application)\b/i.test(name),
  },
  {
    id: 'bcom',
    label: 'B.Com',
    match: (name) => /\b(b\.?\s*com|bachelor of commerce)\b/i.test(name) && !/ll\.?b/i.test(name),
  },
  {
    id: 'mcom',
    label: 'M.Com',
    match: (name) => /\b(m\.?\s*com|master of commerce)\b/i.test(name),
  },
  {
    id: 'bsc',
    label: 'B.Sc',
    match: (name) => /\b(b\.?\s*sc|bachelor of science)\b/i.test(name),
  },
  {
    id: 'msc',
    label: 'M.Sc',
    match: (name) => /\b(m\.?\s*sc|master of science)\b/i.test(name),
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy (B.Pharm / D.Pharm / M.Pharm)',
    match: (name, cat) => /pharm/i.test(name) || cat.toLowerCase() === 'pharmacy',
  },
  {
    id: 'law',
    label: 'Law (LL.B / B.A. LL.B / BBA LL.B / LL.M)',
    match: (name, cat) => /\b(ll\.?\s*b|ll\.?\s*m|law)\b/i.test(name) || cat.toLowerCase() === 'law',
  },
  {
    id: 'medical',
    label: 'Medical & Paramedical',
    match: (name, cat) =>
      /\b(mbbs|bds|bams|md|ms|bpt|bmlt|dmlt|paramedical|physiotherapy|nursing|allied health)\b/i.test(name) ||
      cat.toLowerCase() === 'medical',
  },
  {
    id: 'design',
    label: 'Design (B.Des / Interior / Fashion)',
    match: (name, cat) => /\b(b\.?\s*des|design|fashion|interior)\b/i.test(name) || cat.toLowerCase() === 'design',
  },
  {
    id: 'arts-edu',
    label: 'B.A. / BJMC / B.Ed',
    match: (name) => /\b(b\.?\s*a\.?|m\.?\s*a\.?|bjmc|bajmc|b\.?\s*ed|m\.?\s*ed|mass communication)\b/i.test(name) && !/ll\.?b/i.test(name),
  },
];

const LOCATION_OPTIONS = [
  'All Locations in Indore',
  'Ujjain Road / Sanwer Road',
  'Bypass Road / Dewas Bypass',
  'Khandwa Road',
  'Indore City',
  'Rau / Pithampur / Mhow Road',
] as const;

interface BudgetOption {
  id: string;
  label: string;
  maxAnnualFee: number | null;
  minAnnualFee?: number;
}

const BUDGET_OPTIONS: BudgetOption[] = [
  { id: 'any', label: 'Any Budget', maxAnnualFee: null },
  { id: '50k', label: 'Up to ₹50,000 / year', maxAnnualFee: 50000 },
  { id: '100k', label: 'Up to ₹1,00,000 / year', maxAnnualFee: 100000 },
  { id: '150k', label: 'Up to ₹1,50,000 / year', maxAnnualFee: 150000 },
  { id: '250k', label: 'Up to ₹2,50,000 / year', maxAnnualFee: 250000 },
  { id: '500k', label: 'Up to ₹5,00,000 / year', maxAnnualFee: 500000 },
  { id: 'above-500k', label: 'Above ₹5,00,000 / year', maxAnnualFee: null, minAnnualFee: 500001 },
];

function mapCollegeToLocations(col: Institute): string[] {
  const zones = new Set<string>(['All Locations in Indore']);
  const loc = `${col.location || ''} ${col.address || ''}`.toLowerCase();

  if (
    loc.includes('sanwer') ||
    loc.includes('ujjain') ||
    loc.includes('super corridor') ||
    loc.includes('bhawrasla') ||
    loc.includes('gram alwasa') ||
    loc.includes('baroli')
  ) {
    zones.add('Ujjain Road / Sanwer Road');
  }

  if (
    loc.includes('bypass') ||
    loc.includes('manglia') ||
    loc.includes('mangliya') ||
    loc.includes('dewas') ||
    loc.includes('dakachya') ||
    loc.includes('ralamandal') ||
    loc.includes('jhalaria')
  ) {
    zones.add('Bypass Road / Dewas Bypass');
  }

  if (
    loc.includes('khandwa') ||
    loc.includes('limbodi') ||
    loc.includes('simrol') ||
    loc.includes('takshashila') ||
    loc.includes('bhawarkua') ||
    loc.includes('iet-davv')
  ) {
    zones.add('Khandwa Road');
  }

  if (
    loc.includes('rau') ||
    loc.includes('pithampur') ||
    loc.includes('pitampur') ||
    loc.includes('pigdamber') ||
    loc.includes('rajendra nagar')
  ) {
    zones.add('Rau / Pithampur / Mhow Road');
  }

  if (
    loc.includes('city') ||
    loc.includes('vijay nagar') ||
    loc.includes('palasia') ||
    loc.includes('bhawarkua') ||
    loc.includes('vallabh') ||
    loc.includes('residency') ||
    loc.includes('bicholi') ||
    loc.includes('annapurna') ||
    loc.includes('scheme') ||
    loc.includes('gumasta') ||
    loc.includes('subhash marg') ||
    loc.includes('mog lines') ||
    loc.includes('a.b. road') ||
    loc.includes('lalaram') ||
    loc.includes('ganesh ganj') ||
    loc.includes('nipania') ||
    loc.includes('bombay hospital') ||
    loc.includes('hig') ||
    loc.includes('world cup') ||
    zones.size === 1
  ) {
    zones.add('Indore City');
  }

  return Array.from(zones);
}

function getCourseBranches(courseName: string, specializations?: string[]): string[] {
  const results = new Set<string>();
  if (Array.isArray(specializations)) {
    for (const spec of specializations) {
      const cleaned = spec.trim();
      if (cleaned) results.add(cleaned);
    }
  }
  const inMatch = courseName.match(/\bin\s+([^[\]()]+)$/i) || courseName.match(/\(([^)]+)\)/);
  if (inMatch && inMatch[1]) {
    const candidate = inMatch[1].trim();
    if (
      candidate.length > 2 &&
      !/^(b\.?\s*tech|m\.?\s*tech|b\.?\s*pharm|d\.?\s*pharm|m\.?\s*pharm|mba|bba|bca|mca|b\.?\s*com|m\.?\s*com|b\.?\s*sc|m\.?\s*sc|b\.?\s*a|m\.?\s*a|hons\.?|full time|part-?time|ptdc)$/i.test(
        candidate
      )
    ) {
      results.add(candidate);
    }
  }
  return Array.from(results);
}

function normalizeToken(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function doesBranchMatch(college: Institute, courseOpt: CourseOption, selectedBranch: string): boolean {
  if (!selectedBranch || selectedBranch === 'All Branches') return true;
  const targetNorm = normalizeToken(selectedBranch);

  const matchingCourses = (college.coursesList || []).filter(c => courseOpt.match(c.name, college.category));
  for (const c of matchingCourses) {
    const branches = getCourseBranches(c.name, c.specializations);
    for (const branch of branches) {
      const branchNorm = normalizeToken(branch);
      if (branchNorm === targetNorm || branchNorm.includes(targetNorm) || targetNorm.includes(branchNorm)) {
        return true;
      }
    }
  }
  return false;
}

function parseFeeAmount(feesText?: string): number | null {
  if (!feesText) return null;
  const lakhMatch = feesText.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac|l\b)/i);
  if (lakhMatch) {
    const amount = Math.round(parseFloat(lakhMatch[1]) * 100000);
    return Number.isFinite(amount) && amount > 0 ? amount : null;
  }
  const rupeeMatch = feesText.match(/₹\s*([\d,]+)/);
  if (rupeeMatch) {
    const amount = Number(rupeeMatch[1].replaceAll(',', ''));
    return Number.isFinite(amount) && amount > 0 ? amount : null;
  }
  return null;
}

function getEffectiveAnnualFee(college: Institute, courseOpt?: CourseOption): number {
  if (courseOpt && college.coursesList) {
    const matching = college.coursesList.find(c => courseOpt.match(c.name, college.category));
    if (matching?.fees) {
      const parsed = parseFeeAmount(matching.fees);
      if (parsed && /\/year|per year|1st year|annual|\/yr/i.test(matching.fees)) {
        return parsed;
      }
    }
  }
  return college.feePerAnnum || 0;
}

export default function RegisterSchool() {
  const [colleges, setColleges] = useState<Institute[]>(() => {
    return [...INDORE_INSTITUTES]
      .filter(inst => inst.type === 'college')
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  });

  useEffect(() => {
    fetch('/api/institutes')
      .then(res => res.json())
      .then((data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data]
            .filter((inst: any) => !inst.type || inst.type === 'college')
            .sort((a: any, b: any) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
          setColleges(sorted);
        }
      })
      .catch(() => {});
  }, []);

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBudgetId, setSelectedBudgetId] = useState('');
  const [selectedCollegeName, setSelectedCollegeName] = useState('');

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);

  const selectedCourseOpt = useMemo(
    () => COURSE_OPTIONS.find(opt => opt.id === selectedCourseId),
    [selectedCourseId]
  );

  // 1 & 2. Courses matched colleges -> available branches in that course
  const availableBranches = useMemo(() => {
    if (!selectedCourseOpt) return [];
    const branchSet = new Set<string>();
    for (const col of colleges) {
      const matchingCourses = (col.coursesList || []).filter(c => selectedCourseOpt.match(c.name, col.category));
      if (matchingCourses.length === 0 && !selectedCourseOpt.match('', col.category)) continue;
      for (const c of matchingCourses) {
        for (const b of getCourseBranches(c.name, c.specializations)) {
          branchSet.add(b);
        }
      }
    }
    return ['All Branches', ...Array.from(branchSet).sort((a, b) => a.localeCompare(b))];
  }, [colleges, selectedCourseOpt]);

  // 5. Filtered target colleges matching Course + Branch + Location + Budget
  const filteredColleges = useMemo(() => {
    if (!selectedCourseOpt || !selectedBranch || !selectedLocation || !selectedBudgetId) {
      return [];
    }
    const budgetOpt = BUDGET_OPTIONS.find(b => b.id === selectedBudgetId);

    return colleges.filter(col => {
      // Course check
      const hasCourse =
        (col.coursesList || []).some(c => selectedCourseOpt.match(c.name, col.category)) ||
        selectedCourseOpt.match('', col.category);
      if (!hasCourse) return false;

      // Branch check
      if (!doesBranchMatch(col, selectedCourseOpt, selectedBranch)) return false;

      // Location check
      const colZones = mapCollegeToLocations(col);
      if (!colZones.includes(selectedLocation)) return false;

      // Budget check
      if (budgetOpt && (budgetOpt.maxAnnualFee !== null || budgetOpt.minAnnualFee !== undefined)) {
        const fee = getEffectiveAnnualFee(col, selectedCourseOpt);
        if (fee <= 0) return false;
        if (budgetOpt.maxAnnualFee !== null && fee > budgetOpt.maxAnnualFee) return false;
        if (budgetOpt.minAnnualFee !== undefined && fee < budgetOpt.minAnnualFee) return false;
      }

      return true;
    });
  }, [colleges, selectedCourseOpt, selectedBranch, selectedLocation, selectedBudgetId]);

  // Pre-fill cleanly if ?college= query param is provided
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const collegeParam = params.get('college');
    if (!collegeParam) return;
    const match = colleges.find(
      c => c.name.toLowerCase() === collegeParam.toLowerCase() || c.id === collegeParam
    );
    if (!match) return;

    const matchedCourse = COURSE_OPTIONS.find(opt =>
      (match.coursesList || []).some(c => opt.match(c.name, match.category)) || opt.match('', match.category)
    );
    if (matchedCourse) {
      setSelectedCourseId(matchedCourse.id);
    }
    setSelectedBranch('All Branches');
    const zones = mapCollegeToLocations(match);
    setSelectedLocation(zones.find(z => z !== 'All Locations in Indore') || 'All Locations in Indore');
    setSelectedBudgetId('any');
    setSelectedCollegeName(match.name);
  }, [colleges]);

  // Reset selected college if filter change removes it from filteredColleges
  useEffect(() => {
    if (selectedCollegeName && !filteredColleges.some(c => c.name === selectedCollegeName)) {
      setSelectedCollegeName('');
    }
  }, [filteredColleges, selectedCollegeName]);

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedBranch('');
    setSelectedCollegeName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!selectedCourseOpt || !selectedBranch || !selectedLocation || !selectedBudgetId || !selectedCollegeName) {
      setSubmitError('Please select course, branch, location, budget, and a target college.');
      return;
    }
    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim()) {
      setSubmitError('Please enter your name, email address, and WhatsApp number.');
      return;
    }

    const chosenCollege = filteredColleges.find(c => c.name === selectedCollegeName) || colleges.find(c => c.name === selectedCollegeName);
    const budgetOpt = BUDGET_OPTIONS.find(b => b.id === selectedBudgetId);
    const effectiveFee = chosenCollege ? getEffectiveAnnualFee(chosenCollege, selectedCourseOpt) : (budgetOpt?.maxAnnualFee || 0);

    setSubmitting(true);
    try {
      const res = await fetch('/api/register-school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedCollegeName,
          type: 'college',
          category: selectedBranch !== 'All Branches' ? `${selectedCourseOpt.label} - ${selectedBranch}` : selectedCourseOpt.label,
          boardOrAffiliation: chosenCollege?.boardOrAffiliation || 'Affiliated / Recognized',
          location: selectedLocation,
          feePerAnnum: effectiveFee,
          establishedYear: 2026,
          contactName: contactName.trim(),
          contactEmail: contactEmail.trim(),
          contactPhone: contactPhone.trim(),
          description: `Course: ${selectedCourseOpt.label} | Branch: ${selectedBranch} | Budget: ${budgetOpt?.label || 'Any'}`,
          facilities: []
        })
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        setSubmitError('Unable to submit your application right now. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Unable to submit your application right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSelectedCourseId('');
    setSelectedBranch('');
    setSelectedLocation('');
    setSelectedBudgetId('');
    setSelectedCollegeName('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setSubmitError('');
    setSuccess(false);
  };

  const allFiltersSelected = Boolean(selectedCourseOpt && selectedBranch && selectedLocation && selectedBudgetId);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-8 shadow-sm max-w-3xl mx-auto w-full">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="rounded-full bg-emerald-50 p-4 border border-emerald-100 text-emerald-600 mb-4 animate-bounce">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Application Submitted Successfully!</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-2 leading-relaxed">
              Your direct admission and counseling application for <strong className="text-gray-800">{selectedCollegeName}</strong> ({selectedCourseOpt?.label} — {selectedBranch}) has been received! Our academic counselor team will contact you shortly via email and WhatsApp.
            </p>
            <button
              onClick={handleResetForm}
              className="mt-6 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
            >
              Submit Another Application
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex justify-center">
                <Logo size="lg" />
              </div>
              <h1 className="text-base sm:text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <GraduationCap className="h-6 w-6 text-[#FA6E00] shrink-0" />
                <span>Direct College Admission &amp; Counseling Application</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* 1. Select Course */}
              <div>
                <label htmlFor="reg-course" className="block font-bold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  <span>1. Select Course *</span>
                </label>
                <select
                  id="reg-course"
                  required
                  value={selectedCourseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium"
                >
                  <option value="">-- Select Course --</option>
                  {COURSE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Select Branch */}
              <div>
                <label htmlFor="reg-branch" className="block font-bold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  <span>2. Select Branch *</span>
                </label>
                <select
                  id="reg-branch"
                  required
                  disabled={!selectedCourseOpt}
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="">
                    {selectedCourseOpt ? '-- Select Branch --' : '-- First Select Course --'}
                  </option>
                  {availableBranches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Select Location */}
              <div>
                <label htmlFor="reg-location" className="block font-bold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  <span>3. Select Location *</span>
                </label>
                <select
                  id="reg-location"
                  required
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium"
                >
                  <option value="">-- Select Campus Location --</option>
                  {LOCATION_OPTIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Select Budget */}
              <div>
                <label htmlFor="reg-budget" className="block font-bold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <IndianRupee className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  <span>4. Select Annual Budget *</span>
                </label>
                <select
                  id="reg-budget"
                  required
                  value={selectedBudgetId}
                  onChange={(e) => setSelectedBudgetId(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium"
                >
                  <option value="">-- Select Annual Budget --</option>
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Select Targeted College (filtered by 1 + 2 + 3 + 4) */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="reg-college" className="font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span>5. Select Targeted College *</span>
                  </label>
                  {allFiltersSelected && (
                    <span className={`text-[11px] font-bold ${filteredColleges.length > 0 ? 'text-emerald-700' : 'text-amber-600'}`}>
                      {filteredColleges.length} matching {filteredColleges.length === 1 ? 'college' : 'colleges'}
                    </span>
                  )}
                </div>
                <select
                  id="reg-college"
                  required
                  disabled={!allFiltersSelected || filteredColleges.length === 0}
                  value={selectedCollegeName}
                  onChange={(e) => setSelectedCollegeName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="">
                    {!allFiltersSelected
                      ? '-- Complete Course, Branch, Location & Budget First --'
                      : filteredColleges.length === 0
                        ? '-- No colleges found for these filters (try All Branches / Any Budget / All Locations) --'
                        : '-- Select Matching Targeted College --'}
                  </option>
                  {filteredColleges.map((col) => {
                    const effectiveFee = getEffectiveAnnualFee(col, selectedCourseOpt);
                    const feeTag = effectiveFee > 0 ? `₹${effectiveFee.toLocaleString('en-IN')}/yr` : 'Contact college';
                    return (
                      <option key={col.id} value={col.name}>
                        {col.name} ({col.location} • {feeTag})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* 6. Applicant / Student Details */}
              <div className="sm:col-span-2 pt-3 pb-1 border-t border-gray-100 mt-2">
                <h2 className="font-bold text-gray-900 text-xs flex justify-center items-center space-x-1.5 uppercase tracking-wider">
                  <ClipboardCheck className="h-4 w-4 text-red-600 shrink-0" />
                  <span>6. Student / Applicant Information</span>
                </h2>
              </div>

              <div>
                <label htmlFor="reg-name" className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar Verma"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label htmlFor="reg-email" className="block font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  <Mail className="h-3.5 w-3.5 mr-1 text-gray-400 shrink-0" />
                  <span>Email Address *</span>
                </label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="ramesh@gmail.com"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="reg-whatsapp" className="block font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-1 text-gray-400 shrink-0" />
                  <span>WhatsApp Number *</span>
                </label>
                <input
                  id="reg-whatsapp"
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. +91 98260 11223"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            {submitError && (
              <p role="alert" className="text-xs font-semibold text-red-600 text-center">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Submitting Application...' : 'Submit Application & Request Counselor Callback'}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
