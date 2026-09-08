// Coastal Healthcare Advocates — cookie-consent banner + gated analytics.
// Privacy-friendly default: Plausible (cookieless). Nothing loads until the
// visitor chooses "Accept analytics". Choice stored in localStorage only.

const STORE_KEY = 'cha-consent';
const PLAUSIBLE_DOMAIN = 'coastalhealthcareadvocates.org';

const banner = document.getElementById('consent');
const prefsBtn = document.getElementById('cookie-prefs');

function readConsent() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
  } catch (_) {
    return null;
  }
}

function writeConsent(analytics) {
  const value = { necessary: true, analytics: !!analytics, ts: new Date().toISOString(), v: 1 };
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(value));
  } catch (_) {}
  return value;
}

function loadAnalytics() {
  if (document.getElementById('plausible-js')) return;
  // Script + event endpoint are proxied through this origin (see netlify.toml),
  // so the Content-Security-Policy can stay 'self'-only.
  const s = document.createElement('script');
  s.id = 'plausible-js';
  s.defer = true;
  s.setAttribute('data-domain', PLAUSIBLE_DOMAIN);
  s.setAttribute('data-api', '/api/event');
  s.src = '/js/script.js';
  document.head.appendChild(s);
  // queue shim so early calls aren't lost
  window.plausible =
    window.plausible ||
    function () {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
  window.chaTrack = (name, props) => window.plausible(name, props ? { props } : undefined);
}

function unloadAnalytics() {
  document.getElementById('plausible-js')?.remove();
  window.chaTrack = () => {};
}

function showBanner() {
  if (banner) banner.hidden = false;
}
function hideBanner() {
  if (banner) banner.hidden = true;
}

// no-op until consent granted
window.chaTrack = window.chaTrack || (() => {});

// Initial state
const existing = readConsent();
if (existing) {
  if (existing.analytics) loadAnalytics();
} else {
  showBanner();
}

// Banner buttons
banner?.querySelectorAll('[data-consent]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const choice = btn.dataset.consent === 'all';
    writeConsent(choice);
    if (choice) loadAnalytics();
    else unloadAnalytics();
    hideBanner();
  });
});

// Footer "Cookie preferences" re-opens the banner
prefsBtn?.addEventListener('click', showBanner);
