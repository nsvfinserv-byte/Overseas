import { supabase } from '../lib/supabase';

/**
 * Submit a contact inquiry from the ContactSection form.
 * Fields: name, email, phone, country, message
 */
export async function submitContactInquiry({ name, email, phone, country, message }) {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .insert([{ name, email, phone, country, message }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Admin: Fetch all contact inquiries, newest first.
 */
export async function getAllInquiries() {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * Admin: Update the status of a contact inquiry.
 * @param {string} id - Inquiry UUID
 * @param {string} status - 'new' | 'in_progress' | 'resolved'
 */
export async function updateInquiryStatus(id, status) {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
