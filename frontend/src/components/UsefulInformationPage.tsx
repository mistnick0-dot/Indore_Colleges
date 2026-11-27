import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Play, Youtube, BookOpen, ArrowUpRight, Sparkles } from 'lucide-react';

interface UsefulTopicSection {
  id: string;
  tag: string;
  question: string;
  summary: string;
  highlights: string[];
  exploreLink: string;
  exploreLabel: string;
}

const USEFUL_TOPICS: UsefulTopicSection[] = [
  {
    id: 'about-engineering-branch-trends',
    tag: 'Engineering Trends',
    question: 'About Engineering Branch & Trends',
    summary:
      'Engineering admissions in Indore have evolved beyond traditional specializations toward software systems, applied AI, data engineering, cloud architecture, and interdisciplinary electronics. While Computer Science and IT remain top student choices, core branches such as Mechanical, Civil, Electrical, and Electronics & Communication continue to attract students interested in manufacturing, infrastructure, embedded hardware, and EV ecosystems.',
    highlights: [
      'High demand for Computer Science & Engineering, AI & Machine Learning, Data Science, Cyber Security, and IoT.',
      'Strong industrial and core-sector relevance for Mechanical, Civil, Electrical, and Electronics specializations.',
      'Check AICTE approval, RGPV or university curriculum updates, lab infrastructure, and internship tie-ups before finalizing a branch.'
    ],
    exploreLink: '/explore/engineering',
    exploreLabel: 'Explore Engineering Colleges in Indore'
  },
  {
    id: 'about-mba-branch-trends',
    tag: 'MBA Trends',
    question: 'About MBA Branch & Trends',
    summary:
      'MBA programs in Indore cater to graduates seeking leadership and analytical roles across corporate finance, digital growth, supply chains, people management, and business analytics. Dual-specialization MBA and AICTE-approved PGDM programs are popular because they combine foundational business strategy with practical industry tools and case studies.',
    highlights: [
      'Growing adoption of Business Analytics, FinTech, Digital Marketing, and Operations alongside Finance, Marketing, and HR.',
      'Public options such as DAVV teaching departments alongside private autonomous B-schools and universities accept CMAT, CAT, MAT, or university tests.',
      'Compare total tuition ROI, specialization electives, corporate mentorship, and verified placement reporting across campuses.'
    ],
    exploreLink: '/explore/mba',
    exploreLabel: 'Explore MBA Colleges in Indore'
  },
  {
    id: 'trending-bba-mba-branches',
    tag: 'BBA & MBA',
    question: 'Trending BBA & MBA Branches',
    summary:
      'Across both undergraduate BBA and postgraduate MBA programs, employers increasingly look for graduates who combine management fundamentals with quantitative and digital skills. Specialized tracks such as Business Analytics, Banking & Financial Services, E-Commerce, International Business, and Human Resource Analytics are among the fastest-growing choices in Indore.',
    highlights: [
      'Popular BBA tracks: BBA (Hons.), Foreign Trade, Business Analytics, Banking & Finance, and Hospitality Management.',
      'Popular MBA tracks: Finance & FinTech, Marketing & Digital Growth, Business Analytics, Supply Chain & Operations, and HRM.',
      'Look for internships, live corporate projects, Excel/BI tool training, and soft-skills workshops integrated into semesters.'
    ],
    exploreLink: '/explore/bba',
    exploreLabel: 'Explore BBA & Management Colleges'
  },
  {
    id: 'paramedical-important-branches',
    tag: 'Paramedical',
    question: 'Paramedical Important Branches',
    summary:
      'Paramedical and allied health science programs prepare skilled clinical professionals who support diagnostics, rehabilitation, emergency care, and hospital operations. With expanding multi-specialty hospitals and diagnostic chains across Indore and Madhya Pradesh, practical clinical training is essential when evaluating a paramedical institute.',
    highlights: [
      'Key degree and diploma branches: BMLT / DMLT (Medical Laboratory Technology), BPT (Physiotherapy), Radiology & Imaging, Optometry, and OT Technician.',
      'Prioritize institutes attached to active teaching hospitals or equipped diagnostic laboratories for hands-on clinical postings.',
      'Verify recognition under relevant state paramedical councils or university health science regulatory norms.'
    ],
    exploreLink: '/explore/paramedical',
    exploreLabel: 'Explore Paramedical Colleges in Indore'
  },
  {
    id: 'best-engineering-branch',
    tag: 'Branch Selection',
    question: 'Best Engineering Branch',
    summary:
      'The best engineering branch depends on your mathematical comfort, career goals, and interest in software versus physical systems. Computer Science & Engineering and IT suit students targeting software development, cloud, and AI careers, while ECE, Electrical, Mechanical, and Civil suit those aiming for core engineering, PSU exams, VLSI, robotics, or infrastructure.',
    highlights: [
      'Choose CSE / IT / AI & Data Science if you enjoy coding, algorithms, databases, and product engineering.',
      'Choose ECE / Electrical for embedded systems, semiconductors, telecom, automation, and power engineering.',
      'Choose Mechanical / Civil if you are drawn to automotive, manufacturing, CAD/CAM, construction, or public-sector engineering.'
    ],
    exploreLink: '/explore/engineering',
    exploreLabel: 'Compare Engineering Colleges'
  },
  {
    id: 'best-certifications-courses',
    tag: 'Certifications',
    question: 'Best Certifications Courses',
    summary:
      'Industry-recognized certifications complement college degrees by building practical job readiness during B.Tech, BBA, BCA, B.Com, and MBA studies. Short-term skill tracks work best when paired with real portfolio projects, internships, and domain practice rather than certificates alone.',
    highlights: [
      'Tech & IT: Full-Stack Web Development, Python & Data Analytics, Cloud Computing (AWS/Azure), Cyber Security, and UI/UX Design.',
      'Management & Commerce: Financial Modeling & Valuation, NISM Certifications, TallyPrime & GST, Power BI / Tableau, and Digital Marketing.',
      'Choose structured hands-on courses with capstone projects that align with your degree specialization and target role.'
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
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Clear answers to key student questions on engineering branches, BBA/MBA specializations, paramedical streams, and certification courses in Indore.
          </p>

          {/* Quick Jump Links */}
          <nav aria-label="Useful information sections" className="mt-6 flex flex-wrap justify-center gap-2">
            {USEFUL_TOPICS.map((topic) => (
              <a
                key={topic.id}
                href={`#${topic.id}`}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                {topic.question}
              </a>
            ))}
          </nav>
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

                  <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                    {topic.summary}
                  </p>

                  <ul className="space-y-2 pt-1 text-xs sm:text-sm text-slate-700">
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
