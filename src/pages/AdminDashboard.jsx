import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  getAllReferrals,
  updateReferralStatus,
  exportReferralsCSV,
  exportReferralsPDF,
} from '../services/referralService';
import { getAllInquiries, updateInquiryStatus } from '../services/contactService';
import { useAuth } from '../context/useAuth';
import {
  Users, Mail, Download, FileText, RefreshCw,
  CheckCircle2, Clock, XCircle, AlertCircle
} from 'lucide-react';

const STATUS_COLORS = {
  pending:     'bg-yellow-100 text-yellow-700',
  contacted:   'bg-blue-100 text-blue-700',
  enrolled:    'bg-green-100 text-green-700',
  closed:      'bg-slate-100 text-slate-500',
  new:         'bg-yellow-100 text-yellow-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved:    'bg-green-100 text-green-700',
};

const StatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[status] ?? 'bg-slate-100 text-slate-600'}`}>
    {status?.replace('_', ' ')}
  </span>
);

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [tab, setTab] = useState('referrals');
  const [referrals, setReferrals] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setDataLoading(true);
    setError(null);
    try {
      const [refs, inqs] = await Promise.all([getAllReferrals(), getAllInquiries()]);
      setReferrals(refs);
      setInquiries(inqs);
    } catch (e) {
      setError(e.message);
    } finally {
      setDataLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadData(); }, [loadData]);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <RefreshCw className="w-8 h-8 text-[var(--color-ns-royal)] animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-500">You need admin privileges to view this page.</p>
        </div>
      </div>
    );
  }

  const handleReferralStatus = async (id, status) => {
    await updateReferralStatus(id, status);
    setReferrals(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleInquiryStatus = async (id, status) => {
    await updateInquiryStatus(id, status);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage referrals and contact inquiries</p>
          </div>
          <button
            onClick={loadData}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium text-sm"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Referrals',   value: referrals.length,                                               icon: Users,        color: 'bg-blue-50 text-[var(--color-ns-royal)]' },
            { label: 'Pending Referrals', value: referrals.filter(r => r.status === 'pending').length,           icon: Clock,        color: 'bg-yellow-50 text-yellow-600' },
            { label: 'Enrolled Students', value: referrals.filter(r => r.status === 'enrolled').length,          icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
            { label: 'New Inquiries',     value: inquiries.filter(i => i.status === 'new').length,               icon: AlertCircle,  color: 'bg-orange-50 text-orange-600' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <div className="text-2xl font-bold text-slate-800">{value}</div>
              <div className="text-sm text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 mb-6 text-sm">
            Error: {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'referrals',  label: 'Referrals',  icon: Users },
            { id: 'inquiries',  label: 'Inquiries',   icon: Mail  },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                tab === id
                  ? 'bg-[var(--color-ns-navy)] text-white shadow'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* ── Referrals Tab ── */}
        {tab === 'referrals' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">All Referrals ({referrals.length})</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => exportReferralsCSV(referrals)}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors text-sm font-medium"
                  >
                    <Download size={15} />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => exportReferralsPDF(referrals)}
                    className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-ns-navy)] text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    <FileText size={15} />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
                    <tr>
                      {['Referrer', 'Contact', 'Student', 'Student Contact', 'Country', 'Status', 'Date', 'Action'].map(h => (
                        <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {referrals.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-slate-400">
                          No referrals yet.
                        </td>
                      </tr>
                    )}
                    {referrals.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-medium text-slate-800">{r.referrer_name}</td>
                        <td className="px-5 py-4 text-slate-500">{r.referrer_contact}</td>
                        <td className="px-5 py-4 font-medium text-slate-800">{r.student_name}</td>
                        <td className="px-5 py-4 text-slate-500">{r.student_contact}</td>
                        <td className="px-5 py-4 text-slate-500">{r.preferred_country || '—'}</td>
                        <td className="px-5 py-4"><StatusBadge status={r.status} /></td>
                        <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                          {new Date(r.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={r.status}
                            onChange={(e) => handleReferralStatus(r.id, e.target.value)}
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-[var(--color-ns-sky)]"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="enrolled">Enrolled</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Inquiries Tab ── */}
        {tab === 'inquiries' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">Contact Inquiries ({inquiries.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
                    <tr>
                      {['Name', 'Email', 'Phone', 'Country', 'Message', 'Status', 'Date', 'Action'].map(h => (
                        <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-slate-400">
                          No inquiries yet.
                        </td>
                      </tr>
                    )}
                    {inquiries.map(i => (
                      <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-medium text-slate-800">{i.name}</td>
                        <td className="px-5 py-4 text-slate-500">{i.email}</td>
                        <td className="px-5 py-4 text-slate-500">{i.phone}</td>
                        <td className="px-5 py-4 text-slate-500">{i.country || '—'}</td>
                        <td className="px-5 py-4 text-slate-500 max-w-xs truncate" title={i.message}>
                          {i.message}
                        </td>
                        <td className="px-5 py-4"><StatusBadge status={i.status} /></td>
                        <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                          {new Date(i.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={i.status}
                            onChange={(e) => handleInquiryStatus(i.id, e.target.value)}
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-[var(--color-ns-sky)]"
                          >
                            <option value="new">New</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
