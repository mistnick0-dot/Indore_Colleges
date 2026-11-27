import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Play, Youtube, BookOpen, ArrowUpRight, Sparkles } from 'lucide-react';

interface UsefulTopicSection {
  id: string;
  tag: string;
  question: string;
  highlights: string[];
  exploreLink: string;
  exploreLabel: string;
}

const USEFUL_TOPICS: UsefulTopicSection[] = [
  {
    id: 'about-engineering-branch-trends',
    tag: 'Engineering Trends',
    question: 'About Engineering Branch & Trends',
    highlights: [
      'Engineering admissions in Indore have shifted toward software systems, with CSE and IT continuing to see the highest student demand.',
      'Applied AI, Machine Learning, Data Engineering, Cloud Architecture, Cyber Security, Blockchain, and IoT are the fastest-growing B.Tech specializations.',
      'Interdisciplinary ECE remains strong for embedded hardware, VLSI, and telecom, while Mechanical, Civil, and Electrical serve manufacturing, infrastructure, and EV ecosystems.',
      'Industry-aligned curricula increasingly integrate coding labs, cloud tools, and minor specializations from early semesters.',
      'Always verify AICTE approval, RGPV or autonomous university status, lab facilities, and internship tie-ups before choosing.'
    ],
    exploreLink: '/explore/engineering',
    exploreLabel: 'Explore Engineering Colleges in Indore'
  },
  {
    id: 'about-mba-branch-trends',
    tag: 'MBA Trends',
    question: 'About MBA Branch & Trends',
    highlights: [
      'Indore MBA and AICTE-approved PGDM programs prepare graduates for corporate and startup leadership through case studies, live projects, and dual-specialization tracks.',
      'Business Analytics, FinTech, and Digital Growth are rapidly growing alongside core pillars like Finance, Marketing, HRM, and Operations.',
      'Public departments at DAVV, autonomous B-schools, and private universities offer varied fee tiers and learning environments.',
      'Admissions across Indore MBA institutes commonly consider CMAT, CAT, MAT, NMAT, or university entrance scores.',
      'Compare total fee ROI, specialization curriculum, corporate mentorship, and verified placement reports before applying.'
    ],
    exploreLink: '/explore/mba',
    exploreLabel: 'Explore MBA Colleges in Indore'
  },
  {
    id: 'trending-bba-mba-branches',
    tag: 'BBA & MBA',
    question: 'Trending BBA & MBA Branches',
    highlights: [
      'Employers prefer management graduates who blend business fundamentals with quantitative and digital skills like Excel, Power BI, SQL, and financial modeling.',
      'Trending BBA options in Indore include BBA (Hons.), Foreign Trade, Business Analytics, Banking & Finance, E-Commerce, Digital Marketing, and Hospitality.',
      'In-demand MBA tracks span Business Analytics, FinTech, Financial Administration, Marketing Analytics, Supply Chain, Operations, and HR Analytics.',
      'Integrated 5-year BBA+MBA pathways appeal to students seeking early, continuous management specialization.',
      'Prioritize programs offering mandatory summer internships, case competitions, and industry workshops.'
    ],
    exploreLink: '/explore/bba',
    exploreLabel: 'Explore BBA & Management Colleges'
  },
  {
    id: 'paramedical-important-branches',
    tag: 'Paramedical',
    question: 'Paramedical Important Branches',
    highlights: [
      'Paramedical programs train allied-health professionals for Indore’s expanding multi-specialty hospitals, diagnostic chains, emergency care, and rehabilitation centers.',
      'BMLT/DMLT (Medical Laboratory Technology) and Radiology & Medical Imaging prepare students for pathology, microbiology, X-ray, CT, and MRI operations.',
      'Bachelor of Physiotherapy (BPT) focuses on physical rehabilitation, orthopedics, sports recovery, and neuro-care.',
      'Operation Theatre (OT) Technician, Anesthesia Technology, and Optometry offer specialized careers in surgical support and vision care.',
      'Prefer institutes attached to active teaching hospitals for clinical postings, and verify recognition with state paramedical councils or accredited health science universities.'
    ],
    exploreLink: '/explore/paramedical',
    exploreLabel: 'Explore Paramedical Colleges in Indore'
  },
  {
    id: 'best-engineering-branch',
    tag: 'Branch Selection',
    question: 'Best Engineering Branch',
    highlights: [
      'The right engineering branch depends on your math aptitude, coding interest, and preferred work environment—evaluate faculty, labs, and placement diversity beyond hype.',
      'Choose CSE or IT for software development, algorithms, and databases, or AI, Machine Learning, and Data Science for predictive analytics and intelligent systems.',
      'Pick Cyber Security if you are drawn to network defense, ethical hacking, and cloud security governance.',
      'Choose ECE for VLSI chip design, embedded systems, and robotics, or Electrical Engineering for power systems, renewable energy, automation, and EV electronics.',
      'Opt for Mechanical Engineering for automotive design, CAD/CAM, and manufacturing, or Civil Engineering for infrastructure, construction, and PSU/GATE pathways.'
    ],
    exploreLink: '/explore/engineering',
    exploreLabel: 'Compare Engineering Colleges'
  },
  {
    id: 'best-certifications-courses',
    tag: 'Certifications',
    question: 'Best Certifications Courses',
    highlights: [
      'Skill certifications complement B.Tech, BBA, BCA, B.Com, and MBA degrees by building practical job readiness alongside real capstone projects and internships.',
      'Full-Stack Web Development (React, Node.js) and UI/UX Design help students build deployable software and product portfolios.',
      'Python, SQL, Power BI, and Tableau credentials strengthen profiles for data analyst and business intelligence roles.',
      'Cloud Computing (AWS, Azure, Google Cloud) and Cyber Security/networking certifications validate infrastructure, DevOps, and security operations skills.',
      'Commerce and management students benefit from Financial Modeling, NISM modules, TallyPrime with GST, and Digital Marketing (SEO, performance ads, analytics).'
    ],
    exploreLink: '/explore',
    exploreLabel: 'Browse Indore Colleges Directory'
  }
];

export default function UsefulInformationPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace(/^#/, '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-red-600">
            <Sparkles className="h-3.5 w-3.5" />
            Useful Information &amp; Course Guides
          </span>
          <h1 className="mt-4 font-outfit text-3xl sm:text-5xl font-black tracking-tight text-[#0F244C]">
            Branch Trends, Career Tracks &amp; Course Guides
          </h1>
        </header>

        {/* Q&A + Video Placeholder Sections */}
        <div className="space-y-8 sm:space-y-10">
          {USEFUL_TOPICS.map((topic, index) => (
            <section
              key={topic.id}
              id={topic.id}
              aria-labelledby={`${topic.id}-heading`}
              className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side: Question & Answer */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-[#0F244C] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                      0{index + 1}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-orange-50 border border-orange-200 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-orange-700">
                      {topic.tag}
                    </span>
                  </div>

                  <h2
                    id={`${topic.id}-heading`}
                    className="font-outfit text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F244C]"
                  >
                    {topic.question}
                  </h2>

                  <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-700">
                    {topic.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <BookOpen className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Link
                      to={topic.exploreLink}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm transition hover:bg-red-700"
                    >
                      <span>{topic.exploreLabel}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Video Frame Holder with Indore Colleges Thumbnail */}
                <div className="lg:col-span-5">
                  <a
                    href="https://www.youtube.com/@Indorecolleges"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${topic.question} video guide on Indore Colleges YouTube`}
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md transition hover:border-red-400 hover:shadow-lg"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src="/Review-by-indore-college.webp"
                        alt={`${topic.question} explainer thumbnail — Indore Colleges`}
                        className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                        onError={(event) => {
                          if (!event.currentTarget.src.endsWith('/bg2.jpeg')) {
                            event.currentTarget.src = '/bg2.jpeg';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/95 text-white shadow-xl ring-4 ring-white/25 transition group-hover:scale-110 group-hover:bg-red-500">
                          <Play className="h-6 w-6 fill-current ml-0.5" />
                        </span>
                      </div>
                      <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2 text-white">
                        <div>
                          <span className="block text-[10px] font-black uppercase tracking-wider text-orange-300">
                            Video Explanation Placeholder
                          </span>
                          <span className="text-xs sm:text-sm font-bold line-clamp-1">
                            {topic.question}
                          </span>
                        </div>
                        <Youtube className="h-5 w-5 text-red-400 shrink-0" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
