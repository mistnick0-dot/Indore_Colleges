/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { 
  Phone, 
  Mail,
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube, 
  MessageCircle, 
  Globe,
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'explore' | 'register' | 'dashboard' | 'blogs' | 'about' | 'careers' | 'contact') => void;
  setInstituteTypeFilter: (type: 'all' | 'school' | 'college') => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedBoard: (board: string) => void;
  setSelectedLocation: (loc: string) => void;
  setSearchQuery: (query: string) => void;
}

export default function Footer({
  setActiveTab,
  setInstituteTypeFilter,
  setSelectedCategory,
  setSelectedBoard,
  setSelectedLocation,
  setSearchQuery
}: FooterProps) {

  const handleLinkClick = (category: string, board: string = 'All') => {
    setInstituteTypeFilter('college');
    setSelectedCategory(category);
    setSelectedBoard(board);
    setSelectedLocation('All');
    setSearchQuery('');
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBoardOnlyClick = (board: string) => {
    setInstituteTypeFilter('college');
    setSelectedCategory('All');
    setSelectedBoard(board);
    setSelectedLocation('All');
    setSearchQuery('');
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="edupath_main_footer" className="bg-slate-950 text-gray-200 pt-16 pb-8 font-sans border-t border-red-600/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* TOP CENTERED SECTION: Brand Description & Official Social Channels */}
        <div className="flex flex-col items-center text-center pb-12 border-b border-red-600/20 space-y-6">
          <div className="max-w-2xl flex flex-col items-center space-y-4">
            <div
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center justify-center cursor-pointer select-none group"
            >
              <Logo light />
            </div>

            <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed max-w-xl">
              Indore Colleges is Central India&apos;s leading comprehensive college, university, and professional higher education search directory for Indore.
            </p>
          </div>

          <div className="space-y-3 w-full flex flex-col items-center">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2">
              <span>Official Social Channels</span>
              <span className="text-[10px] bg-red-600/30 text-red-400 px-2 py-0.5 rounded font-black">CONNECT</span>
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* YouTube Channel */}
              <a
                href="https://www.youtube.com/@Indorecolleges"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-red-600/40 bg-red-950/30 rounded-lg hover:bg-red-600 hover:border-red-600 text-white transition duration-200 group"
                title="YouTube - @Indorecolleges"
              >
                <Youtube className="h-4.5 w-4.5 text-red-500 group-hover:text-white transition shrink-0" />
                <div className="text-left leading-tight">
                  <span className="font-bold text-xs block">YouTube</span>
                  <span className="text-[10px] text-gray-400 group-hover:text-white/90">@Indorecolleges</span>
                </div>
              </a>

              {/* Instagram Profile */}
              <a
                href="https://www.instagram.com/indorecolleges?stkn=bHhwNHpzYjg0Ym4z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-pink-500/30 bg-pink-950/20 rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:border-transparent text-white transition duration-200 group"
                title="Instagram - @indorecolleges"
              >
                <Instagram className="h-4.5 w-4.5 text-pink-400 group-hover:text-white transition shrink-0" />
                <div className="text-left leading-tight">
                  <span className="font-bold text-xs block">Instagram</span>
                  <span className="text-[10px] text-gray-400 group-hover:text-white/90">@indorecolleges</span>
                </div>
              </a>

              {/* Email Support */}
              <a
                href="mailto:Indorecollegeshub@gmail.com"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-amber-500/30 bg-amber-950/20 rounded-lg hover:bg-amber-600 hover:border-amber-600 text-white transition duration-200 group"
                title="Email Us: Indorecollegeshub@gmail.com"
              >
                <Mail className="h-4.5 w-4.5 text-amber-400 group-hover:text-white transition shrink-0" />
                <div className="text-left leading-tight">
                  <span className="font-bold text-xs block">Email Support</span>
                  <span className="text-[10px] text-gray-400 group-hover:text-white/90">Indorecollegeshub@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* FOUR GRID COLUMNS BELOW CENTERED TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-red-600/20">

          {/* Column 1: Useful Portals */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600 flex items-center gap-1.5">
              <span>Useful Portals</span>
              <span className="text-[10px] bg-red-600/30 text-red-400 px-1.5 py-0.5 rounded font-black">NEW</span>
            </h4>
            <ul className="space-y-3 text-[12px] text-gray-300">
              <li>
                <a href="https://dte.mponline.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>DTE</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
              <li>
                <a href="https://highereducation.mp.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>Higher Education</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
              <li>
                <a href="https://www.dauniv.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>DAVV</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
              <li>
                <a href="https://www.rgpv.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>RGPV</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
              <li>
                <a href="https://www.ugc.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>UGC</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
              <li>
                <a href="https://www.aicte.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>AICTE</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
              <li>
                <a href="https://epravesh.mponline.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>MP E-Pravesh Portal</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Useful Information */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600">
              Useful Information
            </h4>
            <ul className="space-y-3 text-[12px] text-gray-300">
              <li>
                <Link to="/useful-information#about-engineering-branch-trends" className="hover:text-red-400 hover:underline transition text-left block">
                  About Engineering Branch &amp; Trends
                </Link>
              </li>
              <li>
                <Link to="/useful-information#about-mba-branch-trends" className="hover:text-red-400 hover:underline transition text-left block">
                  About MBA Branch &amp; Trends
                </Link>
              </li>
              <li>
                <Link to="/useful-information#trending-bba-mba-branches" className="hover:text-red-400 hover:underline transition text-left block">
                  Trending BBA &amp; MBA Branches
                </Link>
              </li>
              <li>
                <Link to="/useful-information#paramedical-important-branches" className="hover:text-red-400 hover:underline transition text-left block">
                  Paramedical Important Branches
                </Link>
              </li>
              <li>
                <Link to="/useful-information#best-engineering-branch" className="hover:text-red-400 hover:underline transition text-left block">
                  Best Engineering Branch
                </Link>
              </li>
              <li>
                <Link to="/useful-information#best-certifications-courses" className="hover:text-red-400 hover:underline transition text-left block">
                  Best Certifications Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links (Vertical) */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600">
              Quick Links
            </h4>
            <ul className="space-y-3 text-[12px] font-medium text-gray-300">
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('careers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('register'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">
                  Direct Apply
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: College Info (YouTube Video Links) */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600">
              College Info
            </h4>
            <ul className="space-y-3 text-[12px] text-gray-300">
              <li>
                <a href="https://www.youtube.com/@Indorecolleges" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Youtube className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span>LNCTS</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@Indorecolleges" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Youtube className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span>MGI</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@Indorecolleges" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Youtube className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span>SGSITS</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@Indorecolleges" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Youtube className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    <span>ACROPOLIS</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition shrink-0" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOMMOST REGION: Copyright Bar */}
        <div className="pt-8 mt-4 border-t border-red-600/10 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Indore Colleges. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <span>Terms &amp; Conditions</span>
            <span className="text-red-600 hidden md:inline">|</span>
            <span>Privacy Policy</span>
            <span className="text-red-600 hidden md:inline">|</span>
            <span>Refund Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
