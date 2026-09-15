// Netlify runs this event-triggered function after every verified Netlify Forms submission
// (submissions flagged as spam, e.g. a filled honeypot, never reach it). For the intake
// form it sends two emails through the Netlify Emails integration (@netlify/plugin-emails,
// Mailgun), both rendered from emails/base/index.html:
//
//   1. a notification to the practice inbox with the submitted fields, and
//   2. an autoresponder to the visitor, if they gave an email address.
//
// The autoresponder never echoes what was typed: anyone can enter someone else's address,
// and the message box can carry health details. Env vars: see the Emails block in netlify.toml.

const PRACTICE_INBOX = 'info@coastalhealthcareadvocates.org';
const FROM = `Coastal Healthcare Advocates <${PRACTICE_INBOX}>`;
const CALENDLY = 'https://calendly.com/coastalhealthcareadvocates/30min';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (v) => (Array.isArray(v) ? v.join(', ') : String(v ?? '')).trim();

async function sendEmail(template, { to, subject, parameters }) {
  const res = await fetch(`${process.env.URL}/.netlify/functions/emails/${template}`, {
    method: 'POST',
    headers: { 'netlify-emails-secret': process.env.NETLIFY_EMAILS_SECRET },
    body: JSON.stringify({ from: FROM, to, subject, parameters }),
  });
  if (!res.ok) throw new Error(`${template} → ${to}: ${res.status} ${await res.text()}`);
}

export const handler = async (event) => {
  const { payload } = JSON.parse(event.body || '{}');
  if (payload?.form_name !== 'intake') return { statusCode: 200 };

  const data = payload.data ?? {};
  if (text(data.company)) return { statusCode: 200 }; // honeypot, belt and braces

  const siteUrl = process.env.URL;
  const name = text(data.name);
  const email = text(data.email);
  const urgency = text(data.urgency);
  const submitted = new Date(payload.created_at || Date.now()).toLocaleString('en-US', {
    timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short',
  });

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', text(data.phone)],
    ['Preferred contact', text(data.preferred)],
    ['How can we help?', text(data.service)],
    ['How soon?', urgency],
    ['Message', text(data.message)],
    ['Entry path', text(data.context)],
    ['Submitted', `${submitted} ET`],
  ].map(([label, value]) => ({ label, value: value || '—' }));

  const jobs = [
    sendEmail('base', {
      to: PRACTICE_INBOX,
      subject: `New intake form submission${urgency === 'Right away' ? ' (needs help right away)' : ''}`,
      parameters: {
        siteUrl,
        preheader: `${name || 'Someone'} filled in the intake form.`,
        heading: 'New intake form submission',
        paragraphs: ['Someone filled in the intake form on the website. Their details are below.'],
        rows,
        footnote: 'This message may contain personal information. Please handle it confidentially and don’t forward it outside the practice.',
      },
    }),
  ];

  if (EMAIL_RE.test(email)) {
    const firstName = name.split(/\s+/)[0];
    jobs.push(sendEmail('base', {
      to: email,
      subject: 'We received your message',
      parameters: {
        siteUrl,
        preheader: 'Thanks for reaching out. Lindsey will reply within two business days.',
        heading: firstName ? `Thanks, ${firstName}. We received your message.` : 'Thanks. We received your message.',
        paragraphs: [
          'This is a quick note to confirm your message reached Coastal Healthcare Advocates.',
          'Lindsey will reply within two business days. If it’s urgent, call (757) 574-0771, Monday to Friday, 8am to 5pm ET.',
          'Please don’t reply with Social Security numbers, diagnoses, or other sensitive health details. We’ll collect what we need securely, following HIPAA privacy standards, after we talk.',
        ],
        cta: { label: 'Book time with us', url: CALENDLY },
        footnote: 'You’re getting this because this email address was entered on the contact form at coastalhealthcareadvocates.org. If that wasn’t you, you can ignore this message.',
      },
    }));
  }

  const failures = (await Promise.allSettled(jobs)).filter((r) => r.status === 'rejected');
  failures.forEach((f) => console.error('Intake email failed:', f.reason?.message));
  return { statusCode: failures.length ? 500 : 200 };
};
