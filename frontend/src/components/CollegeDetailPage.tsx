
import React, { useState, useEffect } from 'react';
import { Institute, Review } from '../types';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Award, 
  IndianRupee, 
  Calendar, 
  Check, 
  Send, 
  Mail, 
  PhoneCall, 
  Heart, 
  ShoppingCart, 
  Building, 
  Clock, 
  ShieldCheck, 
  Bookmark,
  ExternalLink,
  GraduationCap,
  Video,
  FileText,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './Logo';

interface CollegeDetailPageProps {
  key?: string;
  institute: Institute;
  onBack: () => void;
  onScheduleCounseling: (inst: Institute) => void;
  isShortlisted: boolean;
  onToggleShortlist: () => void;
  isInCart: boolean;
  onToggleCart: () => void;
}

// Helper to detect and normalize video source URLs (MP4, WebM, YouTube, Vimeo)
function parseVideoSource(url?: string): {
  type: 'youtube' | 'vimeo' | 'html5' | 'none';
  src: string;
  videoId?: string;
} {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return { type: 'none', src: '' };
  }
  const clean = url.trim();

  // YouTube match (standard, short, or embed)
  const ytMatch = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      videoId: ytMatch[1],
      src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`
    };
  }

  // Vimeo match
  const vimeoMatch = clean.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      videoId: vimeoMatch[1],
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}`
    };
  }

  // Direct video (mp4, webm, etc.)
  return {
    type: 'html5',
    src: clean
  };
}

export default function CollegeDetailPage({
  institute,
  onBack,
  onScheduleCounseling,
  isShortlisted,
  onToggleShortlist,
  isInCart,
  onToggleCart
}: CollegeDetailPageProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  
  // Review form states
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'placements' | 'cutoffs' | 'facilities' | 'faculty' | 'reviews'>('overview');

  const reviewVideoSource = parseVideoSource(institute.videoUrl || institute.backgroundVideoUrl);

  useEffect(() => {
    fetchReviews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [institute.id]);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await fetch(`/api/reviews/${institute.id}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instituteId: institute.id,
          authorName: reviewAuthor,
          rating: reviewRating,
          comment: reviewComment
        })
      });

      if (res.ok) {
        setReviewSuccess(true);
        setReviewAuthor('');
        setReviewComment('');
        setReviewRating(5);
        fetchReviews();
        setTimeout(() => setReviewSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatFee = (fee: number) => {
    if (fee <= 0) return 'Contact college';
    if (fee >= 100000) {
      return `₹${(fee / 100000).toFixed(2)} Lakh`;
    }
    return `₹${fee.toLocaleString('en-IN')}`;
  };

  const scrollToSection = (id: string, tabKey: typeof activeTab) => {
    setActiveTab(tabKey);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-slate-50 min-h-screen text-slate-900 pb-24"
    >
      {/* ========================================================================= */}
      {/* 1. COLLEGE HERO SECTION */}
      {/* ========================================================================= */}
      <div className="relative bg-slate-950 text-white overflow-hidden min-h-[380px] lg:h-[60vh] lg:min-h-[440px] flex flex-col justify-between">
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
          {institute.image ? (
            <img
              src={institute.image}
              alt={institute.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-red-700 to-rose-500 flex flex-col items-center justify-center text-white">
              <span className="text-5xl font-black tracking-widest">
                {institute.name.split(' ').filter(Boolean).map(word => word[0]).join('').slice(0, 3)}
              </span>
              <span className="mt-3 text-xs font-bold uppercase tracking-widest text-red-100">Campus image not available</span>
            </div>
          )}
        </div>

        {/* Top Floating Bar: Navigation */}
        <div className="relative z-20 pt-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex items-center gap-4">
            
            {/* Back Button */}
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-white/90 hover:text-white transition-colors bg-slate-900/60 hover:bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Colleges Directory</span>
            </button>

          </div>
        </div>

        {/* Hero Bottom Content: College Name */}
        <div className="relative z-20 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 mt-auto">
          <div className="mx-auto max-w-7xl">
            <h1 className={`${institute.id === 'malwa-institute' ? 'text-2xl sm:text-4xl lg:text-5xl' : 'text-3xl sm:text-5xl lg:text-6xl'} font-extrabold tracking-tight text-white leading-[1.1] mb-4 text-balance`}>
              {institute.name}
            </h1>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. STICKY SUB-NAVIGATION BAR */}
      {/* ========================================================================= */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none text-xs font-semibold text-slate-600">
            <button
              onClick={() => scrollToSection('sec-overview', 'overview')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Overview
            </button>

            {institute.coursesList && institute.coursesList.length > 0 && (
              <button
                onClick={() => scrollToSection('sec-courses', 'courses')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'courses' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Courses & Fees ({institute.coursesList.length})
              </button>
            )}

            {institute.placements && (
              <button
                onClick={() => scrollToSection('sec-placements', 'placements')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'placements' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Placements
              </button>
            )}

            {institute.cutoffs && institute.cutoffs.length > 0 && (
              <button
                onClick={() => scrollToSection('sec-cutoffs', 'cutoffs')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'cutoffs' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Cutoffs
              </button>
            )}

            <button
              onClick={() => scrollToSection('sec-facilities', 'facilities')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'facilities' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Campus Facilities ({institute.facilities.length})
            </button>

            {institute.facultyList && institute.facultyList.length > 0 && (
              <button
                onClick={() => scrollToSection('sec-faculty', 'faculty')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'faculty' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Faculty
              </button>
            )}

            <button
              onClick={() => scrollToSection('sec-reviews', 'reviews')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'reviews' ? 'bg-slate-900 text-white shadow-xs' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Student Reviews ({institute.totalReviews})
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT: 8-COLUMN DETAILS + 4-COLUMN ADMISSIONS SIDEBAR */}
      {/* ========================================================================= */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 lg:grid-cols-12">

          {/* LEFT COLUMN: Comprehensive Institution Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">

            {/* Updates / Announcements if present */}
            {institute.updates && institute.updates.length > 0 && (
              <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center space-x-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600" />
                  </span>
                  <span>Active Admission Alerts & Cutoff Announcements</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                  {institute.updates.map((upd, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-rose-600 font-bold leading-none mt-1">▸</span>
                      <span className="leading-relaxed">{upd}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section: Overview */}
            <section id="sec-overview" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-amber-700 font-semibold mb-4 tracking-wide">
                <span>{institute.category} Stream</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Affiliated: {institute.boardOrAffiliation}</span>
                {institute.approval && (
                  <>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-slate-600">{institute.approval}</span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600 mb-5">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>{institute.location}, Indore, MP</span>
                </div>
                <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
                <div className="flex items-center space-x-1.5">
                  <Clock className="h-4 w-4 text-rose-400 shrink-0" />
                  <span>{institute.establishedYear ? `Established in ${institute.establishedYear} (${new Date().getFullYear() - institute.establishedYear} yrs of legacy)` : 'Establishment year not listed'}</span>
                </div>
                <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
                <div className="flex items-center space-x-1.5 text-amber-600 font-bold tabular-nums">
                  {institute.rating > 0 ? (
                    <>
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />
                      <span>{institute.rating}</span>
                      {(institute.ratingReviewCount && institute.ratingSource) ? (
                        <span className="text-slate-500 font-normal">({institute.ratingReviewCount} {institute.ratingSource} reviews)</span>
                      ) : institute.totalReviews > 0 ? (
                        <span className="text-slate-500 font-normal">({institute.totalReviews} reviews)</span>
                      ) : institute.ratingSource ? (
                        <span className="text-slate-500 font-normal">({institute.ratingSource} rating)</span>
                      ) : null}
                    </>
                  ) : (
                    <span className="text-slate-500 font-normal">No student rating available</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={() => onScheduleCounseling(institute)}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition shadow-lg shadow-red-600/20 flex items-center space-x-2 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Apply for Free Counseling</span>
                </button>

                <button
                  onClick={onToggleShortlist}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-1.5 border cursor-pointer ${
                    isShortlisted
                      ? 'bg-rose-600 text-white border-rose-500'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isShortlisted ? 'fill-current' : ''}`} />
                  <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                </button>

                <button
                  onClick={onToggleCart}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-1.5 border cursor-pointer ${
                    isInCart
                      ? 'bg-amber-500 text-white border-amber-400'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{isInCart ? 'In Basket' : 'Add to Compare'}</span>
                </button>

                {institute.brochureUrl && (
                  <a
                    href={institute.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-1.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                  >
                    <FileText className="h-4 w-4 text-emerald-600" />
                    <span>Download Brochure</span>
                  </a>
                )}

              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Building className="h-5 w-5 text-red-600 shrink-0" />
                <span>About {institute.name}</span>
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line mb-6">
                {institute.description}
              </p>

              {institute.selectionCriteria && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-1">Admission & Selection Criteria:</span>
                  {institute.selectionCriteria}
                </div>
              )}

              {/* Verified Institutional Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold mb-0.5">Founding Year</span>
                  <span className="font-bold text-slate-800">{institute.establishedYear || 'Not listed'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold mb-0.5">Campus Location</span>
                  <span className="font-bold text-slate-800">{institute.location}, Indore</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold mb-0.5">Affiliation Body</span>
                  <span className="font-bold text-slate-800">{institute.boardOrAffiliation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold mb-0.5">Trust Marker</span>
                  <span className="font-bold text-emerald-700 inline-flex items-center">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                    {institute.isDirectoryVerified === false ? 'Directory Listing' : 'Indore Verified'}
                  </span>
                </div>
              </div>
            </section>

            {/* Section: Academic Courses & Fee Structure */}
            {institute.coursesList && institute.coursesList.length > 0 && (
              <section id="sec-courses" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-red-600 shrink-0" />
                    <span>Academic Courses & Fee Structure</span>
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Listed programmes and available fee information; confirm current details with the institution.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {institute.coursesList.map((course, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl p-5 hover:border-red-300 hover:bg-red-50/20 transition-colors flex flex-col justify-between"
                    >
                      <div className="mb-3">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{course.name}</h4>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md shrink-0 tabular-nums">
                            {course.fees}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-1">{course.duration} Duration</p>
                      </div>

                      {course.specializations && course.specializations.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {course.specializations.map((spec, sidx) => (
                            <span
                              key={sidx}
                              className="text-[10px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section: Career & Placements */}
            {institute.placements && (
              <section id="sec-placements" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5 text-red-600 shrink-0" />
                    <span>Placement Track Record</span>
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Audited compensation packages and top corporate recruiting partners.
                  </p>
                </div>

                {/* Salary Package Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-4 text-center">
                    <span className="block text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Highest Package</span>
                    <span className="block text-xl sm:text-2xl font-black text-emerald-900 mt-1 tabular-nums">
                      {institute.placements.highest}
                    </span>
                  </div>

                  <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-4 text-center">
                    <span className="block text-[11px] font-bold text-rose-700 uppercase tracking-wider">Average Package</span>
                    <span className="block text-xl sm:text-2xl font-black text-rose-900 mt-1 tabular-nums">
                      {institute.placements.average}
                    </span>
                  </div>

                  {institute.placements.lowest && (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
                      <span className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Median Package</span>
                      <span className="block text-xl sm:text-2xl font-black text-slate-800 mt-1 tabular-nums">
                        {institute.placements.lowest}
                      </span>
                    </div>
                  )}
                </div>

                {/* Recruiters */}
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Major Hiring Partners
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {institute.placements.recruiters.map((rec, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Section: Cutoffs & Entrance Ranks */}
            {institute.cutoffs && institute.cutoffs.length > 0 && (
              <section id="sec-cutoffs" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                    <Bookmark className="h-5 w-5 text-red-600 shrink-0" />
                    <span>Cutoff Closing Thresholds</span>
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    General Category closing ranks for MP DTE / JoSAA counseling rounds.
                  </p>
                </div>

                <div className="overflow-hidden border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-slate-500 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                        <th className="p-3.5">Course Specialization</th>
                        <th className="p-3.5 text-right">Closing Cutoff Rank</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {institute.cutoffs.map((co, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5 font-semibold text-slate-900">{co.course}</td>
                          <td className="p-3.5 text-right font-black text-rose-600 tabular-nums">{co.rank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Section: Campus Facilities */}
            <section id="sec-facilities" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <Check className="h-5 w-5 text-red-600 shrink-0" />
                  <span>Campus Facilities & Infrastructure</span>
                </h2>
                <p className="text-slate-500 text-xs mt-1">
                  On-site amenities accessible to enrolled students and scholars.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {institute.facilities.map((fac, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-colors"
                  >
                    <div className="h-6 w-6 rounded-md bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">{fac}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Faculty & Mentorship */}
            {institute.facultyList && institute.facultyList.length > 0 && (
              <section id="sec-faculty" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                    <Building className="h-5 w-5 text-red-600 shrink-0" />
                    <span>Distinguished Faculty & Leadership</span>
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Academic professors and industry researchers guiding students.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {institute.facultyList.map((fac, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center space-x-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="h-9 w-9 rounded-lg bg-red-600/10 text-red-600 font-black text-xs flex items-center justify-center shrink-0">
                        {fac.name.replace('Dr. ', '').replace('Prof. ', '').replace('Shri ', '').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs truncate">{fac.name}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{fac.qualification}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section: Reviews & Institutional Assessment */}
            <section id="sec-reviews" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-10">
              
              {/* ========================================================================= */}
              {/* 1. OFFICIAL REVIEW BY COLLEGE AUTHORITY                                   */}
              {/* ========================================================================= */}
              <div className="space-y-6 pb-8 border-b border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Official College Authority Review</span>
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        2026 Academic Assessment
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center space-x-2">
                      <Building className="h-5 w-5 text-red-600 shrink-0" />
                      <span>Review by College Authority: {institute.name}</span>
                    </h2>
                    <p className="text-slate-500 text-xs mt-1">
                      Official verified assessment and leadership address regarding academic autonomy, faculty rigor, placement transparency, and campus standards.
                    </p>
                  </div>

                </div>

                {/* Authority Video & Statement Showcase */}
                <div className="grid lg:grid-cols-12 gap-6 bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 sm:p-6">
                  
                  {/* Left Column: Authority Review Video Player */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="relative aspect-16/9 bg-slate-950 rounded-xl overflow-hidden shadow-md border border-slate-800 group">
                      {reviewVideoSource.type === 'html5' ? (
                        <video
                          src={reviewVideoSource.src}
                          controls
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : reviewVideoSource.type === 'youtube' ? (
                        <iframe
                          src={`${reviewVideoSource.src}?controls=1&rel=0`}
                          title={`${institute.name} Authority Review Video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : reviewVideoSource.type === 'vimeo' ? (
                        <iframe
                          src={`${reviewVideoSource.src}?autoplay=0`}
                          title={`${institute.name} Authority Review Video`}
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          {institute.image ? (
                            <img
                              src={institute.image}
                              alt={institute.name}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-red-700 to-rose-500 flex items-center justify-center text-white text-4xl font-black tracking-widest">
                              {institute.name.split(' ').filter(Boolean).map(word => word[0]).join('').slice(0, 3)}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 text-center">
                            <span className="text-white text-xs font-semibold">
                              Authority Video Tour loading or can be updated in indoreData.ts
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="absolute top-2.5 left-2.5 pointer-events-none">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-xs text-white border border-white/20 flex items-center gap-1.5">
                          <Video className="w-3 h-3 text-red-500" />
                          <span>College Authority Video</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                      <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Directorate Verified Stream</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Synced with College Data</span>
                    </div>
                  </div>

                  {/* Right Column: Leadership Statement & Key Parameters */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Authority Profile Header */}
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-700 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                          {institute.id === 'sgsits' 
                            ? 'NP' 
                            : (institute.facultyList?.[0]?.name?.replace(/Dr\.|Prof\.|Shri/g, '').trim().slice(0, 2).toUpperCase() || 'DIR')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-slate-900 text-sm">
                              {institute.id === 'sgsits'
                                ? 'Prof. Neetesh Purohit'
                                : (institute.facultyList?.find(f => f.qualification?.toLowerCase().includes('director') || f.role?.toLowerCase().includes('director'))?.name || `${institute.name} Directorate`)}
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              Verified Authority
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            {institute.id === 'sgsits'
                              ? 'Director, Shri Govindram Seksaria Institute of Tech & Science (SGSITS)'
                              : `Head of Institution & Academic Council`}
                          </p>
                        </div>
                      </div>

                      {/* Official Statement Quote */}
                      <blockquote className="mt-3 text-xs text-slate-700 italic leading-relaxed border-l-2 border-red-600 pl-3 bg-white p-3 rounded-r-xl border border-slate-100 shadow-xs">
                        {institute.id === 'sgsits' ? (
                          `"At SGSITS Indore, technical discipline and research innovation have been our foundational pillars since 1952. Our autonomous governance empowers us to rapidly align curriculum with cutting-edge industry demands in AI, VLSI Design, and Core Engineering. Admitting students strictly on JEE Main rank ensures an intellectual campus culture and unmatched placements reaching up to INR 44 LPA with global tech leaders."`
                        ) : (
                          `"Our institution is dedicated to academic excellence, rigorous laboratory training, and holistic student growth. We maintain continuous industry alignment and high placement standards to prepare our graduates for premier professional careers."`
                        )}
                      </blockquote>
                    </div>

                    {/* Authority Institutional Benchmarks */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Curriculum Agility</span>
                        <span className="font-extrabold text-slate-900 text-xs">Autonomous &amp; Industry-Aligned</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Admission Standard</span>
                        <span className="font-extrabold text-slate-900 text-xs">Strict JEE / DTE Merit</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Placement Density</span>
                        <span className="font-extrabold text-slate-900 text-xs">{institute.placements?.highest || 'Highest: INR 44 LPA'}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Verification Status</span>
                        <span className="font-extrabold text-emerald-700 text-xs flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                          Accredited &amp; Approved
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ========================================================================= */}
              {/* 2. STUDENT & ALUMNI REVIEWS (PEER FEEDBACK)                               */}
              {/* ========================================================================= */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <Star className="h-5 w-5 text-red-600 shrink-0" />
                  <span>Student &amp; Alumni Reviews</span>
                </h2>
                <p className="text-slate-500 text-xs mt-1">
                  Authentic commentary on placements, hostel life, labs, and faculty support.
                </p>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {loadingReviews ? (
                  <div className="py-6 text-center text-slate-400 italic text-xs">
                    Loading verified comments...
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl text-xs">
                    No verified reviews found for {institute.name} yet. Be the first to share your experience!
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-900 text-xs">{rev.authorName}</span>
                            <div className="flex items-center text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-600 text-xs leading-relaxed">{rev.comment}</p>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-3 text-right">
                          Verified Reviewer
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="border-t border-slate-100 pt-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Submit Your Experience</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Overall Star Rating</label>
                    <div className="flex items-center space-x-1.5 h-10">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          type="button"
                          key={stars}
                          onClick={() => setReviewRating(stars)}
                          className="text-amber-400 hover:scale-110 transition cursor-pointer"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              stars <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Detailed Review Comment</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe placement stats, campus facilities, faculty mentorship, or hostel conditions..."
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    <span>Submit Review</span>
                    <Send className="h-3 w-3" />
                  </button>

                  {reviewSuccess && (
                    <p className="text-emerald-700 font-bold text-xs">
                      Review submitted successfully! Refreshing...
                    </p>
                  )}
                </div>
              </form>
            </section>

          </div>

          {/* RIGHT COLUMN: Admission Desk, Fee Snapshot & Direct Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Quick Fact Sheet & Admission Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6 sticky top-20">
              
              {/* Fee Highlight */}
              <div className="border-b border-slate-100 pb-5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Annual Tuition Fee
                </span>
                <div className="flex items-baseline font-black text-slate-900 text-2xl tabular-nums">
                  {institute.feePerAnnum > 0 && <IndianRupee className="h-5 w-5 text-slate-800 self-center mr-0.5" />}
                  <span>{formatFee(institute.feePerAnnum)}</span>
                  {institute.feePerAnnum > 0 && <span className="text-xs text-slate-400 font-medium ml-1.5">/ academic year</span>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Link
                  to={`/reviews/${institute.category === 'Engineering' ? 'technical-college' : institute.category === 'Law' ? 'law-college' : institute.category === 'Medical' ? 'science-college' : 'professional-college'}/review-by-indore-colleges?college=${encodeURIComponent(institute.id)}`}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl transition shadow-md shadow-orange-500/20 flex items-center justify-center space-x-2"
                >
                  <Video className="h-4 w-4" />
                  <span>View Indore Colleges Review</span>
                </Link>

                <button
                  onClick={() => onScheduleCounseling(institute)}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3 rounded-xl transition shadow-md shadow-red-600/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Free Admission Counseling</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onToggleShortlist}
                    className={`w-full py-2.5 border rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer ${
                      isShortlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${isShortlisted ? 'fill-current' : ''}`} />
                    <span>{isShortlisted ? 'Liked' : 'Like'}</span>
                  </button>

                  <button
                    onClick={onToggleCart}
                    className={`w-full py-2.5 border rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer ${
                      isInCart
                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span>{isInCart ? 'In Basket' : 'Compare'}</span>
                  </button>
                </div>
              </div>

              {/* Verified Contacts */}
              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Official Helpdesk Contacts
                </span>

                {institute.contactPhone && (
                  <div className="flex items-center space-x-2.5 text-slate-700">
                    <PhoneCall className="h-4 w-4 text-red-600 shrink-0" />
                    <a href={`tel:${institute.contactPhone}`} className="font-semibold hover:text-red-600 transition">
                      {institute.contactPhone}
                    </a>
                  </div>
                )}

                <div className="flex items-center space-x-2.5 text-slate-700">
                  <Mail className="h-4 w-4 text-red-600 shrink-0" />
                  <a
                    href={`mailto:${institute.contactEmail || 'Indorecollegeshub@gmail.com'}`}
                    className="font-medium hover:text-red-600 transition truncate"
                  >
                    {institute.contactEmail || 'Indorecollegeshub@gmail.com'}
                  </a>
                </div>

                {institute.website && (
                  <div className="flex items-center space-x-2.5 text-slate-700">
                    <ExternalLink className="h-4 w-4 text-red-600 shrink-0" />
                    <a
                      href={institute.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-red-600 transition truncate"
                    >
                      Visit Official Website
                    </a>
                  </div>
                )}

                {institute.address && (
                  <div className="flex items-start space-x-2.5 text-slate-600 pt-2 border-t border-slate-100 text-[11px] leading-relaxed">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{institute.address}</span>
                  </div>
                )}

                {institute.nearestAirport && (
                  <div className="text-[11px] text-slate-500 pl-6">
                    <span className="font-semibold text-slate-700">Airport Distance:</span> {institute.nearestAirport}
                  </div>
                )}

                {/* Google Maps Link */}
                <div className="pt-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${institute.name} ${institute.location} Indore`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-2 rounded-xl transition"
                  >
                    <Compass className="h-3.5 w-3.5 text-red-600" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Verified Trust Badge */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 flex items-center space-x-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>100% Free Verified Guidance</span>
                </div>
                <p className="leading-relaxed">
                  IndoreColleges provides zero-commission counseling and verified updates directly from registrar offices.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

    </motion.div>
  );
}
