import { supabase } from '../lib/supabase';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Submit a referral from the ReferralSection form.
 */
export async function submitReferral({
  referrerName,
  referrerContact,
  studentName,
  studentContact,
  preferredCountry,
}) {
  const { data, error } = await supabase
    .from('referrals')
    .insert([{
      referrer_name: referrerName,
      referrer_contact: referrerContact,
      student_name: studentName,
      student_contact: studentContact,
      preferred_country: preferredCountry || null,
      status: 'pending',
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Admin: Fetch all referrals, newest first.
 */
export async function getAllReferrals() {
  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * Admin: Update referral status.
 * @param {string} id
 * @param {string} status - 'pending' | 'contacted' | 'enrolled' | 'closed'
 */
export async function updateReferralStatus(id, status) {
  const { data, error } = await supabase
    .from('referrals')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* ─── Export Helpers ──────────────────────────────────────────────────── */

const COLUMNS = [
  { header: 'Referrer Name',    key: 'referrer_name' },
  { header: 'Referrer Contact', key: 'referrer_contact' },
  { header: 'Student Name',     key: 'student_name' },
  { header: 'Student Contact',  key: 'student_contact' },
  { header: 'Preferred Country',key: 'preferred_country' },
  { header: 'Status',           key: 'status' },
  { header: 'Submitted At',     key: 'created_at' },
];

/**
 * Export referrals array to a downloadable CSV file.
 * @param {Array} referrals
 */
export function exportReferralsCSV(referrals) {
  const header = COLUMNS.map((c) => c.header).join(',');
  const rows = referrals.map((r) =>
    COLUMNS.map((c) => {
      const val = r[c.key] ?? '';
      // Wrap in quotes to handle commas inside values
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(',')
  );
  const csv = [header, ...rows].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `nsv_referrals_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Export referrals array to a downloadable PDF file using jsPDF + autoTable.
 * @param {Array} referrals
 */
export function exportReferralsPDF(referrals) {
  const doc = new jsPDF({ orientation: 'landscape' });

  // Title
  doc.setFontSize(18);
  doc.setTextColor(10, 25, 63); // NSV navy
  doc.text('NSV Overseas — Referral Report', 14, 16);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 23);

  autoTable(doc, {
    startY: 28,
    head: [COLUMNS.map((c) => c.header)],
    body: referrals.map((r) =>
      COLUMNS.map((c) => {
        const val = r[c.key] ?? '—';
        // Format ISO date string nicely
        if (c.key === 'created_at' && val !== '—') {
          return new Date(val).toLocaleString();
        }
        return val;
      })
    ),
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [10, 25, 63], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });

  doc.save(`nsv_referrals_${new Date().toISOString().slice(0, 10)}.pdf`);
}
