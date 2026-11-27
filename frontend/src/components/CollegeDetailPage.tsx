
import React, { useState, useEffect } from 'react';
import { Institute } from '../types';
import {
  ArrowLeft, 
  MapPin, 
  Award, 
  IndianRupee, 
  Calendar, 
  Check, 
  Mail, 
  PhoneCall, 
  Heart, 
  ShoppingCart, 
  Clock, 
  ShieldCheck, 
  Bookmark,
  ExternalLink,
  GraduationCap,
  Video,
  Compass,
  Download,
  Play,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './Logo';
import { INDORE_INSTITUTES } from '../data/indoreData';

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

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.trim().match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match?.[1] ? `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0` : null;
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
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'placements' | 'cutoffs' | 'facilities' | 'faculty'>('overview');
  const [infoName, setInfoName] = useState('');
  const [infoEmail, setInfoEmail] = useState('');
  const [infoPhone, setInfoPhone] = useState('');
  const [infoAlternatePhone, setInfoAlternatePhone] = useState('');
  const [infoSubmitting, setInfoSubmitting] = useState(false);
  const [infoSubmitted, setInfoSubmitted] = useState(false);
  const [infoError, setInfoError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [institute.id]);

  const formatFee = (fee: number) => {
    if (fee <= 0) return 'Contact college';
    if (fee >= 100000) {
      return `₹${(fee / 100000).toFixed(2)} Lakh`;
    }
    return `₹${fee.toLocaleString('en-IN')}`;
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoSubmitting(true);
    setInfoError('');

    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: infoName.trim(),
          email: infoEmail.trim(),
          phone: infoPhone.trim(),
          alternatePhone: infoAlternatePhone.trim(),
          instituteId: institute.id,
          query: `More information requested for ${institute.name}.`
        })
      });

      if (!response.ok) {
        throw new Error('Unable to submit the information request.');
      }

      setInfoSubmitted(true);
      setInfoName('');
      setInfoEmail('');
      setInfoPhone('');
      setInfoAlternatePhone('');
    } catch (error) {
      console.error('Error submitting information request:', error);
      setInfoError('Unable to submit your request. Please try again.');
    } finally {
      setInfoSubmitting(false);
    }
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

  const getShortName = () => {
    if (institute.id === 'iet-davv') return 'IET DAVV';
    if (institute.id === 'sgsits') return 'SGSITS';
    if (institute.id === 'piemr-indore') return 'PIEMR';
    if (institute.id === 'symbiosis-university') return 'SUAS';
    const words = institute.name
      .replace(/[,.-]/g, ' ')
      .split(/\s+/)
      .filter(word => !['of', 'and', 'for', 'the', 'in', 'at'].includes(word.toLowerCase()));
    const acronym = words.map(word => word[0]).join('').toUpperCase();
    return acronym.length >= 3 && acronym.length <= 12 ? acronym : institute.name;
  };

  const getUniversityName = () => {
    const haystack = `${institute.name} ${institute.approval || ''} ${institute.affiliationPrivateName || ''}`.toLowerCase();
    if (haystack.includes('davv') || haystack.includes('devi ahilya')) return 'Devi Ahilya Vishwavidyalaya (DAVV)';
    if (haystack.includes('rgpv')) return 'RGPV';
    if (haystack.includes('iit indore')) return 'IIT Indore';
    if (haystack.includes('iim indore')) return 'IIM Indore';
    if (institute.affiliationPrivateName) return institute.affiliationPrivateName;
    if (institute.affiliationType) return institute.affiliationType;
    return institute.boardOrAffiliation || 'Not listed';
  };

  const shortName = getShortName();
  const universityName = getUniversityName();
  const defaultFacilityImage = institute.campusPhoto || institute.image || '/bg2.jpeg';
  const liveFacilityImageOverrides: Record<string, Record<string, string>> = {
    'sgsits': {
      'Central Library': '/college-images/SGSITS/SGSITS-library.jpg',
      'Computer Center': '/college-images/SGSITS/SGSITS-Computer.png',
      'Gymnasium': '/college-images/SGSITS/SGSITS-Gymnasium.jpg',
      'Hostels (Separate Boys & Girls)': '/college-images/SGSITS/SGSITS-Hostels.webp',
      'Dispensary': '/college-images/SGSITS/SGSITS-Dispensary.webp',
      'CIDI Centre': '/college-images/SGSITS/SGSITS-Central Workshop.webp',
      'Central Workshop': '/college-images/SGSITS/SGSITS-Central Workshop.webp',
      'Lush Green Grounds': '/college-images/SGSITS/SGSITS-Green Grounds.avif',
      'High-speed Wi-Fi': '/college-images/SGSITS/SGSITS-Computer.png'
    },
    'iist-indore': {
      'Advanced Computing Labs': '/college-images/IIST/IIST Computing Labs.jpg',
      'Hostel Block (Separate Boys & Girls)': '/college-images/IIST/IIST Hostel Block.jpg',
      'Digital Libraries': '/college-images/IIST/IIST Digital Libraries.jpeg',
      'Gymnasium': '/college-images/IIST/IIST Sports Fields.jpeg',
      'Specialized Innovation Labs': '/college-images/IIST/IIST Innovation Labs.jpeg',
      'Sports Fields (Football, Cricket)': '/college-images/IIST/IIST Sports Fields.jpeg',
      'Hygienic Canteens': '/college-images/IIST/IIST Canteens.jpeg'
    },
    'iet-davv': {
      'IET Central Library': '/college-images/IET-DAVV/IET-DAVV-LIB.webp',
      'High-speed Computer Labs': '/college-images/IET-DAVV/IET-DAVV-Computer Labs.webp',
      'Sports Ground': '/college-images/IET-DAVV/IET-DAVV-Sports Ground.webp',
      'Boys & Girls Hostels': '/college-images/IET-DAVV/IET-DAVV-Boys & Girls Hostels.webp',
      'Auditorium': '/college-images/IET-DAVV/IET-DAVV-Auditorium.webp',
      'Physics & Chemistry Labs': '/college-images/IET-DAVV/IET-DAVV-Physics & Chemistry Labs.webp',
      'Canteen': '/college-images/IET-DAVV/IET-DAVV-Canteen.webp',
      'Wi-Fi Access Points': '/college-images/IET-DAVV/IET-DAVV-Computer Labs.webp'
    },
    'medi-caps-university': {
      'High Speed Computer Labs': '/college-images/Medi-Caps University/medicaps Computer-Lab.jpg',
      'State of art Workshops': '/college-images/Medi-Caps University/MEDI-CAPS-State of art Workshops.webp',
      'Basketball Stadium': '/college-images/Medi-Caps University/MEDI-CAPS-Basketball Stadium.webp',
      'Modern Gym': '/college-images/Medi-Caps University/MEDI-CAPS-Modern Gym.webp',
      'Central Library (e-Resources)': '/college-images/Medi-Caps University/MEDI-CAPS-Central Library.webp',
      'Separate Girls/Boys Hostels': '/college-images/Medi-Caps University/MEDI-CAPS-Separate Hostels.webp',
      'Hygienic Canteens': '/college-images/Medi-Caps University/MEDI-CAPS-Canteens.webp',
      'Research Centers': '/college-images/Medi-Caps University/MEDI-CAPS-Research Centers.webp'
    }
  };
  const liveHeroImageOverrides: Record<string, string> = {
    'sgsits': '/college-images/SGSITS/sgsits.webp',
    'iist-indore': '/college-images/IIST/IIST.avif',
    'iet-davv': '/college-images/IET-DAVV/IET-DAVV.webp',
    'medi-caps-university': '/college-images/Medi-Caps University/MEDI-CAPS.webp'
  };
  const heroImage = encodeURI(liveHeroImageOverrides[institute.id] || institute.image);
  const getFacilityImage = (facility: string) =>
    encodeURI(liveFacilityImageOverrides[institute.id]?.[facility] || institute.facilityImages?.[facility] || defaultFacilityImage);
  const repositoryInstitute = INDORE_INSTITUTES.find(item => item.id === institute.id);
  const collegeVideoUrl = institute.videoUrl || institute.backgroundVideoUrl || repositoryInstitute?.videoUrl || repositoryInstitute?.backgroundVideoUrl;
  const expertReviewVideoUrl = institute.expertReviewVideoUrl || repositoryInstitute?.expertReviewVideoUrl;
  const categoryInstitutes = INDORE_INSTITUTES.filter(item => item.category === institute.category);
  const googleRank = [...categoryInstitutes]
    .sort((a, b) => (b.googleRating ?? b.rating) - (a.googleRating ?? a.rating))
    .findIndex(item => item.id === institute.id) + 1;
  const indoreRank = [...categoryInstitutes]
    .sort((a, b) => (b.indoreRating ?? b.rating) - (a.indoreRating ?? a.rating))
    .findIndex(item => item.id === institute.id) + 1;
  const getAdmissionProcess = () => {
    if (institute.id === 'iet-davv') return 'DTE via JEE Results';
    if (institute.id === 'sgsits') return 'DTE via JEE Results';
    if (institute.selectionCriteria) {
      const criteria = institute.selectionCriteria.trim();
      if (criteria.toLowerCase().includes('jee') || criteria.toLowerCase().includes('dte')) {
        return 'DTE via JEE Results';
      }
    }
    if (/engineering|technology/i.test(institute.category)) {
      return 'DTE counseling';
    }
    if (/management|mba/i.test(institute.category)) {
      return 'Entrance exam & counseling';
    }
    if (/medical/i.test(institute.category)) {
      return 'NEET counseling';
    }
    if (/law/i.test(institute.category)) {
      return 'Merit / law entrance counseling';
    }
    return 'Merit / entrance process';
  };
  const admissionProcess = getAdmissionProcess();

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
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-8">
          <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-center lg:gap-8 xl:gap-12">
            <div className="min-w-0 flex-1 lg:max-w-[460px] lg:pl-4 xl:max-w-[520px] xl:pl-8 2xl:max-w-[580px] 2xl:pl-12">
              <button
                onClick={onBack}
                className="mb-4 sm:mb-5 inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Colleges Directory</span>
              </button>

              <h1 className={`${institute.id === 'malwa-group-of-institutes' ? 'text-3xl' : 'text-3xl sm:text-4xl xl:text-[44px]'} font-extrabold tracking-tight text-slate-950 leading-[1.08] mb-5`}>
                {institute.name}
              </h1>

              <ul className="grid grid-cols-2 gap-x-3 gap-y-3 text-[12px] leading-snug text-slate-700 mb-5 sm:gap-x-5 sm:text-sm">
                <li className="flex min-w-0 items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-slate-400">Short Name</span>
                  <strong className="min-w-0 text-slate-900">{shortName}</strong>
                </li>
                <li className="flex min-w-0 items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="text-slate-400">Established</span>
                  <strong className="text-slate-900">{institute.establishedYear || 'N/A'}</strong>
                </li>
                <li className="flex min-w-0 items-start gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="shrink-0 text-slate-400">Approved by</span>
                  <strong className="min-w-0 text-slate-900">{institute.approval?.match(/AICTE|UGC|NBA|NAAC/i)?.[0] || institute.boardOrAffiliation}</strong>
                </li>
                <li className="flex min-w-0 items-start gap-2">
                  <GraduationCap className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="shrink-0 text-slate-400">University</span>
                  <strong className="min-w-0 text-slate-900">{universityName}</strong>
                </li>
                <li className="col-span-2 flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-red-500" />
                  <span className="shrink-0 text-slate-500">Admission Process</span>
                  <strong className="min-w-0 text-slate-950">{admissionProcess}</strong>
                </li>
              </ul>

              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3">
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-400">Google Rank</span>
                  <span className="mt-1 flex items-center gap-1.5 text-base font-extrabold text-slate-900">
                    <span className="text-amber-500">#</span>
                    {googleRank > 0 ? googleRank : 'N/A'}
                  </span>
                </div>
                <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3">
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-400">Indore Colleges Rank</span>
                  <span className="mt-1 flex items-center gap-1.5 text-base font-extrabold text-slate-900">
                    <span className="text-red-500">#</span>
                    {indoreRank > 0 ? indoreRank : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:ml-auto lg:flex-1 lg:min-w-0 lg:max-w-[580px] xl:max-w-[620px]">
              <div className="h-[250px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:h-[290px] lg:h-[320px] xl:h-[340px]">
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt={institute.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-red-700 to-rose-500 text-white">
                    <span className="text-5xl font-black tracking-widest">{shortName}</span>
                    <span className="mt-3 text-xs font-bold uppercase tracking-widest text-red-100">Campus image not available</span>
                  </div>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {institute.brochureUrl ? (
                  <a
                    href={institute.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700"
                  >
                    <Download className="h-4 w-4" />
                    Download Brochure
                  </a>
                ) : (
                  <button
                    onClick={() => window.print()}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    Download Brochure
                  </button>
                )}
                <button
                  onClick={() => {
                    const target = document.getElementById('sec-reviews');
                    if (target) {
                      const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 cursor-pointer"
                >
                  <Play className="h-4 w-4" />
                  Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT: 8-COLUMN DETAILS + 4-COLUMN ADMISSIONS SIDEBAR */}
      {/* ========================================================================= */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid min-w-0 gap-8">

          {/* Comprehensive Institution Details */}
          <div className="min-w-0 space-y-8">

            <div className="mx-auto flex max-w-fit flex-wrap justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
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
            </div>

            {/* Section: Academic Courses & Fee Structure */}
            {institute.coursesList && institute.coursesList.length > 0 && (
              <section id="sec-courses" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2 text-center">
                    <GraduationCap className="h-5 w-5 text-red-600 shrink-0" />
                    <span>Academic Courses & Fee Structure</span>
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {institute.coursesList.map((course, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.45, delay: idx * 0.06, ease: 'easeOut' }}
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:border-red-200 hover:shadow-xl hover:shadow-slate-200/70"
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="flex items-start justify-center gap-4 text-center">
                        <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-slate-950">
                          {course.name.match(/\[([^\]]+)\]/)?.[1] || course.name}
                        </h3>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5 text-sm">
                        <p className="font-medium text-slate-600">{course.duration || 'Duration not listed'}</p>
                        <p className="font-semibold text-emerald-700">Semester System</p>
                      </div>

                      <div className="mt-5">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Specializations</p>
                        {course.specializations && course.specializations.length > 0 ? (
                          <ul className="grid list-disc grid-cols-1 gap-x-8 gap-y-1.5 pl-5 text-sm leading-relaxed text-slate-700 marker:text-red-400 sm:grid-cols-2">
                          {course.specializations.map((spec, sidx) => (
                            <li
                              key={sidx}
                            >
                              {spec}
                            </li>
                          ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-slate-500">Not specified</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Section: Career & Placements */}
            {institute.placements && (
              <section id="sec-placements" className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2 text-center">
                    <ShieldCheck className="h-5 w-5 text-red-600 shrink-0" />
                    <span>Latest Placement</span>
                  </h2>
                </div>

                {/* Salary Package Metrics */}
                {institute.placements.metrics?.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {institute.placements.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center">
                        <span className="block text-xl sm:text-2xl font-black text-slate-800 mt-1 tabular-nums">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-4 text-center">
                    <span className="block text-xl sm:text-2xl font-black text-emerald-900 tabular-nums">
                      {institute.placements.highest}
                    </span>
                  </div>

                  {institute.placements.average && (
                  <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-4 text-center">
                    <span className="block text-xl sm:text-2xl font-black text-rose-900 tabular-nums">
                      {institute.placements.average}
                    </span>
                  </div>
                  )}

                  {institute.placements.lowest && (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
                      <span className="block text-xl sm:text-2xl font-black text-slate-800 tabular-nums">
                        {institute.placements.lowest}
                      </span>
                    </div>
                  )}
                </div>
                )}

              </section>
            )}

            {/* Section: Campus Facilities */}
            <motion.section
              id="sec-facilities"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="space-y-6 rounded-2xl border border-orange-100/80 bg-gradient-to-br from-white via-orange-50/20 to-white p-6 shadow-xs sm:p-8"
            >
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2 text-center">
                  <Check className="h-5 w-5 text-red-600 shrink-0" />
                  <span>Campus Facilities & Infrastructure</span>
                </h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 py-3">
                <motion.div
                  className="flex w-max gap-3 px-3"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
                >
                  {[...institute.facilities, ...institute.facilities].map((fac, idx) => (
                    <div
                      key={`${fac}-${idx}`}
                      className="relative h-60 w-72 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm sm:h-72 sm:w-80"
                    >
                      <img
                        src={getFacilityImage(fac)}
                        alt={`${fac} at ${institute.name}`}
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover opacity-80 transition-transform duration-500 hover:scale-110"
                        onError={(event) => {
                          if (!event.currentTarget.src.endsWith('/bg2.jpeg')) {
                            event.currentTarget.src = '/bg2.jpeg';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                      <span className="absolute inset-x-3 bottom-3 text-sm font-bold text-white">{fac}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.section>

            <motion.section
              id="sec-reviews"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="rounded-2xl border border-orange-100/80 bg-gradient-to-br from-white via-orange-50/20 to-white p-6 shadow-xs sm:p-8"
            >
              <h2 className="mb-6 text-center text-xl font-bold text-slate-900">
                Reviews of {institute.name}
              </h2>

              <div className="grid gap-5 md:grid-cols-3">
                {[
                  {
                    title: 'Review by College Authority',
                    thumbnail: '/Review by College Authority.webp',
                    videoUrl: collegeVideoUrl
                  },
                  {
                    title: 'Reviews by Indore College Experts',
                    thumbnail: '/Review-by-indore-college.webp',
                    videoUrl: expertReviewVideoUrl
                  },
                  {
                    title: 'Review by Actual Students',
                    thumbnail: '/Review-by-actual-student.webp'
                  }
                ].map((reviewCard) => {
                  const youtubeEmbedUrl = getYouTubeEmbedUrl(reviewCard.videoUrl);
                  return (
                  <article
                    key={reviewCard.title}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                      {youtubeEmbedUrl ? (
                        <iframe
                          src={youtubeEmbedUrl}
                          title={`${institute.name} — ${reviewCard.title}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full border-0"
                        />
                      ) : reviewCard.videoUrl ? (
                        <video
                          controls
                          muted
                          preload="metadata"
                          poster={reviewCard.thumbnail}
                          className="h-full w-full object-cover"
                        >
                          <source src={reviewCard.videoUrl} type="video/mp4" />
                        </video>
                      ) : (
                        <>
                          <img
                            src={reviewCard.thumbnail}
                            alt={`${institute.name} review`}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.src = '/bg2.jpeg';
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/25">
                            <Video className="h-10 w-10 text-white drop-shadow-lg" />
                          </div>
                        </>
                      )}
                    </div>
                    <h3 className="px-4 py-4 text-center text-sm font-bold text-slate-900">
                      {reviewCard.title}
                    </h3>
                  </article>
                  );
                })}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="rounded-2xl border border-orange-100/80 bg-gradient-to-br from-white via-orange-50/20 to-white p-6 shadow-xs sm:p-8"
            >
              <div className="mx-auto max-w-5xl">
              <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
                Want to know more about this college?
              </h2>
              <p className="mb-8 mt-3 text-center text-base font-semibold text-slate-700 sm:text-lg">
                Please fill the form, our counselor will call you back shortly.
              </p>

              {infoSubmitted ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-5 text-center text-sm font-semibold text-emerald-800">
                  Thank you. Our counselor will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleInfoSubmit} className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="info-name" className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-600">
                      Name *
                    </label>
                    <input
                      id="info-name"
                      type="text"
                      required
                      value={infoName}
                      onChange={(e) => setInfoName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="info-phone" className="mb-2 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-slate-600">
                      <PhoneCall className="h-4 w-4 text-slate-400" />
                      WhatsApp Number *
                    </label>
                    <input
                      id="info-phone"
                      type="tel"
                      required
                      value={infoPhone}
                      onChange={(e) => setInfoPhone(e.target.value)}
                      placeholder="Enter your WhatsApp number"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="info-alternate-phone" className="mb-2 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-slate-600">
                      <PhoneCall className="h-4 w-4 text-slate-400" />
                      Alternate No
                    </label>
                    <input
                      id="info-alternate-phone"
                      type="tel"
                      value={infoAlternatePhone}
                      onChange={(e) => setInfoAlternatePhone(e.target.value)}
                      placeholder="Enter alternate number"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="info-email" className="mb-2 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-slate-600">
                      <Mail className="h-4 w-4 text-slate-400" />
                      Email Id *
                    </label>
                    <input
                      id="info-email"
                      type="email"
                      required
                      value={infoEmail}
                      onChange={(e) => setInfoEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  {infoError && (
                    <p className="sm:col-span-2 text-sm font-semibold text-red-600">{infoError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={infoSubmitting}
                    className="mx-auto rounded-xl bg-orange-500 px-10 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
                  >
                    {infoSubmitting ? 'Submitting...' : 'Connect With Us'}
                  </button>
                </form>
              )}
              </div>
            </motion.section>

          </div>

        </div>
      </div>

    </motion.div>
  );
}
