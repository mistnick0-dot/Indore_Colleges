import React, { useState, useEffect, useMemo } from 'react';
import { Link, Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { INDORE_INSTITUTES } from '../data/indoreData';
import { 
  GraduationCap, 
  Building2, 
  Award, 
  TrendingUp, 
  Scale, 
  Stethoscope, 
  ShieldCheck, 
  Users,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Bell,
  Check,
  Flame,
  Film,
  X,
  CheckCircle2,
  ExternalLink,
  Youtube,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Helper to detect and normalize video source URLs
function parseVideoSource(url?: string): {
  type: 'youtube' | 'vimeo' | 'html5' | 'none';
  src: string;
  videoId?: string;
} {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return { type: 'none', src: '' };
  }
  const clean = url.trim();

  const ytMatch = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      videoId: ytMatch[1],
      src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`
    };
  }

  const vimeoMatch = clean.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      videoId: vimeoMatch[1],
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}`
    };
  }

  return {
    type: 'html5',
    src: clean
  };
}

export type CategoryType = 
  | 'Technical College'
  | 'Pharmacy College'
  | 'PG College'
  | 'Professional College'
  | 'Law College'
  | 'Science College';

export type ReviewPerspectiveType = 
  | 'Review by Indore Colleges'
  | 'Review by Actual Students'
  | 'Review by College Authority';

export interface CategoryItem {
  id: CategoryType;
  title: string;
  specializations: string[];
  icon: React.ElementType;
}

export const CATEGORIES_LIST: CategoryItem[] = [
  {
    id: 'Technical College',
    title: 'Technical College',
    specializations: ['B.Tech.', 'M.Tech.', 'Diploma'],
    icon: GraduationCap,
  },
  {
    id: 'Professional College',
    title: 'Professional College',
    specializations: ['BBA', 'B.Com.', 'BCA'],
    icon: Building2,
  },
  {
    id: 'PG College',
    title: 'PG College',
    specializations: ['MBA', 'MCA', 'M.Sc.', 'PGDM', 'PGDGA'],
    icon: TrendingUp,
  },
  {
    id: 'Pharmacy College',
    title: 'Pharmacy College',
    specializations: ['D.Pharma', 'B.Pharma', 'M.Pharma'],
    icon: Award,
  },
  {
    id: 'Law College',
    title: 'Law College',
    specializations: ['BA LLB', 'BBA LLB'],
    icon: Scale,
  },
  {
    id: 'Science College',
    title: 'Science College',
    specializations: ['B.Sc. Nursing', 'Paramedical'],
    icon: Stethoscope,
  },
];

export interface PerspectiveItem {
  type: ReviewPerspectiveType;
  title: string;
  cardNumber: number;
  icon: React.ElementType;
  iconBgInactive: string;
  iconColorInactive: string;
  iconBgActive: string;
}

export const REVIEW_PERSPECTIVES: PerspectiveItem[] = [
  {
    type: 'Review by Indore Colleges',
    title: 'Review by Indore Colleges',
    cardNumber: 1,
    icon: ShieldCheck,
    iconBgInactive: 'bg-orange-50',
    iconColorInactive: 'text-[#F66710]',
    iconBgActive: 'bg-[#F66710] text-white',
  },
  {
    type: 'Review by Actual Students',
    title: 'Review by Actual Students',
    cardNumber: 2,
    icon: Users,
    iconBgInactive: 'bg-blue-50',
    iconColorInactive: 'text-blue-600',
    iconBgActive: 'bg-blue-600 text-white',
  },
  {
    type: 'Review by College Authority',
    title: 'Review by College Authority',
    cardNumber: 3,
    icon: Building2,
    iconBgInactive: 'bg-emerald-50',
    iconColorInactive: 'text-emerald-600',
    iconBgActive: 'bg-emerald-600 text-white',
  },
];

export interface VideoCardData {
  id: string;
  collegeName: string;
  location: string;
  type: string;
  title: string;
  duration: string;
  thumbnail: string;
  perspectiveType: ReviewPerspectiveType;
  category: CategoryType;
  description: string;
  tags: string[];
  productionProgress: number;
  votesCount: number;
  videoUrl?: string;
  authoritySpeaker?: string;
  isLiveAuthorityVideo?: boolean;
  collegeId?: string;
}

const CATEGORY_INSTITUTE_TYPES: Record<CategoryType, string[]> = {
  'Technical College': ['Engineering'],
  'Professional College': ['Management', 'Arts & Science'],
  'PG College': ['Management', 'Arts & Science'],
  'Pharmacy College': ['Medical'],
  'Law College': ['Law'],
  'Science College': ['Medical', 'Arts & Science'],
};

function getVideosForPerspective(category: CategoryType, perspective: ReviewPerspectiveType): VideoCardData[] {
  const colleges = INDORE_INSTITUTES
    .filter(institute => institute.type === 'college' && CATEGORY_INSTITUTE_TYPES[category].includes(institute.category))
    .sort((a, b) => b.rating - a.rating);
  const indoreCollegeReviewOrder = ['sgsits', 'iet-davv', 'malwa-institute', 'acropolis', 'ips-engineering', 'piemr-indore'];
  const collegesForPerspective = perspective === 'Review by Indore Colleges'
    ? indoreCollegeReviewOrder
      .map(collegeId => colleges.find(college => college.id === collegeId))
      .filter(college => college !== undefined)
    : colleges;

  return collegesForPerspective.map((col, idx) => {
    let title = '';
    let description = '';
    let tags: string[] = [];

    const activeCollegeVideoUrl = col.videoUrl || col.backgroundVideoUrl;
    const isSGSITS = col.name.toLowerCase().includes('sgsits') || col.id === 'sgsits';

    let videoUrl = (
      perspective === 'Review by Indore Colleges'
      || perspective === 'Review by College Authority'
      || isSGSITS
    ) ? activeCollegeVideoUrl : undefined;
    let isLiveAuthorityVideo = false;
    let authoritySpeaker = '';

    if (perspective === 'Review by Indore Colleges') {
      title = `${col.name} Complete Campus Ground Audit & ROI Reality Review`;
      description = `360° independent inspection of ${col.name}: laboratories quality, actual verified placements, faculty expertise, fee breakdown, and ground reality.`;
      tags = ['Campus Audit', 'Placement Reality', 'Lab Infrastructure', 'ROI Analysis'];
    } else if (perspective === 'Review by Actual Students') {
      title = `Ground Reality & Day in Life at ${col.name} — By Current Students`;
      description = `Unfiltered student feedback on ${col.name}: attendance policies, campus crowd, hostel food & living, exams, coding clubs, and real placement assistance.`;
      tags = ['Student Feedback', 'Hostel Life', 'Campus Crowd', 'Honest Review'];
    } else {
      // Review by College Authority
      if (isSGSITS) {
        authoritySpeaker = 'Prof. Neetesh Purohit (Director, SGSITS)';
        title = `Executive Dialogue & Authority Review — Prof. Neetesh Purohit (Director, SGSITS)`;
        description = `Official review and institutional address by SGSITS Director: deep dive into autonomous curriculum, NIRF benchmarks, 44 LPA placements, and 2026 admissions roadmap.`;
        tags = ['Director Review', 'Autonomous Curriculum', 'JEE Main Cutoffs', '44 LPA Placements'];
        isLiveAuthorityVideo = Boolean(activeCollegeVideoUrl);
        videoUrl = activeCollegeVideoUrl;
      } else {
        const foundDir = col.facultyList?.find(f => f.qualification?.toLowerCase().includes('director') || f.role?.toLowerCase().includes('director'))?.name;
        authoritySpeaker = foundDir ? `${foundDir} (Director)` : `Institutional Leadership & Academic Council`;
        title = `Executive Dialogue with College Authority — ${col.name}`;
        description = `Official executive dialogue with leadership of ${col.name}: discussing 2026 admissions, industry MoUs, syllabus updates, and student career roadmaps.`;
        tags = ['Dean Interview', 'Accreditations', 'Industry MoUs', '2026 Roadmap'];
        if (activeCollegeVideoUrl) {
          isLiveAuthorityVideo = true;
          videoUrl = activeCollegeVideoUrl;
        }
      }
    }

    return {
      id: `${category}-${perspective}-${idx}`,
      collegeName: col.name,
      location: col.location,
      type: col.category,
      title,
      duration: isLiveAuthorityVideo ? 'Official Stream' : `${14 + idx * 2}m ${20 + idx * 5}s`,
      thumbnail: col.image,
      perspectiveType: perspective,
      category,
      description,
      tags,
      productionProgress: isLiveAuthorityVideo ? 100 : Math.min(75 + idx * 4, 100),
      votesCount: 42 + idx * 18,
      videoUrl,
      authoritySpeaker,
      isLiveAuthorityVideo,
      collegeId: col.id
    };
  }).filter(video => perspective === 'Review by Indore Colleges' && Boolean(video.videoUrl));
}

export default function ReviewsHierarchyTable() {
  const location = useLocation();
  const { categorySlug, perspectiveSlug } = useParams<{ categorySlug?: string; perspectiveSlug?: string }>();
  const [searchParams] = useSearchParams();
  const requestedCollegeId = searchParams.get('college');
  const basePath = location.pathname.startsWith('/reviews') ? '/reviews' : '/blogs';
  const categoryFromRoute = CATEGORIES_LIST.find(
    category => category.id.toLowerCase().replace(/[^a-z0-9]+/g, '-') === categorySlug
  );
  const perspectiveFromRoute = REVIEW_PERSPECTIVES.find(
    perspective => perspective.type.toLowerCase().replace(/[^a-z0-9]+/g, '-') === perspectiveSlug
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Technical College');
  const activeCategory = categoryFromRoute?.id ?? selectedCategory;
  const showingPerspectives = Boolean(categoryFromRoute);
  const selectedPerspectiveForVideos = perspectiveFromRoute?.type ?? null;
  const activeCategorySlug = activeCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const categoryPath = `${basePath}/${activeCategorySlug}`;

  // Local state for interactive notifications & upvotes
  const [notifiedVideos, setNotifiedVideos] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('indore_reviews_notified');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [videoVotes, setVideoVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  // Interactive Teaser Video Player Modal
  const [previewVideoModal, setPreviewVideoModal] = useState<VideoCardData | null>(null);
  const [isPlayingSimulated, setIsPlayingSimulated] = useState<boolean>(true);
  const [isMutedSimulated, setIsMutedSimulated] = useState<boolean>(false);
  const [playerCurrentTime, setPlayerCurrentTime] = useState<number>(12);
  // Toast
  const [notificationToast, setNotificationToast] = useState<{ title: string; desc: string } | null>(null);

  useEffect(() => {
    let timer: any;
    if (previewVideoModal && isPlayingSimulated) {
      timer = setInterval(() => {
        setPlayerCurrentTime(prev => (prev >= 60 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [previewVideoModal, isPlayingSimulated]);

  const toggleNotify = (videoId: string, collegeName: string) => {
    const updated = { ...notifiedVideos, [videoId]: !notifiedVideos[videoId] };
    setNotifiedVideos(updated);
    try {
      localStorage.setItem('indore_reviews_notified', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (updated[videoId]) {
      setNotificationToast({
        title: 'Launch Alert Active',
        desc: `You will be notified immediately when the ${collegeName} video goes live!`
      });
    } else {
      setNotificationToast({
        title: 'Alert Removed',
        desc: `Notification preference updated for ${collegeName}.`
      });
    }
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleVoteAnticipation = (videoId: string) => {
    if (userVoted[videoId]) return;
    setUserVoted(prev => ({ ...prev, [videoId]: true }));
    setVideoVotes(prev => ({ ...prev, [videoId]: (prev[videoId] || 0) + 1 }));
  };

  // Videos list when on the videos page
  const videosList = useMemo(
    () => selectedPerspectiveForVideos
      ? getVideosForPerspective(activeCategory, selectedPerspectiveForVideos)
      : [],
    [activeCategory, selectedPerspectiveForVideos]
  );
  const requestedCollegeVideo = videosList.find(video => video.collegeId === requestedCollegeId);

  useEffect(() => {
    if (selectedPerspectiveForVideos === 'Review by Indore Colleges' && requestedCollegeVideo?.videoUrl) {
      setPreviewVideoModal(requestedCollegeVideo);
    }
  }, [requestedCollegeVideo, selectedPerspectiveForVideos]);

  if ((categorySlug && !categoryFromRoute) || (perspectiveSlug && !perspectiveFromRoute)) {
    return <Navigate to={categorySlug && categoryFromRoute ? categoryPath : basePath} replace />;
  }

  if (selectedPerspectiveForVideos && !categoryFromRoute) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <div className="w-full py-2">
      {/* Toast Alert */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 max-w-sm bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3"
          >
            <div className="p-1.5 rounded-lg bg-[#F66710] text-white shrink-0 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <p className="font-bold text-white text-sm">{notificationToast.title}</p>
              <p className="text-slate-300 mt-0.5 leading-relaxed">{notificationToast.desc}</p>
            </div>
            <button 
              onClick={() => setNotificationToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* CASE 1: MAIN PAGE (Categories + Showing 3 Perspectives)                    */}
      {/* ========================================================================= */}
      {!selectedPerspectiveForVideos ? (
        <div className="space-y-7 sm:space-y-8">
          {!showingPerspectives ? (
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900 mb-6 text-center">
              CATEGORIES
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4">
              {CATEGORIES_LIST.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = activeCategory === cat.id;

                return (
                  <Link
                    key={cat.id}
                    to={`${basePath}/${cat.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full p-3 sm:p-4 md:p-5 rounded-2xl text-center transition-all duration-200 cursor-pointer bg-white border flex flex-col items-center justify-between gap-2 sm:gap-2.5 group min-h-[135px] sm:min-h-[150px] ${
                      isSelected
                        ? 'border-2 border-[#F66710] shadow-sm ring-2 sm:ring-4 ring-orange-500/10'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Center Top: Icon */}
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 ${
                        isSelected
                          ? 'bg-orange-50/90 text-[#F66710] scale-105'
                          : 'bg-slate-100/80 text-slate-600 group-hover:text-slate-900 group-hover:bg-slate-100'
                      }`}
                    >
                      <IconComponent className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>

                    {/* Center: Heading */}
                    <h3
                      className={`text-xs sm:text-sm md:text-base font-bold transition-colors leading-snug text-center ${
                        isSelected ? 'text-[#F66710]' : 'text-slate-900 group-hover:text-[#F66710]'
                      }`}
                    >
                      {cat.title}
                    </h3>

                    {/* Center: Specializations of that card */}
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 pt-0.5 w-full">
                      {cat.specializations.map((spec) => (
                        <span
                          key={spec}
                          className={`text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md transition-colors whitespace-nowrap ${
                            isSelected
                              ? 'bg-orange-100/70 text-[#F66710] border border-orange-200/60'
                              : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                          }`}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <Link
                to={basePath}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#F66710] text-white text-xs font-bold transition shadow-xs cursor-pointer self-start"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Categories</span>
              </Link>
              <span className="text-xs text-slate-500 font-semibold">{activeCategory}</span>
            </div>

            {/* 2. REVIEW PERSPECTIVES */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900 mb-5 text-center">
              REVIEWS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {REVIEW_PERSPECTIVES.map((persp) => {
                const IconComponent = persp.icon;
                const perspectivePath = persp.type.toLowerCase().replace(/[^a-z0-9]+/g, '-');

                return (
                  <Link
                    key={persp.type}
                    to={`${categoryPath}/${perspectivePath}`}
                    className="w-full bg-white rounded-3xl border border-slate-200 hover:border-[#F66710] hover:shadow-lg p-6 sm:p-8 transition-all duration-200 cursor-pointer text-center flex flex-col items-center justify-center gap-3.5 group min-h-[170px]"
                  >
                    {/* At the center top: Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${persp.iconBgInactive} ${persp.iconColorInactive} group-hover:bg-[#F66710] group-hover:text-white group-hover:scale-105 shadow-xs`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* In center: Large Heading */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-lg sm:text-xl font-bold leading-snug text-slate-900 group-hover:text-[#F66710] transition-colors text-center">
                        {persp.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* CASE 2: REDIRECTED VIDEOS PAGE FOR SELECTED PERSPECTIVE                   */
        /* ========================================================================= */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Top Bar: Return Button & Breadcrumbs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <Link
              to={categoryPath}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#F66710] text-white text-xs font-bold transition shadow-xs cursor-pointer self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Reviews</span>
            </Link>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold flex-wrap">
              <Link
                to={basePath}
                className="hover:text-[#F66710] transition cursor-pointer"
              >
                Categories
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                to={categoryPath}
                className="hover:text-[#F66710] transition cursor-pointer"
              >
                {activeCategory}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#F66710] font-black">{selectedPerspectiveForVideos}</span>
            </div>
          </div>


          {/* Videos Grid Header */}
          <div className="flex flex-col items-center gap-4 text-center">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2.5">
                <span>{activeCategory} Video Reviews</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-[#F66710] font-bold">
                  {videosList.length} Videos
                </span>
              </h3>

            <a
              href="https://www.youtube.com/@Indorecolleges"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition shrink-0 group cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              <span>Subscribe on YouTube @Indorecolleges</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition" />
            </a>
          </div>

          {requestedCollegeId && !requestedCollegeVideo && (
            <div className="rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 text-center text-sm font-semibold text-slate-700">
              {INDORE_INSTITUTES.find(institute => institute.id === requestedCollegeId)?.name ?? 'This college'} does not have an Indore Colleges review video yet.
            </div>
          )}

          {/* 6 Videos Cards Grid */}
          {videosList.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {videosList.map((video, idx) => {
              const isNotified = !!notifiedVideos[video.id];
              const hasVoted = !!userVoted[video.id];
              const votes = video.votesCount + (videoVotes[video.id] || 0);

              return (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* College thumbnail with play action and card number */}
                  <div 
                    onClick={() => setPreviewVideoModal(video)}
                    className="relative aspect-16/9 bg-slate-950 overflow-hidden cursor-pointer select-none"
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.collegeName}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-85 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
                      }}
                    />

                    <div className="absolute inset-0 bg-black/35 pointer-events-none" />

                    <span className="absolute top-3 right-3 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/75 text-white border border-white/20">
                      #{idx + 1}
                    </span>

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-13 h-13 rounded-full bg-[#F66710] text-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ring-4 ring-white/30">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>

                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-black leading-snug text-[#F66710] mb-2 break-words">
                        {video.collegeName}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {video.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleVoteAnticipation(video.id)}
                        className={`text-xs font-bold flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition cursor-pointer ${
                          hasVoted
                            ? 'text-[#F66710] bg-orange-50'
                            : 'text-slate-500 hover:text-[#F66710] hover:bg-slate-100'
                        }`}
                        title="Vote this video as top anticipation priority"
                      >
                        <Flame className={`w-3.5 h-3.5 ${hasVoted ? 'fill-[#F66710] text-[#F66710]' : ''}`} />
                        <span>{votes} Anticipating</span>
                      </button>

                      {video.videoUrl ? (
                        <button
                          onClick={() => setPreviewVideoModal(video)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>{video.isLiveAuthorityVideo ? 'Watch Authority Video' : 'Watch Review Video'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleNotify(video.id, video.collegeName)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                            isNotified
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-900 text-white hover:bg-[#F66710]'
                          }`}
                        >
                          {isNotified ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Notified</span>
                            </>
                          ) : (
                            <>
                              <Bell className="w-3.5 h-3.5" />
                              <span>Notify Me</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
              <p className="text-sm font-bold text-slate-800">No review videos available yet.</p>
              <p className="mt-1 text-xs text-slate-500">College cards will appear here when their review videos are added.</p>
            </div>
          )}

          {/* Bottom Notice */}
          {selectedPerspectiveForVideos !== 'Review by Indore Colleges' && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#F66710] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Video Release Schedule &amp; Production Notice
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our videography team is filming on-ground in Indore. Click "Notify Me" on any college card to get an instant alert upon video release.
                </p>
              </div>
            </div>

            <Link
              to={categoryPath}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs transition cursor-pointer shrink-0"
            >
              ← Back to Reviews
            </Link>
          </div>
          )}
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL: VIDEO TEASER PLAYER & LAUNCH ALERT NOTIFICATION        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {previewVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewVideoModal(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* VIDEO PLAYER SCREEN: REAL VIDEO OR TEASER */}
              {previewVideoModal.videoUrl ? (
                <div className="relative aspect-16/9 bg-slate-950 overflow-hidden">
                  {(() => {
                    const parsed = parseVideoSource(previewVideoModal.videoUrl);
                    if (parsed.type === 'youtube') {
                      return (
                        <iframe
                          src={`${parsed.src}?autoplay=1&controls=1&rel=0`}
                          title={previewVideoModal.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      );
                    }
                    if (parsed.type === 'vimeo') {
                      return (
                        <iframe
                          src={`${parsed.src}?autoplay=1`}
                          title={previewVideoModal.title}
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      );
                    }
                    return (
                      <video
                        src={parsed.src}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    );
                  })()}

                  {/* Badges on top */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-600 text-white shadow-lg flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      <span>{previewVideoModal.perspectiveType}</span>
                    </span>
                    {previewVideoModal.isLiveAuthorityVideo && (
                      <span className="text-[10px] font-bold text-white/90 bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-xs">
                        Directorate Verified
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                /* SIMULATED VIDEO PLAYER SCREEN */
                <div className="relative aspect-16/9 bg-slate-950 overflow-hidden select-none">
                  <img 
                    src={previewVideoModal.thumbnail} 
                    alt={previewVideoModal.collegeName} 
                    className="w-full h-full object-cover opacity-60"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

                  {/* Animated Teaser Watermark */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#F66710] text-white shadow-lg flex items-center gap-1.5">
                      <Film className="w-3 h-3" />
                      <span>Teaser Preview</span>
                    </span>
                    <span className="text-[10px] font-bold text-white/80 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      4K Ultra HD
                    </span>
                  </div>

                  {/* Center Video Teaser Animation */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-[#F66710]/95 text-white flex items-center justify-center mb-3 ring-8 ring-white/10 shadow-2xl">
                      {isPlayingSimulated ? (
                        <Play className="w-7 h-7 fill-white ml-1 animate-pulse" />
                      ) : (
                        <Pause className="w-7 h-7 text-white" />
                      )}
                    </div>

                    <span className="text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full bg-amber-500 text-black mb-1 shadow-md">
                      Coming Soon • In Final Editing
                    </span>
                    <p className="text-xs text-slate-300 font-light max-w-sm">
                      Premiere scheduled for 2026 Admissions Session
                    </p>

                    {/* Simulated Audio Visualizer Wave */}
                    {isPlayingSimulated && (
                      <div className="flex items-center gap-1 mt-3">
                        {[16, 28, 12, 34, 20, 40, 18, 26, 32, 14, 22].map((height, i) => (
                          <span 
                            key={i} 
                            className="w-1 bg-[#F66710] rounded-full animate-pulse" 
                            style={{ height: `${height}px`, animationDelay: `${i * 0.1}s` }} 
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Simulated Interactive Video Controls Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent flex flex-col gap-2">
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                      <div 
                        className="h-full bg-[#F66710] rounded-full transition-all duration-300"
                        style={{ width: `${(playerCurrentTime / 60) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-white/90">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setIsPlayingSimulated(!isPlayingSimulated)}
                          className="hover:text-orange-400 transition cursor-pointer"
                        >
                          {isPlayingSimulated ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                        </button>
                        <button 
                          onClick={() => setIsMutedSimulated(!isMutedSimulated)}
                          className="hover:text-orange-400 transition cursor-pointer"
                        >
                          {isMutedSimulated ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <span>00:{playerCurrentTime.toString().padStart(2, '0')} / Est. {previewVideoModal.duration}</span>
                      </div>

                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                        Full 4K Video Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal details */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 text-center leading-snug">
                  {previewVideoModal.collegeName}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
