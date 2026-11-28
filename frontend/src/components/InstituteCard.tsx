/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Institute, Review } from '../types';
import { Star, MapPin, Award, IndianRupee, Calendar, Check, Send, ChevronDown, ChevronUp, MessageSquare, Heart, ShoppingCart, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstituteCardProps {
  key?: React.Key | string | number;
  institute: Institute;
  onSelect: (inst: Institute) => void;
  onRequestCallback: (inst: Institute) => void;
  onScheduleCounseling: (inst: Institute) => void;
  onViewDetail: (inst: Institute) => void;
  isShortlisted: boolean;
  onToggleShortlist: () => void;
  isInCart: boolean;
  onToggleCart: () => void;
  rankText?: string;
  isMist?: boolean;
}

export default function InstituteCard({
  institute,
  onSelect,
  onRequestCallback,
  onScheduleCounseling,
  onViewDetail,
  isShortlisted,
  onToggleShortlist,
  isInCart,
  onToggleCart,
  rankText,
  isMist
}: InstituteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'facilities' | 'reviews'>('details');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  
  // Review submission state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [institute.image]);

  useEffect(() => {
    if (isExpanded) {
      fetchReviews();
    }
  }, [isExpanded, institute.id]);

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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onViewDetail(institute)}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-red-200/85 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Upper Card Block */}
      <div className="relative h-78 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {institute.image && !imageError ? (
          <img
            src={institute.image}
            alt={institute.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-rose-500 flex flex-col items-center justify-center p-6 text-center select-none">
            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-amber-300 font-black text-lg mb-2 border border-white/15 tracking-widest uppercase">
              {institute.name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 3)}
            </div>
            <p className="text-[10px] text-red-200 uppercase tracking-widest font-extrabold">College Campus Photo</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-gray-950/20 to-transparent pointer-events-none" />
        
        {/* Center Rank Badge */}
        {rankText && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <span className={`px-4 py-2 text-xs font-black rounded-xl shadow-lg border backdrop-blur-md ${
              isMist 
                ? 'bg-amber-500 text-white border-amber-400 animate-pulse font-black tracking-wide' 
                : 'bg-slate-950/95 text-white border-slate-800'
            }`}>
              {rankText}
            </span>
          </div>
        )}

        {/* Category & Board Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
          <span className="rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-extrabold text-gray-800 uppercase tracking-wider shadow-sm">
            {institute.category}
          </span>
          <span className="rounded-md bg-red-600/95 px-2.5 py-1 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-sm">
            {institute.boardOrAffiliation}
          </span>
        </div>

        {/* Top Right Actions (Heart shortlist & Cart comparison basket) */}
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleShortlist();
            }}
            className={`p-2 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer ${
              isShortlisted
                ? 'bg-rose-500 text-white border border-rose-600'
                : 'bg-white/90 text-gray-700 hover:bg-white hover:text-rose-500 border border-gray-100'
            }`}
            title={isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
          >
            <Heart className={`h-4 w-4 ${isShortlisted ? 'fill-white text-white' : ''}`} />
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCart();
            }}
            className={`p-2 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer ${
              isInCart
                ? 'bg-red-600 text-white border border-red-500'
                : 'bg-white/90 text-gray-700 hover:bg-white hover:text-red-600 border border-gray-100'
            }`}
            title={isInCart ? "Remove from Admissions Basket" : "Add to Admissions Basket"}
          >
            <ShoppingCart className={`h-4 w-4 ${isInCart ? 'fill-white text-white' : ''}`} />
          </button>
        </div>

        {/* Established Year Badge on Bottom Right of Image */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="rounded bg-gray-900/65 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold text-gray-200 tracking-wider uppercase">
            Est. {institute.establishedYear || 'N/A'}
          </span>
        </div>

        {/* Institution Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-0.5">
            {institute.type === 'school' ? 'Indore Institute' : 'Indore College'}
          </p>
          <h3 className="text-lg font-bold tracking-tight drop-shadow-md leading-tight">
            {institute.name}
          </h3>
        </div>
      </div>

      {/* Main Stats Segment */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Quick info row */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-1 font-medium text-gray-700">
              <MapPin className="h-3.5 w-3.5 text-red-600 flex-shrink-0" />
              <span>{institute.location}, Indore</span>
            </div>
            
            {institute.rating > 0 ? (
              <div className="flex items-center space-x-1 text-amber-500 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 flex-shrink-0" />
                <span>{institute.rating}</span>
                <span className="text-gray-400 font-normal">({institute.totalReviews} reviews)</span>
              </div>
            ) : (
              <span className="text-gray-400">Not yet rated</span>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
            {institute.description}
          </p>

          {/* Key details table block */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl mb-4 text-xs">
            <div>
              <p className="text-gray-400 mb-0.5">Annual Fee</p>
              <div className="flex items-center font-bold text-gray-900 text-sm">
                {institute.feePerAnnum > 0 && <IndianRupee className="h-3.5 w-3.5 text-gray-700 flex-shrink-0 mr-0.5" />}
                <span>{formatFee(institute.feePerAnnum)}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 mb-0.5">Affiliation</p>
              <p className="font-bold text-gray-900 text-sm flex items-center">
                <Award className="h-3.5 w-3.5 text-gray-700 flex-shrink-0 mr-1" />
                {institute.boardOrAffiliation}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons section */}
        <div className="mt-auto">
          <div className="flex space-x-2 mb-3">
            <Link
              to={`/college/${institute.id}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex-1 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 px-3 py-2.5 text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-3xs cursor-pointer"
            >
              <Info className="h-3.5 w-3.5 text-red-600" />
              <span>College Info</span>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onScheduleCounseling(institute);
              }}
              className="flex-1 rounded-xl bg-red-600 hover:bg-red-500 text-white px-3 py-2.5 text-xs font-bold shadow-sm transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Counseling Form</span>
            </button>
          </div>

          {/* Toggle Details button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="w-full border-t border-gray-100 pt-2.5 pb-0.5 flex items-center justify-between text-[10px] text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <span className="font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <MessageSquare className="h-3 w-3 text-red-500" />
              <span>Reviews & Facilities</span>
            </span>
            <div className="flex items-center gap-0.5 font-extrabold text-red-600 uppercase tracking-wider">
              <span>{isExpanded ? 'Hide' : 'Show'}</span>
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </div>
          </button>
        </div>
      </div>

      {/* Expanded reviews, facilities, and academic details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-gray-100 bg-gray-50/50 overflow-hidden"
          >
            {/* Tabs Header */}
            <div className="flex border-b border-gray-100 bg-gray-50 px-4 text-xs font-medium">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('details');
                }}
                className={`py-2.5 px-3 border-b-2 transition-all ${
                  activeTab === 'details'
                    ? 'border-red-600 text-red-600 font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('facilities')}
                className={`py-2.5 px-3 border-b-2 transition-all ${
                  activeTab === 'facilities'
                    ? 'border-red-600 text-red-600 font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Facilities
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2.5 px-3 border-b-2 transition-all ${
                  activeTab === 'reviews'
                    ? 'border-red-600 text-red-600 font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-4 text-xs">
              {activeTab === 'details' && (
                <div className="space-y-2 text-gray-600">
                  <p className="leading-relaxed font-normal">{institute.description}</p>
                  <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-500">
                    <div>
                      <span className="font-bold text-gray-700 block">Established</span>
                      {institute.establishedYear}
                    </div>
                    <div>
                      <span className="font-bold text-gray-700 block">Location Area</span>
                      {institute.location}, Indore
                    </div>
                    {institute.contactEmail && (
                      <div className="col-span-2">
                        <span className="font-bold text-gray-700 block">Official Contact Email</span>
                        {institute.contactEmail}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'facilities' && (
                <div className="flex flex-wrap gap-1.5">
                  {institute.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1 rounded-full bg-red-50/70 border border-red-100 px-2.5 py-1 text-[11px] font-semibold text-red-600"
                    >
                      <Check className="h-3 w-3 text-red-500" />
                      <span>{fac}</span>
                    </span>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {/* Reviews List */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {loadingReviews ? (
                      <p className="text-gray-400 italic">Loading reviews...</p>
                    ) : reviews.length === 0 ? (
                      <p className="text-gray-400 italic">No reviews yet. Be the first to add one!</p>
                    ) : (
                      reviews.map((rev) => (
                        <div key={rev.id} className="bg-white p-2.5 rounded-lg border border-gray-100">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-gray-800">{rev.authorName}</span>
                            <div className="flex items-center text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-[11px] leading-relaxed">{rev.comment}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Review Form */}
                  <form onSubmit={handleAddReview} className="border-t border-gray-100 pt-3 mt-2 space-y-2">
                    <p className="font-bold text-gray-700">Write a Review</p>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        placeholder="Your Name"
                        className="rounded-lg border border-gray-200 px-2.5 py-1.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                        required
                      />
                      <div className="flex items-center space-x-1">
                        <span className="text-[10px] text-gray-400 mr-1">Rating:</span>
                        {[1, 2, 3, 4, 5].map((stars) => (
                          <button
                            type="button"
                            key={stars}
                            onClick={() => setReviewRating(stars)}
                            className="text-amber-400 hover:scale-110 transition"
                          >
                            <Star
                              className={`h-3.5 w-3.5 ${
                                stars <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-1.5">
                      <input
                        type="text"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience with this institute..."
                        className="flex-1 rounded-lg border border-gray-200 px-2.5 py-1.5 bg-white text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-red-600"
                        required
                      />
                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="bg-red-600 text-white rounded-lg px-3 flex items-center justify-center hover:bg-red-500 transition disabled:opacity-50"
                      >
                        <Send className="h-3 w-3" />
                      </button>
                    </div>

                    {reviewSuccess && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-emerald-600 font-semibold text-[10px]"
                      >
                        Review submitted successfully! Refreshing list...
                      </motion.p>
                    )}
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
