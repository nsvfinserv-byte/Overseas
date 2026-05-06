-- ============================================================
-- NSV Overseas — Storage Bucket + Document Upload Table
-- Run this in the Supabase SQL Editor AFTER 001_initial_schema.sql
-- ============================================================

-- ─── 1. CREATE STORAGE BUCKET ────────────────────────────────
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

-- ─── 2. STORAGE RLS POLICIES ─────────────────────────────────

-- Authenticated users can upload their own documents
create policy "Authenticated users can upload documents"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can read only their own documents
create policy "Users can read own documents"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can delete their own documents
create policy "Users can delete own documents"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Admins can read ALL documents
create policy "Admins can read all documents"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'documents'
    and public.is_admin()
  );


-- ─── 3. DOCUMENTS METADATA TABLE ─────────────────────────────
-- Tracks which files a user has uploaded and their type/status
create table if not exists public.documents (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  file_name    text not null,
  storage_path text not null,          -- path in the 'documents' bucket
  doc_type     text not null,          -- 'transcript' | 'passport' | 'ielts' | 'lor' | 'sop' | 'other'
  file_size    bigint,
  mime_type    text,
  status       text not null default 'uploaded',  -- 'uploaded' | 'under_review' | 'approved' | 'rejected'
  notes        text,                   -- Admin notes
  uploaded_at  timestamptz not null default now()
);

alter table public.documents enable row level security;

-- Users can insert their own document records
create policy "Users can upload their own documents"
  on public.documents for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can see their own documents
create policy "Users can view own documents"
  on public.documents for select
  to authenticated
  using (auth.uid() = user_id);

-- Users can delete their own (only if still 'uploaded')
create policy "Users can delete own pending documents"
  on public.documents for delete
  to authenticated
  using (auth.uid() = user_id and status = 'uploaded');

-- Admins can view all documents
create policy "Admins can view all documents"
  on public.documents for select
  to authenticated
  using (public.is_admin());

-- Admins can update status/notes
create policy "Admins can update document status"
  on public.documents for update
  to authenticated
  using (public.is_admin());

-- Index for fast per-user lookups
create index if not exists idx_documents_user_id   on public.documents(user_id);
create index if not exists idx_documents_status     on public.documents(status);
create index if not exists idx_documents_uploaded_at on public.documents(uploaded_at desc);
