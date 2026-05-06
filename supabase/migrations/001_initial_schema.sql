-- ============================================================
-- NSV Overseas — Supabase Database Setup
-- Run this entire file in the Supabase SQL Editor once.
-- ============================================================

-- ─── 1. PROFILES ─────────────────────────────────────────────
-- Extended user data linked to auth.users
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  email       text,
  role        text not null default 'user',       -- 'user' | 'admin'
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS for profiles
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Admins can view all profiles (uses a security-definer helper)
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());


-- ─── 2. CONTACT INQUIRIES ────────────────────────────────────
create table if not exists public.contact_inquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  country     text,
  message     text not null,
  status      text not null default 'new',        -- 'new' | 'in_progress' | 'resolved'
  created_at  timestamptz not null default now()
);

alter table public.contact_inquiries enable row level security;

-- Anyone can insert (public contact form)
create policy "Anyone can submit an inquiry"
  on public.contact_inquiries for insert
  with check (true);

-- Only admins can read
create policy "Admins can view inquiries"
  on public.contact_inquiries for select
  using (public.is_admin());

-- Only admins can update status
create policy "Admins can update inquiry status"
  on public.contact_inquiries for update
  using (public.is_admin());


-- ─── 3. REFERRALS ────────────────────────────────────────────
create table if not exists public.referrals (
  id                uuid primary key default gen_random_uuid(),
  referrer_name     text not null,
  referrer_contact  text not null,
  student_name      text not null,
  student_contact   text not null,
  preferred_country text,
  status            text not null default 'pending',  -- 'pending' | 'contacted' | 'enrolled' | 'closed'
  created_at        timestamptz not null default now()
);

alter table public.referrals enable row level security;

-- Anyone can submit a referral
create policy "Anyone can submit a referral"
  on public.referrals for insert
  with check (true);

-- Only admins can read all referrals
create policy "Admins can view referrals"
  on public.referrals for select
  using (public.is_admin());

-- Only admins can update referral status
create policy "Admins can update referral status"
  on public.referrals for update
  using (public.is_admin());


-- ─── 4. HELPFUL INDEXES ──────────────────────────────────────
create index if not exists idx_referrals_status      on public.referrals(status);
create index if not exists idx_referrals_created_at  on public.referrals(created_at desc);
create index if not exists idx_inquiries_status      on public.contact_inquiries(status);
create index if not exists idx_inquiries_created_at  on public.contact_inquiries(created_at desc);


-- ─── 5. PROMOTE YOUR FIRST ADMIN ─────────────────────────────
-- After signing up, run this once in the SQL editor to give yourself admin access.
-- Replace the email below with your own.
--
-- update public.profiles
-- set role = 'admin'
-- where email = 'your-admin@email.com';
