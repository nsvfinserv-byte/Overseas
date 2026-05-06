import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ADMIN_EMAIL    = 'overseasnsv@gmail.com';
const FROM_EMAIL     = 'NSV Overseas <notifications@nsvservice.com>';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const payload = await req.json();

  // Supabase sends: { type, table, record, schema, old_record }
  const record = payload.record;
  if (!record) {
    return new Response('No record in payload', { status: 400 });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A192F; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">📩 New Contact Inquiry</h1>
        <p style="color: #94a3b8; margin: 4px 0 0;">NSV Overseas Admin Notification</p>
      </div>
      <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${record.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;"><a href="mailto:${record.email}">${record.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${record.phone ?? '—'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Country</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${record.country ?? '—'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #1e293b;">${record.message}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Received</td><td style="padding: 8px 0; color: #1e293b;">${new Date(record.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
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
      subject: `📩 New Inquiry from ${record.name} — NSV Overseas`,
      html,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
});
