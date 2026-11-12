/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { 
  MapPin, 
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
        
        {/* TOP SECTION: Logo, description, and Higher Ed directories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 pb-12 border-b border-red-600/20">
          
          {/* Column 1: Brand & Contacts */}
          <div className="space-y-5 xl:col-span-1">
            {/* Elegant Logo matching Header Brand style */}
            <div 
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center cursor-pointer select-none group"
            >
              <Logo light />
            </div>

            <p className="text-[12px] text-gray-300 leading-relaxed">
              Indore Colleges is Central India's leading comprehensive college, university, and professional higher education search directory for Indore.
            </p>

            {/* Address & Contact Items with customized color layout */}
            <div className="space-y-3 pt-2 text-[12px] text-gray-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <span>Plot 124, Sector B, Scheme 54, Vijay Nagar, Indore - 452010</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4.5 w-4.5 text-red-500 shrink-0" />
                <a href="mailto:Indorecollegeshub@gmail.com" className="hover:text-red-400 hover:underline transition select-all break-all">
                  Indorecollegeshub@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Useful University Portals */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600 flex items-center gap-1.5">
              <span>Useful Portals</span>
              <span className="text-[10px] bg-red-600/30 text-red-400 px-1.5 py-0.5 rounded font-black">NEW</span>
            </h4>
            <ul className="space-y-3 text-[12px] text-gray-300">
              <li>
                <a href="https://www.dauniv.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>DAVV Indore Portal</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition" />
                </a>
              </li>
              <li>
                <a href="https://www.rgpv.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>RGPV Tech University</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition" />
                </a>
              </li>
              <li>
                <a href="http://brauss.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>BRAUSS Social Sciences</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition" />
                </a>
              </li>
              <li>
                <a href="https://www.iiti.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>IITI (IIT Indore)</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition" />
                </a>
              </li>
              <li>
                <a href="https://www.iimidr.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>IIMI (IIM Indore)</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition" />
                </a>
              </li>
              <li>
                <a href="https://epravesh.mponline.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline transition flex items-center justify-between group">
                  <span>MP E-Pravesh Portal</span>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-red-400 transition" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Engineering & Tech links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600">
              Engineering & Tech
            </h4>
            <ul className="space-y-3 text-[12px] text-gray-300">
              <li>
                <Link to="/explore/engineering" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  IIT Indore Direct Info
                </Link>
              </li>
              <li>
                <Link to="/explore/engineering" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  SGSITS College Profile
                </Link>
              </li>
              <li>
                <Link to="/explore/engineering" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  B.Tech Programs in Indore
                </Link>
              </li>
              <li>
                <Link to="/explore/bca" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Computer Science Majors
                </Link>
              </li>
              <li>
                <Link to="/explore/engineering" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Information Technology Labs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Business & MBA links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600">
              Business & MBA
            </h4>
            <ul className="space-y-3 text-[12px] text-gray-300">
              <li>
                <Link to="/explore/mba" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  IIM Indore IPM Programs
                </Link>
              </li>
              <li>
                <Link to="/explore/mba" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  MBA Streams in Indore
                </Link>
              </li>
              <li>
                <Link to="/explore/bba" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  BBA Colleges in Indore
                </Link>
              </li>
              <li>
                <Link to="/explore/bba" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Commerce Institutes
                </Link>
              </li>
              <li>
                <Link to="/explore/mba" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Business Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Professional Streams links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-red-600">
              Professional Degrees
            </h4>
            <ul className="space-y-3 text-[12px] text-gray-300">
              <li>
                <Link to="/explore/medical" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Medical Colleges in Indore
                </Link>
              </li>
              <li>
                <Link to="/explore/law" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Law (LL.B / B.A. LL.B)
                </Link>
              </li>
              <li>
                <Link to="/explore/design" className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Design & Fine Arts
                </Link>
              </li>
              <li>
                <button onClick={() => handleLinkClick('Digital Marketing')} className="hover:text-red-400 hover:underline transition text-left cursor-pointer">
                  Digital Marketing Certifications
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM MIDDLE SECTION: Social Media and Corporate Office Address */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 text-[12px] text-gray-300">
          
          {/* Social Media Links */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Official Social Channels</span>
              <span className="text-[10px] bg-red-600/30 text-red-400 px-2 py-0.5 rounded font-black">CONNECT</span>
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {/* YouTube Channel */}
              <a 
                href="https://www.youtube.com/@Indorecolleges" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-3 py-2 border border-red-600/40 bg-red-950/30 rounded-lg hover:bg-red-600 hover:border-red-600 text-white transition duration-200 group" 
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
                className="inline-flex items-center gap-2 px-3 py-2 border border-pink-500/30 bg-pink-950/20 rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:border-transparent text-white transition duration-200 group" 
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
                className="inline-flex items-center gap-2 px-3 py-2 border border-amber-500/30 bg-amber-950/20 rounded-lg hover:bg-amber-600 hover:border-amber-600 text-white transition duration-200 group" 
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

          {/* Corporate Office Address */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Our Office
            </h4>
            <p className="leading-relaxed text-gray-300">
              Indore Colleges Private Limited, Plot 124, Sector B, Scheme 54, Vijay Nagar, Indore (M.P.) - 452010
            </p>
          </div>

          {/* About us / Quick info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[12px] font-medium text-gray-300">
              <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">About Us</button>
              <button onClick={() => { setActiveTab('careers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">Careers</button>
              <button onClick={() => { setActiveTab('register'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">Direct Apply</button>
              <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-red-400 hover:underline text-left cursor-pointer">Contact Us</button>
            </div>
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
