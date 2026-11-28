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
    id: 'diploma',
    label: 'Diploma',
    match: (name) => /diploma/i.test(name) && !/pharm/i.test(name),
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
    col.id === 'malwa-group-of-institutes' ||
    col.id === 'prestige-university' ||
    col.id === 'indore-mahavidyalaya' ||
    /\b(sanwer|ujjain|super corridor|airport|jambudi hapsi|pitra parvat|ringn?odiya|bhawrasla|bhavrasla|gram alwasa|baroli|palia|hatod|limbodagari|aurobindo)\b/i.test(loc)
  ) {
    zones.add('Ujjain Road / Sanwer Road');
  }

  if (
    col.id === 'index-medical' ||
    col.id === 'lnct-bhopal-indore' ||
    /\b(bypass|manglia|mangliya|dewas|dakachya|ralamandal|jhalaria|kailod kartal|nemawar)\b/i.test(loc)
  ) {
    zones.add('Bypass Road / Dewas Bypass');
  }

  if (
    col.id !== 'malwa-group-of-institutes' && (
      col.id === 'davv' ||
      /\b(khandwa|simrol|takshashila|iet-davv|umrikheda|datoda|chokhi dhani|gokanya|hemkunt)\b/i.test(loc) ||
      (/\blimbodi\b/i.test(loc) && !/\blimbodagari\b/i.test(loc))
    )
  ) {
    zones.add('Khandwa Road');
  }

  if (
    /\b(pithampur|pitampur|pigdamber|rajendra nagar)\b/i.test(loc) ||
    (/\brau\b/i.test(loc) && !/\bbypass\b/i.test(loc)) ||
    (/\bmhow\b/i.test(loc) && !/\bkhandwa\b/i.test(loc))
  ) {
    zones.add('Rau / Pithampur / Mhow Road');
  }

  if (
    zones.size === 1 ||
    /\b(indore city|vijay nagar|palasia|bhawarkua|vallabh|residency|bicholi|annapurna|scheme|gumasta|subhash marg|mog lines|m\.o\.g\. lines|lalaram|ganesh ganj|bombay hospital|hig main|world cup|anurag nagar|press complex|nipania main)\b/i.test(loc)
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

const BRANCH_SYNONYMS: Record<string, string[]> = {
  cs: ['computer science', 'cse', 'computing'],
  cse: ['computer science', 'cs', 'computer engineering'],
  it: ['information technology'],
  ai: ['artificial intelligence', 'ai & ml', 'aiml', 'ai & data science'],
  aiml: ['ai & ml', 'artificial intelligence', 'machine learning'],
  ml: ['machine learning', 'ai & ml'],
  ds: ['data science'],
  ec: ['electronics', 'ece', 'e&tc'],
  ece: ['electronics', 'communication', 'telecommunication'],
  ee: ['electrical'],
  eee: ['electrical', 'electronics'],
  me: ['mechanical'],
  ce: ['civil'],
  hr: ['human resource', 'hrm'],
  hrm: ['human resource'],
  fin: ['finance', 'financial'],
  mkt: ['marketing'],
  ib: ['international business'],
  pharm: ['pharmaceutics', 'pharmacology', 'pharmacognosy', 'pharmaceutical'],
};

function doesBranchMatch(college: Institute, courseOpt: CourseOption, typedBranch: string): boolean {
  const cleaned = typedBranch.trim();
  if (!cleaned || /^all(\s+branches?)?$/i.test(cleaned)) return true;
  const targetNorm = normalizeToken(cleaned);
  if (!targetNorm || targetNorm === 'all' || targetNorm === 'all branches') return true;

  const queryTerms = [targetNorm, ...(BRANCH_SYNONYMS[targetNorm] || [])];
  const matchingCourses = (college.coursesList || []).filter(c => courseOpt.match(c.name, college.category));

  for (const c of matchingCourses) {
    const branches = getCourseBranches(c.name, c.specializations);
    const courseTitleNorm = normalizeToken(c.name);
    if (queryTerms.some(q => courseTitleNorm.includes(q))) {
      return true;
    }
    for (const branch of branches) {
      const branchNorm = normalizeToken(branch);
      if (queryTerms.some(q => branchNorm === q || branchNorm.includes(q) || q.includes(branchNorm))) {
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
  const [typedBranch, setTypedBranch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBudgetId, setSelectedBudgetId] = useState('');
  const [selectedCollegeNames, setSelectedCollegeNames] = useState<string[]>([]);

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

  // 5. Filtered target colleges matching Course + Typed Branch + Location + Budget
  const filteredColleges = useMemo(() => {
    if (!selectedCourseOpt || !typedBranch.trim() || !selectedLocation || !selectedBudgetId) {
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
      if (!doesBranchMatch(col, selectedCourseOpt, typedBranch)) return false;

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
  }, [colleges, selectedCourseOpt, typedBranch, selectedLocation, selectedBudgetId]);

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
    setTypedBranch('All Branches');
    const zones = mapCollegeToLocations(match);
    setSelectedLocation(zones.find(z => z !== 'All Locations in Indore') || 'All Locations in Indore');
    setSelectedBudgetId('any');
    setSelectedCollegeNames([match.name]);
  }, [colleges]);

  // Keep only currently matched colleges selected when filters change
  useEffect(() => {
    const validNames = new Set(filteredColleges.map(c => c.name));
    setSelectedCollegeNames(prev => {
      const next = prev.filter(name => validNames.has(name));
      return next.length === prev.length ? prev : next;
    });
  }, [filteredColleges]);

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    setTypedBranch('');
    setSelectedCollegeNames([]);
  };

  const toggleCollegeSelection = (collegeName: string) => {
    setSelectedCollegeNames(prev =>
      prev.includes(collegeName)
        ? prev.filter(item => item !== collegeName)
        : [...prev, collegeName]
    );
  };

  const handleSelectAllColleges = () => {
    setSelectedCollegeNames(filteredColleges.map(c => c.name));
  };

  const handleClearColleges = () => {
    setSelectedCollegeNames([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!selectedCourseOpt || !typedBranch.trim() || !selectedLocation || !selectedBudgetId || selectedCollegeNames.length === 0) {
      setSubmitError('Please fill Course, Branch, Location, Budget, and choose at least one Targeted College.');
      return;
    }
    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim()) {
      setSubmitError('Please enter your name, email address, and WhatsApp number.');
      return;
    }

    const firstChosen = filteredColleges.find(c => selectedCollegeNames.includes(c.name));
    const budgetOpt = BUDGET_OPTIONS.find(b => b.id === selectedBudgetId);
    const effectiveFee = firstChosen ? getEffectiveAnnualFee(firstChosen, selectedCourseOpt) : (budgetOpt?.maxAnnualFee || 0);
    const cleanBranch = typedBranch.trim();

    setSubmitting(true);
    try {
      const res = await fetch('/api/register-school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedCollegeNames.join(', '),
          targetColleges: selectedCollegeNames,
          course: selectedCourseOpt.label,
          branch: cleanBranch,
          budget: budgetOpt?.label || 'Any Budget',
          type: 'college',
          category: !/^all(\s+branches?)?$/i.test(cleanBranch)
            ? `${selectedCourseOpt.label} - ${cleanBranch}`
            : selectedCourseOpt.label,
          boardOrAffiliation: firstChosen?.boardOrAffiliation || 'Affiliated / Recognized',
          location: selectedLocation,
          feePerAnnum: effectiveFee,
          establishedYear: 2026,
          contactName: contactName.trim(),
          contactEmail: contactEmail.trim(),
          contactPhone: contactPhone.trim(),
          description: `Course: ${selectedCourseOpt.label} | Branch: ${cleanBranch} | Budget: ${budgetOpt?.label || 'Any'} | Targeted Colleges (${selectedCollegeNames.length}): ${selectedCollegeNames.join(', ')}`,
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
    setTypedBranch('');
    setSelectedLocation('');
    setSelectedBudgetId('');
    setSelectedCollegeNames([]);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setSubmitError('');
    setSuccess(false);
  };

  const allFiltersSelected = Boolean(selectedCourseOpt && typedBranch.trim() && selectedLocation && selectedBudgetId);

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
              Your direct admission and counseling application for{' '}
              <strong className="text-gray-800">{selectedCollegeNames.join(', ')}</strong> ({selectedCourseOpt?.label} — {typedBranch.trim()}) has been received! Our academic counselor team will contact you shortly via email and WhatsApp.
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
              {/* 1. Course */}
              <div>
                <label htmlFor="reg-course" className="block font-bold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  <span>1. Course *</span>
                </label>
                <select
                  id="reg-course"
                  required
                  value={selectedCourseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium"
                >
                  <option value="">-- Course --</option>
                  {COURSE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Branch (Typeable Input Only) */}
              <div>
                <label htmlFor="reg-branch" className="block font-bold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  <span>2. Branch *</span>
                </label>
                <input
                  id="reg-branch"
                  type="text"
                  required
                  disabled={!selectedCourseOpt}
                  value={typedBranch}
                  onChange={(e) => setTypedBranch(e.target.value)}
                  placeholder={selectedCourseOpt ? 'Type branch (e.g. CSE, Finance, All)' : 'First choose Course'}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium disabled:bg-gray-50 disabled:text-gray-400"
                />
              </div>

              {/* 3. Location */}
              <div>
                <label htmlFor="reg-location" className="block font-bold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  <span>3. Location *</span>
                </label>
                <select
                  id="reg-location"
                  required
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium"
                >
                  <option value="">-- Location --</option>
                  {LOCATION_OPTIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Budget */}
              <div>
                <label htmlFor="reg-budget" className="block font-bold text-gray-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <IndianRupee className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  <span>4. Budget *</span>
                </label>
                <select
                  id="reg-budget"
                  required
                  value={selectedBudgetId}
                  onChange={(e) => setSelectedBudgetId(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600 font-medium"
                >
                  <option value="">-- Budget --</option>
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Targeted Colleges (Multi-Select Checkboxes filtered by 1 + 2 + 3 + 4) */}
              <div className="sm:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span>5. Targeted Colleges (Multi-Select) *</span>
                  </span>
                  {allFiltersSelected && (
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className={`font-bold ${filteredColleges.length > 0 ? 'text-emerald-700' : 'text-amber-600'}`}>
                        {selectedCollegeNames.length} selected / {filteredColleges.length} matching
                      </span>
                      {filteredColleges.length > 0 && (
                        <>
                          <button
                            type="button"
                            onClick={handleSelectAllColleges}
                            className="font-bold text-red-600 hover:underline cursor-pointer"
                          >
                            All
                          </button>
                          <button
                            type="button"
                            onClick={handleClearColleges}
                            className="font-semibold text-gray-500 hover:underline cursor-pointer"
                          >
                            Clear
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {!allFiltersSelected ? (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-4 text-xs text-gray-400 text-center">
                    Complete Course, Branch, Location &amp; Budget above to view matching colleges.
                  </div>
                ) : filteredColleges.length === 0 ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-4 text-xs text-amber-800 text-center">
                    No colleges matched this combination. Try typing <strong>All</strong> or a broader branch, widen Budget, or choose <strong>All Locations in Indore</strong>.
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
                    {filteredColleges.map((col) => {
                      const isChecked = selectedCollegeNames.includes(col.name);
                      return (
                        <label
                          key={col.id}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition ${
                            isChecked ? 'bg-red-50/60' : 'hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCollegeSelection(col.name)}
                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 shrink-0 cursor-pointer"
                          />
                          <div className="min-w-0">
                            <span className="block font-bold text-gray-900 truncate">{col.name}</span>
                            <span className="block text-[11px] text-gray-500">{col.location}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
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
