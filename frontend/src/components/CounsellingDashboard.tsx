/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CounselingRequest } from '../types';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, FileText, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './Logo';

export default function CounsellingDashboard() {
  const [requests, setRequests] = useState<CounselingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminToken, setAdminToken] = useState<string | null>(null);

  const fetchRequests = async (token: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/counseling', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('admin_token');
        setAdminToken(null);
        setRequests([]);
        setError('Admin authentication is required to view counseling requests.');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      } else {
        throw new Error('Unable to load counseling requests.');
      }
    } catch (err) {
      console.error('Unable to load authorized counseling requests.');
      setError('Could not connect to the counseling server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Admin authentication is required to view counseling requests.');
      setLoading(false);
      return;
    }

    fetch('/api/admin/session', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      if (!response.ok) {
        localStorage.removeItem('admin_token');
        setError('Your admin session is invalid or expired.');
        setLoading(false);
        return;
      }
      setAdminToken(token);
      return fetchRequests(token);
    }).catch(() => {
      setError('Could not verify the admin session.');
      setLoading(false);
    });
  }, []);

  if (!loading && !adminToken) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <p className="text-sm text-slate-700">{error || 'Admin authentication is required.'}</p>
        <Link to="/admin-panel" className="mt-3 inline-block text-sm font-bold text-red-600 hover:underline">
          Open Admin Login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <LogoIcon className="h-6 w-6 shrink-0" />
            <span>Indore Colleges Counselling Desk</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Track your scheduled institute and college counselor meetings in Indore</p>
        </div>
        <button
          onClick={() => adminToken && fetchRequests(adminToken)}
          className="self-start flex items-center space-x-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Refresh List</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <RefreshCw className="h-6 w-6 animate-spin mb-2" />
          <p className="text-xs">Connecting to Indore counseling office...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 text-xs text-amber-800 leading-relaxed">
          {error}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl">
          <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-gray-700">No counseling sessions scheduled</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            Click on &quot;Counselling Meeting&quot; on any college card to request a formal appointment with our academic experts.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {requests.map((req) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={req.id}
              className="border border-gray-100 rounded-xl p-5 hover:shadow-xs hover:border-gray-200 transition bg-gray-50/50"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="rounded-full bg-red-50 border border-red-100 px-2.5 py-0.5 text-[10px] font-bold text-red-600">
                  {req.studentClassOrDegree}
                </span>
                <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <CheckCircle className="h-3 w-3" />
                  <span>Confirmed</span>
                </span>
              </div>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center space-x-1.5 text-gray-900 font-bold">
                  <User className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <span>{req.parentName}</span>
                  {req.studentName && (
                    <span className="text-gray-400 font-normal">
                      (Student: {req.studentName})
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1.5">
                  <Calendar className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <span>Date: {req.date}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <span>Time: {req.preferredSlot}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <Phone className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <span>Phone: +91 {req.phone.replace('+91 ', '')}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <Mail className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <span>Email: {req.email}</span>
                </div>

                {req.query && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-500 leading-relaxed flex items-start space-x-1.5 bg-white p-2 rounded-lg">
                    <FileText className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="line-clamp-3">{req.query}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
