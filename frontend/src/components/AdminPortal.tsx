import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { 
  ShieldAlert, 
  Lock, 
  Mail, 
  User, 
  Building, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Clock3, 
  Users, 
  Layers, 
  FileText, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Search,
  Check,
  X,
  Trash2,
  ArrowRight,
  Edit3,
  AlertCircle,
  Sparkles,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CollegeUpdateRequest, SchoolRegistrationRequest } from '../types';

interface PartnerRequest {
  id: string;
  name: string;
  category: string;
  boardOrAffiliation: string;
  location: string;
  feePerAnnum: number;
  establishedYear: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  facilities: string[];
  website?: string;
  address?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function AdminPortal() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Dashboard Sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<'requests' | 'updates' | 'direct-apply' | 'counseling' | 'callbacks' | 'users'>('updates');

  // Dashboard Lists
  const [partners, setPartners] = useState<PartnerRequest[]>([]);
  const [updateRequests, setUpdateRequests] = useState<CollegeUpdateRequest[]>([]);
  const [directApplications, setDirectApplications] = useState<SchoolRegistrationRequest[]>([]);
  const [counselingLeads, setCounselingLeads] = useState<any[]>([]);
  const [callbackLeads, setCallbackLeads] = useState<any[]>([]);
  const [userProfiles, setUserProfiles] = useState<any[]>([]);

  // Update requests filters & modal state
  const [updateFilter, setUpdateFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [rejectModalId, setRejectModalId] = useState<string | null>(null);
  const [rejectionRemark, setRejectionRemark] = useState('');
  const [actionProcessingId, setActionProcessingId] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  const adminApiFetch = (input: RequestInfo | URL, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);
    const token = localStorage.getItem('admin_token');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetch(input, { ...init, headers });
  };

  // Restore only sessions that the server still recognizes.
  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
    if (!adminToken) return;

    adminApiFetch('/api/admin/session')
      .then((res) => {
        if (res.ok) {
          setIsAdminLoggedIn(true);
          return;
        }
        if (res.status === 401) localStorage.removeItem('admin_token');
        throw new Error('Your admin session has expired. Please log in again.');
      })
      .catch((err) => setErrorMsg(err instanceof Error ? err.message : 'Unable to verify admin session.'));
  }, []);

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchAdminData();
    }
  }, [isAdminLoggedIn]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [resPartners, resUpdates, resDirectApply, resCounseling, resCallbacks, resUsers] = await Promise.all([
        adminApiFetch('/api/admin/all-registrations'),
        adminApiFetch('/api/admin/update-requests'),
        adminApiFetch('/api/admin/direct-applications'),
        adminApiFetch('/api/admin/counseling-leads'),
        adminApiFetch('/api/admin/callback-leads'),
        adminApiFetch('/api/admin/user-profiles')
      ]);

      const responses = [resPartners, resUpdates, resDirectApply, resCounseling, resCallbacks, resUsers];
      const data = await Promise.all(responses.map(async (response) => {
        if (!response.ok) throw new Error(`Admin data request failed (${response.status}).`);
        const records: unknown = await response.json();
        if (!Array.isArray(records)) throw new Error('Admin data response was not a list.');
        return records;
      }));

      setPartners(data[0]);
      setUpdateRequests(data[1]);
      setDirectApplications(data[2]);
      setCounselingLeads(data[3]);
      setCallbackLeads(data[4]);
      setUserProfiles(data[5]);

    } catch (err) {
      console.error("Failed to fetch admin dashboard records:", err);
      setErrorMsg(err instanceof Error ? err.message : 'Failed to load administrative records.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials.');
      }
      if (typeof data.token !== 'string' || !data.token) {
        throw new Error('The server did not issue an admin session.');
      }

      localStorage.setItem('admin_token', data.token);
      setIsAdminLoggedIn(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Authorization failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogout = () => {
    adminApiFetch('/api/admin/logout', { method: 'POST' })
      .catch((err) => console.error('Failed to close admin session:', err));
    localStorage.removeItem('admin_token');
    setIsAdminLoggedIn(false);
    setAdminEmail('');
    setAdminPassword('');
  };

  const handleDeleteRecord = async (
    resource: 'registrations' | 'direct-applications' | 'counseling-leads' | 'callback-leads' | 'user-profiles',
    id: string,
    label: string
  ) => {
    if (!window.confirm(`Delete ${label}? This action cannot be undone.`)) return;

    setErrorMsg('');
    setSuccessMsg('');
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) throw new Error('Your admin session has expired. Please log in again.');

      const res = await adminApiFetch(`/api/admin/${resource}/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('admin_token');
          setIsAdminLoggedIn(false);
        }
        throw new Error(data.error || `Failed to delete ${label}.`);
      }

      if (resource === 'registrations') setPartners(prev => prev.filter(item => item.id !== id));
      if (resource === 'direct-applications') setDirectApplications(prev => prev.filter(item => item.id !== id));
      if (resource === 'counseling-leads') setCounselingLeads(prev => prev.filter(item => item.id !== id));
      if (resource === 'callback-leads') setCallbackLeads(prev => prev.filter(item => item.id !== id));
      if (resource === 'user-profiles') setUserProfiles(prev => prev.filter(item => item.email !== id));

      setSuccessMsg(`${label} deleted successfully.`);
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : `Failed to delete ${label}.`);
    }
  };

  const renderDeleteButton = (
    resource: 'registrations' | 'direct-applications' | 'counseling-leads' | 'callback-leads' | 'user-profiles',
    id: string,
    label: string
  ) => (
    <button
      type="button"
      onClick={() => handleDeleteRecord(resource, id, label)}
      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 px-2.5 py-1.5 text-[10px] font-bold text-rose-700 transition hover:bg-rose-50"
      aria-label={`Delete ${label}`}
      title={`Delete ${label}`}
    >
      <Trash2 className="h-3 w-3" />
      <span>Delete</span>
    </button>
  );

  const handleUpdatePartnerStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await adminApiFetch(`/api/admin/registration-status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update partner status.');
      }

      setPartners((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );

      setSuccessMsg(`College status successfully updated to "${status.toUpperCase()}". ${status === 'approved' ? 'The college representative has been sent an acceptance confirmation email.' : ''}`);
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error executing admin decision.');
    }
  };

  // Moderation: Approve and Publish College Update
  const handleApproveUpdateRequest = async (requestId: string) => {
    setErrorMsg('');
    setSuccessMsg('');
    setActionProcessingId(requestId);
    try {
      const res = await adminApiFetch(`/api/admin/update-requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'approve',
          adminRemarks: 'Approved and published live by Indore Colleges Administrator.'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to approve update request.');
      }

      setUpdateRequests(prev => 
        prev.map(req => req.id === requestId ? { 
          ...req, 
          status: 'approved', 
          reviewedAt: new Date().toISOString(), 
          adminRemarks: 'Approved and published live by Indore Colleges Administrator.' 
        } : req)
      );

      // Re-fetch all partners to reflect live updates
      const refreshedPartners = await adminApiFetch('/api/admin/all-registrations');
      const partnersData = await refreshedPartners.json();
      if (Array.isArray(partnersData)) setPartners(partnersData);

      setSuccessMsg(`✅ ${data.message || 'College update approved! The new information is now published live on the directory.'}`);
      setTimeout(() => setSuccessMsg(''), 6000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error approving update request.');
    } finally {
      setActionProcessingId(null);
    }
  };

  // Moderation: Reject College Update
  const handleRejectUpdateRequest = async (requestId: string) => {
    setErrorMsg('');
    setSuccessMsg('');
    setActionProcessingId(requestId);
    try {
      const res = await adminApiFetch(`/api/admin/update-requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'reject',
          adminRemarks: rejectionRemark.trim() || 'Request rejected after administrative review.'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to reject update request.');
      }

      setUpdateRequests(prev => 
        prev.map(req => req.id === requestId ? { 
          ...req, 
          status: 'rejected', 
          reviewedAt: new Date().toISOString(), 
          adminRemarks: rejectionRemark.trim() || 'Request rejected after administrative review.' 
        } : req)
      );

      setRejectModalId(null);
      setRejectionRemark('');

      setSuccessMsg(`College update request marked as rejected. No changes were applied to the live portal.`);
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error rejecting update request.');
    } finally {
      setActionProcessingId(null);
    }
  };

  const filteredPartners = partners.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUpdateRequests = updateRequests.filter(req => {
    const matchesFilter = updateFilter === 'all' || req.status === updateFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      req.collegeName.toLowerCase().includes(q) ||
      req.contactEmail.toLowerCase().includes(q) ||
      req.contactName.toLowerCase().includes(q) ||
      (req.updateNotes || '').toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const pendingUpdatesCount = updateRequests.filter(r => r.status === 'pending').length;

  const filteredDirectApplications = directApplications.filter(app => {
    const q = searchQuery.toLowerCase();
    return (
      (app.contactName || '').toLowerCase().includes(q) ||
      (app.contactEmail || '').toLowerCase().includes(q) ||
      (app.contactPhone || '').toLowerCase().includes(q) ||
      (app.name || '').toLowerCase().includes(q) ||
      (app.course || app.category || '').toLowerCase().includes(q) ||
      (app.branch || '').toLowerCase().includes(q) ||
      (app.location || '').toLowerCase().includes(q) ||
      (Array.isArray(app.targetColleges) && app.targetColleges.some(c => c.toLowerCase().includes(q)))
    );
  });

  const filteredCounseling = counselingLeads.filter(c => 
    c.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.studentClassOrDegree.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCallbacks = callbackLeads.filter(cb => 
    cb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cb.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cb.instituteId || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = userProfiles.filter(u => {
    const searchableDetails = [
      u.name,
      u.email,
      u.phone,
      u.courseInterested,
      u.twelfthSubject,
      u.address,
      u.fatherName,
      u.fatherEmail,
      u.motherName,
      u.motherEmail,
      u.childName,
      u.childMotherTongue,
    ];
    return searchableDetails.some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Login State */}
      {!isAdminLoggedIn ? (
        <div className="max-w-md mx-auto bg-white border border-slate-100 shadow-sm p-8 rounded-2xl">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Logo size="md" />
            </div>
            <div className="bg-rose-50 text-red-600 rounded-full p-3 border border-rose-100 inline-block">
              <ShieldAlert className="h-8 w-8 shrink-0" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-3">Authorized Admin Login</h1>
            <p className="text-xs text-slate-400 mt-1">Please authenticate with right credentials to access student enquiries, callback lists, and pending college partner requests.</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@indorecolleges.org"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authorizing Access...' : 'Authenticate & Unlock Dashboard'}
            </button>
          </form>
        </div>
      ) : (
        // LOGGED IN ADMIN DASHBOARD
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 rounded-2xl shadow-sm text-white">
            <div className="flex items-center gap-4">
              <Logo light size="sm" />
              <div className="h-8 w-px bg-slate-700 hidden sm:block" />
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold flex items-center gap-2 text-white">
                  <span>Central Admin Control Board</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">Manage partner college approval requests, admissions counseling requests, and active callbacks.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchAdminData}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Refresh Data
              </button>
              <button
                onClick={handleAdminLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Alert messages */}
          <AnimatePresence>
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2"
              >
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                <span className="font-medium">{successMsg}</span>
              </motion.div>
            )}

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2"
              >
                <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                <span className="font-medium">{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SUMMARY STATISTICS BENTO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Stat 1: Partner Registrations */}
            <div className="bg-white p-4 border border-slate-100 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-red-50 rounded-xl text-red-600">
                <Building className="h-5 w-5 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Partner Colleges</p>
                <p className="text-lg font-black text-slate-900">{partners.length}</p>
                <p className="text-[9px] text-amber-600 font-bold uppercase mt-0.5">{partners.filter(p=>p.status==='pending').length} Pending Reg</p>
              </div>
            </div>

            {/* Stat 2: College Update Requests (New Moderation Queue) */}
            <div className={`p-4 border rounded-2xl flex items-center gap-3 transition ${pendingUpdatesCount > 0 ? 'bg-amber-50/40 border-amber-200' : 'bg-white border-slate-100'}`}>
              <div className={`p-2.5 rounded-xl ${pendingUpdatesCount > 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                <Edit3 className="h-5 w-5 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Update Requests</p>
                <p className="text-lg font-black text-slate-900">{updateRequests.length}</p>
                <p className={`text-[9px] font-bold uppercase mt-0.5 ${pendingUpdatesCount > 0 ? 'text-amber-700 animate-pulse' : 'text-slate-500'}`}>
                  {pendingUpdatesCount > 0 ? `⚡ ${pendingUpdatesCount} Awaiting Approval` : 'All Reviewed'}
                </p>
              </div>
            </div>

            {/* Stat 3: Direct Apply Submissions */}
            <div className="bg-white p-4 border border-slate-100 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-orange-50 rounded-xl text-[#FA6E00]">
                <Layers className="h-5 w-5 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Direct Apply</p>
                <p className="text-lg font-black text-slate-900">{directApplications.length}</p>
                <p className="text-[9px] text-[#FA6E00] font-bold">Student Apps</p>
              </div>
            </div>

            {/* Stat 4: Counselling Leads */}
            <div className="bg-white p-4 border border-slate-100 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                <FileText className="h-5 w-5 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Counselling Leads</p>
                <p className="text-lg font-black text-slate-900">{counselingLeads.length}</p>
                <p className="text-[9px] text-slate-500 font-medium">Student Inquiries</p>
              </div>
            </div>

            {/* Stat 5: Callback Inquiries */}
            <div className="bg-white p-4 border border-slate-100 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                <Phone className="h-5 w-5 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Callback Requests</p>
                <p className="text-lg font-black text-slate-900">{callbackLeads.length}</p>
                <p className="text-[9px] text-emerald-600 font-bold">Inbound Alerts</p>
              </div>
            </div>

            {/* Stat 6: Platform Users */}
            <div className="bg-white p-4 border border-slate-100 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                <Users className="h-5 w-5 shrink-0" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Platform Users</p>
                <p className="text-lg font-black text-slate-900">{userProfiles.length}</p>
                <p className="text-[9px] text-slate-500 font-medium">Active Students</p>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs & SEARCH BAR */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Tabs */}
            <div className="flex overflow-x-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => { setActiveSubTab('updates'); setSearchQuery(''); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'updates' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Edit3 className="h-4 w-4" />
                <span>Update Requests</span>
                {pendingUpdatesCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-black">
                    {pendingUpdatesCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => { setActiveSubTab('direct-apply'); setSearchQuery(''); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'direct-apply' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Layers className="h-4 w-4" />
                <span>Direct Applications</span>
                {directApplications.length > 0 && (
                  <span className="px-1.5 py-0.2 bg-orange-500 text-white rounded-full text-[10px] font-black">
                    {directApplications.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => { setActiveSubTab('requests'); setSearchQuery(''); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'requests' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Building className="h-4 w-4" />
                <span>Partner Approvals</span>
              </button>
              <button
                onClick={() => { setActiveSubTab('counseling'); setSearchQuery(''); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'counseling' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <FileText className="h-4 w-4" />
                <span>Counselling Leads</span>
              </button>
              <button
                onClick={() => { setActiveSubTab('callbacks'); setSearchQuery(''); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'callbacks' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Phone className="h-4 w-4" />
                <span>Callback Alerts</span>
              </button>
              <button
                onClick={() => { setActiveSubTab('users');  setSearchQuery(''); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'users' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Users className="h-4 w-4" />
                <span>Users Directory</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeSubTab === 'updates' ? 'update requests...' : activeSubTab === 'direct-apply' ? 'applications...' : activeSubTab === 'requests' ? 'colleges...' : activeSubTab === 'counseling' ? 'leads...' : activeSubTab === 'callbacks' ? 'callbacks...' : 'users...'}`}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>
          </div>

          {/* MAIN TABLES CONTAINER */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400 text-xs">
                <span className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mb-3" />
                <span>Retrieving administrative records...</span>
              </div>
            ) : (
              <div>
                
                {/* 0. COLLEGE UPDATE REQUESTS (MODERATION WORKFLOW) */}
                {activeSubTab === 'updates' && (
                  <div className="p-4 sm:p-6 space-y-6">
                    {/* Header banner */}
                    <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 bg-red-100 text-red-600 rounded-lg">
                            <Edit3 className="h-4 w-4" />
                          </span>
                          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                            College Information Update Approval Workflow
                          </h2>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                          When colleges revise tuition fees, add new facilities, or update their campus credentials, the changes are placed in this moderation queue. Review the exact differences below. Once approved, the changes are published live immediately across Indore Colleges.
                        </p>
                      </div>

                      {/* Status filter pills */}
                      <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs shrink-0">
                        <button
                          onClick={() => setUpdateFilter('all')}
                          className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${updateFilter === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                          All ({updateRequests.length})
                        </button>
                        <button
                          onClick={() => setUpdateFilter('pending')}
                          className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${updateFilter === 'pending' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-700 hover:bg-amber-50'}`}
                        >
                          <span>Pending</span>
                          <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded-full text-[10px] font-black">
                            {updateRequests.filter(r => r.status === 'pending').length}
                          </span>
                        </button>
                        <button
                          onClick={() => setUpdateFilter('approved')}
                          className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${updateFilter === 'approved' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-50'}`}
                        >
                          Published ({updateRequests.filter(r => r.status === 'approved').length})
                        </button>
                        <button
                          onClick={() => setUpdateFilter('rejected')}
                          className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${updateFilter === 'rejected' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700 hover:bg-rose-50'}`}
                        >
                          Rejected ({updateRequests.filter(r => r.status === 'rejected').length})
                        </button>
                      </div>
                    </div>

                    {/* Update requests list */}
                    {filteredUpdateRequests.length === 0 ? (
                      <div className="text-center py-16 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                        <AlertCircle className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-600">No college update requests found</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {updateFilter !== 'all' ? `No update requests with status "${updateFilter}". Try switching to 'All'.` : 'Colleges have not submitted any pending profile modifications.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {filteredUpdateRequests.map((req) => {
                          const changes = req.requestedChanges || {};
                          const current = req.currentData || {};
                          const isProcessing = actionProcessingId === req.id;

                          return (
                            <div 
                              key={req.id} 
                              className={`rounded-2xl border transition-all p-5 shadow-xs ${
                                req.status === 'pending' 
                                  ? 'bg-white border-amber-200 hover:border-amber-300 ring-1 ring-amber-100' 
                                  : req.status === 'approved'
                                  ? 'bg-white border-emerald-100 hover:border-emerald-200'
                                  : 'bg-white border-rose-100'
                              }`}
                            >
                              {/* Header & Status */}
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3.5">
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                                      {req.collegeName}
                                    </h3>
                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                                      ID: {req.id}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                                    <Clock3 className="h-3 w-3" />
                                    <span>Submitted on {new Date(req.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                  </p>
                                </div>

                                <div className="shrink-0">
                                  {req.status === 'pending' ? (
                                    <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200 flex items-center gap-1.5 animate-pulse">
                                      <Clock3 className="h-3.5 w-3.5 text-amber-600" />
                                      <span>Pending Admin Approval</span>
                                    </span>
                                  ) : req.status === 'approved' ? (
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                                      <span>Approved & Published Live</span>
                                    </span>
                                  ) : (
                                    <span className="px-3 py-1 bg-rose-50 text-rose-800 rounded-full text-xs font-bold border border-rose-200 flex items-center gap-1.5">
                                      <XCircle className="h-3.5 w-3.5 text-rose-600" />
                                      <span>Rejected</span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Representative Details & Justification Notes */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3.5 border-b border-slate-100 text-xs">
                                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Submitted By Representative</p>
                                  <p className="font-bold text-slate-800">{req.contactName || 'Authorized Officer'}</p>
                                  <p className="text-[11px] text-slate-500 mt-0.5">
                                    <a href={`mailto:${req.contactEmail}`} className="text-red-600 hover:underline">{req.contactEmail}</a>
                                  </p>
                                  {req.contactPhone && (
                                    <p className="text-[11px] text-slate-500">
                                      <a href={`tel:${req.contactPhone}`} className="text-slate-600 hover:underline">{req.contactPhone}</a>
                                    </p>
                                  )}
                                </div>

                                <div className="md:col-span-2 bg-amber-50/40 p-3 rounded-xl border border-amber-100/70">
                                  <p className="text-[9px] font-bold text-amber-800 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                    <Sparkles className="h-3 w-3 text-amber-600" />
                                    <span>College Justification / Update Notes</span>
                                  </p>
                                  <p className="text-xs text-amber-950 italic leading-relaxed">
                                    "{req.updateNotes || 'College profile updated via partner administrative portal.'}"
                                  </p>
                                </div>
                              </div>

                              {/* COMPARISON / DIFF OF PROPOSED CHANGES */}
                              <div className="py-4">
                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                  <span>Proposed Changes vs. Currently Published Information</span>
                                </h4>

                                <div className="grid grid-cols-1 gap-3">
                                  {/* Fee Comparison */}
                                  {changes.feePerAnnum !== undefined && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Annual Tuition Fee</span>
                                      <div className="flex items-center gap-3 sm:w-3/4 flex-wrap">
                                        <div className="text-slate-400 line-through font-mono">
                                          ₹{Number(current.feePerAnnum || 0).toLocaleString('en-IN')}
                                        </div>
                                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                                        <div className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold font-mono text-xs">
                                          ₹{Number(changes.feePerAnnum).toLocaleString('en-IN')} (New Fee)
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Stream / Category Comparison */}
                                  {changes.category && changes.category !== current.category && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Category / Stream</span>
                                      <div className="flex items-center gap-3 sm:w-3/4 flex-wrap">
                                        <span className="text-slate-400 line-through">{current.category || 'N/A'}</span>
                                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold">{changes.category}</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Affiliation / Board */}
                                  {changes.boardOrAffiliation && changes.boardOrAffiliation !== current.boardOrAffiliation && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Affiliation / Board</span>
                                      <div className="flex items-center gap-3 sm:w-3/4 flex-wrap">
                                        <span className="text-slate-400 line-through">{current.boardOrAffiliation || 'N/A'}</span>
                                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold">{changes.boardOrAffiliation}</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Location Sector */}
                                  {changes.location && changes.location !== current.location && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Campus Sector</span>
                                      <div className="flex items-center gap-3 sm:w-3/4 flex-wrap">
                                        <span className="text-slate-400 line-through">{current.location || 'N/A'}</span>
                                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold">{changes.location}</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Established Year */}
                                  {changes.establishedYear && changes.establishedYear !== current.establishedYear && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Established Year</span>
                                      <div className="flex items-center gap-3 sm:w-3/4 flex-wrap">
                                        <span className="text-slate-400 line-through">{current.establishedYear || 'N/A'}</span>
                                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold">{changes.establishedYear}</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Annual Tuition Fee */}
                                  {changes.feePerAnnum !== undefined && changes.feePerAnnum !== current.feePerAnnum && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Annual Tuition Fee</span>
                                      <div className="flex items-center gap-3 sm:w-3/4 flex-wrap">
                                        <span className="text-slate-400 line-through font-mono">₹{Number(current.feePerAnnum || 0).toLocaleString('en-IN')}</span>
                                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold font-mono">₹{Number(changes.feePerAnnum).toLocaleString('en-IN')} / yr</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Website */}
                                  {changes.website && changes.website !== current.website && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">College Website</span>
                                      <div className="flex items-center gap-3 sm:w-3/4 flex-wrap">
                                        <span className="text-slate-400 line-through">{current.website || 'N/A'}</span>
                                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                                        <a href={changes.website} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold hover:underline flex items-center gap-1">
                                          <span>{changes.website}</span>
                                          <ExternalLink className="h-3 w-3" />
                                        </a>
                                      </div>
                                    </div>
                                  )}

                                  {/* Contact Phone */}
                                  {changes.contactPhone && changes.contactPhone !== current.contactPhone && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Contact Phone</span>
                                      <div className="flex items-center gap-3 sm:w-3/4 flex-wrap">
                                        <span className="text-slate-400 line-through">{current.contactPhone || 'N/A'}</span>
                                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold font-mono">{changes.contactPhone}</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Address */}
                                  {changes.address && changes.address !== current.address && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Campus Full Address</span>
                                      <div className="sm:w-3/4 space-y-1">
                                        <p className="text-slate-400 line-through text-[11px]">{current.address || 'N/A'}</p>
                                        <p className="p-2 bg-emerald-50 text-emerald-900 rounded-lg font-medium text-xs border border-emerald-100">{changes.address}</p>
                                      </div>
                                    </div>
                                  )}

                                  {/* Facilities */}
                                  {Array.isArray(changes.facilities) && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Campus Facilities</span>
                                      <div className="flex flex-wrap gap-1.5 sm:w-3/4">
                                        {changes.facilities.map((fac: string) => (
                                          <span key={fac} className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md text-[10px] font-bold border border-emerald-200">
                                            ✓ {fac}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Description / Vision Mission */}
                                  {changes.description && changes.description !== current.description && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4 pt-1">Vision & Mission</span>
                                      <div className="sm:w-3/4">
                                        <p className="p-2.5 bg-emerald-50/70 text-emerald-950 rounded-lg text-xs leading-relaxed border border-emerald-100/80">
                                          {changes.description}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {/* Courses Offered */}
                                  {Array.isArray(changes.courses) && changes.courses.length > 0 && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Courses Offered</span>
                                      <div className="flex flex-wrap gap-1.5 sm:w-3/4">
                                        {changes.courses.map((c: string) => (
                                          <span key={c} className="px-2 py-0.5 bg-orange-100 text-[#FA6E00] rounded-md text-[10px] font-bold border border-orange-200">
                                            {c}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Packages */}
                                  {(changes.highestPackage || changes.lowestPackage) && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Placement Packages</span>
                                      <div className="flex items-center gap-3 sm:w-3/4 flex-wrap">
                                        {changes.highestPackage && (
                                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md text-[11px] font-bold">
                                            Highest: {changes.highestPackage}
                                          </span>
                                        )}
                                        {changes.lowestPackage && (
                                          <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded-md text-[11px] font-bold">
                                            Lowest: {changes.lowestPackage}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Achievements */}
                                  {changes.achievements && changes.achievements !== current.achievements && (
                                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                                      <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] sm:w-1/4">Achievements</span>
                                      <div className="sm:w-3/4">
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold">{changes.achievements}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Action Buttons / Status Banners */}
                              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                                {req.status === 'pending' ? (
                                  <>
                                    <p className="text-[11px] text-slate-400">
                                      Approving will overwrite existing college data and <span className="font-bold text-slate-700">publish the changes live</span> to students.
                                    </p>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <button
                                        onClick={() => setRejectModalId(req.id)}
                                        disabled={isProcessing}
                                        className="px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                                      >
                                        <X className="h-3.5 w-3.5" />
                                        <span>Reject Request</span>
                                      </button>
                                      <button
                                        onClick={() => handleApproveUpdateRequest(req.id)}
                                        disabled={isProcessing}
                                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                                      >
                                        {isProcessing ? (
                                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                                        ) : (
                                          <Check className="h-3.5 w-3.5" />
                                        )}
                                        <span>Approve & Publish Live</span>
                                      </button>
                                    </div>
                                  </>
                                ) : req.status === 'approved' ? (
                                  <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 text-xs text-emerald-800">
                                    <span className="font-semibold flex items-center gap-1.5">
                                      <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                                      <span>Published Live! Changes are currently visible on the Indore Colleges directory.</span>
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <a
                                        href={`/college/${req.collegeId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold inline-flex items-center gap-1 shadow-2xs"
                                      >
                                        <span>View Live College</span>
                                        <ExternalLink className="h-3 w-3" />
                                      </a>
                                      {req.reviewedAt && (
                                        <span className="text-[10px] text-emerald-600 font-mono">
                                          {new Date(req.reviewedAt).toLocaleDateString()}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100 text-xs text-rose-800">
                                    <div>
                                      <span className="font-semibold">Rejected: </span>
                                      <span>{req.adminRemarks || 'Administrative review declined updates.'}</span>
                                    </div>
                                    <button
                                      onClick={() => handleApproveUpdateRequest(req.id)}
                                      disabled={isProcessing}
                                      className="px-3 py-1 bg-white border border-rose-200 hover:bg-rose-100 text-rose-800 text-[11px] font-bold rounded-lg transition cursor-pointer"
                                    >
                                      Re-Open & Approve
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
                
                {/* 1. COLLEGE PARTNERS DIRECTORY */}
                {activeSubTab === 'requests' && (
                  <div>
                    {filteredPartners.length === 0 ? (
                      <p className="p-8 text-center text-slate-400 italic text-xs">No college partner requests match search.</p>
                    ) : (
                      <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-600 border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="p-4">College Name</th>
                                <th className="p-4">Stream / Location</th>
                                <th className="p-4">Fees & Est</th>
                                <th className="p-4">Contact Person</th>
                                <th className="p-4">Status Badge</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPartners.map((item) => (
                                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/40">
                                  <td className="p-4 font-semibold text-slate-950">
                                    <p>{item.name}</p>
                                    {item.website && (
                                      <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-[10px] text-red-600 hover:underline flex items-center gap-0.5 mt-0.5">
                                        <span>Website</span>
                                        <ExternalLink className="h-2.5 w-2.5" />
                                      </a>
                                    )}
                                  </td>
                                  <td className="p-4">
                                    <p className="font-bold text-slate-800 text-[11px]">{item.boardOrAffiliation || item.category || 'Affiliated'}</p>
                                    <p className="text-[10px] text-slate-400">{item.location}</p>
                                    {Array.isArray(item.courses) && item.courses.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {item.courses.slice(0, 2).map((c: string) => (
                                          <span key={c} className="text-[9px] bg-orange-50 text-[#FA6E00] px-1.5 py-0.5 rounded border border-orange-100 font-semibold">{c}</span>
                                        ))}
                                        {item.courses.length > 2 && (
                                          <span className="text-[9px] text-slate-400">+{item.courses.length - 2}</span>
                                        )}
                                      </div>
                                    )}
                                  </td>
                                  <td className="p-4 font-mono text-[11px]">
                                    {item.highestPackage ? (
                                      <p className="font-bold text-emerald-700">Pkg: {item.highestPackage}</p>
                                    ) : (
                                      <p className="font-bold text-slate-800">₹{(item.feePerAnnum || 0).toLocaleString('en-IN')}</p>
                                    )}
                                    <p className="text-[10px] text-slate-400 font-sans">Est. {item.establishedYear}</p>
                                  </td>
                                  <td className="p-4">
                                    <p className="font-semibold text-slate-800">{item.contactName || item.name}</p>
                                    <p className="text-[10px] text-slate-400">{item.contactEmail}</p>
                                    <p className="text-[10px] text-slate-400">{item.contactPhone}</p>
                                  </td>
                                  <td className="p-4">
                                    {item.status === 'approved' ? (
                                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100">Approved</span>
                                    ) : item.status === 'rejected' ? (
                                      <span className="px-2 py-1 bg-rose-50 text-rose-700 rounded-full text-[10px] font-bold border border-rose-100">Rejected</span>
                                    ) : (
                                      <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100 animate-pulse">Pending Acceptance</span>
                                    )}
                                  </td>
                                  <td className="p-4 text-right">
                                    {item.status === 'pending' ? (
                                      <div className="flex justify-end gap-1.5">
                                        <button
                                          onClick={() => handleUpdatePartnerStatus(item.id, 'approved')}
                                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1"
                                          title="Approve College and add to dynamic list"
                                        >
                                          <Check className="h-3 w-3" />
                                          <span>Approve</span>
                                        </button>
                                        <button
                                          onClick={() => handleUpdatePartnerStatus(item.id, 'rejected')}
                                          className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold cursor-pointer flex items-center gap-1"
                                          title="Reject request"
                                        >
                                          <X className="h-3 w-3" />
                                          <span>Reject</span>
                                        </button>
                                        {renderDeleteButton('registrations', item.id, item.name)}
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-end gap-1.5">
                                        {item.status === 'approved' && (
                                          <a
                                            href={`/college/${item.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 border border-emerald-200 transition"
                                            title="View Live in Indore Colleges Directory"
                                          >
                                            <span>View Live</span>
                                            <ExternalLink className="h-3 w-3" />
                                          </a>
                                        )}
                                        <button
                                          onClick={() => handleUpdatePartnerStatus(item.id, 'pending')}
                                          className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold cursor-pointer"
                                        >
                                          Reset
                                        </button>
                                        {renderDeleteButton('registrations', item.id, item.name)}
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="block md:hidden space-y-4 p-4 bg-slate-50/50">
                          {filteredPartners.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3">
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h3>
                                  {item.website && (
                                    <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-[10px] text-red-600 font-semibold hover:underline inline-flex items-center gap-0.5 mt-0.5">
                                      <span>Visit Website</span>
                                      <ExternalLink className="h-2.5 w-2.5" />
                                    </a>
                                  )}
                                </div>
                                <div className="shrink-0">
                                  {item.status === 'approved' ? (
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100">Approved</span>
                                  ) : item.status === 'rejected' ? (
                                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full text-[10px] font-bold border border-rose-100">Rejected</span>
                                  ) : (
                                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold border border-amber-100 animate-pulse">Pending</span>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-50">
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Category / Stream</span>
                                  <span className="text-slate-800 font-semibold">{item.category}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Indore Sector</span>
                                  <span className="text-slate-800 font-medium">{item.location}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Est. Year</span>
                                  <span className="text-slate-800 font-medium">{item.establishedYear}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Annual Fees</span>
                                  <span className="text-rose-600 font-mono font-bold">₹{item.feePerAnnum.toLocaleString('en-IN')}</span>
                                </div>
                              </div>

                              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] space-y-1">
                                <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">In-Charge Representative</p>
                                <p className="text-slate-900 font-semibold">{item.contactName}</p>
                                <p className="text-slate-600">Email: <a href={`mailto:${item.contactEmail}`} className="text-red-600 font-medium hover:underline">{item.contactEmail}</a></p>
                                <p className="text-slate-600">Phone: <a href={`tel:${item.contactPhone}`} className="text-red-600 font-medium hover:underline">{item.contactPhone}</a></p>
                              </div>

                              <div className="pt-2 border-t border-slate-100 flex gap-2">
                                {item.status === 'pending' ? (
                                  <>
                                    <button
                                      onClick={() => handleUpdatePartnerStatus(item.id, 'approved')}
                                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2 text-xs font-bold transition flex items-center justify-center gap-1"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                      <span>Approve</span>
                                    </button>
                                    <button
                                      onClick={() => handleUpdatePartnerStatus(item.id, 'rejected')}
                                      className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl py-2 text-xs font-bold transition flex items-center justify-center gap-1"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                      <span>Reject</span>
                                    </button>
                                  </>
                                ) : (
                                  <div className="flex gap-2 w-full">
                                    {item.status === 'approved' && (
                                      <a
                                        href={`/college/${item.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl py-2 text-xs font-bold transition flex items-center justify-center gap-1"
                                      >
                                        <span>View Live</span>
                                        <ExternalLink className="h-3.5 w-3.5" />
                                      </a>
                                    )}
                                    <button
                                      onClick={() => handleUpdatePartnerStatus(item.id, 'pending')}
                                      className={`${item.status === 'approved' ? 'px-4' : 'w-full'} bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl py-2 text-xs font-bold transition`}
                                    >
                                      Reset
                                    </button>
                                  </div>
                                )}
                              </div>
                              {renderDeleteButton('registrations', item.id, item.name)}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 1b. DIRECT APPLY STUDENT APPLICATIONS */}
                {activeSubTab === 'direct-apply' && (
                  <div>
                    {filteredDirectApplications.length === 0 ? (
                      <p className="p-8 text-center text-slate-400 italic text-xs">No direct apply applications match search.</p>
                    ) : (
                      <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-600 border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="p-4">Student Info</th>
                                <th className="p-4">Course &amp; Branch</th>
                                <th className="p-4">Location &amp; Budget</th>
                                <th className="p-4">Targeted Colleges</th>
                                <th className="p-4">Submitted</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredDirectApplications.map((item) => {
                                const collegeList = Array.isArray(item.targetColleges) && item.targetColleges.length > 0
                                  ? item.targetColleges
                                  : item.name.split(',').map(s => s.trim()).filter(Boolean);
                                return (
                                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                    <td className="p-4">
                                      <p className="font-bold text-slate-900">{item.contactName || 'Student'}</p>
                                      <p className="text-[10px] text-slate-500 font-mono">{item.contactEmail}</p>
                                      <p className="text-[10px] font-bold text-red-600">{item.contactPhone}</p>
                                    </td>
                                    <td className="p-4">
                                      <p className="font-bold text-slate-800">{item.course || item.category}</p>
                                      {item.branch && (
                                        <p className="text-[10px] text-slate-500 mt-0.5">Branch: {item.branch}</p>
                                      )}
                                    </td>
                                    <td className="p-4">
                                      <p className="font-medium text-slate-800">{item.location}</p>
                                      <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                                        {item.budget || (item.feePerAnnum ? `₹${item.feePerAnnum.toLocaleString('en-IN')}/yr` : 'Any Budget')}
                                      </p>
                                    </td>
                                    <td className="p-4 max-w-xs">
                                      <div className="flex flex-wrap gap-1">
                                        {collegeList.map((colName) => (
                                          <span
                                            key={colName}
                                            className="inline-block rounded-md border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-800"
                                          >
                                            {colName}
                                          </span>
                                        ))}
                                      </div>
                                    </td>
                                    <td className="p-4 text-slate-400 text-[10px]">
                                      {new Date(item.createdAt).toLocaleString()}
                                    </td>
                                    <td className="p-4 text-right">
                                      {renderDeleteButton('direct-applications', item.id, `direct application from ${item.contactName || item.contactEmail}`)}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="block md:hidden space-y-4 p-4 bg-slate-50/50">
                          {filteredDirectApplications.map((item) => {
                            const collegeList = Array.isArray(item.targetColleges) && item.targetColleges.length > 0
                              ? item.targetColleges
                              : item.name.split(',').map(s => s.trim()).filter(Boolean);
                            return (
                              <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3">
                                <div className="flex justify-between items-start gap-2">
                                  <div>
                                    <h3 className="font-bold text-slate-900 text-sm">{item.contactName || 'Student'}</h3>
                                    <p className="text-[10px] text-slate-500 font-mono">{item.contactEmail}</p>
                                    <p className="text-[11px] font-bold text-red-600 mt-0.5">{item.contactPhone}</p>
                                  </div>
                                  <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-[9px] font-bold border border-orange-200 shrink-0">
                                    Direct Apply
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-50">
                                  <div>
                                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Course</span>
                                    <span className="text-slate-800 font-semibold">{item.course || item.category}</span>
                                  </div>
                                  <div>
                                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Branch</span>
                                    <span className="text-slate-800 font-medium">{item.branch || 'N/A'}</span>
                                  </div>
                                  <div>
                                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Location</span>
                                    <span className="text-slate-800 font-medium">{item.location}</span>
                                  </div>
                                  <div>
                                    <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Budget</span>
                                    <span className="text-emerald-700 font-bold">{item.budget || 'Any'}</span>
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-slate-50">
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block mb-1.5">
                                    Targeted Colleges ({collegeList.length})
                                  </span>
                                  <div className="flex flex-wrap gap-1">
                                    {collegeList.map((colName) => (
                                      <span key={colName} className="rounded-md border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-800">
                                        {colName}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-50 flex justify-between items-center">
                                  <span>Submitted:</span>
                                  <span className="font-mono">{new Date(item.createdAt).toLocaleString()}</span>
                                </div>
                                {renderDeleteButton('direct-applications', item.id, `direct application from ${item.contactName || item.contactEmail}`)}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 2. STUDENT COUNSELING REQUESTS */}
                {activeSubTab === 'counseling' && (
                  <div>
                    {filteredCounseling.length === 0 ? (
                      <p className="p-8 text-center text-slate-400 italic text-xs">No counselling requests match search.</p>
                    ) : (
                      <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-600 border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="p-4">Parent & Student</th>
                                <th className="p-4">Course Level</th>
                                <th className="p-4">Contact Info</th>
                                <th className="p-4">Date & Slot Preferred</th>
                                <th className="p-4">Queries / Message</th>
                                <th className="p-4">Created Time</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredCounseling.map((item: any) => (
                                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/40">
                                  <td className="p-4">
                                    <p className="font-bold text-slate-900">{item.parentName}</p>
                                    <p className="text-[10px] text-slate-400">Student: {item.studentName || 'N/A'}</p>
                                  </td>
                                  <td className="p-4">
                                    <span className="px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded text-[10px]">
                                      {item.studentClassOrDegree}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <p className="font-semibold text-slate-800">{item.phone}</p>
                                    <p className="text-[10px] text-slate-400">{item.email}</p>
                                  </td>
                                  <td className="p-4">
                                    <p className="font-semibold text-slate-800">{item.date}</p>
                                    <p className="text-[10px] text-slate-400">{item.preferredSlot}</p>
                                  </td>
                                  <td className="p-4 max-w-xs">
                                    <p className="text-slate-600 text-[11px] leading-normal">{item.query || 'None specified.'}</p>
                                  </td>
                                  <td className="p-4 text-slate-400 text-[10px]">
                                    {new Date(item.createdAt).toLocaleString()}
                                  </td>
                                  <td className="p-4 text-right">
                                    {renderDeleteButton('counseling-leads', item.id, 'this counselling lead')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="block md:hidden space-y-4 p-4 bg-slate-50/50">
                          {filteredCounseling.map((item: any) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3">
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <h3 className="font-bold text-slate-900 text-sm">{item.parentName}</h3>
                                  <p className="text-[10px] text-slate-500 mt-0.5">Student Name: <span className="font-semibold text-slate-800">{item.studentName || 'N/A'}</span></p>
                                </div>
                                <span className="px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded text-[9px] border border-red-100 whitespace-nowrap shrink-0">
                                  {item.studentClassOrDegree}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-50">
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Selected Date</span>
                                  <span className="text-slate-800 font-semibold">{item.date}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Preferred Slot</span>
                                  <span className="text-slate-800 font-semibold">{item.preferredSlot}</span>
                                </div>
                              </div>

                              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] space-y-1">
                                <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Enquirer Contact Info</p>
                                <p className="text-slate-600">Email: <a href={`mailto:${item.email}`} className="text-red-600 font-medium hover:underline">{item.email}</a></p>
                                <p className="text-slate-600">Phone: <a href={`tel:${item.phone}`} className="text-red-600 font-bold hover:underline">{item.phone}</a></p>
                              </div>

                              {item.query && (
                                <div className="bg-rose-50/40 p-2.5 rounded-xl border border-rose-100/30 text-[11px] text-slate-700">
                                  <p className="font-bold text-rose-800/60 uppercase tracking-wider text-[8px] mb-1">Custom Message / Query</p>
                                  <p className="leading-relaxed">{item.query}</p>
                                </div>
                              )}

                              <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-50 flex justify-between items-center">
                                <span>Submission:</span>
                                <span className="font-mono">{new Date(item.createdAt).toLocaleString()}</span>
                              </div>
                              {renderDeleteButton('counseling-leads', item.id, 'this counselling lead')}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 3. CALLBACK REQUESTS ALERTS */}
                {activeSubTab === 'callbacks' && (
                  <div>
                    {filteredCallbacks.length === 0 ? (
                      <p className="p-8 text-center text-slate-400 italic text-xs">No callback inquiries match search.</p>
                    ) : (
                      <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-600 border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="p-4">Inquirer Name</th>
                                <th className="p-4">Inbound Phone</th>
                                <th className="p-4">Email Address</th>
                                <th className="p-4">Target Institution Ref</th>
                                <th className="p-4">User Message</th>
                                <th className="p-4">Alert Time</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredCallbacks.map((item: any) => (
                                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/40">
                                  <td className="p-4 font-bold text-slate-900">
                                    {item.name}
                                  </td>
                                  <td className="p-4 font-bold text-red-600">
                                    {item.phone}
                                  </td>
                                  <td className="p-4">
                                    {item.email || <span className="text-slate-400 italic">None provided</span>}
                                  </td>
                                  <td className="p-4 font-semibold text-slate-700">
                                    {item.instituteId || 'General Inquiry Consultation'}
                                  </td>
                                  <td className="p-4">
                                    {item.query || 'Wants callback callback for academic consultation.'}
                                  </td>
                                  <td className="p-4 text-slate-400 text-[10px]">
                                    {new Date(item.createdAt).toLocaleString()}
                                  </td>
                                  <td className="p-4 text-right">
                                    {renderDeleteButton('callback-leads', item.id, 'this callback lead')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="block md:hidden space-y-4 p-4 bg-slate-50/50">
                          {filteredCallbacks.map((item: any) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3">
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                                  <p className="text-[10px] text-slate-400 mt-0.5">Target: <span className="font-bold text-red-600">{item.instituteId || 'General Consult'}</span></p>
                                </div>
                                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[9px] font-bold border border-amber-100 whitespace-nowrap shrink-0">
                                  Callback Alert
                                </span>
                              </div>

                              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] space-y-1">
                                <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Inbound Contact Info</p>
                                <p className="text-slate-800 font-bold">Phone: <a href={`tel:${item.phone}`} className="text-red-600 hover:underline">{item.phone}</a></p>
                                {item.email && <p className="text-slate-600">Email: <a href={`mailto:${item.email}`} className="text-red-600 hover:underline">{item.email}</a></p>}
                              </div>

                              {item.query && (
                                <div className="bg-slate-100/50 p-2.5 rounded-xl border border-slate-200/40 text-[11px] text-slate-700">
                                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px] mb-1">User Query Message</p>
                                  <p className="leading-relaxed">{item.query}</p>
                                </div>
                              )}

                              <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-50 flex justify-between items-center">
                                <span>Alert Time:</span>
                                <span className="font-mono">{new Date(item.createdAt).toLocaleString()}</span>
                              </div>
                              {renderDeleteButton('callback-leads', item.id, 'this callback lead')}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 4. REGISTERED USERS DATABASE */}
                {activeSubTab === 'users' && (
                  <div>
                    {filteredUsers.length === 0 ? (
                      <p className="p-8 text-center text-slate-400 italic text-xs">No user profiles match search.</p>
                    ) : (
                      <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-600 border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                <th className="p-4">User Personal Info</th>
                                <th className="p-4">Contact & Academic Interest</th>
                                <th className="p-4">Address</th>
                                <th className="p-4">Parent Details</th>
                                <th className="p-4">Shortlisted IDs</th>
                                <th className="p-4">Basket Cart IDs</th>
                                <th className="p-4">Member Since</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUsers.map((item: any) => (
                                <tr key={item.email} className="border-b border-slate-50 hover:bg-slate-50/40">
                                  <td className="p-4">
                                    <p className="font-bold text-slate-900">{item.name}</p>
                                    <p className="text-[10px] text-slate-400 font-mono">{item.email}</p>
                                  </td>
                                  <td className="p-4">
                                    <p className="font-semibold">{item.phone || 'Phone not provided'}</p>
                                    <p className="text-[10px] text-slate-500 mt-1">Course: {item.courseInterested || 'N/A'}</p>
                                    <p className="text-[10px] text-slate-500">12th: {item.twelfthSubject || 'N/A'}</p>
                                  </td>
                                  <td className="p-4">
                                    <p>{item.address || 'N/A'}</p>
                                    <p className="text-[10px] text-slate-400">{item.pincode}</p>
                                  </td>
                                  <td className="p-4">
                                    {item.fatherName && <p className="text-[11px] text-slate-700">F: {item.fatherName}</p>}
                                    {item.fatherEmail && <p className="text-[10px] text-slate-400">{item.fatherEmail}</p>}
                                    {item.motherName && <p className="text-[11px] text-slate-700">M: {item.motherName}</p>}
                                    {item.motherEmail && <p className="text-[10px] text-slate-400">{item.motherEmail}</p>}
                                    {item.childName && <p className="text-[11px] text-slate-700">Applicant: {item.childName}</p>}
                                    {item.childMotherTongue && <p className="text-[10px] text-slate-500">Mother tongue: {item.childMotherTongue}</p>}
                                  </td>
                                  <td className="p-4 max-w-[150px] truncate" title={item.shortlistedIds?.join(', ')}>
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded text-[10px]">
                                      {item.shortlistedIds?.length || 0} Saved
                                    </span>
                                    <p className="mt-1 whitespace-normal break-words text-[9px] text-slate-500">{item.shortlistedIds?.join(', ')}</p>
                                  </td>
                                  <td className="p-4 max-w-[150px] truncate" title={item.cartIds?.join(', ')}>
                                    <span className="px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded text-[10px]">
                                      {item.cartIds?.length || 0} in Basket
                                    </span>
                                    <p className="mt-1 whitespace-normal break-words text-[9px] text-slate-500">{item.cartIds?.join(', ')}</p>
                                  </td>
                                  <td className="p-4 text-slate-400 text-[10px]">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                  </td>
                                  <td className="p-4 text-right">
                                    {renderDeleteButton('user-profiles', item.email, `the user profile for ${item.email}`)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="block md:hidden space-y-4 p-4 bg-slate-50/50">
                          {filteredUsers.map((item: any) => (
                            <div key={item.email} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3">
                              <div>
                                <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.email}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-50">
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Contact Number</span>
                                  <span className="text-slate-800">{item.phone || 'N/A'}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Course Interested</span>
                                  <span className="text-slate-800">{item.courseInterested || 'N/A'}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">12th Subject / Stream</span>
                                  <span className="text-slate-800">{item.twelfthSubject || 'N/A'}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Shortlisted Institutes</span>
                                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded text-[9px] inline-block mt-0.5">
                                    {item.shortlistedIds?.length || 0} Saved
                                  </span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] block">Basket Application Cart</span>
                                  <span className="px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded text-[9px] inline-block mt-0.5">
                                    {item.cartIds?.length || 0} in Basket
                                  </span>
                                </div>
                              </div>

                              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] space-y-2">
                                <div>
                                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Student Address</p>
                                  <p className="text-slate-800">{item.address || 'N/A'} {item.pincode && `(PIN: ${item.pincode})`}</p>
                                </div>
                                {(item.fatherName || item.motherName) && (
                                  <div>
                                    <p className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Parent Particulars</p>
                                    {item.fatherName && <p className="text-slate-700">Father Name: <span className="font-semibold text-slate-800">{item.fatherName}</span></p>}
                                    {item.fatherEmail && <p className="text-slate-700">Father Email: <span className="font-semibold text-slate-800">{item.fatherEmail}</span></p>}
                                    {item.motherName && <p className="text-slate-700">Mother Name: <span className="font-semibold text-slate-800">{item.motherName}</span></p>}
                                    {item.motherEmail && <p className="text-slate-700">Mother Email: <span className="font-semibold text-slate-800">{item.motherEmail}</span></p>}
                                    {item.childName && <p className="text-slate-700">Applicant Name: <span className="font-semibold text-slate-800">{item.childName}</span></p>}
                                    {item.childMotherTongue && <p className="text-slate-700">Mother Tongue: <span className="font-semibold text-slate-800">{item.childMotherTongue}</span></p>}
                                  </div>
                                )}
                              </div>

                              <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-50 flex justify-between items-center">
                                <span>Platform Enrolled:</span>
                                <span className="font-mono">{new Date(item.createdAt).toLocaleDateString()}</span>
                              </div>
                              {renderDeleteButton('user-profiles', item.email, `the user profile for ${item.email}`)}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

              </div>
            )}
          </div>

          {/* REJECTION REMARKS MODAL DIALOG */}
          <AnimatePresence>
            {rejectModalId && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-rose-600">
                      <div className="p-2 bg-rose-50 rounded-xl">
                        <XCircle className="h-5 w-5" />
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Reject College Update Request</h3>
                    </div>
                    <button
                      onClick={() => { setRejectModalId(null); setRejectionRemark(''); }}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Provide a concise reason for declining this college's update request. The college's currently published profile will remain unaffected.
                  </p>

                  <div className="mb-4">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Administrative Rejection Reason
                    </label>
                    <textarea
                      rows={3}
                      value={rejectionRemark}
                      onChange={(e) => setRejectionRemark(e.target.value)}
                      placeholder="e.g., Please provide official university circular or authorized seal for tuition fee modification..."
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500 bg-slate-50"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => { setRejectModalId(null); setRejectionRemark(''); }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => rejectModalId && handleRejectUpdateRequest(rejectModalId)}
                      disabled={actionProcessingId === rejectModalId}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition cursor-pointer flex items-center gap-1.5"
                    >
                      {actionProcessingId === rejectModalId ? (
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      ) : (
                        <X className="h-3.5 w-3.5" />
                      )}
                      <span>Confirm Rejection</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      )}
    </div>
  );
}
