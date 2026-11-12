import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  Check, 
  Send, 
  ArrowUpRight, 
  BookOpen, 
  Users, 
  PhoneCall, 
  Compass, 
  HelpCircle, 
  Award, 
  Quote,
  CheckCircle2,
  MessageSquare,
  GraduationCap,
  Calendar,
  ChevronRight,
  TrendingUp,
  Building,
  Heart,
  ExternalLink,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo, { LogoIcon } from './Logo';
import IntroVideoSection from './IntroVideoSection';
import StreamSelector from './StreamSelector';
import { INDORE_INSTITUTES, INDORE_LOCATIONS, INDORE_LOCALITY_GROUPS, CATEGORIES } from '../data/indoreData';
import { Institute } from '../types';

const HOME_CATEGORY_LINKS = [
  { label: 'Engineering colleges', slug: 'engineering' },
  { label: 'Medical colleges', slug: 'medical' },
  { label: 'MBA colleges', slug: 'mba' },
  { label: 'BBA colleges', slug: 'bba' },
  { label: 'BCA colleges', slug: 'bca' },
  { label: 'Law colleges', slug: 'law' },
  { label: 'Design colleges', slug: 'design' },
] as const;

interface HomeProps {
  setActiveTab: (tab: 'home' | 'explore' | 'register' | 'dashboard' | 'browse-campus' | 'blogs' | 'about' | 'careers' | 'contact' | 'college-portal' | 'admin-panel') => void;
  setInstituteTypeFilter: (type: 'all' | 'school' | 'college') => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedBoard: (board: string) => void;
  setSelectedLocation: (loc: string) => void;
  setSearchQuery: (query: string) => void;
  onOpenCounseling: () => void;
  setSelectedStream?: (stream: string | null) => void;
  maxFee?: number;
  setMaxFee?: (fee: number) => void;
  onViewCollegeDetail?: (inst: Institute) => void;
  onViewLocality?: (locality: string) => void;
}

export default function Home({
  setActiveTab,
  setInstituteTypeFilter,
  setSelectedCategory,
  setSelectedBoard,
  setSelectedLocation,
  setSearchQuery,
  onOpenCounseling,
  setSelectedStream,
  maxFee,
  setMaxFee,
  onViewCollegeDetail,
  onViewLocality
}: HomeProps) {
  // Search card states (CarDekho style)
  const [searchMode, setSearchMode] = useState<'college' | 'course'>('college');
  const [searchOption, setSearchOption] = useState<'budget' | 'stream'>('budget');
  const [selectedBudgetVal, setSelectedBudgetVal] = useState('All');
  const [selectedStreamVal, setSelectedStreamVal] = useState('All');
  const [selectedLocationVal, setSelectedLocationVal] = useState('All');
  // CarDekho style Searched Colleges tab state
  const [activeSearchedTab, setActiveSearchedTab] = useState<'Engineering' | 'BBA' | 'BCA' | 'MBA' | 'LAW' | 'MEDICAL' | 'DESIGN'>('Engineering');

  // Hero Background (Keeping only bg2 for now; video will be added later)
  const heroBackgrounds = [
    {
      id: 'bg2',
      title: 'Modern University & Engineering Grounds',
      src: '/bg2.jpeg'
    }
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const dynamicDisciplines = useMemo(() => [
    'Engineering',
    'Management',
    'Science',
    'Pharmacy',
    'Law'
  ], []);

  const [currentDisciplineIndex, setCurrentDisciplineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const ratingHeadingOptions = useMemo(() => ({
    google: 'According to Google Rating',
    indore: 'According to Indore Colleges Rating'
  }), []);

  const [googleHeading, setGoogleHeading] = useState('');
  const [indoreHeading, setIndoreHeading] = useState('');
  const [isGoogleDeleting, setIsGoogleDeleting] = useState(false);
  const [isIndoreDeleting, setIsIndoreDeleting] = useState(false);

  useEffect(() => {
    const currentWord = dynamicDisciplines[currentDisciplineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (typedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setTypedText(currentWord.slice(0, typedText.length + 1));
        }, 90);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(currentWord.slice(0, typedText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setCurrentDisciplineIndex((prev) => (prev + 1) % dynamicDisciplines.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentDisciplineIndex, dynamicDisciplines]);

  useEffect(() => {
    const currentText = ratingHeadingOptions.google;
    let timeout: ReturnType<typeof setTimeout>;

    if (!isGoogleDeleting) {
      if (googleHeading.length < currentText.length) {
        timeout = setTimeout(() => {
          setGoogleHeading(currentText.slice(0, googleHeading.length + 1));
        }, 35);
      } else {
        timeout = setTimeout(() => {
          setIsGoogleDeleting(true);
        }, 1800);
      }
    } else {
      if (googleHeading.length > 0) {
        timeout = setTimeout(() => {
          setGoogleHeading(currentText.slice(0, googleHeading.length - 1));
        }, 20);
      } else {
        setIsGoogleDeleting(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [googleHeading, isGoogleDeleting, ratingHeadingOptions.google]);

  useEffect(() => {
    const currentText = ratingHeadingOptions.indore;
    let timeout: ReturnType<typeof setTimeout>;

    if (!isIndoreDeleting) {
      if (indoreHeading.length < currentText.length) {
        timeout = setTimeout(() => {
          setIndoreHeading(currentText.slice(0, indoreHeading.length + 1));
        }, 35);
      } else {
        timeout = setTimeout(() => {
          setIsIndoreDeleting(true);
        }, 1800);
      }
    } else {
      if (indoreHeading.length > 0) {
        timeout = setTimeout(() => {
          setIndoreHeading(currentText.slice(0, indoreHeading.length - 1));
        }, 20);
      } else {
        setIsIndoreDeleting(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [indoreHeading, isIndoreDeleting, ratingHeadingOptions.indore]);

  // Auto-slide transition if multiple backgrounds exist
  useEffect(() => {
    if (heroBackgrounds.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  const handleFeaturedClick = (id: string) => {
    const matched = INDORE_INSTITUTES.find(inst => inst.id === id);
    if (matched && onViewCollegeDetail) {
      onViewCollegeDetail(matched);
    } else {
      setSearchQuery('');
      setInstituteTypeFilter('college');
      setActiveTab('explore');
    }
  };

  const handleFormSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInstituteTypeFilter('college');

    // Handle stream selection
    if (selectedStreamVal && selectedStreamVal !== 'All') {
      setSelectedCategory(selectedStreamVal);
      if (setSelectedStream) {
        const catLower = selectedStreamVal.toLowerCase();
        if (catLower.includes('engineering')) setSelectedStream('engineering');
        else if (catLower.includes('management')) setSelectedStream('mba');
        else if (catLower.includes('medical')) setSelectedStream('medical');
        else if (catLower.includes('design')) setSelectedStream('design');
        else setSelectedStream(null);
      }
    } else {
      setSelectedCategory('All');
      if (setSelectedStream) setSelectedStream(null);
    }

    // Handle location selection
    if (selectedLocationVal && selectedLocationVal !== 'All') {
      setSelectedLocation(selectedLocationVal);
    } else {
      setSelectedLocation('All');
    }

    // Handle budget limit
    if (setMaxFee) {
      if (selectedBudgetVal === '1lakh') setMaxFee(100000);
      else if (selectedBudgetVal === '2lakh') setMaxFee(200000);
      else if (selectedBudgetVal === '5lakh') setMaxFee(500000);
      else if (selectedBudgetVal === '10lakh') setMaxFee(1000000);
      else setMaxFee(1500000); // Max fee limit
    }

    setSearchQuery('');
    setActiveTab('explore');

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Search input state
  const [localSearch, setLocalSearch] = useState('');
  
  // Schedule a Meeting Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formQuery, setFormQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Review filter state
  const [reviewFilter, setReviewFilter] = useState<'all' | 'students' | 'parents'>('all');

  // Action helpers
  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localSearch.trim()) return;
    setSearchQuery(localSearch);
    setInstituteTypeFilter('college');
    setActiveTab('explore');
    // Scroll to directory
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleCategoryClick = (category: string, type: 'school' | 'college' = 'college') => {
    setInstituteTypeFilter('college');
    setSelectedCategory(category);
    setSelectedBoard('All');
    setSelectedLocation('All');
    setSearchQuery('');
    if (setSelectedStream) {
      const catLower = category.toLowerCase();
      if (catLower.includes('engineering')) setSelectedStream('engineering');
      else if (catLower.includes('management')) setSelectedStream('mba');
      else if (catLower.includes('medical')) setSelectedStream('medical');
      else if (catLower.includes('design')) setSelectedStream('design');
    }
    setActiveTab('explore');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleLocalityClick = (locality: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    setInstituteTypeFilter('college');
    setSelectedCategory('All');
    setSelectedBoard('All');
    setSelectedLocation(locality);
    setSearchQuery('');
    if (onViewLocality) {
      event.preventDefault();
      onViewLocality(locality);
      return;
    }
    setActiveTab('explore');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          email: formEmail || '',
          query: formQuery || 'General Home Consultation'
        })
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormName('');
        setFormPhone('');
        setFormEmail('');
        setFormQuery('');
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Error scheduling consultation:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reviews Data
  interface ReviewItem {
    name: string;
    role: string;
    type: 'student' | 'parent';
    college: string;
    course: string;
    location: string;
    comment: string;
    rating: number;
    avatar: string;
    avatarBg: string;
    date: string;
    tag: string;
  }

  const REVIEWS: ReviewItem[] = [
    {
      name: 'Dr. Vivek Agrawal',
      role: 'Parent',
      type: 'parent',
      college: 'SGSITS Indore',
      course: 'B.Tech Computer Science',
      location: 'Vijay Nagar, Indore',
      comment: 'Indore Colleges counselor guided us as an unbiased partner. They helped us cut through complex MP DTE cutoffs, seat allocations, and verified placement statistics between SGSITS and DAVV. Best counseling service in the city!',
      rating: 5,
      avatar: 'VA',
      avatarBg: 'bg-blue-600 text-white',
      date: 'Aug 2024',
      tag: 'Verified Admission'
    },
    {
      name: 'Priya Sharma',
      role: 'Student',
      type: 'student',
      college: 'IMS DAVV',
      course: 'MBA Financial Administration',
      location: 'Palasia, Indore',
      comment: 'I was very confused between private MBA colleges and DAVV CET counseling. The advisor gave me a head-to-head comparison of ROI, average package reality, and alumni networks. Saved our family substantial fee money!',
      rating: 5,
      avatar: 'PS',
      avatarBg: 'bg-emerald-600 text-white',
      date: 'July 2024',
      tag: 'Direct Counseling'
    },
    {
      name: 'Rajesh & Sunita Malviya',
      role: 'Parents',
      type: 'parent',
      college: 'Medi-Caps University',
      course: 'B.Tech IT (Cloud Computing)',
      location: 'Annapurna Road, Indore',
      comment: 'As parents, safety, campus discipline, and actual placement records were our top priorities. The Indore Colleges team arranged our direct campus visit, explained the hostel fee split clearly, and assisted throughout admission.',
      rating: 5,
      avatar: 'RM',
      avatarBg: 'bg-amber-600 text-white',
      date: 'June 2024',
      tag: 'Parent Recommendation'
    },
    {
      name: 'Ankita Chhabra',
      role: 'Parent',
      type: 'parent',
      college: 'PIMR Indore',
      course: 'MBA International Business',
      location: 'Scheme No. 54, Indore',
      comment: 'Excellent, personal college matches. Their quick comparative list of top business schools near Vijay Nagar made our decision extremely stress-free. Direct callbacks were prompt and completely transparent.',
      rating: 5,
      avatar: 'AC',
      avatarBg: 'bg-purple-600 text-white',
      date: 'Sep 2024',
      tag: 'Verified Admission'
    },
    {
      name: 'Rohan Joshi',
      role: 'Student',
      type: 'student',
      college: 'IET DAVV',
      course: 'B.Tech Information Technology',
      location: 'Rau, Indore',
      comment: 'Got unbiased clarity on JEE Main rank cutoffs for MP DTE rounds. They didn’t push any sponsored colleges like other agents do. Guided me honestly to wait for internal sliding and I bagged IET IT!',
      rating: 5,
      avatar: 'RJ',
      avatarBg: 'bg-sky-600 text-white',
      date: 'Aug 2024',
      tag: 'DTE Seat Guidance'
    },
    {
      name: 'Meenakshi Patidar',
      role: 'Parent',
      type: 'parent',
      college: 'Renaissance College',
      course: 'BBA Foreign Trade',
      location: 'Bhawarkua, Indore',
      comment: 'My daughter wanted a management course with strong international certification options. The team explained the curriculum difference between general BBA and specialized courses. Highly trustworthy team.',
      rating: 5,
      avatar: 'MP',
      avatarBg: 'bg-rose-600 text-white',
      date: 'July 2024',
      tag: 'Curriculum Guidance'
    },
    {
      name: 'Aman Khan',
      role: 'Student',
      type: 'student',
      college: 'Softvision College',
      course: 'BCA (Data Science & AI)',
      location: 'Bengali Square, Indore',
      comment: 'The fee transparency tool on this platform was super useful. They helped me compare lab facilities and faculty credentials across top BCA colleges in Indore before locking my seat.',
      rating: 5,
      avatar: 'AK',
      avatarBg: 'bg-indigo-600 text-white',
      date: 'June 2024',
      tag: 'Verified Student'
    },
    {
      name: 'Devendra Singh Rathore',
      role: 'Parent',
      type: 'parent',
      college: 'Indore Institute of Law',
      course: 'BA LLB (Hons)',
      location: 'Rajendra Nagar, Indore',
      comment: 'Finding the right law college in Central India was challenging until we consulted Indore Colleges. They broke down the moot court exposure, faculty experience, and internship support realistically.',
      rating: 5,
      avatar: 'DR',
      avatarBg: 'bg-teal-600 text-white',
      date: 'May 2024',
      tag: 'Law Counseling'
    },
    {
      name: 'Sanya Verma',
      role: 'Student',
      type: 'student',
      college: 'Symbiosis University (SUAS)',
      course: 'B.Des (User Experience)',
      location: 'Super Corridor, Indore',
      comment: 'I was looking for practical, skill-oriented design education in Indore. The advisor explained SUAS practical lab setup, industry tie-ups, and portfolio entrance criteria. Absolutely seamless experience!',
      rating: 5,
      avatar: 'SV',
      avatarBg: 'bg-fuchsia-600 text-white',
      date: 'Aug 2024',
      tag: 'Skill Degree'
    },
    {
      name: 'Harshvardhan Tiwari',
      role: 'Student',
      type: 'student',
      college: 'Acropolis Institute (AITR)',
      course: 'B.Tech CSE (AI & ML)',
      location: 'Bypass Road, Indore',
      comment: 'The counselor cleared all my doubts regarding bus transport, lab infrastructure, and TCS/Cognizant placement track record at Acropolis. Got admission support without running around.',
      rating: 5,
      avatar: 'HT',
      avatarBg: 'bg-cyan-700 text-white',
      date: 'July 2024',
      tag: 'Direct Admission'
    }
  ];

  const LOCALITIES = INDORE_LOCALITY_GROUPS;
  return (
    <div id="home_view" className="w-full bg-white font-sans overflow-hidden">
      
      {/* 1. HERO BANNER SECTION (INDORE COLLEGES PURPOSE) */}
      <section className="relative pt-5 pb-10 sm:pt-7 sm:pb-14 md:pt-8 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gray-150 flex flex-col justify-center items-center bg-white">
        {/* Keep the existing carousel on larger screens and use the supplied portrait artwork on mobile. */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          {heroBackgrounds.map((bg, idx) => {
            const isSelected = idx === currentBgIndex;
            return (
              <motion.img 
                key={bg.id}
                src={bg.src} 
                alt="Indore Colleges" 
                referrerPolicy="no-referrer"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isSelected ? 1 : 0,
                  scale: isSelected ? 1 : 1.02
                }}
                transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
              />
            );
          })}
          <div
            className="absolute inset-x-0 top-0 h-full bg-top bg-no-repeat md:hidden"
            style={{
              backgroundImage: "url('/indore-college-mobile-bg.png')",
              backgroundSize: '100% auto'
            }}
          />
          <div className="absolute -top-24 -right-24 hidden h-96 w-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none md:block" />
          <div className="absolute -bottom-24 -left-24 hidden h-96 w-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none md:block" />
        </div>

        <div className="mx-auto max-w-5xl w-full relative z-10 text-center flex flex-col items-center justify-center -mt-2 sm:-mt-3 md:-mt-4">
          <motion.h1
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-black tracking-tight leading-[1.28] font-outfit max-w-5xl mx-auto text-center"
          >
            <span>Find the best colleges in Indore</span>
            <span className="block mt-1 sm:mt-1.5">
              with{' '}
              <span 
                className="inline-block px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-lg text-white shadow-md mx-1"
                style={{ backgroundColor: 'rgba(246, 103, 16, 1)' }}
              >
                Indore colleges
              </span>{' '}
              for
            </span>
            <span className="mt-2 sm:mt-2.5 text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-normal min-h-[44px] sm:min-h-[50px] flex items-center justify-center">
              <span 
                style={{ color: 'rgba(246, 103, 16, 1)', textShadow: 'none' }}
              >
                {typedText}
              </span>
              <span 
                className="inline-block w-[3px] sm:w-[3.5px] h-6 sm:h-8 md:h-9 ml-1.5 rounded-full animate-pulse" 
                style={{ backgroundColor: 'rgba(246, 103, 16, 1)' }}
              />
            </span>
          </motion.h1>

          {/* Leave room for the artwork's centered logo on mobile. */}
          <div className="h-[70vw] w-full pointer-events-none md:h-36 lg:h-40" aria-hidden="true" />

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-5 mx-auto"
          >
            <button
              type="button"
              onClick={() => {
                setInstituteTypeFilter('college');
                setSelectedCategory('All');
                setSelectedBoard('All');
                setSelectedLocation('All');
                setSearchQuery('');
                setActiveTab('explore');
              }}
              className="inline-flex bg-white hover:bg-gray-100 active:scale-95 text-gray-900 font-extrabold px-6 py-3 rounded-xl transition-all duration-200 shadow-xl text-xs sm:text-sm tracking-wider uppercase items-center gap-2 cursor-pointer"
            >
              Explore Top Colleges
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onOpenCounseling}
              className="inline-flex bg-red-600 hover:bg-red-500 active:scale-95 text-white font-extrabold px-6 py-3 rounded-xl transition-all duration-200 text-xs sm:text-sm tracking-wider uppercase items-center gap-2 cursor-pointer backdrop-blur-sm shadow-xl shadow-red-600/30"
            >
              <PhoneCall className="h-4 w-4" />
              Get Free Counselling
            </button>
          </motion.div>

          {/* Quick Platform Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="pt-5 mt-5 border-t border-white/20 grid grid-cols-3 gap-4 sm:gap-8 max-w-md w-full mx-auto text-center"
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-black text-black font-outfit">50+</div>
              <div className="text-[11px] sm:text-xs text-gray-700 font-medium mt-0.5">Indore Institutes</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-black text-black font-outfit">10,000+</div>
              <div className="text-[11px] sm:text-xs text-gray-700 font-medium mt-0.5">Students Counselled</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-black text-black font-outfit">100%</div>
              <div className="text-[11px] sm:text-xs text-gray-700 font-medium mt-0.5">Free Guidance</div>
            </div>
          </motion.div>
        </div>
      </section>

      <IntroVideoSection />

      {/* 2. THE MOST SEARCHED COLLEGES SECTION (CARDEKHO-STYLE DYNAMIC TABS) */}
      <section className="py-10 sm:py-12 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="border-b border-gray-200 pb-4 mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-outfit mb-4 text-center">
              Choose Course & Search Best College in Indore
            </h2>
            
            {/* Horizontal Tabs: Engineering, BBA, BCA, MBA, LAW, MEDICAL, DESIGN */}
            <div className="flex justify-start sm:justify-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-1 px-2 sm:px-0">
              {(['Engineering', 'BBA', 'BCA', 'MBA', 'LAW', 'MEDICAL', 'DESIGN'] as const).map((tab) => {
                const isActive = activeSearchedTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveSearchedTab(tab)}
                    className={`text-sm sm:text-base font-bold pb-2 transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                      tab === 'MEDICAL' ? 'hidden sm:block' : ''
                    } ${
                      isActive 
                        ? 'border-red-600 text-gray-900 font-extrabold' 
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* College Cards Grid / Split into Google Rating & Indore Colleges Rating categories */}
          {(() => {
            // Category 01: Top 10 by Google Ratings & Search Reviews
            const GOOGLE_LISTS_BY_TAB: Record<string, string[]> = {
              'Engineering': ['sgsits', 'iet-davv', 'acropolis', 'iist-indore', 'medi-caps-university', 'ips-engineering', 'piemr-indore', 'malwa-institute', 'skitm-indore', 'chameli-devi'],
              'BBA': ['iim-indore', 'pimr', 'ims-davv', 'jaipuria-indore', 'nmims-indore', 'ips-ibmr', 'svim-indore', 'symbiosis-university', 'gsimr', 'iips-davv'],
              'BCA': ['softvision-college', 'sgsits', 'pioneer-institute', 'christian-eminent', 'holkar-science', 'renaissance-college', 'gacc-indore', 'alexia-college', 'apj-kalam-univ', 'sage-university'],
              'MBA': ['iim-indore', 'pimr', 'ims-davv', 'jaipuria-indore', 'nmims-indore', 'ips-ibmr', 'svim-indore', 'symbiosis-university', 'gsimr', 'iips-davv'],
              'LAW': ['iil-indore', 'nmims-law', 'symbiosis-university', 'pimr', 'renaissance-college', 'oriental-university', 'davv', 'iim-indore', 'sage-university', 'acropolis'],
              'MEDICAL': ['mgm-medical', 'saims', 'index-medical', 'shubhdeep-ayurved', 'sage-university', 'malwa-institute', 'medi-caps-university', 'symbiosis-university', 'acropolis', 'davv'],
              'DESIGN': ['cindrebay-design', 'symbiosis-university', 'svvv-indore', 'renaissance-college', 'acropolis', 'sage-university', 'medi-caps-university', 'pimr', 'softvision-college', 'nmims-stme']
            };

            // Category 02: Top 10 evaluated by Indore Colleges Academic & Placement Merit
            const INDORE_LISTS_BY_TAB: Record<string, string[]> = {
              'Engineering': ['iist-indore', 'acropolis', 'medi-caps-university', 'skitm-indore', 'malwa-institute', 'lncts-indore', 'symbiosis-university', 'chameli-devi', 'piemr-indore', 'sri-aurobindo-institute-of-technology'],
              'BBA': ['iim-indore', 'symbiosis-university', 'nmims-indore', 'pimr', 'malwa-institute', 'acropolis', 'sage-university', 'ims-davv', 'jaipuria-indore', 'ips-ibmr'],
              'BCA': ['holkar-science', 'acropolis', 'medi-caps-university', 'softvision-college', 'sage-university', 'pioneer-institute', 'christian-eminent', 'gacc-indore', 'apj-kalam-univ', 'svvv-indore'],
              'MBA': ['iim-indore', 'symbiosis-university', 'nmims-indore', 'pimr', 'malwa-institute', 'acropolis', 'sage-university', 'ims-davv', 'jaipuria-indore', 'ips-ibmr'],
              'LAW': ['iil-indore', 'davv', 'nmims-law', 'symbiosis-university', 'pimr', 'renaissance-college', 'oriental-university', 'iim-indore', 'sage-university', 'acropolis'],
              'MEDICAL': ['mgm-medical', 'saims', 'index-medical', 'shubhdeep-ayurved', 'medi-caps-university', 'sage-university', 'symbiosis-university', 'acropolis', 'davv', 'malwa-institute'],
              'DESIGN': ['symbiosis-university', 'cindrebay-design', 'svvv-indore', 'sage-university', 'renaissance-college', 'acropolis', 'softvision-college', 'medi-caps-university', 'pimr', 'gacc-indore']
            };

            const COLLEGE_NAME_FALLBACKS: Record<string, string> = {
              'svim-indore': 'Shri Vaishnav Institute of Management (SVIM)',
              'gsimr': 'Govindram Seksaria Institute of Management and Research (GSIMR)',
              'iips-davv': 'International Institute of Professional Studies (IIPS - DAVV)',
              'sri-aurobindo-institute-of-technology': 'Sri Aurobindo Institute of Technology (SAIT)'
            };

            // Specific Indore Colleges Rating scores per tab
            const INDORE_RATINGS_BY_TAB: Record<string, Record<string, number>> = {
              'Engineering': {
                'iet-davv': 4.9,
                'medi-caps-university': 4.8,
                'acropolis': 4.7,
                'sgsits': 4.6,
                'symbiosis-university': 4.5,
                'svvv-indore': 4.4
              },
              'BBA': {
                'pimr': 4.9,
                'ims-davv': 4.8,
                'symbiosis-university': 4.7,
                'medi-caps-university': 4.6,
                'sage-university': 4.5,
                'renaissance-college': 4.4
              },
              'BCA': {
                'holkar-science': 4.9,
                'acropolis': 4.8,
                'medi-caps-university': 4.7,
                'softvision-college': 4.6,
                'sage-university': 4.5,
                'pioneer-institute': 4.4
              },
              'MBA': {
                'iim-indore': 5.0,
                'ims-davv': 4.8,
                'jaipuria-indore': 4.7,
                'nmims-indore': 4.6,
                'pimr': 4.5,
                'ips-ibmr': 4.4
              },
              'LAW': {
                'iil-indore': 4.9,
                'davv': 4.8,
                'nmims-law': 4.7,
                'symbiosis-university': 4.6,
                'pimr': 4.4,
                'renaissance-college': 4.3
              },
              'MEDICAL': {
                'mgm-medical': 4.9,
                'saims': 4.8,
                'index-medical': 4.6,
                'shubhdeep-ayurved': 4.5,
                'medi-caps-university': 4.4,
                'sage-university': 4.3
              },
              'DESIGN': {
                'symbiosis-university': 4.9,
                'cindrebay-design': 4.8,
                'svvv-indore': 4.6,
                'sage-university': 4.5,
                'renaissance-college': 4.4,
                'acropolis': 4.2
              }
            };

            const formatFee = (fee: number) => {
              if (!fee || fee === 0) return 'Varies';
              if (fee >= 100000) {
                return `₹${(fee / 100000).toFixed(2).replace(/\.?0+$/, '')} Lakh*`;
              }
              return `₹${fee.toLocaleString('en-IN')}*`;
            };

            interface GoogleMeta {
              rating: number;
              reviewsCount: string;
              quote?: string;
            }

            // Real Google Ratings & Review Counts (provided from Google Maps & Search)
            const GOOGLE_COLLEGE_META: Record<string, GoogleMeta> = {
              // Engineering Colleges
              'sgsits': {
                rating: 4.4,
                reviewsCount: '1.1K',
                quote: '... an engineering college specially famous for b.tech and m.tech...'
              },
              'iist-indore': {
                rating: 4.4,
                reviewsCount: '968',
                quote: 'One of the best Engineering, Management and Pharmacy College'
              },
              'iet-davv': {
                rating: 4.3,
                reviewsCount: '377',
                quote: 'Good facilities and advanced labs are there .'
              },
              'piemr-indore': {
                rating: 4.0,
                reviewsCount: '812',
                quote: 'College are very nice, faculty are very good'
              },
              'patel-college': {
                rating: 4.0,
                reviewsCount: '503',
                quote: '⭐ Advanced labs, supportive faculty, top placements.'
              },
              'ips-engineering': {
                rating: 4.0,
                reviewsCount: '1.1K',
                quote: 'This college truly offers a commendable environment for...'
              },
              // BBA Colleges (from Google Reviews)
              'softvision-college': {
                rating: 4.6,
                reviewsCount: '1.2K',
                quote: 'Best college in Indore & they provide extra certificate course 🤩'
              },
              'alexia-college': {
                rating: 4.5,
                reviewsCount: '402',
                quote: 'Best college Low fee All subjects'
              },
              'gacc-indore': {
                rating: 4.1,
                reviewsCount: '1.4K',
                quote: 'all teachers are experienced and supportive.'
              },
              'renaissance-college': {
                rating: 4.0,
                reviewsCount: '615',
                quote: 'Supportive teachers, friendly environment, and good academic...'
              },
              'pimr': {
                rating: 4.0,
                reviewsCount: '531',
                quote: 'Very helpful faculty college very nice'
              },
              'radiant-institute': {
                rating: 3.8,
                reviewsCount: '512',
                quote: 'Nice college, nice infrastructure, nice faculty'
              },
              // BCA & MBA Colleges
              'pioneer-institute': {
                rating: 4.4,
                reviewsCount: '370',
                quote: 'Suitable for affordable education and professional mentorship.'
              },
              'christian-eminent': {
                rating: 4.3,
                reviewsCount: '379',
                quote: 'Suitable for affordable education and average students.'
              },
              'holkar-science': {
                rating: 4.2,
                reviewsCount: '2.2K',
                quote: 'Best college for science stream, The college have various courses.'
              },
              'jaipuria-indore': {
                rating: 4.5,
                reviewsCount: '415',
                quote: 'The placements are excellent.'
              },
              'ims-davv': {
                rating: 4.3,
                reviewsCount: '319',
                quote: 'Great management institute, One of the best ranked amongst top 30'
              },
              'gujarati-professional': {
                rating: 3.9,
                reviewsCount: '244',
                quote: 'Disciplined academic environment and supportive faculty'
              },
              // Other categories
              'iil-indore': { 
                rating: 4.5, 
                reviewsCount: '1.2K',
                quote: 'Top law college in Central India with great moot courts'
              },
              'iim-indore': { rating: 4.8, reviewsCount: '3.2K', quote: 'India’s premier IIM campus with world-class faculty' },
              'mgm-medical': { rating: 4.6, reviewsCount: '1.4K', quote: 'Top government medical college in MP with MY Hospital' },
              'cindrebay-design': { rating: 4.6, reviewsCount: '280', quote: 'Comprehensive design studio & practical interior courses' },
              'nmims-law': { rating: 4.5, reviewsCount: '410', quote: 'Excellent corporate law faculty and modern moot court' },
              'saims': { rating: 4.4, reviewsCount: '1.2K', quote: 'Sprawling super-speciality medical university campus' },
              'prestige-university': { rating: 4.3, reviewsCount: '320', quote: 'World-class infrastructure and innovative courses' },
              'davv': { rating: 4.3, reviewsCount: '2.1K', quote: 'Historic university departments and wide academic scope' },
              'index-medical': { rating: 4.2, reviewsCount: '760', quote: 'High clinical exposure and multi-speciality hospital' },
              'shubhdeep-ayurved': { rating: 4.1, reviewsCount: '290', quote: 'Serene campus with recognized Ayurvedic hospital' },
              'acropolis': { rating: 3.9, reviewsCount: '1.5K', quote: 'Good placement records in central India for CS and IT' },
              'medi-caps-university': { rating: 3.9, reviewsCount: '1.8K', quote: 'Vibrant university campus with active tech clubs' },
              'symbiosis-university': { rating: 3.9, reviewsCount: '540', quote: 'German model skill-based university with advanced labs' },
              'nmims-stme': { rating: 3.9, reviewsCount: '380' },
              'sage-university': { rating: 3.8, reviewsCount: '920', quote: 'Modern university with high-tech campus infrastructure' },
              'chameli-devi': { rating: 3.8, reviewsCount: '850' },
              'svvv-indore': { rating: 3.8, reviewsCount: '1.1K' },
              'ips-ibmr': { rating: 3.9, reviewsCount: '780' },
              'oriental-university': { rating: 3.8, reviewsCount: '690' },
              'malwa-institute': { rating: 3.7, reviewsCount: '420' },
              'apj-kalam-univ': { rating: 3.7, reviewsCount: '350' }
            };

            const getGoogleRating = (college: Institute): number => {
              if (GOOGLE_COLLEGE_META[college.id]?.rating !== undefined) {
                return GOOGLE_COLLEGE_META[college.id].rating;
              }
              if (college.googleRating !== undefined) return college.googleRating;
              return college.rating || 4.1;
            };

            const getIndoreRating = (college: Institute): number => {
              const tabRatings = INDORE_RATINGS_BY_TAB[activeSearchedTab];
              if (tabRatings && tabRatings[college.id] !== undefined) {
                return tabRatings[college.id];
              }
              if (college.indoreRating !== undefined) return college.indoreRating;
              return Math.min(4.9, Math.max(4.0, (college.rating || 4.2) + 0.2));
            };

            const googleIds = GOOGLE_LISTS_BY_TAB[activeSearchedTab] || [];
            const googleCollegeMatches = googleIds
              .flatMap(id => {
                const institute = INDORE_INSTITUTES.find(inst => inst.id === id);
                const name = institute?.name || COLLEGE_NAME_FALLBACKS[id];
                return name ? [{ id, name, institute }] : [];
              });
            const googleColleges = (activeSearchedTab === 'Engineering' || activeSearchedTab === 'BBA' || activeSearchedTab === 'MBA'
              ? googleCollegeMatches
              : googleCollegeMatches.sort((a, b) => (b.institute ? getGoogleRating(b.institute) : 0) - (a.institute ? getGoogleRating(a.institute) : 0))
            ).slice(0, 10);

            const indoreIds = INDORE_LISTS_BY_TAB[activeSearchedTab] || [];
            const indoreCollegeMatches = indoreIds
              .flatMap(id => {
                const institute = INDORE_INSTITUTES.find(inst => inst.id === id);
                const name = institute?.name || COLLEGE_NAME_FALLBACKS[id];
                return name ? [{ id, name, institute }] : [];
              });
            const indoreColleges = (activeSearchedTab === 'Engineering' || activeSearchedTab === 'BBA' || activeSearchedTab === 'MBA'
              ? indoreCollegeMatches
              : indoreCollegeMatches.sort((a, b) => (b.institute ? getIndoreRating(b.institute) : 0) - (a.institute ? getIndoreRating(a.institute) : 0))
            ).slice(0, 10);

            const renderCollegeListItem = (college: { id: string; name: string; institute?: Institute }, ratingType: 'google' | 'indore', rank: number) => {
              const collegeCategory = (college.institute?.category || activeSearchedTab).toLowerCase();
              const reviewCategory = collegeCategory === 'engineering'
                ? 'technical-college'
                : collegeCategory === 'law'
                  ? 'law-college'
                  : collegeCategory === 'medical'
                    ? 'science-college'
                    : 'professional-college';

              return (
                <div
                  key={`${ratingType}-${college.id}`}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-2 rounded-xl border border-gray-200/80 bg-white px-3 py-3 shadow-xs transition-all duration-200 hover:border-red-200 hover:shadow-sm sm:grid-cols-[auto_auto_minmax(0,1fr)_auto_auto] sm:gap-x-3 sm:px-3.5"
                >
                  <div className="font-outfit text-base font-extrabold leading-none text-[#0F244C] sm:text-lg">
                    Rank {rank}
                  </div>
                  <span aria-hidden="true" className="hidden text-gray-400 sm:block">|</span>
                  {college.institute ? (
                    <Link
                      to={`/college/${college.institute.id}`}
                      className="min-w-0 text-left font-outfit text-sm font-bold leading-snug text-orange-600 transition-colors hover:text-black sm:text-base"
                      title={college.name}
                    >
                      {college.name}
                    </Link>
                  ) : (
                    <span className="min-w-0 text-left font-outfit text-sm font-bold leading-snug text-orange-600 sm:text-base">
                      {college.name}
                    </span>
                  )}
                  <span aria-hidden="true" className="hidden text-gray-400 sm:block">|</span>
                  {ratingType === 'google' ? (
                    <Link
                      to={`/college/${college.id}`}
                      aria-label={`View details for ${college.name}`}
                      className="col-start-2 row-start-2 inline-flex max-w-full items-center justify-center justify-self-start whitespace-normal break-words rounded-lg border border-orange-500 px-2 py-2 text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide text-orange-600 transition-colors hover:bg-orange-500 hover:text-white active:scale-95 sm:col-start-5 sm:row-start-1 sm:justify-self-end sm:px-3 sm:text-[10px]"
                    >
                      View Details →
                    </Link>
                  ) : (
                    <Link
                      to={`/reviews/${reviewCategory}/review-by-indore-colleges?college=${encodeURIComponent(college.id)}`}
                      aria-label={`View Indore Colleges reviews for ${college.name}`}
                      className="col-start-2 row-start-2 inline-flex max-w-full items-center justify-center justify-self-start whitespace-normal break-words rounded-lg border border-orange-500 px-2 py-2 text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide text-orange-600 transition-colors hover:bg-orange-500 hover:text-white active:scale-95 sm:col-start-5 sm:row-start-1 sm:justify-self-end sm:px-3 sm:text-[10px]"
                    >
                      View Indore Colleges Review →
                    </Link>
                  )}
                </div>
              );
            };

            return (
              <div>
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  {/* Prominent Middle Vertical Divider Line for Large Screens */}
                  <div className="hidden lg:flex absolute left-1/2 top-2 bottom-2 -translate-x-1/2 items-center justify-center pointer-events-none z-20">
                    <div className="h-full w-[2px] bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 shadow-xs" />
                    <div className="absolute top-1/2 -translate-y-1/2 bg-white px-2.5 py-1 text-[11px] font-black uppercase text-gray-700 tracking-wider rounded-full border-2 border-gray-300 shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>VS</span>
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    </div>
                  </div>

                  {/* Left Side Category: According to Google Rating */}
                  <div className="bg-gray-50/80 p-4 sm:p-6 rounded-3xl border border-gray-200/80 shadow-2xs">
                    {/* Header Banner */}
                    <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs text-center flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="h-9 w-9 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0">
                          <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                          </svg>
                        </div>
                        <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-black rounded-md uppercase tracking-wider">
                          CATEGORY 01
                        </span>
                      </div>
                      <h3 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.4rem] font-black text-[#0F244C] font-outfit leading-tight tracking-tight min-h-[2.4em] flex items-center justify-center">
                        {googleHeading}
                        <span className="inline-block w-[3px] h-[1em] ml-1 rounded-sm bg-[#0F244C] animate-pulse" />
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 font-medium">
                       [ Based on the SEO work of individual institute ]
                      </p>
                    </div>

                    <div className="space-y-3">
                      {googleColleges.map((college, index) => renderCollegeListItem(college, 'google', index + 1))}
                    </div>
                  </div>

                  {/* Mobile Divider between Left & Right Sections */}
                  <div className="block lg:hidden relative my-4 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-dashed border-gray-300"></div></div>
                    <div className="relative inline-flex items-center gap-1.5 bg-white px-4 py-1.5 text-xs font-black text-gray-700 uppercase tracking-wider rounded-full border-2 border-gray-300 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>VS</span>
                      <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    </div>
                  </div>

                  {/* Right Side Category: According to Indore Colleges Rating */}
                  <div className="bg-gray-50/80 p-4 sm:p-6 rounded-3xl border border-gray-200/80 shadow-2xs">
                    {/* Header Banner */}
                    <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs text-center flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <LogoIcon className="h-9 w-9 shrink-0" />
                        <span className="inline-block px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-200 text-[10px] font-black rounded-md uppercase tracking-wider">
                          CATEGORY 02
                        </span>
                      </div>
                      <h3 className="text-[1.7rem] sm:text-[2rem] lg:text-[2.4rem] font-black text-[#0F244C] font-outfit leading-tight tracking-tight min-h-[2.4em] flex items-center justify-center">
                        {indoreHeading}
                        <span className="inline-block w-[3px] h-[1em] ml-1 rounded-sm bg-[#0F244C] animate-pulse" />
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 font-medium">
                       [ Based on placements, academics, facilities, and amenities ]
                      </p>
                    </div>

                    <div className="space-y-3">
                      {indoreColleges.map((college, index) => renderCollegeListItem(college, 'indore', index + 1))}
                    </div>
                  </div>
                </div>

                {/* View Many More Colleges Button */}
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setInstituteTypeFilter('college');
                      if (activeSearchedTab) {
                        setSelectedCategory(activeSearchedTab);
                      }
                      setActiveTab('explore');
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-[#0F244C] hover:bg-red-600 text-white text-sm sm:text-base font-extrabold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer font-outfit group"
                  >
                    <span>View Many More {activeSearchedTab} Colleges</span>
                    <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* Stream discovery selector */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StreamSelector onSelectStream={stream => setSelectedStream?.(stream)} />
        </div>
      </section>

      {/* 4. REVIEWS & TRUST TESTIMONIALS SECTION */}
      <section id="home-reviews" className="py-12 sm:py-16 bg-slate-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                <Users className="h-4 w-4" />
                <span>Verified Indore Testimonials</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0F244C] font-outfit mt-1">
                Student &amp; Parent Reviews
              </h2>
            </div>
          </div>

          {/* Interactive Filter Pills: All, Students, Parents */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-200/60 mb-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  reviewFilter === 'all'
                    ? 'bg-[#0F244C] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                All Reviews ({REVIEWS.length})
              </button>
              <button
                onClick={() => setReviewFilter('students')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                  reviewFilter === 'students'
                    ? 'bg-[#0F244C] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Student Reviews ({REVIEWS.filter(r => r.type === 'student').length})</span>
              </button>
              <button
                onClick={() => setReviewFilter('parents')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                  reviewFilter === 'parents'
                    ? 'bg-[#0F244C] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>Parent Testimonials ({REVIEWS.filter(r => r.type === 'parent').length})</span>
              </button>
            </div>

            <span className="text-xs text-gray-400 font-medium hidden sm:inline-block">
              Showing {REVIEWS.filter(r => reviewFilter === 'all' ? true : r.type === (reviewFilter === 'students' ? 'student' : 'parent')).length} Verified Experiences
            </span>
          </div>

          {/* Reviews Grid (Responsive 3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS
              .filter(rev => reviewFilter === 'all' ? true : rev.type === (reviewFilter === 'students' ? 'student' : 'parent'))
              .map((rev, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Reviewer Header */}
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div className="flex items-center space-x-3">
                        <div className={`h-11 w-11 rounded-xl ${rev.avatarBg} font-bold text-xs flex items-center justify-center shadow-xs shrink-0`}>
                          {rev.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <h4 className="text-xs sm:text-sm font-bold text-[#0F244C]">{rev.name}</h4>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" title="Verified Review" />
                          </div>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              rev.type === 'parent' 
                                ? 'bg-amber-50 text-amber-700 border border-amber-200/60' 
                                : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                            }`}>
                              {rev.role}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center space-x-0.5 shrink-0 bg-amber-50/60 px-2 py-1 rounded-lg border border-amber-100">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* College & Course Tag */}
                    <div className="bg-slate-50 rounded-xl px-3 py-2 border border-slate-100 mb-3.5 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#0F244C] truncate">{rev.college}</span>
                      <span className="text-gray-500 font-medium truncate ml-2">{rev.course}</span>
                    </div>

                    {/* Comment Body */}
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer: Location & Tag */}
                  <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[10px]">
                    <span className="text-gray-400 font-medium flex items-center">
                      <Compass className="h-3 w-3 mr-1 text-gray-400" />
                      {rev.location}
                    </span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                      {rev.tag}
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>

        </div>
      </section>

      {/* 5. SCHEDULE A MEETING - DETAILED INPUT FORM SECTION */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center bg-[#0F244C] text-white rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-10 relative overflow-hidden shadow-2xl border border-white/5">
            
            {/* Visual ambient circle */}
            <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-[-5%] left-[-5%] h-64 w-64 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

            {/* Left Column: Process Information */}
            <div className="lg:col-span-6 space-y-8 relative z-10">
              <span className="self-center text-[11px] font-bold text-rose-300 uppercase tracking-widest bg-white/5 border border-white/10 px-4.5 py-1.5 rounded-full">
                Admissions Desk
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-outfit leading-tight text-center">
                Schedule a Direct Counseling Meeting
              </h2>
              
              <div className="space-y-4 text-sm font-light text-gray-300">
                <div className="flex items-center space-x-4">
                  <span className="h-6 w-6 rounded-lg bg-red-600/20 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0 border border-red-600/30">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide font-outfit">Unbiased Advice</h4>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="h-6 w-6 rounded-lg bg-red-600/20 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0 border border-red-600/30">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide font-outfit">Cut through the noise</h4>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="h-6 w-6 rounded-lg bg-red-600/20 text-rose-300 font-bold text-xs flex items-center justify-center shrink-0 border border-red-600/30">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide font-outfit">Direct Dean Intros</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Schedule Form Card */}
            <div className="lg:col-span-6 relative z-10 w-full">
              <div className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-10 text-gray-950 shadow-2xl border border-gray-100">
                <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2.5 text-[#0F244C] font-outfit">
                  <Calendar className="h-5.5 w-5.5 text-red-600" />
                  <span>Choose Callback Time Slot</span>
                </h3>

                {isSuccess ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-14 w-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                      <Check className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-bold text-[#0F244C] font-outfit">Meeting Scheduled Successfully!</h4>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                      An advisor has been assigned. We will reach out to you on your +91 mobile shortly with details.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
                    
                    {/* Student / Parent Name */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Student / Parent Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Mobile Number
                      </label>
                      <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-1 focus-within:ring-red-600 focus-within:border-red-600 transition-all">
                        <span className="bg-slate-50 border-r border-slate-100 text-gray-500 px-4 flex items-center font-bold text-xs select-none">
                          +91
                        </span>
                        <input
                           type="tel"
                           pattern="[0-9]{10}"
                           required
                           value={formPhone}
                           onChange={(e) => setFormPhone(e.target.value)}
                           placeholder="Enter 10-digit phone number"
                           className="flex-1 px-4 py-3 bg-white text-xs text-gray-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Query Message */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Preferred streams or target courses (Optional)
                      </label>
                      <textarea
                        value={formQuery}
                        onChange={(e) => setFormQuery(e.target.value)}
                        placeholder="e.g. Looking for MBA / B.Tech courses near Vijay Nagar"
                        rows={2}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 resize-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 active:scale-98 text-white rounded-xl py-4 text-xs font-bold transition shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? 'Scheduling now...' : 'Get Free Counsel Call'}</span>
                    </button>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. POPULAR LOCALITIES IN INDORE */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
              <MapPin className="h-5 w-5" />
              <span>Campus Map Hubs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F244C] font-outfit text-center">
              Explore Colleges by Location in Indore
            </h2>
          </div>

          {/* Localities Pill Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {LOCALITIES.map((loc) => (
              <motion.a
                key={loc.name}
                href={`/locality/${loc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={(event) => handleLocalityClick(loc.name, event)}
                className="group cursor-pointer bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-red-600/30 hover:bg-red-600/5 transition-all flex items-center text-left"
              >
                <div className="flex items-center space-x-3 sm:space-x-3.5 min-w-0">
                  <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-[#0F244C] group-hover:text-red-600 transition font-outfit">{loc.name}</h4>
                    <span className="text-xs text-gray-500">{loc.collegeIds.length} colleges</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-labelledby="homepage-comparison-heading">
        <h2 id="homepage-comparison-heading">How to compare colleges in Indore</h2>
        <p>
          IndoreColleges.in is a student-focused college discovery and comparison platform. Use the college profiles and category listings to explore options in Indore and build a shortlist that fits your course plans and priorities.
        </p>
        <ul>
          <li>Courses: check the courses and specializations listed by each college against your academic interests.</li>
          <li>Fees: compare the fee information shown for each option and confirm the current total directly with the college.</li>
          <li>Admission eligibility: review the stated entry requirements and verify current eligibility and admission steps with the institution.</li>
          <li>Placements: compare the placement information available on profiles and ask colleges about the reporting period and course-specific outcomes.</li>
          <li>Facilities: review the facilities described by each college and consider which are relevant to your course.</li>
          <li>Location: compare campus locations in Indore with your commute, transport and accommodation needs.</li>
        </ul>
        <p>
          For college admission in Indore, compare colleges for the specific course you want rather than relying on a single overall label such as best or top. Confirm important details with the college before applying.
        </p>
        <nav aria-label="College category pages">
          <ul>
            {HOME_CATEGORY_LINKS.map(category => (
              <li key={category.slug}>
                <Link
                  to={`/explore/${category.slug}`}
                  className="focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
                >
                  {category.label} in Indore
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

    </div>
  );
}
