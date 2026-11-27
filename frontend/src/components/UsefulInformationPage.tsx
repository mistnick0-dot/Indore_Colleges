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
      'Engineering admissions in Indore have shifted beyond conventional trades toward software systems and digital engineering.',
      'Applied AI, Machine Learning, Data Engineering, and Cloud Architecture are among the fastest-growing B.Tech tracks.',
      'Computer Science & Engineering (CSE) and Information Technology (IT) continue to see the highest student demand.',
      'Specializations in Cyber Security, Blockchain, and Internet of Things (IoT) are widely offered across Indore campuses.',
      'Interdisciplinary Electronics & Communication (ECE) remains strong for embedded hardware, VLSI, and telecom roles.',
      'Core branches—Mechanical, Civil, and Electrical—attract students focused on manufacturing, infrastructure, and EV ecosystems.',
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
      'MBA programs in Indore train graduates for leadership and analytical careers across corporate and startup sectors.',
      'Dual-specialization MBA tracks remain popular for combining two complementary business disciplines.',
      'AICTE-approved PGDM programs offer industry-updated case studies, live projects, and practical electives.',
      'Business Analytics, FinTech, and Digital Growth are growing rapidly alongside traditional MBA streams.',
      'Finance, Marketing, Human Resource Management (HRM), and Operations remain core pillars of management education.',
      'Public teaching departments at DAVV as well as autonomous B-schools and private universities offer varied fee tiers.',
      'Admissions across Indore MBA institutes commonly consider CMAT, CAT, MAT, NMAT, or university entrance pathways.',
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
      'Employers increasingly prefer management graduates who combine business fundamentals with quantitative and digital skills.',
      'Trending BBA options in Indore include BBA (Hons.), Foreign Trade, Business Analytics, and Banking & Finance.',
      'Specialized UG tracks such as E-Commerce, Digital Marketing, and Hospitality Management are gaining steady interest.',
      'Trending MBA options include Business Analytics, FinTech, Financial Administration, and Marketing Analytics.',
      'Supply Chain, Logistics, Operations Management, and HR Analytics also see strong corporate relevance.',
      'Integrated 5-year BBA+MBA pathways appeal to students planning early management specialization.',
      'Practical proficiency in Excel, Power BI, SQL, and financial modeling boosts readiness across these branches.',
      'Prioritize programs that include mandatory summer internships, case competitions, and industry workshops.'
    ],
    exploreLink: '/explore/bba',
    exploreLabel: 'Explore BBA & Management Colleges'
  },
  {
    id: 'paramedical-important-branches',
    tag: 'Paramedical',
    question: 'Paramedical Important Branches',
    highlights: [
      'Paramedical programs train skilled allied-health professionals who support diagnostics, emergency care, and rehabilitation.',
      'BMLT and DMLT (Medical Laboratory Technology) prepare students for pathology, microbiology, and clinical testing labs.',
      'Bachelor of Physiotherapy (BPT) focuses on physical rehabilitation, orthopedics, sports recovery, and neuro-care.',
      'Radiology & Medical Imaging Technology covers X-ray, CT, MRI, and diagnostic imaging operations.',
      'Operation Theatre (OT) Technician and Anesthesia Technology support surgical and critical-care teams.',
      'Optometry and Ophthalmic Assistance offer dedicated career tracks in vision care and eye clinics.',
      'Expanding multi-specialty hospitals and diagnostic chains across Indore drive consistent demand for clinical staff.',
      'Prefer institutes attached to active teaching hospitals that provide regular hands-on clinical postings.',
      'Verify recognition with relevant state paramedical councils or accredited medical/health science universities.'
    ],
    exploreLink: '/explore/paramedical',
    exploreLabel: 'Explore Paramedical Colleges in Indore'
  },
  {
    id: 'best-engineering-branch',
    tag: 'Branch Selection',
    question: 'Best Engineering Branch',
    highlights: [
      'The best engineering branch depends on your aptitude in mathematics, coding interest, and preferred work environment.',
      'Choose Computer Science & Engineering (CSE) or IT if you enjoy algorithms, software development, and databases.',
      'AI, Machine Learning, and Data Science suit students drawn to predictive modeling, analytics, and intelligent systems.',
      'Cyber Security is ideal for learners interested in network defense, ethical hacking, and cloud governance.',
      'Choose Electronics & Communication (ECE) for VLSI chip design, embedded systems, robotics, and telecom networks.',
      'Choose Electrical Engineering for power systems, renewable energy, industrial automation, and EV electronics.',
      'Choose Mechanical Engineering for automotive design, CAD/CAM, thermal systems, and core manufacturing.',
      'Choose Civil Engineering if you aim for infrastructure, structural engineering, construction, or PSU/GATE pathways.',
      'Evaluate faculty strength, active labs, and coding/core placement diversity rather than picking by hype alone.'
    ],
    exploreLink: '/explore/engineering',
    exploreLabel: 'Compare Engineering Colleges'
  },
  {
    id: 'best-certifications-courses',
    tag: 'Certifications',
    question: 'Best Certifications Courses',
    highlights: [
      'Skill certifications complement B.Tech, BBA, BCA, B.Com, and MBA degrees by building practical job readiness.',
      'Full-Stack Web Development (React, Node.js, databases) helps tech students build deployable software portfolios.',
      'Python, SQL, Power BI, and Tableau certifications strengthen profiles for data analyst and business intelligence roles.',
      'Cloud Computing credentials (AWS, Microsoft Azure, Google Cloud) validate infrastructure and DevOps foundations.',
      'Cyber Security and networking certifications support careers in security operations and system administration.',
      'Finance and commerce students benefit from Financial Modeling, Valuation, NISM modules, and TallyPrime with GST.',
      'Digital Marketing certifications (SEO, performance ads, analytics) fit marketing-focused BBA and MBA learners.',
      'UI/UX Design and product prototyping courses offer strong cross-domain value for creative tech roles.',
      'Always pair certifications with real capstone projects and internships rather than relying on certificates alone.'
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
