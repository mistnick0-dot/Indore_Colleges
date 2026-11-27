import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  Check, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Layers,
  IndianRupee,
  HelpCircle,
  Clock,
  ArrowRight,
  Cpu,
  Briefcase,
  Palette,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Institute } from '../types';

interface VirtualAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutes: Institute[];
  onApplyFilters: (filters: {
    type: 'all' | 'school' | 'college';
    category: string;
    board: string;
    location: string;
    maxFee: number;
  }) => void;
}

interface OptionItem {
  id: string;
  label: string;
  type: 'day' | 'boarding' | 'pre' | 'college';
  stream: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function VirtualAdvisorModal({ 
  isOpen, 
  onClose, 
  institutes, 
  onApplyFilters 
}: VirtualAdvisorModalProps) {
  
  // Progress Step: 1 = Type, 2 = Grade/Stream, 3 = Fees, 4 = Board, 5 = Details
  const [step, setStep] = useState(1);

  // Selections
  const [instType, setInstType] = useState<'day' | 'boarding' | 'pre' | 'college'>('college');
  const [selectedOptionId, setSelectedOptionId] = useState<string>('engineering');
  const [selectedGrade, setSelectedGrade] = useState<string>('B.Tech');
  const [selectedStream, setSelectedStream] = useState<string>('Engineering');
  const [selectedFeeRange, setSelectedFeeRange] = useState<string>('50K to 70K');
  const [selectedBoard, setSelectedBoard] = useState<string>('AICTE');
  const [otherAffiliation, setOtherAffiliation] = useState('');

  // Lead Info
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<'Boy' | 'Girl'>('Boy');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Vijay Nagar');

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [recommended, setRecommended] = useState<Institute[]>([]);

  // Advisor Step 1 Option configuration
  const options: OptionItem[] = [
    { id: 'engineering', label: 'Engineering College', type: 'college', stream: 'Engineering', icon: Cpu, color: 'red' },
    { id: 'management', label: 'Management College', type: 'college', stream: 'Management', icon: Briefcase, color: 'indigo' },
    { id: 'design', label: 'Arts & Design College', type: 'college', stream: 'Design', icon: Palette, color: 'rose' },
    { id: 'medical', label: 'Medical College', type: 'college', stream: 'Medical', icon: redIconColor(), color: 'red' },
    { id: 'law', label: 'Law College', type: 'college', stream: 'Law', icon: Building2, color: 'amber' },
    { id: 'general', label: 'Arts & Science Uni', type: 'college', stream: 'Arts & Science', icon: GraduationCap, color: 'violet' }
  ];

  function redIconColor() {
    return Activity;
  }

  const handleOptionSelect = (opt: OptionItem) => {
    setSelectedOptionId(opt.id);
    setInstType(opt.type);
    if (opt.type === 'college') {
      setSelectedStream(opt.stream);
      // Automatically set a valid target program as default for college stream
      if (opt.stream === 'Engineering') setSelectedGrade('B.Tech');
      else if (opt.stream === 'Management') setSelectedGrade('MBA');
      else if (opt.stream === 'Medical') setSelectedGrade('MBBS');
      else if (opt.stream === 'Design') setSelectedGrade('B.Des');
      else setSelectedGrade('B.Sc');
    } else {
      setSelectedGrade('12');
    }
  };

  // Fee ranges mapper to numeric filter
  const getFeeValue = (range: string): number => {
    switch (range) {
      case '< 30K': return 30000;
      case '30K to 50K': return 50000;
      case '50K to 70K': return 70000;
      case '70K to 1.2 Lac': return 120000;
      case '1.2 Lac to 2.5 Lac': return 250000;
      case '> 2.5 Lac': return 1500000;
      default: return 1500000;
    }
  };

  const handleNext = () => {
    if (step === 4 && selectedBoard === 'OTHER' && !otherAffiliation.trim()) {
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setSubmitting(true);
    
    // Structure selected requirements summary
    const typeLabel = `${selectedStream} College`;
    const academicLabel = `${selectedGrade} (${selectedStream})`;
    const affiliationPreference = selectedBoard === 'OTHER' ? otherAffiliation.trim() : selectedBoard;
    const queryMessage = `Virtual Advisor Lead: Looking for ${typeLabel} (${academicLabel}) in fee range ${selectedFeeRange}, affiliation pref: ${affiliationPreference}. Preferred Area: ${location}. Student Gender: ${gender}`;

    try {
      // 1. Submit real lead ticket to persistent backend /api/counseling
      const response = await fetch('/api/counseling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentName: fullName,
          studentName: fullName,
          studentClassOrDegree: academicLabel,
          phone: phone,
          email: `${fullName.toLowerCase().replace(/\s+/g, '')}@example.com`,
          preferredSlot: 'Anytime (Admissions Urgent)',
          date: new Date().toISOString().split('T')[0],
          query: queryMessage
        })
      });

      if (response.ok) {
        // 2. Perform intelligence recommendation engine matching
        const mappedType: 'school' | 'college' = 'college';
        
        // Find suitable institutes matching type & category / board
        let matches = institutes.filter(inst => {
          if (inst.type !== mappedType) return false;
          return true;
        });

        // For colleges, prioritize the matching category stream first
        if (mappedType === 'college') {
          const streamMatches = matches.filter(inst => inst.category.toLowerCase() === selectedStream.toLowerCase());
          if (streamMatches.length > 0) {
            matches = streamMatches;
          }
        }

        // Filter by location
        const locationMatches = matches.filter(i => i.location.toLowerCase() === location.toLowerCase());
        if (locationMatches.length > 0) {
          matches = locationMatches;
        }

        // Limit to 3 top-rated choices
        const sortedMatches = matches.sort((a, b) => b.rating - a.rating).slice(0, 3);
        setRecommended(sortedMatches);

        setSuccess(true);

        // 3. Apply the dynamic search & filter settings on the parent component
        onApplyFilters({
          type: mappedType,
          category: instType === 'college' ? selectedStream : 'All',
          board: affiliationPreference,
          location: location,
          maxFee: getFeeValue(selectedFeeRange)
        });
      }
    } catch (err) {
      console.error('Error submitting virtual advisor query:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      {/* Dark backdrop blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/65 backdrop-blur-md"
      />

      {/* Main Glassmorphic Panel Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative bg-white text-gray-900 w-full max-w-2xl rounded-2xl sm:rounded-[32px] shadow-2xl border border-gray-100 flex flex-col z-10 my-auto max-h-[92vh] overflow-hidden"
      >
        
        {/* Top Header Label */}
        <div className="bg-gradient-to-r from-red-500/5 to-amber-500/5 p-4 sm:p-5 border-b border-gray-100 text-center relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex justify-center mb-2.5">
            <Logo size="sm" />
          </div>

          <span className="inline-flex items-center space-x-1.5 text-[9px] text-red-600 bg-red-100 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-widest mb-1.5">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Virtual Advisory Bot</span>
          </span>
          <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
            Hi, I am your Virtual Admission Advisor.
          </h2>
        </div>

        {/* Content Wizard View */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-[220px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Institution Type Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                key="step1"
                className="space-y-4"
              >
                <div className="text-center">
                  <span className="text-[9px] uppercase font-black tracking-widest text-red-600">Step 1 of 5</span>
                  <h3 className="text-sm sm:text-base font-extrabold text-gray-950 mt-0.5">
                    Which type of institution are you looking for?
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {options.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedOptionId === opt.id;
                    
                    // Dynamic tailwind styles depending on color and selection
                    let activeStyles = '';
                    let iconStyles = '';
                    
                    if (isSelected) {
                      if (opt.color === 'emerald') {
                        activeStyles = 'border-emerald-500 bg-emerald-50/20 text-emerald-950 ring-2 ring-emerald-500/10';
                        iconStyles = 'bg-emerald-100 text-emerald-600';
                      } else if (opt.color === 'red') {
                        activeStyles = 'border-red-500 bg-red-50/20 text-red-600 ring-2 ring-red-500/10';
                        iconStyles = 'bg-red-100 text-red-600';
                      } else if (opt.color === 'amber') {
                        activeStyles = 'border-amber-500 bg-amber-50/20 text-amber-950 ring-2 ring-amber-500/10';
                        iconStyles = 'bg-amber-100 text-amber-600';
                      } else if (opt.color === 'indigo') {
                        activeStyles = 'border-indigo-500 bg-indigo-50/20 text-indigo-950 ring-2 ring-indigo-500/10';
                        iconStyles = 'bg-indigo-100 text-indigo-600';
                      } else if (opt.color === 'rose') {
                        activeStyles = 'border-rose-500 bg-rose-50/20 text-rose-950 ring-2 ring-rose-500/10';
                        iconStyles = 'bg-rose-100 text-rose-600';
                      } else if (opt.color === 'red') {
                        activeStyles = 'border-red-500 bg-red-50/20 text-red-600 ring-2 ring-red-500/10';
                        iconStyles = 'bg-red-100 text-red-600';
                      } else if (opt.color === 'violet') {
                        activeStyles = 'border-violet-500 bg-violet-50/20 text-violet-950 ring-2 ring-violet-500/10';
                        iconStyles = 'bg-violet-100 text-violet-600';
                      }
                    } else {
                      activeStyles = 'border-gray-100 hover:border-gray-200 bg-white text-gray-600 hover:bg-gray-50/30';
                      iconStyles = 'bg-gray-50 text-gray-400';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleOptionSelect(opt)}
                        className={`p-3 rounded-xl border-2 text-center transition duration-200 flex flex-col items-center justify-center min-h-[95px] ${activeStyles}`}
                      >
                        <div className={`p-2 rounded-full mb-2 ${iconStyles}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider block leading-tight">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center space-x-3 pt-2">
                  <button 
                    onClick={handleNext}
                    className="px-8 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={onClose}
                    className="px-8 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs rounded-xl transition"
                  >
                    No
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Target Degree Choice */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                key="step2"
                className="space-y-4"
              >
                <div className="text-center">
                  <span className="text-[9px] uppercase font-black tracking-widest text-red-600">Step 2 of 5</span>
                  <h3 className="text-sm sm:text-base font-extrabold text-gray-950 mt-0.5">
                    Select your target {selectedStream} degree / program
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto">
                  {(() => {
                    let degrees: string[] = [];
                    if (selectedStream === 'Engineering') degrees = ['B.Tech', 'M.Tech', 'Diploma', 'Ph.D'];
                    else if (selectedStream === 'Management') degrees = ['MBA', 'BBA', 'PGDM', 'Executive MBA'];
                    else if (selectedStream === 'Medical') degrees = ['MBBS', 'BDS', 'B.Sc Nursing', 'B.Pharm'];
                    else if (selectedStream === 'Design') degrees = ['B.Des', 'M.Des', 'BFA (Arts)', 'Animation'];
                    else if (selectedStream === 'Law') degrees = ['LL.B', 'LL.M', 'BA LL.B', 'BBA LL.B'];
                    else degrees = ['B.Sc', 'B.A', 'B.Com', 'MCA', 'M.Sc'];
                    
                    return degrees.map(degree => (
                      <button
                        key={degree}
                        onClick={() => setSelectedGrade(degree)}
                        className={`py-2 px-3 rounded-lg border text-xs font-bold transition duration-200 ${
                          selectedGrade === degree 
                            ? 'bg-red-600 text-white border-red-600 shadow-sm'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-100'
                        }`}
                      >
                        {degree}
                      </button>
                    ));
                  })()}
                </div>

                <div className="flex items-center justify-center space-x-3 pt-3 border-t border-gray-50">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs rounded-xl transition"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleNext}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs rounded-xl transition"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Fees limits */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                key="step3"
                className="space-y-4"
              >
                <div className="text-center">
                  <span className="text-[9px] uppercase font-black tracking-widest text-red-600">Step 3 of 5</span>
                  <h3 className="text-sm sm:text-base font-extrabold text-gray-950 mt-0.5">
                    What is the annual fee budget range you are looking for?
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto">
                  {['< 30K', '30K to 50K', '50K to 70K', '70K to 1.2 Lac', '1.2 Lac to 2.5 Lac', '> 2.5 Lac'].map(range => (
                    <button
                      key={range}
                      onClick={() => setSelectedFeeRange(range)}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold transition duration-200 ${
                        selectedFeeRange === range 
                          ? 'bg-red-600 text-white border-red-600 shadow-sm'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-100'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-3 pt-3 border-t border-gray-50">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs rounded-xl transition"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleNext}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs rounded-xl transition"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Affiliation Preference */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                key="step4"
                className="space-y-4"
              >
                <div className="text-center">
                  <span className="text-[9px] uppercase font-black tracking-widest text-red-600">Step 4 of 5</span>
                  <h3 className="text-sm sm:text-base font-extrabold text-gray-950 mt-0.5">
                    What is your preference for the affiliation / recognition?
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 max-w-3xl mx-auto">
                  {['AICTE', 'UGC', 'PCI', 'Higher Education', 'OTHER'].map(board => (
                    <button
                      key={board}
                      onClick={() => setSelectedBoard(board)}
                      className={`py-2 px-2 rounded-xl border text-[10px] sm:text-xs font-bold transition duration-200 flex items-center justify-center gap-1.5 ${
                        selectedBoard === board 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-white text-slate-700 hover:bg-gray-50 border-slate-200'
                      }`}
                    >
                      <Check className={`h-3.5 w-3.5 shrink-0 ${selectedBoard === board ? 'text-emerald-600' : 'text-slate-300'}`} />
                      {board}
                    </button>
                  ))}
                </div>

                {selectedBoard === 'OTHER' && (
                  <div className="max-w-md mx-auto">
                    <label htmlFor="other-affiliation" className="block text-xs font-bold text-gray-600 mb-1">
                      Specify affiliation / recognition *
                    </label>
                    <input
                      id="other-affiliation"
                      type="text"
                      required
                      value={otherAffiliation}
                      onChange={(event) => setOtherAffiliation(event.target.value)}
                      placeholder="Enter affiliation or recognition"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                )}

                <div className="flex items-center justify-center space-x-3 pt-3 border-t border-gray-50">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs rounded-xl transition"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={selectedBoard === 'OTHER' && !otherAffiliation.trim()}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 disabled:hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-xs rounded-xl transition"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Contact details & success summary matching */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                key="step5"
                className="space-y-3 max-w-md mx-auto text-xs w-full"
              >
                
                {success ? (
                  <div className="text-center py-4">
                    <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-3 animate-bounce">
                      <Check className="h-6 w-6 stroke-[3]" />
                    </div>
                    <h3 className="text-base font-extrabold text-gray-950">Preferences Registered Successfully!</h3>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                      We have custom-filtered the main dashboard list to match your exact options. Check out your suggested results in Indore:
                    </p>

                    {recommended.length > 0 && (
                      <div className="mt-3 space-y-2 text-left max-w-sm mx-auto">
                        {recommended.map(rec => (
                          <div key={rec.id} className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                            <div>
                              <p className="font-extrabold text-gray-900 truncate text-[11px]">{rec.name}</p>
                              <p className="text-[10px] text-gray-400">{rec.location} &bull; Rating {rec.rating}</p>
                            </div>
                            <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                              MATCH
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button 
                      onClick={onClose}
                      className="mt-5 w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2.5 rounded-xl transition"
                    >
                      Show matching results in Dashboard
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFinish} className="space-y-2.5">
                    <div className="text-center mb-1.5">
                      <span className="text-[9px] uppercase font-black tracking-widest text-red-600">Final Step</span>
                      <h3 className="text-sm sm:text-base font-extrabold text-gray-950 mt-0.5">
                        Excellent! Let's find your matching institutes
                      </h3>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-0.5 text-[10px]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-1.5 bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>

                    {/* Gender Toggle */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-0.5 text-[10px]">
                        Gender *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Boy', 'Girl'].map(g => (
                          <button
                            type="button"
                            key={g}
                            onClick={() => setGender(g as 'Boy' | 'Girl')}
                            className={`py-1.5 rounded-lg font-bold transition text-xs ${
                              gender === g 
                                ? 'bg-red-600 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-0.5 text-[10px]">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-1.5 bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>

                    {/* Preferred Location inside Indore */}
                    <div>
                      <label className="block font-bold text-gray-500 uppercase tracking-wider mb-0.5 text-[10px]">
                        Preferred Indore Location *
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-1.5 bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-red-600"
                      >
                        <option value="Vijay Nagar">Vijay Nagar</option>
                        <option value="Bhawarkua">Bhawarkua</option>
                        <option value="Simrol">Simrol</option>
                        <option value="Palasia">Palasia</option>
                        <option value="Limbodi">Limbodi</option>
                        <option value="Rau">Rau</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-50">
                      <button 
                        type="button"
                        onClick={handlePrev}
                        className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-xl transition text-xs"
                      >
                        Previous
                      </button>
                      
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-red-600 hover:bg-red-500 text-white font-extrabold py-2 rounded-xl transition shadow-lg shadow-red-600/10 flex items-center justify-center gap-1.5 text-xs"
                      >
                        {submitting ? (
                          <span>Finding matching colleges...</span>
                        ) : (
                          <>
                            <span>Show results</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* BOTTOM STEPS TIMELINE */}
        <div className="bg-gray-50/50 p-3 border-t border-gray-100 flex items-center justify-center space-x-1 sm:space-x-4 text-[9px] font-extrabold uppercase tracking-wider select-none text-gray-400 shrink-0">
          
          {/* Step 1: Stream */}
          <div className={`flex items-center space-x-1 ${step === 1 ? 'text-red-600' : step > 1 ? 'text-emerald-600' : ''}`}>
            {step > 1 ? <Check className="h-3 w-3 stroke-[3]" /> : <span className="h-4 w-4 rounded-full bg-gray-200 text-[9px] flex items-center justify-center">1</span>}
            <span className="hidden sm:inline">Stream</span>
          </div>
          <span className="text-gray-200">/</span>

          {/* Step 2: Degree */}
          <div className={`flex items-center space-x-1 ${step === 2 ? 'text-red-600' : step > 2 ? 'text-emerald-600' : ''}`}>
            {step > 2 ? <Check className="h-3 w-3 stroke-[3]" /> : <span className="h-4 w-4 rounded-full bg-gray-200 text-[9px] flex items-center justify-center">2</span>}
            <span className="hidden sm:inline">Degree</span>
          </div>
          <span className="text-gray-200">/</span>

          {/* Step 3: Fees */}
          <div className={`flex items-center space-x-1 ${step === 3 ? 'text-red-600' : step > 3 ? 'text-emerald-600' : ''}`}>
            {step > 3 ? <Check className="h-3 w-3 stroke-[3]" /> : <span className="h-4 w-4 rounded-full bg-gray-200 text-[9px] flex items-center justify-center">3</span>}
            <span className="hidden sm:inline">Fees</span>
          </div>
          <span className="text-gray-200">/</span>

          {/* Step 4: Affiliation */}
          <div className={`flex items-center space-x-1 ${step === 4 ? 'text-red-600' : step > 4 ? 'text-emerald-600' : ''}`}>
            {step > 4 ? <Check className="h-3 w-3 stroke-[3]" /> : <span className="h-4 w-4 rounded-full bg-gray-200 text-[9px] flex items-center justify-center">4</span>}
            <span className="hidden sm:inline">Affiliation</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

