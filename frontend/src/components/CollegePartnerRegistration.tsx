import React, { useState } from 'react';
import Logo from './Logo';
import { 
  Building, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  CheckCircle, 
  CheckCircle2,
  AlertCircle, 
  Trash2, 
  FileText, 
  Award, 
  BookOpen, 
  Settings, 
  Clock, 
  Check,
  Plus,
  X,
  UploadCloud,
  GraduationCap,
  TrendingUp,
  Instagram,
  FileCheck,
  ExternalLink,
  Camera,
  IndianRupee,
  Edit
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INDORE_LOCATIONS } from '../data/indoreData';

const POPULAR_COURSES = [
  'B.Tech CSE',
  'MBA',
  'BBA',
  'BCA',
  'B.Pharm',
  'B.Com',
  'BA LLB',
  'M.Tech',
  'MCA'
];

const APPROVAL_OPTIONS = [
  'AICTE',
  'UGC',
  'PCI',
  'Higher Education'
];

const MAX_UPLOAD_SIZE_BYTES = 4 * 1024 * 1024;

export default function CollegePartnerRegistration() {
  const [activeTab, setActiveTab] = useState<'selection' | 'register' | 'login' | 'dashboard'>('selection');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 16 Form Fields
  // 1. College/Group/Institute Name
  const [name, setName] = useState('');
  // 2. Location (Full option to enter exact college campus location/address)
  const [location, setLocation] = useState('');
  // 3. Official Contact No.
  const [contactPhone, setContactPhone] = useState('');
  // 4. Official Email ID
  const [contactEmail, setContactEmail] = useState('');
  // 5. Courses Available (Multiple courses)
  const [courses, setCourses] = useState<string[]>(['B.Tech CSE']);
  const [courseInput, setCourseInput] = useState('');
  // 6. Affiliation (DAVV, RGPV or Private - if private, enter name)
  const [affiliationType, setAffiliationType] = useState<'DAVV' | 'RGPV' | 'Private'>('DAVV');
  const [affiliationPrivateName, setAffiliationPrivateName] = useState('');
  // 7. Approved (AICTE, UGC, PCI, Higher Education)
  const [approvals, setApprovals] = useState<string[]>(['AICTE', 'UGC']);
  // 8. Established Year
  const [establishedYear, setEstablishedYear] = useState('2005');
  // 8b. Annual Tuition Fee
  const [feePerAnnum, setFeePerAnnum] = useState('75000');
  // 9. Update Latest Brochure
  const [brochureFileName, setBrochureFileName] = useState('');
  const [brochureUrl, setBrochureUrl] = useState('');
  // 10. Any other Achievement
  const [achievements, setAchievements] = useState('');
  // 11. Highest & Lowest Package
  const [highestPackage, setHighestPackage] = useState('');
  const [lowestPackage, setLowestPackage] = useState('');
  // 12. College vision & mission statement
  const [visionMission, setVisionMission] = useState('');
  // 13. Website link
  const [website, setWebsite] = useState('');
  // 14. Instagram link
  const [instagram, setInstagram] = useState('');
  // 15. College campus photograph
  const [campusPhoto, setCampusPhoto] = useState('');
  const [campusPhotoName, setCampusPhotoName] = useState('');
  // Logged-in College State
  const [loggedInCollege, setLoggedInCollege] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editCourseInput, setEditCourseInput] = useState('');

  // Course handlers
  const handleAddCourse = (courseToAdd?: string) => {
    const c = (courseToAdd || courseInput).trim();
    if (c && !courses.includes(c)) {
      setCourses([...courses, c]);
      setCourseInput('');
    }
  };

  const handleRemoveCourse = (courseToRemove: string) => {
    setCourses(courses.filter((c) => c !== courseToRemove));
  };

  // Approval toggle handler
  const handleApprovalToggle = (opt: string) => {
    setApprovals((prev) =>
      prev.includes(opt) ? prev.filter((a) => a !== opt) : [...prev, opt]
    );
  };

  // File upload handlers
  const handleBrochureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorMsg('');
      if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        e.target.value = '';
        setErrorMsg('Brochure files must be 4 MB or smaller. You can also provide a brochure link.');
        return;
      }

      setBrochureFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setBrochureUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCampusPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorMsg('');
      if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        e.target.value = '';
        setErrorMsg('Campus photos must be 4 MB or smaller. You can also provide a photo link.');
        return;
      }

      setCampusPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCampusPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter the College/Group/Institute Name.');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Please enter your College Location / Campus Address.');
      return;
    }
    if (!contactPhone.trim()) {
      setErrorMsg('Please enter Official Contact No.');
      return;
    }
    if (!contactEmail.trim()) {
      setErrorMsg('Please enter Official Email ID.');
      return;
    }
    if (courses.length === 0) {
      setErrorMsg('Please add at least one available course.');
      return;
    }
    if (affiliationType === 'Private' && !affiliationPrivateName.trim()) {
      setErrorMsg('Please enter the Private University or Affiliation Name.');
      return;
    }
    if (!establishedYear.trim()) {
      setErrorMsg('Please enter Established Year.');
      return;
    }
    setLoading(true);

    try {
      const computedAffiliation = affiliationType === 'Private' 
        ? (affiliationPrivateName.trim() ? `Private (${affiliationPrivateName.trim()})` : 'Private')
        : affiliationType;

      const res = await fetch('/api/college-partner/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          location: location.trim(),
          address: location.trim(),
          contactPhone: contactPhone.trim(),
          contactEmail: contactEmail.trim(),
          courses,
          affiliationType,
          affiliationPrivateName: affiliationPrivateName.trim(),
          boardOrAffiliation: computedAffiliation,
          approvals,
          establishedYear: Number(establishedYear) || 2026,
          feePerAnnum: Number(feePerAnnum) || 0,
          brochureUrl,
          brochureFileName,
          achievements: achievements.trim(),
          highestPackage: highestPackage.trim(),
          lowestPackage: lowestPackage.trim(),
          visionMission: visionMission.trim(),
          description: visionMission.trim(),
          website: website.trim(),
          instagram: instagram.trim(),
          campusPhoto
        })
      });

      if (!res.headers.get('content-type')?.includes('application/json')) {
        throw new Error(
          res.ok
            ? 'The server returned an unexpected response. Please try again.'
            : 'The server could not process your registration. Try smaller files or provide links instead.'
        );
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register your college.');
      }

      setSuccessMsg(`Your college "${name}" has been submitted for admin review. Partner account access is temporarily unavailable while secure sign-in is prepared.`);

    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch(`/api/college-partner/${loggedInCollege.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loggedInCollege)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update information.');
      }

      setLoggedInCollege(data.college);
      setIsEditing(false);
      setSuccessMsg(data.message || 'College update request submitted! Changes will be reviewed by admin and published live once approved.');
      setTimeout(() => setSuccessMsg(''), 7000);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting update request.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!loggedInCollege) return;
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch(`/api/college-partner/${loggedInCollege.id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete registration.');
      }

      setLoggedInCollege(null);
      setDeleteConfirm(false);
      setActiveTab('selection');
      setSuccessMsg('Your college profile and partner account has been deleted.');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during deletion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Top Banner */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex justify-center items-center gap-2">
          <Building className="h-7 w-7 text-[#FA6E00] shrink-0" />
          <span>Indore Colleges Partner Portal</span>
        </h1>

        {/* Top tab switcher (visible when viewing form, not logged in) */}
        {activeTab !== 'selection' && loggedInCollege === null && (
          <div className="flex flex-col items-center gap-3 mt-6">
            <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200 shadow-sm">
              <button
                type="button"
                id="btn-switch-login"
                onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
                className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${activeTab === 'login' ? 'bg-white text-[#FA6E00] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Lock className="h-4 w-4" />
                <span>Already Registered</span>
              </button>
              <button
                type="button"
                id="btn-switch-register"
                onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
                className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${activeTab === 'register' ? 'bg-white text-[#FA6E00] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Building className="h-4 w-4" />
                <span>New Registration</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => { setActiveTab('selection'); setErrorMsg(''); }}
              className="text-xs text-slate-500 hover:text-[#FA6E00] font-semibold flex items-center gap-1 cursor-pointer transition py-1 px-3 rounded-lg hover:bg-slate-100"
            >
              <span>← Back to Options</span>
            </button>
          </div>
        )}
      </div>

      {/* Two Highlighted Options (Shown on page arrival, no form) */}
      {activeTab === 'selection' && loggedInCollege === null && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-xl mx-auto my-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Option 1: Already Registered */}
            <button
              type="button"
              id="btn-option-already-registered"
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
              }}
              className="group relative flex flex-col items-center justify-center p-5 sm:p-6 bg-white border-2 border-slate-200 hover:border-[#FA6E00] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center cursor-pointer transform hover:-translate-y-0.5"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-3.5 group-hover:bg-[#FA6E00] text-[#FA6E00] group-hover:text-white transition-all duration-300 shadow-sm">
                <Lock className="h-7 w-7" />
              </div>
              <span className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-[#FA6E00] transition-colors leading-tight">
                Already Registered
              </span>
              <span className="mt-2.5 text-[11px] sm:text-xs font-extrabold text-[#FA6E00] uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200 group-hover:bg-[#FA6E00] group-hover:text-white group-hover:border-[#FA6E00] transition-all whitespace-nowrap">
                Login to Dashboard →
              </span>
            </button>

            {/* Option 2: New Registration */}
            <button
              type="button"
              id="btn-option-new-registration"
              onClick={() => {
                setActiveTab('register');
                setErrorMsg('');
              }}
              className="group relative flex flex-col items-center justify-center p-5 sm:p-6 bg-white border-2 border-slate-200 hover:border-[#FA6E00] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center cursor-pointer transform hover:-translate-y-0.5"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-3.5 group-hover:bg-[#FA6E00] text-[#FA6E00] group-hover:text-white transition-all duration-300 shadow-sm">
                <Building className="h-7 w-7" />
              </div>
              <span className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-[#FA6E00] transition-colors leading-tight">
                New Registration
              </span>
              <span className="mt-2.5 text-[11px] sm:text-xs font-extrabold text-[#FA6E00] uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200 group-hover:bg-[#FA6E00] group-hover:text-white group-hover:border-[#FA6E00] transition-all whitespace-nowrap">
                Register Your College →
              </span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Message Alerts */}
      <AnimatePresence>
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-3"
          >
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{successMsg}</p>
          </motion.div>
        )}

        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{errorMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      {(activeTab !== 'selection' || loggedInCollege !== null) && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
          
          {/* ======================================================== */}
          {/* 16-FIELD COLLEGE REGISTRATION FORM */}
          {/* ======================================================== */}
          {activeTab === 'register' && loggedInCollege === null && (
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="border-b border-slate-100 pb-4 text-center">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 inline-flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#FA6E00]" />
                  <span>College Registration Form</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                
                {/* 1. College/Group/Institute Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="reg-college-name" className="block font-bold text-slate-700 mb-1.5">
                    1. College / Group / Institute Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="reg-college-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter college or institute name"
                      className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                  </div>
                </div>

                {/* 2. Location */}
                <div className="sm:col-span-2">
                  <label htmlFor="reg-college-location" className="block font-bold text-slate-700 mb-1.5">
                    2. Location <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="reg-college-location"
                      list="indore-locations-list"
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter college location"
                      className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                    <datalist id="indore-locations-list">
                      {INDORE_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* 3. Official Contact No. */}
                <div>
                  <label htmlFor="reg-contact-phone" className="block font-bold text-slate-700 mb-1.5">
                    3. Official Contact No. <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="reg-contact-phone"
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                  </div>
                </div>

                {/* 4. Official Email ID */}
                <div>
                  <label htmlFor="reg-contact-email" className="block font-bold text-slate-700 mb-1.5">
                    4. Official Email ID <span className="text-rose-500">*</span>
                    <span className="text-[10px] text-slate-400 font-normal ml-1">(Used for login)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="reg-contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="info@college.edu.in"
                      className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                  </div>
                </div>

                {/* 5. Courses Available (multiple courses addable) */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">
                    5. Courses Available <span className="text-rose-500">*</span>
                    <span className="text-[10px] text-slate-400 font-normal ml-1">(Add multiple courses offered)</span>
                  </label>
                  
                  {/* Course Input + Add Button */}
                  <div className="flex gap-2 mb-2">
                    <div className="relative flex-1">
                      <GraduationCap className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={courseInput}
                        onChange={(e) => setCourseInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCourse();
                          }
                        }}
                        placeholder="e.g. B.Tech Computer Science"
                        className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                      />
                    </div>
                    <button
                      type="button"
                      id="btn-add-course"
                      onClick={() => handleAddCourse()}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Course</span>
                    </button>
                  </div>

                  {/* Added Courses Tags */}
                  {courses.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 p-2.5 bg-orange-50/60 rounded-xl border border-orange-100 mb-2">
                      {courses.map((course) => (
                        <span
                          key={course}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-slate-800 border border-orange-200 rounded-lg text-xs font-semibold shadow-2xs"
                        >
                          <BookOpen className="h-3 w-3 text-[#FA6E00]" />
                          <span>{course}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCourse(course)}
                            className="text-slate-400 hover:text-rose-600 cursor-pointer p-0.5"
                            title="Remove course"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick-add course suggestions */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Quick Add:</span>
                    {POPULAR_COURSES.map((pc) => (
                      <button
                        key={pc}
                        type="button"
                        onClick={() => handleAddCourse(pc)}
                        className={`text-[11px] px-2 py-0.5 rounded-md border transition cursor-pointer ${
                          courses.includes(pc)
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-default'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#FA6E00] hover:text-[#FA6E00]'
                        }`}
                        disabled={courses.includes(pc)}
                      >
                        + {pc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Affiliation (DAVV, RGPV or Private - if private, enter name) */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">
                    6. Affiliation <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {(['DAVV', 'RGPV', 'Private'] as const).map((type) => (
                      <label
                        key={type}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border cursor-pointer font-bold transition text-xs select-none ${
                          affiliationType === type
                            ? 'bg-orange-50 border-[#FA6E00] text-[#FA6E00] shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="affiliationType"
                          value={type}
                          checked={affiliationType === type}
                          onChange={() => setAffiliationType(type)}
                          className="sr-only"
                        />
                        <span>{type === 'Private' ? 'Private University' : type}</span>
                      </label>
                    ))}
                  </div>

                  {/* If private, enter name */}
                  {affiliationType === 'Private' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2.5"
                    >
                      <input
                        type="text"
                        required
                        value={affiliationPrivateName}
                        onChange={(e) => setAffiliationPrivateName(e.target.value)}
                        placeholder="Enter private university name"
                        className="w-full rounded-xl border border-orange-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                      />
                    </motion.div>
                  )}
                </div>

                {/* 7. Approved (AICTE, UGC, PCI, Higher Education) */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">
                    7. Approved By
                    <span className="text-[10px] text-slate-400 font-normal ml-1">(Select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {APPROVAL_OPTIONS.map((opt) => {
                      const active = approvals.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleApprovalToggle(opt)}
                          className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 select-none ${
                            active
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Check className={`h-3.5 w-3.5 ${active ? 'text-emerald-600' : 'text-slate-300'}`} />
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 8. Established Year */}
                <div>
                  <label htmlFor="reg-est-year" className="block font-bold text-slate-700 mb-1.5">
                    8. Established Year <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-est-year"
                    type="number"
                    required
                    value={establishedYear}
                    onChange={(e) => setEstablishedYear(e.target.value)}
                    placeholder="e.g. 1998"
                    min="1800"
                    max={new Date().getFullYear()}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                  />
                </div>

                {/* 8b. Annual Tuition Fee */}
                <div>
                  <label htmlFor="reg-fee" className="block font-bold text-slate-700 mb-1.5">
                    Annual Tuition Fee (₹ / year) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="reg-fee"
                      type="number"
                      required
                      value={feePerAnnum}
                      onChange={(e) => setFeePerAnnum(e.target.value)}
                      placeholder="e.g. 75000"
                      className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                  </div>
                </div>

                {/* 9. Update Latest Brochure */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    9. Update Latest Brochure
                  </label>
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-300 hover:border-[#FA6E00] bg-slate-50 hover:bg-orange-50/40 text-slate-600 cursor-pointer transition text-xs font-semibold">
                      <UploadCloud className="h-4 w-4 text-[#FA6E00]" />
                      <span>{brochureFileName || 'Upload Brochure (PDF / Doc, max 4 MB)'}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleBrochureUpload}
                        className="sr-only"
                      />
                    </label>
                    <input
                      type="url"
                      value={brochureUrl.startsWith('data:') ? '' : brochureUrl}
                      onChange={(e) => setBrochureUrl(e.target.value)}
                      placeholder="Or paste brochure link"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[11px] text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                  </div>
                </div>

                {/* 10. Any other Achievement */}
                <div className="sm:col-span-2">
                  <label htmlFor="reg-achievements" className="block font-bold text-slate-700 mb-1.5">
                    10. Any Other Achievements
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="reg-achievements"
                      type="text"
                      value={achievements}
                      onChange={(e) => setAchievements(e.target.value)}
                      placeholder="e.g. NAAC 'A+' Grade, NIRF Top 50, NBA Accredited"
                      className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                  </div>
                </div>

                {/* 11. Highest & Lowest Package */}
                <div>
                  <label htmlFor="reg-high-package" className="block font-bold text-slate-700 mb-1.5">
                    11. Highest Package
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3.5 top-3 h-4 w-4 text-emerald-500" />
                    <input
                      id="reg-high-package"
                      type="text"
                      value={highestPackage}
                      onChange={(e) => setHighestPackage(e.target.value)}
                      placeholder="e.g. ₹24 LPA"
                      className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-low-package" className="block font-bold text-slate-700 mb-1.5">
                    Lowest Package
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="reg-low-package"
                      type="text"
                      value={lowestPackage}
                      onChange={(e) => setLowestPackage(e.target.value)}
                      placeholder="e.g. ₹4.5 LPA"
                      className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                  </div>
                </div>

                {/* 12. College vision & mission statement */}
                <div className="sm:col-span-2">
                  <label htmlFor="reg-vision-mission" className="block font-bold text-slate-700 mb-1.5">
                    12. College Vision & Mission Statement
                  </label>
                  <textarea
                    id="reg-vision-mission"
                    rows={3}
                    value={visionMission}
                    onChange={(e) => setVisionMission(e.target.value)}
                    placeholder="Enter college vision and mission statement"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                  />
                </div>

                {/* 13. Website link */}
                <div>
                  <label htmlFor="reg-website" className="block font-bold text-slate-700 mb-1.5">
                    13. Website Link
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      id="reg-website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://www.college.edu.in"
                      className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                  </div>
                </div>

                {/* 14. Instagram link */}
                <div>
                  <label htmlFor="reg-instagram" className="block font-bold text-slate-700 mb-1.5">
                    14. Instagram Link
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-3.5 top-3 h-4 w-4 text-pink-500" />
                    <input
                      id="reg-instagram"
                      type="url"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="https://instagram.com/college_handle"
                      className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                    />
                  </div>
                </div>

                {/* 15. College campus photograph */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">
                    15. College Campus Photograph
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <label className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-slate-300 hover:border-[#FA6E00] bg-slate-50 hover:bg-orange-50/40 text-slate-600 cursor-pointer transition text-xs font-semibold">
                      <Camera className="h-5 w-5 text-[#FA6E00] mb-1" />
                      <span>{campusPhotoName || 'Upload Campus Photo (max 4 MB)'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCampusPhotoUpload}
                        className="sr-only"
                      />
                    </label>

                    <div className="space-y-1.5">
                      <input
                        type="url"
                        value={campusPhoto.startsWith('data:') ? '' : campusPhoto}
                        onChange={(e) => setCampusPhoto(e.target.value)}
                        placeholder="Or enter photo URL"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                      />
                      {campusPhoto && (
                        <div className="relative inline-block mt-1">
                          <img
                            src={campusPhoto}
                            alt="Campus Preview"
                            className="h-16 w-28 object-cover rounded-lg border border-slate-200 shadow-2xs"
                          />
                          <button
                            type="button"
                            onClick={() => { setCampusPhoto(''); setCampusPhotoName(''); }}
                            className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-0.5 hover:bg-rose-700 shadow-xs cursor-pointer"
                            title="Remove photo"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Submit button */}
              <button
                type="submit"
                id="btn-submit-registration"
                disabled={loading}
                className="w-full bg-[#FA6E00] hover:bg-[#e06200] text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2 mt-4"
              >
                {loading ? 'Submitting Registration...' : 'Submit College Registration'}
              </button>
            </form>
          )}

          {/* ======================================================== */}
          {/* LOGIN FORM */}
          {/* ======================================================== */}
          {activeTab === 'login' && loggedInCollege === null && (
            <div className="max-w-md mx-auto py-6 space-y-5 text-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-2.5 text-[#FA6E00]">
                  <Lock className="h-6 w-6" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Partner Dashboard Login</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Partner sign-in is temporarily unavailable while secure account access is prepared. New college registrations remain open.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className="text-sm font-bold text-[#FA6E00] hover:underline"
              >
                Submit a new college registration
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* LOGGED IN COLLEGE DASHBOARD */}
          {/* ======================================================== */}
          {loggedInCollege !== null && activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Header Status Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-100/70 text-[#FA6E00] rounded-xl">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{loggedInCollege.name}</h2>
                    <p className="text-[11px] text-slate-400">ID: {loggedInCollege.id} • Registered on {new Date(loggedInCollege.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Status:</span>
                  {loggedInCollege.status === 'approved' ? (
                    <span className="px-3 py-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100 uppercase tracking-wider">
                      ● Approved & Live
                    </span>
                  ) : loggedInCollege.status === 'rejected' ? (
                    <span className="px-3 py-1 text-[10px] font-extrabold text-rose-700 bg-rose-50 rounded-full border border-rose-100 uppercase tracking-wider">
                      ● Rejected
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-[10px] font-extrabold text-amber-700 bg-amber-50 rounded-full border border-amber-100 uppercase tracking-wider animate-pulse">
                      ● Pending Admin Review
                    </span>
                  )}
                </div>
              </div>

              {/* Registration Pending Admin Review Notice */}
              {loggedInCollege.status !== 'approved' && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5">
                      <Clock className="h-4 w-4 animate-pulse" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <h4 className="font-bold text-amber-900">Registration Pending Admin Approval</h4>
                      <p className="text-amber-800 leading-relaxed">
                        Your college registration has been submitted to the Administrator for verification. Once approved, your college will be automatically published to the live Indore Colleges directory, and editing details will be unlocked.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* College Approved & Live on Directory Notice */}
              {loggedInCollege.status === 'approved' && !loggedInCollege.pendingUpdate && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-emerald-900">College Approved & Published Live</h4>
                      <p className="text-emerald-800">
                        Your college is published in the Indore Colleges directory. You can submit updates to your details anytime below.
                      </p>
                    </div>
                  </div>
                  <a
                    href={`/college/${loggedInCollege.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-xs"
                  >
                    <span>View Live on Directory</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}

              {/* Pending Update Notice */}
              {loggedInCollege.pendingUpdate && (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5">
                      <Clock className="h-4 w-4 animate-pulse" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <h4 className="font-bold text-amber-900">Update Request Under Admin Review</h4>
                      <p className="text-amber-800 leading-relaxed">
                        Your submitted modifications are under review by the Indore Colleges Administrator. Once approved, the changes will be published live to students.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Campus Photo Display if present */}
              {loggedInCollege.campusPhoto && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-48 sm:h-56 bg-slate-100">
                  <img
                    src={loggedInCollege.campusPhoto}
                    alt={loggedInCollege.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                      Campus Photograph
                    </span>
                  </div>
                </div>
              )}

              {/* Main View Details vs Edit Mode */}
              {!isEditing ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Settings className="h-4 w-4 text-[#FA6E00]" />
                      <span>Registered College Details</span>
                    </h3>
                    {loggedInCollege.status === 'approved' ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-3.5 py-1.5 bg-[#FA6E00] hover:bg-[#e06200] text-white text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span>Update College Info</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-3.5 py-1.5 bg-slate-100 text-slate-400 text-xs font-bold rounded-lg cursor-not-allowed flex items-center gap-1.5"
                        title="Updates will be unlocked after admin approval"
                      >
                        <Lock className="h-3.5 w-3.5" />
                        <span>Update Details (Locked until Admin Approval)</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs text-slate-600">
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Location</p>
                      <p className="font-semibold text-slate-900">{loggedInCollege.location || 'Indore'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Affiliation</p>
                      <p className="font-semibold text-slate-900">{loggedInCollege.boardOrAffiliation || 'DAVV'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Established Year</p>
                      <p className="font-semibold text-slate-900">{loggedInCollege.establishedYear || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Annual Tuition Fee</p>
                      <p className="font-semibold text-slate-900 font-mono">
                        {loggedInCollege.feePerAnnum ? `₹${Number(loggedInCollege.feePerAnnum).toLocaleString('en-IN')} / year` : 'Standard Fees'}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Official Contact Phone</p>
                      <p className="font-semibold text-slate-900">{loggedInCollege.contactPhone}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Official Email</p>
                      <p className="font-semibold text-slate-900">{loggedInCollege.contactEmail}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Placement Package</p>
                      <p className="font-semibold text-slate-900">
                        {loggedInCollege.highestPackage ? `Highest: ${loggedInCollege.highestPackage}` : ''}
                        {loggedInCollege.lowestPackage ? ` | Lowest: ${loggedInCollege.lowestPackage}` : ''}
                        {!loggedInCollege.highestPackage && !loggedInCollege.lowestPackage ? 'Not specified' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Approvals */}
                  {Array.isArray(loggedInCollege.approvals) && loggedInCollege.approvals.length > 0 && (
                    <div className="border-t border-slate-100 pt-4">
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">Approved By</p>
                      <div className="flex flex-wrap gap-1.5">
                        {loggedInCollege.approvals.map((appr: string) => (
                          <span key={appr} className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-bold">
                            ✓ {appr}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Courses */}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">Courses Available</p>
                    {Array.isArray(loggedInCollege.courses) && loggedInCollege.courses.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {loggedInCollege.courses.map((c: string) => (
                          <span key={c} className="px-2.5 py-1 bg-orange-50 border border-orange-200 text-[#FA6E00] rounded-lg text-xs font-semibold">
                            {c}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No courses listed.</p>
                    )}
                  </div>

                  {/* Achievements */}
                  {loggedInCollege.achievements && (
                    <div className="border-t border-slate-100 pt-4">
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Achievements</p>
                      <p className="text-xs text-slate-800 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {loggedInCollege.achievements}
                      </p>
                    </div>
                  )}

                  {/* Vision & Mission */}
                  {loggedInCollege.visionMission && (
                    <div className="border-t border-slate-100 pt-4">
                      <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Vision & Mission Statement</p>
                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                        {loggedInCollege.visionMission}
                      </p>
                    </div>
                  )}

                  {/* Links & Brochure */}
                  <div className="border-t border-slate-100 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {loggedInCollege.website && (
                      <a
                        href={loggedInCollege.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-[#FA6E00] flex items-center gap-2 text-slate-700 hover:text-[#FA6E00] transition"
                      >
                        <Globe className="h-4 w-4 shrink-0 text-[#FA6E00]" />
                        <span className="truncate">{loggedInCollege.website}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 ml-auto" />
                      </a>
                    )}
                    {loggedInCollege.instagram && (
                      <a
                        href={loggedInCollege.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-pink-500 flex items-center gap-2 text-slate-700 hover:text-pink-600 transition"
                      >
                        <Instagram className="h-4 w-4 shrink-0 text-pink-500" />
                        <span className="truncate">{loggedInCollege.instagram}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 ml-auto" />
                      </a>
                    )}
                    {loggedInCollege.brochureUrl && (
                      <a
                        href={loggedInCollege.brochureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={loggedInCollege.brochureFileName || 'Brochure.pdf'}
                        className="p-2.5 rounded-xl border border-orange-200 bg-orange-50/50 hover:bg-orange-50 flex items-center gap-2 text-[#FA6E00] transition font-bold"
                      >
                        <FileCheck className="h-4 w-4 shrink-0" />
                        <span className="truncate">{loggedInCollege.brochureFileName || 'View Latest Brochure'}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 ml-auto" />
                      </a>
                    )}
                  </div>

                  {/* Delete Profile Option */}
                  <div className="border-t border-rose-100 bg-rose-50/40 p-4 rounded-xl border mt-6">
                    <h4 className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                      <Trash2 className="h-4 w-4 text-rose-600" />
                      <span>Danger Zone: Withdraw / Delete College Account</span>
                    </h4>
                    {!deleteConfirm ? (
                      <button
                        onClick={() => setDeleteConfirm(true)}
                        className="mt-2 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer transition flex items-center gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete College Profile</span>
                      </button>
                    ) : (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-rose-200 text-xs">
                        <p className="text-rose-800 font-semibold mb-2">Are you sure? This will remove your listing immediately.</p>
                        <div className="flex gap-2">
                          <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg cursor-pointer font-bold"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(false)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* EDIT COLLEGE FORM */
                <form onSubmit={handleUpdate} className="space-y-5 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-900 text-sm">Edit College Details</h3>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">1. College Name</label>
                      <input
                        type="text"
                        required
                        value={loggedInCollege.name || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="edit-college-location" className="block font-bold text-slate-700 mb-1">
                        2. Location / Campus Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          id="edit-college-location"
                          list="indore-locations-list"
                          type="text"
                          value={loggedInCollege.location || ''}
                          onChange={(e) => setLoggedInCollege({ ...loggedInCollege, location: e.target.value })}
                          placeholder="Enter complete college location or campus address"
                          className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">3. Official Contact No.</label>
                      <input
                        type="tel"
                        value={loggedInCollege.contactPhone || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, contactPhone: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    {/* Courses Edit */}
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">5. Courses Available</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={editCourseInput}
                          onChange={(e) => setEditCourseInput(e.target.value)}
                          placeholder="e.g. MBA, B.Tech CSE"
                          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (editCourseInput.trim()) {
                              const curr = Array.isArray(loggedInCollege.courses) ? loggedInCollege.courses : [];
                              if (!curr.includes(editCourseInput.trim())) {
                                setLoggedInCollege({ ...loggedInCollege, courses: [...curr, editCourseInput.trim()] });
                                setEditCourseInput('');
                              }
                            }
                          }}
                          className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                        >
                          + Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(loggedInCollege.courses || []).map((c: string) => (
                          <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 border border-orange-200 text-[#FA6E00] rounded-lg text-xs font-semibold">
                            <span>{c}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setLoggedInCollege({
                                  ...loggedInCollege,
                                  courses: (loggedInCollege.courses || []).filter((item: string) => item !== c)
                                });
                              }}
                              className="text-slate-400 hover:text-rose-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">6. Affiliation</label>
                      <input
                        type="text"
                        value={loggedInCollege.boardOrAffiliation || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, boardOrAffiliation: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">8. Established Year</label>
                      <input
                        type="number"
                        value={loggedInCollege.establishedYear || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, establishedYear: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Annual Tuition Fee (₹ / year)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="number"
                          value={loggedInCollege.feePerAnnum || ''}
                          onChange={(e) => setLoggedInCollege({ ...loggedInCollege, feePerAnnum: Number(e.target.value) || 0 })}
                          placeholder="e.g. 75000"
                          className="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#FA6E00]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">11. Highest Package</label>
                      <input
                        type="text"
                        value={loggedInCollege.highestPackage || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, highestPackage: e.target.value })}
                        placeholder="e.g. ₹24 LPA"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Lowest Package</label>
                      <input
                        type="text"
                        value={loggedInCollege.lowestPackage || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, lowestPackage: e.target.value })}
                        placeholder="e.g. ₹4 LPA"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">10. Achievements</label>
                      <input
                        type="text"
                        value={loggedInCollege.achievements || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, achievements: e.target.value })}
                        placeholder="e.g. NAAC 'A+' Grade"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">12. Vision & Mission Statement</label>
                      <textarea
                        rows={3}
                        value={loggedInCollege.visionMission || loggedInCollege.description || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, visionMission: e.target.value, description: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">13. Website Link</label>
                      <input
                        type="url"
                        value={loggedInCollege.website || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, website: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">14. Instagram Link</label>
                      <input
                        type="url"
                        value={loggedInCollege.instagram || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, instagram: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">15. Campus Photo URL</label>
                      <input
                        type="text"
                        value={loggedInCollege.campusPhoto || ''}
                        onChange={(e) => setLoggedInCollege({ ...loggedInCollege, campusPhoto: e.target.value })}
                        placeholder="Image URL"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FA6E00] hover:bg-[#e06200] text-white rounded-xl py-2.5 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {loading ? 'Submitting to Admin...' : 'Submit Update Request to Admin'}
                  </button>
                </form>
              )}

              {/* Logout button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    setLoggedInCollege(null);
                    setActiveTab('selection');
                    setSuccessMsg('Logged out successfully.');
                    setTimeout(() => setSuccessMsg(''), 3000);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
