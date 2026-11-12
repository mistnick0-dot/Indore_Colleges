import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import IntroVideoSection from './components/IntroVideoSection';
import StreamSelector from './components/StreamSelector';
import Footer from './components/Footer';
import InstituteCard from './components/InstituteCard';
import SidebarCounseling from './components/SidebarCounseling';
import CounsellingDashboard from './components/CounsellingDashboard';
import RegisterSchool from './components/RegisterSchool';
import CollegeDetailPage from './components/CollegeDetailPage';
import InteractiveMap from './components/InteractiveMap';
import OrbChatbot from './components/OrbChatbot';
import BlogsPage from './components/BlogsPage';
import { CATEGORIES_LIST, REVIEW_PERSPECTIVES } from './components/ReviewsHierarchyTable';
import VirtualAdvisorModal from './components/VirtualAdvisorModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import AboutUsPage from './components/AboutUsPage';
import CareersPage from './components/CareersPage';
import ContactUsPage from './components/ContactUsPage';
import CollegePartnerRegistration from './components/CollegePartnerRegistration';
import AdminPortal from './components/AdminPortal';
import { Institute, SearchFilters, UserProfile } from './types';
import { Search, MapPin, Award, IndianRupee, HelpCircle, PhoneCall, Check, X, Compass, ChevronRight, HelpCircle as HelpIcon, Cpu, Briefcase, Laptop, Scale, HeartPulse, Palette, TrendingUp, ChevronLeft, Sparkles, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INDORE_INSTITUTES, INDORE_LOCATIONS, INDORE_LOCALITY_GROUPS, CATEGORIES, BOARDS } from './data/indoreData';

export function getInstituteZone(locationStr: string): string {
  const loc = (locationStr || '').toLowerCase();
  
  if (loc.includes('sanwer') || loc.includes('super corridor') || loc.includes('sukhliya') || loc.includes('scheme 78')) {
    return 'north';
  }
  if (loc.includes('simrol') || loc.includes('khandwa') || loc.includes('limbodi') || loc.includes('ralamandal') || loc.includes('garpiplaya')) {
    return 'simrol';
  }
  if (loc.includes('rau') || loc.includes('manik') || loc.includes('rajendra') || loc.includes('annapurna') || loc.includes('sudama') || loc.includes('gumasta') || loc.includes('dwarkapuri') || loc.includes('pigdamber') || loc.includes('mogh') || loc.includes('mog') || loc.includes('dhar')) {
    return 'south-west';
  }
  if (loc.includes('bypass') || loc.includes('jhalaria') || loc.includes('nipania') || loc.includes('bicholi') || loc.includes('mahalaxmi') || loc.includes('dakachya')) {
    return 'bypass';
  }
  return 'central';
}

type CategorySeo = {
  title: string;
  description: string;
};

const CATEGORY_SEO: Record<string, CategorySeo> = {
  engineering: {
    title: 'Engineering Colleges in Indore | BTech Colleges & Admission',
    description: 'Explore engineering colleges in Indore, including BTech and BE options. Compare courses, fees, admissions and college information.'
  },
  bba: {
    title: 'BBA Colleges in Indore | Courses, Fees & Admission',
    description: 'Explore BBA colleges in Indore and compare courses, fees, admission details and college information to find suitable BBA options.'
  },
  bca: {
    title: 'BCA Colleges in Indore | Courses, Fees & Admission',
    description: 'Explore BCA colleges in Indore with course, fee and admission information. Compare BCA options and find colleges matching your goals.'
  },
  mba: {
    title: 'MBA Colleges in Indore | Courses, Fees & Admission',
    description: 'Explore MBA colleges in Indore with courses, fees and admission information. Compare management institutes and MBA study options.'
  },
  law: {
    title: 'Law Colleges in Indore | LLB & BA LLB Colleges',
    description: 'Explore law colleges in Indore, including LLB and BA LLB options. Find course, admission and college information.'
  },
  medical: {
    title: 'Medical Colleges in Indore | MBBS & Admission',
    description: 'Explore medical colleges in Indore, including MBBS options. Find admission, course and college information for medical education.'
  },
  design: {
    title: 'Design Colleges in Indore | Courses & Admission',
    description: 'Explore design colleges in Indore and find information about design courses, B.Des options, admissions and institutes.'
  }
};

const HOMEPAGE_SEO = {
  title: 'Indore Colleges | Compare Courses, Fees & Admission',
  description: 'Explore colleges in Indore by course. Compare engineering, medical, MBA, BBA, BCA, law and design colleges, then review fees, eligibility, placements and facilities.',
  canonical: 'https://indorecolleges.in/',
  socialUrl: 'https://indorecolleges.in',
  ogDescription: 'Explore colleges in Indore by course. Compare engineering, medical, MBA, BBA, BCA, law and design colleges, then review fees, eligibility, placements and facilities.',
  image: 'https://indorecolleges.in/logo.svg'
};

const SEO_ORIGIN = 'https://indorecolleges.in';
const COLLEGE_JSON_LD_ID = 'college-profile-seo-jsonld';

export type PageSeo = {
  title: string;
  description: string;
  canonical: string;
  socialUrl: string;
  ogDescription: string;
  image: string;
  robots: string;
};

function normalizeSeoText(value?: string) {
  return (value || '').replace(/\s+/g, ' ').trim();
}

function truncateSeoText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;

  const shortened = value.slice(0, maxLength - 3).trim();
  const lastSpace = shortened.lastIndexOf(' ');
  return `${(lastSpace > 0 ? shortened.slice(0, lastSpace) : shortened)}...`;
}

function getCollegeSeoTitle(college: Institute) {
  const titleName = /\bindore\b/i.test(college.name) ? college.name : `${college.name} Indore`;
  const fullTitle = `${titleName} - Courses, Fees, Cutoff & Admission | Indore Colleges`;
  return fullTitle.length <= 120
    ? fullTitle
    : `${college.name} | Indore Colleges`;
}

function getCollegeSeoDescription(college: Institute) {
  const name = normalizeSeoText(college.name);
  const location = normalizeSeoText(college.location);
  const category = normalizeSeoText(college.category);
  const courses = (college.coursesList || [])
    .map(course => normalizeSeoText(course.name))
    .filter(Boolean)
    .slice(0, 2)
    .join(', ');
  const locationText = location ? ` in ${location}` : '';
  const categoryText = category ? `${category} courses` : 'college courses';
  const completeDescription = `${name}${locationText}: explore ${categoryText}, fees, admission details and campus information on Indore Colleges.`;
  const courseDescription = courses
    ? `${name}${locationText}: explore ${categoryText} such as ${courses}, plus fees and admission details on Indore Colleges.`
    : completeDescription;

  return truncateSeoText(courseDescription.length <= 160 ? courseDescription : completeDescription, 160);
}

function getAbsoluteSeoImage(image?: string) {
  const normalizedImage = normalizeSeoText(image);
  if (!normalizedImage) return HOMEPAGE_SEO.image;

  try {
    return new URL(normalizedImage, SEO_ORIGIN).href;
  } catch {
    return HOMEPAGE_SEO.image;
  }
}

function updateMetaTag(attribute: 'name' | 'property', value: string, content: string) {
  const tags = Array.from(document.head.querySelectorAll<HTMLMetaElement>(`meta[${attribute}="${value}"]`));
  let tag = tags[0];
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tags.slice(1).forEach(duplicate => duplicate.remove());
  tag.setAttribute('content', content);
}

export function updateRobotsMeta(seo: PageSeo | null) {
  updateMetaTag('name', 'robots', seo?.robots ?? 'noindex, follow');
}

function updateCanonicalUrl(url: string) {
  const canonicals = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
  let canonical = canonicals[0];
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonicals.slice(1).forEach(duplicate => duplicate.remove());
  canonical.setAttribute('href', url);
}

export function getCollegeJsonLd(college: Institute, canonical: string, description: string, image: string) {
  const collegeSchema: Record<string, unknown> = {
    '@type': 'CollegeOrUniversity',
    '@id': `${canonical}#college`,
    name: college.name,
    url: canonical,
    image,
    description
  };

  if (college.address) {
    collegeSchema.address = {
      '@type': 'PostalAddress',
      streetAddress: college.address,
      ...(college.location ? { addressLocality: college.location } : {})
    };
  }
  if (college.contactPhone) collegeSchema.telephone = college.contactPhone;
  if (college.contactEmail) collegeSchema.email = college.contactEmail;
  if (college.website) collegeSchema.sameAs = [college.website];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      collegeSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Explore', item: `${SEO_ORIGIN}/explore` },
          { '@type': 'ListItem', position: 3, name: college.name, item: canonical }
        ]
      }
    ]
  };
}

function updateCollegeJsonLd(college: Institute, canonical: string, description: string, image: string) {
  const existingScripts = Array.from(document.head.querySelectorAll<HTMLScriptElement>(`script#${COLLEGE_JSON_LD_ID}`));
  let script = existingScripts[0];
  if (!script) {
    script = document.createElement('script');
    script.id = COLLEGE_JSON_LD_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  existingScripts.slice(1).forEach(duplicate => duplicate.remove());
  script.textContent = JSON.stringify(getCollegeJsonLd(college, canonical, description, image));
}

function removeCollegeJsonLd() {
  document.head.querySelectorAll(`script#${COLLEGE_JSON_LD_ID}`).forEach(script => script.remove());
}

export function getPageSeo(pathname: string, institutes: Institute[]): PageSeo | null {
  const streamParam = pathname.startsWith('/explore/')
    ? pathname.slice('/explore/'.length)
    : '';
  const categorySeo = streamParam ? CATEGORY_SEO[streamParam] : undefined;
  const collegeId = pathname.startsWith('/college/')
    ? pathname.slice('/college/'.length)
    : '';
  const college = collegeId ? institutes.find(institute => institute.id === collegeId) : undefined;
  const isCollegePath = pathname.startsWith('/college/');
  const localitySlug = pathname.startsWith('/locality/')
    ? pathname.slice('/locality/'.length)
    : '';
  const localityGroup = localitySlug
    ? INDORE_LOCALITY_GROUPS.find(group =>
      group.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === localitySlug
    )
    : undefined;
  const isKnownLocality = Boolean(localityGroup);
  const publicRoutePaths = new Set([
    '/',
    '/explore',
    '/register',
    '/dashboard',
    '/reviews',
    '/blogs',
    '/about',
    '/careers',
    '/contact',
    '/college-portal',
    '/admin-panel',
  ]);
  const editorialParts = pathname.match(/^\/(reviews|blogs)\/([^/]+)(?:\/([^/]+))?$/);
  const editorialCategory = editorialParts
    ? CATEGORIES_LIST.find(category =>
      category.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === editorialParts[2]
    )
    : undefined;
  const editorialPerspective = editorialParts?.[3]
    ? REVIEW_PERSPECTIVES.find(perspective =>
      perspective.type.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === editorialParts[3]
    )
    : undefined;
  const isEditorialDetail = Boolean(
    editorialParts
    && editorialCategory
    && (!editorialParts[3] || editorialPerspective)
  );
  const isEditorialPage = Boolean(isEditorialDetail && editorialParts && editorialCategory);
  const editorialSection = editorialParts?.[1] === 'reviews' ? 'College Reviews' : 'College Guides';
  const localityName = localityGroup?.name.replace(/\s*\/\s*/g, ' and ');
  const localityDescription = localityGroup
    ? `Explore colleges near ${localityName} in Indore. Compare ${localityGroup.collegeIds.length} colleges by courses, fees, admissions and facilities.`
    : '';
  const editorialSubject = editorialCategory ? `${editorialCategory.title.toLowerCase()} options` : '';
  const editorialTitle = editorialCategory
    ? editorialPerspective
      ? `${editorialCategory.title} — ${editorialPerspective.title} | ${editorialSection} | Indore Colleges`
      : `${editorialCategory.title} | ${editorialSection} in Indore | Indore Colleges`
    : '';
  const editorialDescription = editorialCategory
    ? `${editorialParts?.[1] === 'reviews' ? 'Read' : 'Explore'} ${editorialPerspective ? `${editorialPerspective.title.toLowerCase()} about ` : 'college reviews and admission insights for '}${editorialSubject} in Indore. Find college insights, admissions information and student perspectives.`
    : '';

  if (
    (isCollegePath && !college)
    || (pathname.startsWith('/explore/') && !categorySeo)
    || (pathname.startsWith('/locality/') && !localityGroup)
    || (!college && !categorySeo && !publicRoutePaths.has(pathname) && !isEditorialDetail && !isKnownLocality)
  ) {
    return null;
  }

  const pageTitle = college
    ? getCollegeSeoTitle(college)
    : categorySeo?.title || (localityGroup
      ? `${localityName} Colleges in Indore | Locality Guide | Indore Colleges`
      : isEditorialPage
      ? editorialTitle
      : (() => {
    let title = HOMEPAGE_SEO.title;
    if (pathname === '/explore') {
      title = "Explore Top Colleges & Universities in Indore | Indore Colleges";
    } else if (pathname.startsWith('/explore/')) {
      title = `Top ${streamParam.toUpperCase()} Colleges in Indore 2026 - Admissions & Fees | Indore Colleges`;
    } else if (pathname === '/register') {
      title = "Direct College & School Application | Indore Colleges";
    } else if (pathname === '/dashboard') {
      title = "Counselling Dashboard & Lead Status | Indore Colleges";
    } else if (pathname === '/reviews') {
      title = 'College Reviews in Indore | Student & College Perspectives | Indore Colleges';
    } else if (pathname === '/blogs') {
      title = "Admission Guides & Education Blogs | Indore Colleges";
    } else if (pathname === '/about') {
      title = "About Indore Colleges - MP's #1 Education Portal";
    } else if (pathname === '/careers') {
      title = "Join Our Team - Careers | Indore Colleges";
    } else if (pathname === '/contact') {
      title = "Contact Us & Support | Indore Colleges";
    } else if (pathname === '/college-portal') {
      title = "College Partner Registration Portal | Indore Colleges";
    } else if (pathname === '/admin-panel') {
      title = "Admin Control Portal | Indore Colleges";
    }
    return title;
  })());

  const isCategoryPage = Boolean(categorySeo);
  const publicPagePaths = new Set(['/explore', '/reviews', '/blogs', '/about', '/careers', '/contact']);
  const routeDescriptions: Record<string, string> = {
    '/reviews': 'Browse Indore college review categories and perspectives from students, Indore Colleges, and college authorities.',
    '/blogs': 'Browse college reviews and admission guides by education category, with perspectives on colleges in Indore.',
    '/explore': 'Browse colleges in Indore by course and category, and compare available institute information.',
    '/about': 'Learn about Indore Colleges and its mission to help students explore institutions and education options in the region.',
    '/careers': 'Explore careers at Indore Colleges and learn about the team and work supporting students and families.',
    '/contact': 'Contact Indore Colleges with questions about fees, affiliation boards, courses, or campus counselling, and find office details.',
  };
  const noindexPaths = new Set(['/register', '/dashboard', '/college-portal', '/admin-panel']);
  const canonical = college
    ? `${SEO_ORIGIN}/college/${encodeURIComponent(college.id)}`
    : isCategoryPage
    ? `${SEO_ORIGIN}/explore/${streamParam}`
    : (localityGroup || isEditorialPage)
    ? `${SEO_ORIGIN}${pathname}`
    : publicPagePaths.has(pathname)
    ? `${SEO_ORIGIN}${pathname}`
    : HOMEPAGE_SEO.canonical;
  const socialUrl = college || isCategoryPage || localityGroup || isEditorialPage || publicPagePaths.has(pathname)
    ? canonical
    : HOMEPAGE_SEO.socialUrl;
  const description = college
    ? getCollegeSeoDescription(college)
    : categorySeo?.description || (localityGroup
      ? localityDescription
      : isEditorialPage
      ? editorialDescription
      : routeDescriptions[pathname] || HOMEPAGE_SEO.description);
  const ogDescription = college
    ? description
    : categorySeo?.description || (localityGroup || isEditorialPage || routeDescriptions[pathname]
      ? description
      : HOMEPAGE_SEO.ogDescription);
  const image = college ? getAbsoluteSeoImage(college.image) : HOMEPAGE_SEO.image;

  return {
    title: pageTitle,
    description,
    canonical,
    socialUrl,
    ogDescription,
    image,
    robots: noindexPaths.has(pathname) ? 'noindex, follow' : 'index, follow',
  };
}

function ScrollToTopAndSEO({ institutes }: { institutes: Institute[] }) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const seo = getPageSeo(pathname, institutes);
    updateRobotsMeta(seo);
    if (!seo) {
      removeCollegeJsonLd();
      document.title = 'Page Not Found | Indore Colleges';
      document.head
        .querySelectorAll('link[rel="canonical"], meta[name="description"], meta[property^="og:"], meta[name^="twitter:"]')
        .forEach(tag => tag.remove());
      return;
    }
    const college = pathname.startsWith('/college/')
      ? institutes.find(institute => institute.id === pathname.slice('/college/'.length))
      : undefined;

    document.title = seo.title;
    updateMetaTag('name', 'description', seo.description);
    updateCanonicalUrl(seo.canonical);
    updateMetaTag('property', 'og:title', seo.title);
    updateMetaTag('property', 'og:description', seo.ogDescription);
    updateMetaTag('property', 'og:url', seo.socialUrl);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:image', seo.image);
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', seo.title);
    updateMetaTag('name', 'twitter:description', seo.ogDescription);
    updateMetaTag('name', 'twitter:url', seo.socialUrl);
    updateMetaTag('name', 'twitter:image', seo.image);

    if (college) {
      updateCollegeJsonLd(college, seo.canonical, seo.description, seo.image);
    } else {
      removeCollegeJsonLd();
    }
  }, [institutes, pathname]);

  return null;
}

function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700">Indore Colleges</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 max-w-xl text-gray-600">The page you requested may have moved or may no longer be available.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link className="rounded-lg bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800" to="/">Go to homepage</Link>
        <Link className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50" to="/explore">Explore colleges</Link>
      </div>
    </section>
  );
}

function EditorialRoute() {
  const { categorySlug, perspectiveSlug } = useParams<{ categorySlug?: string; perspectiveSlug?: string }>();
  const categoryExists = CATEGORIES_LIST.some(category =>
    category.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === categorySlug
  );
  const perspectiveExists = REVIEW_PERSPECTIVES.some(perspective =>
    perspective.type.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === perspectiveSlug
  );

  if (!categoryExists || (perspectiveSlug && !perspectiveExists)) {
    return <NotFoundPage />;
  }
  return <BlogsPage />;
}

function CollegeDetailRoute({
  institutes,
  institutesLoaded,
  onScheduleCounseling,
  shortlistedIds,
  handleToggleShortlist,
  cartIds,
  handleToggleCart
}: {
  institutes: Institute[];
  institutesLoaded: boolean;
  onScheduleCounseling: (inst: Institute) => void;
  shortlistedIds: string[];
  handleToggleShortlist: (id: string) => void;
  cartIds: string[];
  handleToggleCart: (id: string) => void;
}) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const college = institutes.find(i => i.id === id) || INDORE_INSTITUTES.find(i => i.id === id);

  if (!college && institutesLoaded) {
    return <NotFoundPage />;
  }

  if (!college) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <div className="h-10 w-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin mb-2" />
        <p className="text-xs font-semibold">Loading college details...</p>
      </div>
    );
  }

  return (
    <CollegeDetailPage
      key={college.id}
      institute={college}
      onBack={() => {
        if (window.history.length > 2) {
          navigate(-1);
        } else {
          navigate('/explore');
        }
      }}
      onScheduleCounseling={onScheduleCounseling}
      isShortlisted={shortlistedIds.includes(college.id)}
      onToggleShortlist={() => handleToggleShortlist(college.id)}
      isInCart={cartIds.includes(college.id)}
      onToggleCart={() => handleToggleCart(college.id)}
    />
  );
}

function ExploreRoute({
  institutes,
  loading,
  searchQuery,
  setSearchQuery,
  instituteTypeFilter,
  setInstituteTypeFilter,
  selectedCategory,
  setSelectedCategory,
  selectedBoard,
  setSelectedBoard,
  selectedLocation,
  setSelectedLocation,
  maxFee,
  setMaxFee,
  showMap,
  setShowMap,
  filteredInstitutes,
  handleOpenCounseling,
  handleOpenCallback,
  handleToggleShortlist,
  shortlistedIds,
  handleToggleCart,
  cartIds,
  navigate
}: any) {
  const { streamParam, localitySlug } = useParams<{ streamParam?: string; localitySlug?: string }>();
  const selectedStream = streamParam || null;
  const selectedLocality = localitySlug
    ? INDORE_LOCALITY_GROUPS.find(group =>
      group.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === localitySlug
    )
    : null;

  if (streamParam && !CATEGORY_SEO[streamParam]) {
    return <NotFoundPage />;
  }

  if (localitySlug && !selectedLocality) {
    return <NotFoundPage />;
  }

  if (selectedLocality) {
    const localityInstitutes = selectedLocality.collegeIds
      .map((id: string) => institutes.find((institute: Institute) => institute.id === id)
        || INDORE_INSTITUTES.find(institute => institute.id === id))
      .filter((institute: Institute | undefined): institute is Institute => Boolean(institute));

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={`locality-${localitySlug}`}
      >
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/60 shadow-xs">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-700 transition flex items-center justify-center cursor-pointer"
                aria-label="Back to home"
              >
                <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900">{selectedLocality.name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {localityInstitutes.length} colleges in this location
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-sm font-bold text-red-600 hover:text-red-500 transition bg-red-50/50 hover:bg-red-50 px-4 py-2.5 rounded-xl cursor-pointer"
            >
              Explore Other Locations
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden divide-y divide-gray-150">
            {localityInstitutes.map((institute, index) => (
              <motion.div
                key={institute.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-red-50/5 transition duration-150"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                    index === 0 ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                    index === 1 ? 'bg-slate-400/10 text-slate-600 border-slate-200' :
                    index === 2 ? 'bg-amber-700/10 text-amber-800 border-amber-300' :
                    'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>
                    #{index + 1}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <Link
                      to={`/college/${institute.id}`}
                      className="font-extrabold text-base sm:text-lg text-gray-900 hover:text-red-600 hover:underline transition decoration-2 decoration-red-500/30"
                    >
                      {institute.name}
                    </Link>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-400 font-bold">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-rose-500" />
                        {institute.location}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-amber-500" />
                        {institute.rating > 0
                          ? `${institute.rating} ${institute.ratingSource ? `${institute.ratingSource} ` : ''}Rating`
                          : 'Rating not listed'}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span className="inline-flex items-center gap-1">
                        {institute.feePerAnnum > 0
                          ? `₹${institute.feePerAnnum.toLocaleString('en-IN')}/year`
                          : 'Contact college for fees'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <Link
                    to={`/college/${institute.id}`}
                    className="text-sm font-bold bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 px-4 py-2.5 rounded-xl transition"
                  >
                    View Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenCounseling(institute)}
                    className="text-sm font-bold bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    );
  }

  const setSelectedStream = (stream: string | null) => {
    if (stream) {
      navigate(`/explore/${stream}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={selectedStream || 'explore'}
    >
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {instituteTypeFilter === 'college' && (
          <div className="w-full">
            {!selectedStream ? (
              <StreamSelector onSelectStream={stream => setSelectedStream(stream)} />
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/60 shadow-xs">
                  <div className="flex items-center space-x-4">
                    <button
                      id="btn-back-to-streams"
                      onClick={() => setSelectedStream(null)}
                      className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-700 transition flex items-center justify-center cursor-pointer"
                      title="Back to Streams"
                    >
                      <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                    </button>
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                        <Sparkles className="h-3 w-3 animate-pulse text-amber-500" />
                        Stream Spotlight
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1 capitalize flex items-center gap-2">
                        Top 10 {selectedStream === 'bba' || selectedStream === 'mba' || selectedStream === 'bca' ? selectedStream.toUpperCase() : selectedStream} Colleges in Indore
                      </h2>
                    </div>
                  </div>
                  <button
                    id="link-all-streams"
                    onClick={() => setSelectedStream(null)}
                    className="text-xs font-extrabold text-red-600 hover:text-red-500 transition flex items-center gap-1.5 cursor-pointer bg-red-50/50 hover:bg-red-50 px-3.5 py-2 rounded-xl"
                  >
                    Explore Other Streams
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-w-4xl mx-auto w-full">
                  {(() => {
                    if (selectedStream === 'engineering') {
                      const engineeringColleges = [
                        { rank: 1, name: 'IIST', id: 'iist-indore', displayName: 'Indore Institute of Science & Technology' },
                        { rank: 2, name: 'Acropolis', id: 'acropolis', displayName: 'Acropolis Institute of Technology and Research' },
                        { rank: 3, name: 'Medi-Caps University', id: 'medi-caps-university', displayName: 'Medi-Caps University' },
                        { rank: 4, name: 'SKITM', id: 'skitm-indore', displayName: 'Shivajirao Kadam Institute of Technology & Management' },
                        { rank: 5, name: 'MIST', id: 'malwa-institute', displayName: 'Malwa Institute of Science & Technology' },
                        { rank: 6, name: 'LNCTS', id: 'lncts-indore', displayName: 'Lakshmi Narain College of Technology & Science' },
                        { rank: 7, name: 'SUAS', id: 'symbiosis-university', displayName: 'Symbiosis University of Applied Sciences (SUAS)' },
                        { rank: 8, name: 'CDGI', id: 'chameli-devi', displayName: 'Chameli Devi Group of Institutions' },
                        { rank: 9, name: 'PIEMR', id: 'piemr-indore', displayName: 'Prestige Institute of Engineering Management and Research (PIEMR)' },
                        { rank: 10, name: 'SAIT', id: 'sri-aurobindo-institute-of-technology', displayName: 'Sri Aurobindo Institute of Technology (SAIT)' }
                      ];

                      return (
                        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden divide-y divide-gray-150">
                          {engineeringColleges.map((item, index) => {
                            const matchingInst = institutes.find((i: any) => i.id === item.id);
                            return (
                              <motion.div
                                key={item.rank}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04 }}
                                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-red-50/5 transition duration-150 group"
                              >
                                <div className="flex items-start sm:items-center space-x-4">
                                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                                    item.rank === 1 ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                                    item.rank === 2 ? 'bg-slate-400/10 text-slate-600 border-slate-200' :
                                    item.rank === 3 ? 'bg-amber-700/10 text-amber-800 border-amber-300' :
                                    'bg-gray-50 text-gray-500 border-gray-150'
                                  }`}>
                                    #{item.rank}
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <div>
                                      <Link
                                        to={matchingInst ? `/college/${matchingInst.id}` : '#'}
                                        className="text-left font-extrabold text-base text-gray-900 hover:text-red-600 hover:underline transition cursor-pointer decoration-2 decoration-red-500/30"
                                      >
                                        {item.displayName || item.name}
                                      </Link>
                                    </div>
                                    
                                    {matchingInst && (
                                      <div className="flex items-center space-x-3 text-xs text-gray-400 font-bold">
                                        <span>📍 {matchingInst.location}</span>
                                        <span>•</span>
                                        <span>⭐ {matchingInst.rating} Rating</span>
                                        {matchingInst.feePerAnnum && (
                                          <>
                                            <span>•</span>
                                            <span>₹{(matchingInst.feePerAnnum / 1000).toFixed(0)}k/year</span>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {matchingInst && (
                                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                                    <Link
                                      to={`/college/${matchingInst.id}`}
                                      className="text-xs font-bold bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
                                    >
                                      View Details
                                    </Link>
                                    <button
                                      onClick={() => handleOpenCounseling(matchingInst)}
                                      className="text-xs font-bold bg-red-600 hover:bg-red-500 text-white px-3.5 py-2 rounded-xl transition cursor-pointer"
                                    >
                                      Apply Now
                                    </button>
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    } else {
                      const streamFiltered = institutes.filter((inst: any) => {
                        if (inst.type !== 'college') return false;
                        const lowerCat = inst.category?.toLowerCase() || '';
                        const lowerName = inst.name?.toLowerCase() || '';
                        const coursesStr = JSON.stringify(inst.coursesList || '').toLowerCase();

                        if (selectedStream === 'bba') {
                          return lowerCat.includes('management') || coursesStr.includes('bba');
                        }
                        if (selectedStream === 'bca') {
                          return coursesStr.includes('bca') || coursesStr.includes('bsc') || lowerName.includes('malwa');
                        }
                        if (selectedStream === 'mba') {
                          return lowerCat.includes('management') || coursesStr.includes('mba');
                        }
                        if (selectedStream === 'law') {
                          return lowerCat.includes('law') || coursesStr.includes('ll.b') || coursesStr.includes('law');
                        }
                        if (selectedStream === 'medical') {
                          return lowerCat.includes('medical') || coursesStr.includes('physiotherapy') || coursesStr.includes('bpt');
                        }
                        if (selectedStream === 'design') {
                          return lowerCat.includes('design') || coursesStr.includes('design');
                        }
                        return false;
                      });

                      const mistInst = streamFiltered.find((inst: any) => inst.id === 'malwa-institute');
                      const otherColleges = streamFiltered.filter((inst: any) => inst.id !== 'malwa-institute');
                      otherColleges.sort((a: any, b: any) => b.rating - a.rating);

                      const bbaMbaCollegeOrder = [
                        'iim-indore',
                        'symbiosis-university',
                        'nmims-indore',
                        'pimr',
                        'malwa-institute',
                        'acropolis',
                        'sage-university',
                        'ims-davv',
                        'jaipuria-indore',
                        'ips-ibmr'
                      ];
                      const combined = [];
                      if (mistInst && ['bba', 'bca', 'mba'].includes(selectedStream)) {
                        combined.push(mistInst);
                      }
                      const finalTop10 = ['bba', 'mba'].includes(selectedStream)
                        ? bbaMbaCollegeOrder
                          .map(collegeId => streamFiltered.find((inst: any) => inst.id === collegeId))
                          .filter(Boolean)
                        : [...combined, ...otherColleges].slice(0, 10);

                      return (
                        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden divide-y divide-gray-150">
                          {finalTop10.map((inst: any, index: number) => {
                            const rank = index + 1;
                            return (
                              <motion.div
                                key={inst.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04 }}
                                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-red-50/5 transition duration-150 group"
                              >
                                <div className="flex items-start sm:items-center space-x-4">
                                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                                    rank === 1 ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                                    rank === 2 ? 'bg-slate-400/10 text-slate-600 border-slate-200' :
                                    rank === 3 ? 'bg-amber-700/10 text-amber-800 border-amber-300' :
                                    'bg-gray-50 text-gray-500 border-gray-150'
                                  }`}>
                                    #{rank}
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <div>
                                      <Link
                                        to={`/college/${inst.id}`}
                                        className="text-left font-extrabold text-base text-gray-900 hover:text-red-600 hover:underline transition cursor-pointer decoration-2 decoration-red-500/30"
                                      >
                                        {inst.name}
                                      </Link>
                                    </div>
                                    <div className="flex items-center space-x-3 text-xs text-gray-400 font-bold">
                                      <span>📍 {inst.location}</span>
                                      <span>•</span>
                                      <span>⭐ {inst.rating} Rating</span>
                                      {inst.feePerAnnum && (
                                        <>
                                          <span>•</span>
                                          <span>₹{(inst.feePerAnnum / 1000).toFixed(0)}k/year</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                                  <Link
                                    to={`/college/${inst.id}`}
                                    className="text-xs font-bold bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
                                  >
                                    View Details
                                  </Link>
                                  <button
                                    onClick={() => handleOpenCounseling(inst)}
                                    className="text-xs font-bold bg-red-600 hover:bg-red-500 text-white px-3.5 py-2 rounded-xl transition cursor-pointer"
                                  >
                                    Apply Now
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {instituteTypeFilter !== 'college' && (
          <>
            <div className="space-y-4 max-w-2xl mx-auto w-full">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-600 transition bg-white shadow-xs">
                <Search className="absolute top-4 left-4.5 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                  placeholder="Search institute name, location, courses..."
                  className="w-full pl-12 pr-12 py-4 bg-white text-sm text-gray-800 focus:outline-none placeholder-gray-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4.5 top-4 text-xs font-bold text-gray-400 hover:text-gray-600 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {showMap && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <InteractiveMap
                    institutes={institutes}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    onViewDetail={(item: any) => navigate(`/college/${item.id}`)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <div className="relative h-10 w-10 mb-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-20 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-10 w-10 bg-red-600 text-white items-center justify-center font-bold text-xs">
                    EP
                  </span>
                </div>
                <p className="text-xs">Loading verified Indore profiles...</p>
              </div>
            ) : filteredInstitutes.length === 0 ? (
              <div className="text-center py-24 bg-white border border-dashed border-gray-200 rounded-2xl">
                <Search className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-gray-700">No colleges or institutes match your criteria</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Try clearing search keywords or typing a different query.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                  }}
                  className="mt-4 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInstitutes.map((inst: any) => (
                  <InstituteCard
                    key={inst.id}
                    institute={inst}
                    onSelect={handleOpenCounseling}
                    onRequestCallback={handleOpenCallback}
                    onScheduleCounseling={handleOpenCounseling}
                    onViewDetail={(item) => navigate(`/college/${item.id}`)}
                    isShortlisted={shortlistedIds.includes(inst.id)}
                    onToggleShortlist={() => handleToggleShortlist(inst.id)}
                    isInCart={cartIds.includes(inst.id)}
                    onToggleCart={() => handleToggleCart(inst.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
      {!selectedStream && instituteTypeFilter === 'college' && <IntroVideoSection />}
    </motion.div>
  );
}

export default function App({ initialInstitutes = [] }: { initialInstitutes?: Institute[] } = {}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [institutes, setInstitutes] = useState<Institute[]>(initialInstitutes);
  const [loading, setLoading] = useState(initialInstitutes.length === 0);
  const [institutesLoaded, setInstitutesLoaded] = useState(false);

  // Derive activeTab from current route path
  const getActiveTabFromPath = (path: string): 'home' | 'explore' | 'register' | 'dashboard' | 'blogs' | 'about' | 'careers' | 'contact' | 'college-portal' | 'admin-panel' => {
    if (path.startsWith('/explore') || path.startsWith('/college/')) return 'explore';
    if (path === '/register') return 'register';
    if (path === '/dashboard') return 'dashboard';
    if (path.startsWith('/blogs') || path.startsWith('/reviews')) return 'blogs';
    if (path === '/about') return 'about';
    if (path === '/careers') return 'careers';
    if (path === '/contact') return 'contact';
    if (path === '/college-portal') return 'college-portal';
    if (path === '/admin-panel') return 'admin-panel';
    return 'home';
  };

  const activeTab = getActiveTabFromPath(location.pathname);

  const handleTabChange = (tab: 'home' | 'explore' | 'register' | 'dashboard' | 'blogs' | 'about' | 'careers' | 'contact' | 'college-portal' | 'admin-panel') => {
    const routeMap: Record<string, string> = {
      'home': '/',
      'explore': '/explore',
      'register': '/register',
      'dashboard': '/dashboard',
      'blogs': '/reviews',
      'about': '/about',
      'careers': '/careers',
      'contact': '/contact',
      'college-portal': '/college-portal',
      'admin-panel': '/admin-panel'
    };
    navigate(routeMap[tab] || '/');
  };

  // User Session & Authentication States
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [pendingAction, setPendingAction] = useState<{
    type: 'shortlist' | 'cart' | 'counseling' | 'general_counseling' | 'callback' | 'view_basket';
    data?: any;
  } | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [instituteTypeFilter, setInstituteTypeFilter] = useState<'all' | 'school' | 'college'>('college');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBoard, setSelectedBoard] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [maxFee, setMaxFee] = useState(1500000); // 15 Lakh Max

  // Counseling Sidebar state
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Callback Modal state
  const [callbackInstitute, setCallbackInstitute] = useState<Institute | null>(null);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  // Virtual Advisor State
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  // Favorites / Shortlist State
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  // Admissions Basket / Cart State
  const [cartIds, setCartIds] = useState<string[]>([]);

  const [hasLoadedLocalState, setHasLoadedLocalState] = useState(false);

  useEffect(() => {
    let active = true;
    try {
      const savedShortlist = localStorage.getItem('edupath_shortlisted_ids');
      const savedCart = localStorage.getItem('edupath_cart_ids');
      if (savedShortlist) setShortlistedIds(JSON.parse(savedShortlist));
      if (savedCart) setCartIds(JSON.parse(savedCart));
    } catch (e) {
      console.warn('Could not restore saved colleges from this browser.');
    }

    fetch('/api/auth/session')
      .then(async response => {
        if (response.ok) {
          const data = await response.json();
          if (!active || !data.user) return;
          setCurrentUser(data.user);
          localStorage.setItem('indore_user_profile', JSON.stringify(data.user));
          setShortlistedIds(previous => Array.from(new Set([
            ...previous,
            ...(Array.isArray(data.user.shortlistedIds) ? data.user.shortlistedIds : []),
          ])));
          setCartIds(previous => Array.from(new Set([
            ...previous,
            ...(Array.isArray(data.user.cartIds) ? data.user.cartIds : []),
          ])));
        } else if (response.status === 401) {
          localStorage.removeItem('indore_user_profile');
        }
      })
      .catch(() => {
        if (active) console.warn('Could not verify the saved user session.');
      })
      .finally(() => {
        if (active) setHasLoadedLocalState(true);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedLocalState) return;
    localStorage.setItem('edupath_shortlisted_ids', JSON.stringify(shortlistedIds));
  }, [hasLoadedLocalState, shortlistedIds]);

  useEffect(() => {
    if (!hasLoadedLocalState) return;
    localStorage.setItem('edupath_cart_ids', JSON.stringify(cartIds));
  }, [hasLoadedLocalState, cartIds]);

  const requireAuth = (
    action: {
      type: 'shortlist' | 'cart' | 'counseling' | 'general_counseling' | 'callback' | 'view_basket';
      data?: any;
    },
    message: string
  ): boolean => {
    if (currentUser) {
      return true;
    }
    setPendingAction(action);
    setAuthMessage(message);
    setIsAuthOpen(true);
    return false;
  };

  const syncHistoryToBackend = async (shortIds: string[], basketIds: string[]) => {
    try {
      const response = await fetch('/api/users/sync-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shortlistedIds: shortIds, cartIds: basketIds }),
      });
      if (!response.ok) {
        console.warn('Saved college changes could not be synchronized with the account.');
      }
    } catch {
      console.warn('Saved college changes could not be synchronized with the account.');
    }
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('indore_user_profile', JSON.stringify(user));

    const mergedShortlisted = Array.from(new Set([...shortlistedIds, ...(user.shortlistedIds || [])]));
    const mergedCart = Array.from(new Set([...cartIds, ...(user.cartIds || [])]));

    setShortlistedIds(mergedShortlisted);
    setCartIds(mergedCart);
    void syncHistoryToBackend(mergedShortlisted, mergedCart);

    if (pendingAction) {
      const { type, data } = pendingAction;
      setTimeout(() => {
        if (type === 'shortlist') {
          setShortlistedIds(prev => {
            const next = prev.includes(data) ? prev : [...prev, data];
            void syncHistoryToBackend(next, mergedCart);
            return next;
          });
        } else if (type === 'cart') {
          setCartIds(prev => {
            const next = prev.includes(data) ? prev : [...prev, data];
            void syncHistoryToBackend(mergedShortlisted, next);
            return next;
          });
        } else if (type === 'counseling') {
          setSelectedInstitute(data);
          setIsCounselingOpen(true);
        } else if (type === 'general_counseling') {
          setSelectedInstitute(null);
          setIsCounselingOpen(true);
        } else if (type === 'callback') {
          setCallbackInstitute(data);
          setIsCallbackOpen(true);
        }
      }, 300);
    }

    setPendingAction(null);
    setAuthMessage('');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) console.warn('The server could not end the user session.');
    } catch {
      console.warn('The server could not end the user session.');
    }
    setCurrentUser(null);
    localStorage.removeItem('indore_user_profile');
    setShortlistedIds([]);
    setCartIds([]);
    setIsProfileOpen(false);
  };

  const handleDeleteProfile = async () => {
    if (!currentUser) return;
    const response = await fetch(`/api/users/profile/${encodeURIComponent(currentUser.email)}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Unable to delete the account profile.');
    }
    setCurrentUser(null);
    localStorage.removeItem('indore_user_profile');
    setShortlistedIds([]);
    setCartIds([]);
    setIsProfileOpen(false);
    console.log('User profile deleted successfully.');
  };

  const handleToggleShortlist = (id: string) => {
    if (!requireAuth({ type: 'shortlist', data: id }, 'Please log in to add colleges to your likes/shortlist.')) return;
    setShortlistedIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      if (currentUser) void syncHistoryToBackend(next, cartIds);
      return next;
    });
  };

  const handleToggleCart = (id: string) => {
    if (!requireAuth({ type: 'cart', data: id }, 'Please log in to add colleges to your admission basket.')) return;
    setCartIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      if (currentUser) void syncHistoryToBackend(shortlistedIds, next);
      return next;
    });
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const handleApplyAdvisorFilters = (filters: {
    type: 'all' | 'school' | 'college';
    category: string;
    board: string;
    location: string;
    maxFee: number;
  }) => {
    setInstituteTypeFilter(filters.type);
    setSelectedCategory(filters.category);
    setSelectedBoard(filters.board);
    setSelectedLocation(filters.location);
    setMaxFee(filters.maxFee);
    
    navigate('/explore');
  };

  const fetchInstitutes = async () => {
    setLoading(initialInstitutes.length === 0);
    try {
      const res = await fetch('/api/institutes');
      if (!res.ok) throw new Error(`Institute API returned ${res.status}`);
      const data: unknown = await res.json();
      if (!Array.isArray(data)) throw new Error('Institute API returned invalid data');
      setInstitutes(data);
    } catch (err) {
      console.error('Error fetching Indore institutes:', err);
    } finally {
      setInstitutesLoaded(true);
      setLoading(false);
    }
  };

  const handleOpenCounseling = (inst: Institute) => {
    if (!requireAuth({ type: 'counseling', data: inst }, `Please log in to schedule expert counseling for ${inst.name}.`)) return;
    setSelectedInstitute(inst);
    setIsCounselingOpen(true);
  };

  const handleOpenGeneralCounseling = () => {
    if (!requireAuth({ type: 'general_counseling' }, 'Please log in to schedule expert career counseling.')) return;
    setSelectedInstitute(null);
    setIsCounselingOpen(true);
  };

  const handleOpenCallback = (inst: Institute) => {
    if (!requireAuth({ type: 'callback', data: inst }, `Please log in to request a callback from ${inst.name}.`)) return;
    setCallbackInstitute(inst);
    setIsCallbackOpen(true);
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName || !callbackPhone) return;

    setCallbackSubmitting(true);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: callbackName,
          phone: callbackPhone,
          instituteId: callbackInstitute?.id,
          email: currentUser?.email || ''
        })
      });

      if (res.ok) {
        setCallbackSuccess(true);
        setCallbackName('');
        setCallbackPhone('');
        setTimeout(() => {
          setCallbackSuccess(false);
          setIsCallbackOpen(false);
          setCallbackInstitute(null);
        }, 2500);
      }
    } catch (err) {
      console.error('Error booking callback:', err);
    } finally {
      setCallbackSubmitting(false);
    }
  };

  // Filter Logic
  const filteredInstitutes = institutes.filter((inst) => {
    if (instituteTypeFilter !== 'all' && inst.type !== instituteTypeFilter) return false;

    if (searchQuery) {
      const query = searchQuery.trim().toLowerCase();
      const isGenericSearch = ['college', 'colleges', 'collage', 'collages', 'school', 'schools', 'institute', 'institutes', 'university', 'universities'].some(term => term === query || query.includes(term));
      
      if (!isGenericSearch) {
        const matchName = inst.name.toLowerCase().includes(query);
        const matchLoc = inst.location.toLowerCase().includes(query);
        const matchCat = inst.category.toLowerCase().includes(query);
        if (!matchName && !matchLoc && !matchCat) return false;
      }
    }

    if (selectedCategory !== 'All') {
      if (selectedCategory === 'BBA') {
        const hasBBA = inst.category === 'BBA' || inst.category === 'Management' || 
          inst.coursesList?.some(c => c.name.toLowerCase().includes('bba'));
        if (!hasBBA) return false;
      } else if (selectedCategory === 'BCA') {
        const hasBCA = inst.category === 'BCA' || 
          inst.coursesList?.some(c => c.name.toLowerCase().includes('bca') || c.name.toLowerCase().includes('computer application'));
        if (!hasBCA) return false;
      } else if (selectedCategory === 'MBA') {
        const hasMBA = inst.category === 'MBA' || inst.category === 'Management' || 
          inst.coursesList?.some(c => c.name.toLowerCase().includes('mba') || c.name.toLowerCase().includes('pgdm'));
        if (!hasMBA) return false;
      } else if (inst.category !== selectedCategory) {
        return false;
      }
    }

    if (selectedBoard !== 'All' && inst.boardOrAffiliation !== selectedBoard) return false;

    if (selectedLocation !== 'All') {
      if (selectedLocation.startsWith('Zone: ')) {
        const targetZone = selectedLocation.replace('Zone: ', '').toLowerCase();
        if (getInstituteZone(inst.location) !== targetZone) return false;
      } else if (selectedLocation.startsWith('Areas: ')) {
        const targetAreas = selectedLocation
          .replace('Areas: ', '')
          .split('|')
          .map(area => area.toLowerCase());
        if (!targetAreas.some(area => inst.location.toLowerCase().includes(area))) return false;
      } else if (INDORE_LOCALITY_GROUPS.some(group => group.name === selectedLocation)) {
        const selectedGroup = INDORE_LOCALITY_GROUPS.find(group => group.name === selectedLocation);
        if (!selectedGroup?.collegeIds.includes(inst.id)) return false;
      } else if (inst.location !== selectedLocation) {
        return false;
      }
    }

    if (inst.feePerAnnum > maxFee) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans text-gray-900 selection:bg-red-600 selection:text-white">
      <ScrollToTopAndSEO institutes={institutes} />

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        instituteTypeFilter={instituteTypeFilter}
        setInstituteTypeFilter={(type) => {
          setInstituteTypeFilter(type);
          setSelectedCategory('All');
          setSelectedBoard('All');
        }}
        setSelectedCategory={setSelectedCategory}
        setSelectedBoard={setSelectedBoard}
        setSelectedLocation={setSelectedLocation}
        setSearchQuery={setSearchQuery}
        setMaxFee={setMaxFee}
        shortlistedIds={shortlistedIds}
        onToggleShortlist={handleToggleShortlist}
        cartIds={cartIds}
        onToggleCart={handleToggleCart}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => {
          setAuthMessage('Authenticate to view and update your profile & history.');
          setIsAuthOpen(true);
        }}
      />

      {/* Main Content Sections via React Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="home-page"
                >
                  <Home
                    setActiveTab={handleTabChange}
                    setInstituteTypeFilter={setInstituteTypeFilter}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedBoard={setSelectedBoard}
                    setSelectedLocation={setSelectedLocation}
                    setSearchQuery={setSearchQuery}
                    onOpenCounseling={handleOpenGeneralCounseling}
                    setSelectedStream={(s) => {
                      if (s) navigate(`/explore/${s}`);
                      else navigate('/explore');
                    }}
                    maxFee={maxFee}
                    setMaxFee={setMaxFee}
                    onViewCollegeDetail={(inst) => navigate(`/college/${inst.id}`)}
                    onViewLocality={(locality) => {
                      const slug = locality.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                      navigate(`/locality/${slug}`);
                    }}
                  />
                </motion.div>
              }
            />

            {/* Explore Routes */}
            <Route
              path="/locality/:localitySlug"
              element={
                <ExploreRoute
                  institutes={institutes}
                  loading={loading}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  instituteTypeFilter={instituteTypeFilter}
                  setInstituteTypeFilter={setInstituteTypeFilter}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedBoard={selectedBoard}
                  setSelectedBoard={setSelectedBoard}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  maxFee={maxFee}
                  setMaxFee={setMaxFee}
                  showMap={showMap}
                  setShowMap={setShowMap}
                  filteredInstitutes={filteredInstitutes}
                  handleOpenCounseling={handleOpenCounseling}
                  handleOpenCallback={handleOpenCallback}
                  handleToggleShortlist={handleToggleShortlist}
                  shortlistedIds={shortlistedIds}
                  handleToggleCart={handleToggleCart}
                  cartIds={cartIds}
                  navigate={navigate}
                />
              }
            />

            <Route
              path="/explore"
              element={
                <ExploreRoute
                  institutes={institutes}
                  loading={loading}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  instituteTypeFilter={instituteTypeFilter}
                  setInstituteTypeFilter={setInstituteTypeFilter}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedBoard={selectedBoard}
                  setSelectedBoard={setSelectedBoard}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  maxFee={maxFee}
                  setMaxFee={setMaxFee}
                  showMap={showMap}
                  setShowMap={setShowMap}
                  filteredInstitutes={filteredInstitutes}
                  handleOpenCounseling={handleOpenCounseling}
                  handleOpenCallback={handleOpenCallback}
                  handleToggleShortlist={handleToggleShortlist}
                  shortlistedIds={shortlistedIds}
                  handleToggleCart={handleToggleCart}
                  cartIds={cartIds}
                  navigate={navigate}
                />
              }
            />

            <Route
              path="/explore/:streamParam"
              element={
                <ExploreRoute
                  institutes={institutes}
                  loading={loading}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  instituteTypeFilter={instituteTypeFilter}
                  setInstituteTypeFilter={setInstituteTypeFilter}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedBoard={selectedBoard}
                  setSelectedBoard={setSelectedBoard}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  maxFee={maxFee}
                  setMaxFee={setMaxFee}
                  showMap={showMap}
                  setShowMap={setShowMap}
                  filteredInstitutes={filteredInstitutes}
                  handleOpenCounseling={handleOpenCounseling}
                  handleOpenCallback={handleOpenCallback}
                  handleToggleShortlist={handleToggleShortlist}
                  shortlistedIds={shortlistedIds}
                  handleToggleCart={handleToggleCart}
                  cartIds={cartIds}
                  navigate={navigate}
                />
              }
            />

            {/* Dynamic College Detail Route */}
            <Route
              path="/college/:id"
              element={
                <CollegeDetailRoute
                  institutes={institutes}
                  institutesLoaded={institutesLoaded}
                  onScheduleCounseling={handleOpenCounseling}
                  shortlistedIds={shortlistedIds}
                  handleToggleShortlist={handleToggleShortlist}
                  cartIds={cartIds}
                  handleToggleCart={handleToggleCart}
                />
              }
            />

            {/* Register School Route */}
            <Route
              path="/register"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
                >
                  <RegisterSchool />
                </motion.div>
              }
            />

            {/* Counselling Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
                >
                  <CounsellingDashboard />
                </motion.div>
              }
            />

            {/* Reviews & Hierarchy Route */}
            <Route
              path="/reviews"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <BlogsPage />
                </motion.div>
              }
            />
            <Route
              path="/reviews/:categorySlug"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <EditorialRoute />
                </motion.div>
              }
            />
            <Route
              path="/reviews/:categorySlug/:perspectiveSlug"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <EditorialRoute />
                </motion.div>
              }
            />

            {/* Blogs Route (Alias to Reviews & Campus Guides) */}
            <Route
              path="/blogs"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <BlogsPage />
                </motion.div>
              }
            />
            <Route
              path="/blogs/:categorySlug"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <EditorialRoute />
                </motion.div>
              }
            />
            <Route
              path="/blogs/:categorySlug/:perspectiveSlug"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <EditorialRoute />
                </motion.div>
              }
            />

            {/* About Us Route */}
            <Route
              path="/about"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <AboutUsPage />
                </motion.div>
              }
            />

            {/* Careers Route */}
            <Route
              path="/careers"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <CareersPage />
                </motion.div>
              }
            />

            {/* Contact Route */}
            <Route
              path="/contact"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <ContactUsPage />
                </motion.div>
              }
            />

            {/* College Portal Route */}
            <Route
              path="/college-portal"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <CollegePartnerRegistration />
                </motion.div>
              }
            />

            {/* Admin Portal Route */}
            <Route
              path="/admin-panel"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <AdminPortal />
                </motion.div>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Slide-out Counseling Appointment Drawer */}
      <AnimatePresence>
        {isCounselingOpen && (
          <SidebarCounseling
            selectedInstitute={selectedInstitute}
            onClose={() => setIsCounselingOpen(false)}
            onSuccess={fetchInstitutes}
          />
        )}
      </AnimatePresence>

      {/* Callback Request Modal Overlay */}
      <AnimatePresence>
        {isCallbackOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-xs" onClick={() => setIsCallbackOpen(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 shadow-2xl border border-gray-100 z-10"
            >
              <button
                onClick={() => setIsCallbackOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 z-20"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="flex items-center space-x-2 text-red-600 mb-4 pr-8">
                <PhoneCall className="h-5 w-5 shrink-0" />
                <h3 className="text-sm font-bold leading-tight">Request Admissions Callback</h3>
              </div>

              {callbackSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="h-10 w-10 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900">Admissions Ticket Created!</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                    We have submitted your request. An admissions representative from {callbackInstitute?.name || 'Indore Colleges'} will call you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4 text-xs">
                  <p className="text-gray-500 leading-relaxed text-[11px]">
                    Schedule a free direct phone consultation with {callbackInstitute?.name || 'our Indore academic head'}.
                  </p>

                  <div>
                    <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Mobile Number
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-1 focus-within:ring-red-600 focus-within:border-red-600">
                      <span className="bg-gray-50 border-r border-gray-100 text-gray-500 px-3 flex items-center font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        required
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="Enter 10-digit mobile"
                        className="flex-1 px-3 py-2.5 bg-white text-xs text-gray-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={callbackSubmitting}
                    className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50"
                  >
                    {callbackSubmitting ? 'Booking callback...' : 'Call Me Back'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating ENQUIRE NOW Toggle Badge */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden sm:block">
        <motion.button
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdvisorOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] px-3.5 py-3 rounded-r-md shadow-2xl flex flex-col items-center cursor-pointer tracking-widest uppercase [writing-mode:vertical-lr]"
        >
          <span>ENQUIRE NOW</span>
        </motion.button>
      </div>

      {/* Virtual Advisor Interactive Wizard Modal */}
      <AnimatePresence>
        {isAdvisorOpen && (
          <VirtualAdvisorModal
            isOpen={isAdvisorOpen}
            onClose={() => setIsAdvisorOpen(false)}
            institutes={institutes}
            onApplyFilters={handleApplyAdvisorFilters}
          />
        )}
      </AnimatePresence>

      {/* Floating AI counselor bot bubble */}
      <OrbChatbot />

      {/* User Authentication & Profile Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingAction(null);
          setAuthMessage('');
        }}
        onSuccess={handleAuthSuccess}
        initialMessage={authMessage}
      />

      {currentUser && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={currentUser}
          onUpdate={(updatedUser) => {
            setCurrentUser(updatedUser);
            localStorage.setItem('indore_user_profile', JSON.stringify(updatedUser));
          }}
          onLogout={handleLogout}
          onDeleteProfile={handleDeleteProfile}
          shortlistedIds={shortlistedIds}
          cartIds={cartIds}
        />
      )}

      {/* Footer */}
      <Footer 
        setActiveTab={handleTabChange}
        setInstituteTypeFilter={setInstituteTypeFilter}
        setSelectedCategory={setSelectedCategory}
        setSelectedBoard={setSelectedBoard}
        setSelectedLocation={setSelectedLocation}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}
