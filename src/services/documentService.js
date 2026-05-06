import { supabase } from '../lib/supabase';

const BUCKET = 'documents';

/**
 * Upload a file to the 'documents' bucket under the user's UID folder.
 * @param {File} file  - The File object from an <input type="file">
 * @param {string} docType - 'transcript' | 'passport' | 'ielts' | 'lor' | 'sop' | 'other'
 * @returns {Promise<object>} The inserted document metadata record
 */
export async function uploadDocument(file, docType) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to upload documents.');

  // Store under /{userId}/{timestamp}-{filename} for uniqueness
  const storagePath = `${user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

  // 1. Upload file to Storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { contentType: file.type });

  if (uploadError) throw uploadError;

  // 2. Insert metadata row
  const { data, error } = await supabase
    .from('documents')
    .insert([{
      user_id:      user.id,
      file_name:    file.name,
      storage_path: storagePath,
      doc_type:     docType,
      file_size:    file.size,
      mime_type:    file.type,
      status:       'uploaded',
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get a short-lived signed URL to download/view a document.
 * @param {string} storagePath - The path stored in the documents table
 * @param {number} expiresIn   - Seconds until the URL expires (default 60)
 */
export async function getDocumentUrl(storagePath, expiresIn = 60) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

/**
 * Get all documents belonging to the currently authenticated user.
 */
export async function getMyDocuments() {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('uploaded_at', { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * Admin: Get all documents across all users.
 */
export async function getAllDocuments() {
  const { data, error } = await supabase
    .from('documents')
    .select('*, profiles(full_name, email)')
    .order('uploaded_at', { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * Admin: Update a document's status and optionally add notes.
 * @param {string} id
 * @param {string} status - 'uploaded' | 'under_review' | 'approved' | 'rejected'
 * @param {string} notes
 */
export async function updateDocumentStatus(id, status, notes = '') {
  const { data, error } = await supabase
    .from('documents')
    .update({ status, notes })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Delete a document (storage + metadata row).
 * Only works for the owner while status is 'uploaded'.
 * @param {string} id           - document metadata row id
 * @param {string} storagePath  - path in the bucket
 */
export async function deleteDocument(id, storagePath) {
  const { error: storageError } = await supabase.storage.from(BUCKET).remove([storagePath]);
  if (storageError) throw storageError;

  const { error } = await supabase.from('documents').delete().eq('id', id);
  if (error) throw error;
}
