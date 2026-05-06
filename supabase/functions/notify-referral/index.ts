import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ADMIN_EMAIL    = 'overseasnsv@gmail.com';
const FROM_EMAIL     = 'NSV Overseas <notifications@nsvservice.com>';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const payload = await req.json();
  const record   = payload.record;
  if (!record) {
    return new Response('No record in payload', { status: 400 });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A192F; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">🎁 New Referral Submitted</h1>
        <p style="color: #94a3b8; margin: 4px 0 0;">NSV Overseas Admin Notification</p>
      </div>
      <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
        <h3 style="color: #0A192F; margin: 0 0 12px; font-size: 15px;">Referred By</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px; width: 140px;">Name</td><td style="padding: 6px 0; font-weight: 600; color: #1e293b;">${record.referrer_name}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Contact</td><td style="padding: 6px 0; font-weight: 600; color: #1e293b;">${record.referrer_contact}</td></tr>
        </table>
        <h3 style="color: #0A192F; margin: 0 0 12px; font-size: 15px; padding-top: 12px; border-top: 1px solid #e2e8f0;">Referred Student</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px; width: 140px;">Name</td><td style="padding: 6px 0; font-weight: 600; color: #1e293b;">${record.student_name}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Contact</td><td style="padding: 6px 0; font-weight: 600; color: #1e293b;">${record.student_contact}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Country</td><td style="padding: 6px 0; font-weight: 600; color: #1e293b;">${record.preferred_country ?? 'Not specified'}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Received</td><td style="padding: 6px 0; color: #1e293b;">${new Date(record.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
        </table>
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <a href="https://zmstlhtnttpkucoojsgj.supabase.co" style="display: inline-block; background: #0A192F; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
            Open Admin Dashboard →
          </a>
        </div>
      </div>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to:   [ADMIN_EMAIL],
      subject: `🎁 New Referral: ${record.student_name} (via ${record.referrer_name}) — NSV Overseas`,
      html,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
});
