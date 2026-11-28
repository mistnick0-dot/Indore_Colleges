import React, { useState, useEffect } from 'react';
import { User, LogOut, Trash2, Save, Calendar, Mail, Heart, ShoppingBag, X, Loader2 } from 'lucide-react';
import { UserProfile, CounselingRequest, CallbackRequest } from '../types';
import { INDORE_INSTITUTES } from '../data/indoreData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
  onLogout: () => void;
  onDeleteProfile: () => Promise<void>;
  shortlistedIds: string[];
  cartIds: string[];
}

export default function ProfileModal({
  isOpen,
  onClose,
  user,
  onUpdate,
  onLogout,
  onDeleteProfile,
  shortlistedIds,
  cartIds
}: ProfileModalProps) {
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'history'>('details');
  const [name, setName] = useState(user.name || '');
  const [fatherName, setFatherName] = useState(user.fatherName || '');
  const [fatherEmail, setFatherEmail] = useState(user.fatherEmail || '');
  const [motherName, setMotherName] = useState(user.motherName || '');
  const [motherEmail, setMotherEmail] = useState(user.motherEmail || '');
  const [childName, setChildName] = useState(user.childName || '');
  const [childMotherTongue, setChildMotherTongue] = useState(user.childMotherTongue || '');
  const [address, setAddress] = useState(user.address || '');
  const [pincode, setPincode] = useState(user.pincode || '');

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [historyData, setHistoryData] = useState<{
    counseling: CounselingRequest[];
    callbacks: CallbackRequest[];
  }>({ counseling: [], callbacks: [] });

  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError('');
    try {
      const response = await fetch(`/api/users/history/${encodeURIComponent(user.email)}`);
      if (!response.ok) throw new Error('Unable to load account history.');
      const data = await response.json();
      setHistoryData({
        counseling: Array.isArray(data.counseling) ? data.counseling : [],
        callbacks: Array.isArray(data.callbacks) ? data.callbacks : [],
      });
    } catch {
      setHistoryError('Counseling and callback history is temporarily unavailable.');
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setName(user.name || '');
      setFatherName(user.fatherName || '');
      setFatherEmail(user.fatherEmail || '');
      setMotherName(user.motherName || '');
      setMotherEmail(user.motherEmail || '');
      setChildName(user.childName || '');
      setChildMotherTongue(user.childMotherTongue || '');
      setAddress(user.address || '');
      setPincode(user.pincode || '');
      setShowConfirmDelete(false);
      void fetchHistory();
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage('');
    try {
      const response = await fetch(`/api/users/profile/${encodeURIComponent(user.email)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          fatherName,
          fatherEmail,
          motherName,
          motherEmail,
          childName,
          childMotherTongue,
          address,
          pincode,
        }),
      });
      if (!response.ok) throw new Error('Unable to save profile.');
      const data = await response.json();
      onUpdate(data.user);
      setStatusType('success');
      setStatusMessage('Your profile and family records have been saved.');
    } catch {
      setStatusType('error');
      setStatusMessage('Unable to save profile. Please sign in again and retry.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProfile = async () => {
    setDeleting(true);
    setStatusMessage('');
    try {
      await onDeleteProfile();
      onClose();
    } catch {
      setStatusType('error');
      setStatusMessage('Unable to delete the profile. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  // Filter linked institutes
  const likedInstitutes = INDORE_INSTITUTES.filter(inst => shortlistedIds.includes(inst.id));
  const cartInstitutes = INDORE_INSTITUTES.filter(inst => cartIds.includes(inst.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 rounded-full p-3 text-white">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">{user.name}</h2>
              <p className="text-xs text-indigo-200 mt-0.5">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-100 text-sm font-medium bg-slate-50">
          <button
            onClick={() => setActiveSubTab('details')}
            className={`flex-1 py-3 text-center border-b-2 transition ${
              activeSubTab === 'details'
                ? 'border-red-600 text-red-600 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-100/50'
            }`}
          >
            📋 Family & Admission Records
          </button>
          <button
            onClick={() => setActiveSubTab('history')}
            className={`flex-1 py-3 text-center border-b-2 transition ${
              activeSubTab === 'history'
                ? 'border-red-600 text-red-600 font-bold bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-100/50'
            }`}
          >
            ⏳ My Counseling & Likes History
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 max-h-[60vh] space-y-6">
          {activeSubTab === 'details' ? (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {statusMessage && (
                <div className={`p-3.5 rounded-xl text-xs font-bold leading-relaxed transition ${
                  statusType === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {statusType === 'success' ? '✓' : '✗'} {statusMessage}
                </div>
              )}
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
                
                {/* Personal name */}
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">Student/Parent Primary Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

                {/* Father details */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Father's Name</label>
                  <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="Father's Full Name"
                    className="w-full px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Father's Email Address</label>
                  <input
                    type="email"
                    value={fatherEmail}
                    onChange={(e) => setFatherEmail(e.target.value)}
                    placeholder="father@example.com"
                    className="w-full px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

                {/* Mother details */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Mother's Name</label>
                  <input
                    type="text"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    placeholder="Mother's Full Name"
                    className="w-full px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Mother's Email Address</label>
                  <input
                    type="email"
                    value={motherEmail}
                    onChange={(e) => setMotherEmail(e.target.value)}
                    placeholder="mother@example.com"
                    className="w-full px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

                {/* Child details */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Child's Name / Applicant Name</label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Full name of applicant"
                    className="w-full px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Child's Mother Tongue</label>
                  <input
                    type="text"
                    value={childMotherTongue}
                    onChange={(e) => setChildMotherTongue(e.target.value)}
                    placeholder="e.g. Hindi, English, Marathi, Sindhi"
                    className="w-full px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">Residential Address (Indore / MP)</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter complete house address details"
                    className="w-full px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Pincode</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 452001"
                    className="w-full px-3.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

              </div>

              {/* Action Ribbon */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition flex items-center space-x-2 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>Save Family Records</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              {/* Counseling booking slots */}
              <div>
                <h4 className="text-sm font-bold text-slate-950 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
                  <Calendar className="h-4 w-4 text-red-600" />
                  <span>Scheduled Counseling Sessions ({historyData.counseling.length})</span>
                </h4>
                {historyLoading ? (
                  <p className="text-xs text-slate-500 py-2">Loading your counseling history...</p>
                ) : historyError ? (
                  <p className="text-xs text-amber-800 py-2">{historyError}</p>
                ) : historyData.counseling.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">No counseling sessions found.</p>
                ) : (
                  <div className="space-y-2">
                    {historyData.counseling.map(request => (
                      <div key={request.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1">
                        <p className="font-bold text-slate-900">{request.studentClassOrDegree} Counseling Request</p>
                        <p className="text-slate-600"><strong>Date & Slot:</strong> {request.date} | {request.preferredSlot}</p>
                        {request.query && <p className="text-slate-500">{request.query}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-950 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
                  <Mail className="h-4 w-4 text-indigo-600" />
                  <span>Callback Requests ({historyData.callbacks.length})</span>
                </h4>
                {!historyLoading && !historyError && historyData.callbacks.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">No callback requests found.</p>
                ) : (
                  <div className="space-y-2">
                    {historyData.callbacks.map(request => {
                      const matched = INDORE_INSTITUTES.find(inst => inst.id === request.instituteId);
                      return (
                        <div key={request.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                          <p className="font-bold text-slate-900">{matched?.name || 'General admission query'}</p>
                          <p className="text-slate-500">Phone: {request.phone}</p>
                          <p className="text-slate-400">{new Date(request.createdAt).toLocaleDateString()}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Shortlisted Colleges */}
              <div>
                <h4 className="text-sm font-bold text-slate-950 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Liked Colleges ({likedInstitutes.length})</span>
                </h4>
                {likedInstitutes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">No shortlisted colleges in Indore.</p>
                ) : (
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                    {likedInstitutes.map((inst, i) => (
                      <div key={i} className="p-3 border border-slate-100 bg-white shadow-sm rounded-xl text-xs">
                        <p className="font-bold text-slate-900 truncate">{inst.name}</p>
                        <p className="text-slate-500">{inst.location}, Indore</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Basket Admissions */}
              <div>
                <h4 className="text-sm font-bold text-slate-950 flex items-center space-x-2 border-b border-slate-100 pb-2 mb-3">
                  <ShoppingBag className="h-4 w-4 text-emerald-600" />
                  <span>Admission Basket ({cartInstitutes.length})</span>
                </h4>
                {cartInstitutes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">Your Admissions basket is empty.</p>
                ) : (
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                    {cartInstitutes.map((inst, i) => (
                      <div key={i} className="p-3 border border-slate-100 bg-white shadow-sm rounded-xl text-xs">
                        <p className="font-bold text-slate-900 truncate">{inst.name}</p>
                        <p className="text-slate-500">{inst.category} | Fee: ₹{inst.feePerAnnum.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            {!showConfirmDelete ? (
              <button
                type="button"
                onClick={() => setShowConfirmDelete(true)}
                className="text-red-600 hover:text-red-500 text-xs font-semibold flex items-center space-x-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Account Profile</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-red-600 font-bold">Delete this account and profile?</span>
                <button
                  onClick={handleDeleteProfile}
                  disabled={deleting}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[11px] font-bold"
                >
                  {deleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[11px]"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onLogout}
              className="flex-1 sm:flex-initial px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
