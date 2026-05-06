-- ============================================================
-- NSV Overseas — Supabase Webhook / Edge Function Triggers
-- Run this in the Supabase SQL Editor AFTER deploying the
-- two Edge Functions:
--   • notify-inquiry
--   • notify-referral
-- ============================================================

-- These use pg_net (built into Supabase) to fire an HTTP POST
-- to your Edge Function every time a row is inserted.

-- ─── Helper: get the project's Edge Function base URL ────────
-- Replace YOUR_PROJECT_ID with your actual Supabase project ID.
-- e.g. 'https://zmstlhtnttpkucoojsgj.supabase.co/functions/v1'

-- ─── 1. Trigger: contact_inquiries → notify-inquiry ──────────
create or replace function public.trigger_notify_inquiry()
returns trigger language plpgsql security definer as $$
begin
  perform net.http_post(
    url     := 'https://zmstlhtnttpkucoojsgj.supabase.co/functions/v1/notify-inquiry',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || current_setting('app.supabase_service_key', true)
    ),
    body    := jsonb_build_object('record', row_to_json(NEW))
  );
  return NEW;
end;
$$;

drop trigger if exists on_inquiry_insert on public.contact_inquiries;
create trigger on_inquiry_insert
  after insert on public.contact_inquiries
  for each row execute function public.trigger_notify_inquiry();


-- ─── 2. Trigger: referrals → notify-referral ─────────────────
create or replace function public.trigger_notify_referral()
returns trigger language plpgsql security definer as $$
begin
  perform net.http_post(
    url     := 'https://zmstlhtnttpkucoojsgj.supabase.co/functions/v1/notify-referral',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || current_setting('app.supabase_service_key', true)
    ),
    body    := jsonb_build_object('record', row_to_json(NEW))
  );
  return NEW;
end;
$$;

drop trigger if exists on_referral_insert on public.referrals;
create trigger on_referral_insert
  after insert on public.referrals
  for each row execute function public.trigger_notify_referral();


-- ─── 3. Store service key securely ───────────────────────────
-- Run this once to make the service key available inside triggers.
-- Replace YOUR_SERVICE_ROLE_KEY with the key from Supabase → Settings → API.
--
-- alter database postgres set "app.supabase_service_key" to 'YOUR_SERVICE_ROLE_KEY';
--
-- NOTE: For production, prefer using Supabase Database Webhooks UI
-- (Supabase Dashboard → Database → Webhooks) which handles auth automatically.
-- The UI approach is simpler and recommended over SQL triggers for edge functions.
