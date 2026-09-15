/* Coastal Healthcare Advocates — shared header + footer for the secondary
   pages (legal pages, 404). index.html keeps its own inline copy, which is
   the canonical source these strings are kept in step with.

   Not an ES module and meant to be loaded with a plain <script> tag near the
   end of <body>: it injects synchronously, before DOMContentLoaded, so
   theme.js can wire the [data-theme-toggle] switches (header, menu, footer) and there
   is no flash of missing chrome.

   Each page provides the mount points:
     <div data-partial="header"></div>   ... after the skip link
     <div data-partial="footer"></div>   ... before the scripts

   All in-page links point at index.html#section, since the sections live
   there, not on the page doing the including. */
(function () {
  'use strict';

  var ICONS =
    '<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">' +
      '<symbol id="i-menu" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.6h16M4 12h16M4 17.4h16"/></g></symbol>' +
      '<symbol id="i-linkedin" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9.75h4v11.25H3V9.75Zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V21h-4v-4.98c0-1.19-.02-2.71-1.65-2.71-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75Z"/></symbol>' +
      '<symbol id="i-facebook" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M13.5 21v-8.2h2.76l.41-3.2H13.5V7.55c0-.93.26-1.56 1.59-1.56h1.7V3.13c-.3-.04-1.3-.13-2.48-.13-2.46 0-4.15 1.5-4.15 4.26V9.6H7.4v3.2h2.76V21h3.34Z"/></symbol>' +
      '<symbol id="i-calendly" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M19.655 14.262q.421.001.828.064c0 .005-.005.01-.005.014a6 6 0 0 1-.381.786l-1.219 2.106a6.24 6.24 0 0 1-5.411 3.127h-2.432a6.25 6.25 0 0 1-5.412-3.127l-1.218-2.106a6.25 6.25 0 0 1 0-6.252l1.218-2.106a6.24 6.24 0 0 1 5.412-3.127h2.432a6.25 6.25 0 0 1 5.411 3.127l1.219 2.106c.147.252.271.519.381.786c0 .004.005.009.005.014a5.5 5.5 0 0 1-.828.064c-1.816 0-2.501-.607-3.291-1.306c-.764-.676-1.711-1.517-3.44-1.517h-1.029c-1.251 0-2.387.455-3.2 1.278c-.796.805-1.233 1.904-1.233 3.099v1.411c0 1.196.437 2.295 1.233 3.099c.813.823 1.949 1.278 3.2 1.278h1.034c1.729 0 2.676-.841 3.439-1.517c.791-.703 1.471-1.306 3.287-1.301m.005-3.237q.6 0 1.179-.11q-.003-.007-.002-.014a6.3 6.3 0 0 0-.349-1.218a4.6 4.6 0 0 0 1.986-.819c0-.004-.005-.013-.005-.018a10.6 10.6 0 0 0-1.489-3.03a10.9 10.9 0 0 0-2.331-2.395a10.64 10.64 0 0 0-6.428-2.138c-1.448 0-2.855.28-4.175.841c-1.273.543-2.423 1.315-3.407 2.299S2.878 6.552 2.341 7.83a10.7 10.7 0 0 0-.842 4.175c0 1.448.281 2.855.842 4.174c.542 1.274 1.314 2.423 2.298 3.407s2.129 1.761 3.407 2.299c1.324.556 2.727.841 4.175.841c2.34 0 4.561-.74 6.428-2.137a10.8 10.8 0 0 0 2.331-2.396a10.8 10.8 0 0 0 1.489-3.03c0-.004.005-.014.005-.018a4.6 4.6 0 0 0-1.986-.819c.161-.395.276-.804.349-1.218c.005-.009.005-.014.005-.023a5.85 5.85 0 0 1 2.404 1.035c.685.505.552 1.075.446 1.416C22.184 20.437 17.619 24 12.221 24c-6.625 0-12-5.375-12-12s5.37-12 12-12c5.398 0 9.963 3.563 11.471 8.464c.106.341.239.915-.446 1.421a5.8 5.8 0 0 1-2.404 1.034c.128.716.128 1.45 0 2.166a6.3 6.3 0 0 0-1.182-.11c-4.184 0-3.968 2.823-6.736 2.823h-1.029c-1.899 0-3.15-1.357-3.15-3.095v-1.411c0-1.738 1.251-3.094 3.15-3.094h1.034c2.768 0 2.552 2.823 6.731 2.827"/></symbol>' +
      '<symbol id="i-sun" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.6c2.5 0 4.5 2 4.4 4.5 0 2.4-2 4.4-4.5 4.3-2.4 0-4.4-2-4.3-4.5 0-2.4 2-4.3 4.4-4.3Z"/><path d="M12 2.6v2.4M12 19v2.4M4.6 4.7l1.7 1.7M17.7 17.7l1.7 1.7M2.6 12H5M19 12h2.4M4.6 19.4l1.7-1.7M17.7 6.4l1.7-1.7"/></g></symbol>' +
      '<symbol id="i-moon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" d="M20 14.2A8.3 8.3 0 0 1 9.7 4a8.4 8.4 0 1 0 10.3 10.2Z"/></symbol>' +
      '<symbol id="i-arrow" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12h14.4M13 6.2l6 5.8-6 5.8"/></g></symbol>' +
    '</svg>';

  var HEADER_HTML =
    '<header class="site-header">' +
      '<div class="canvas-wide flex items-center gap-4 py-4">' +
        '<a href="index.html#top" class="flex items-center" aria-label="Coastal Healthcare Advocates home">' +
          '<span class="brand-logo" role="img" aria-label="Coastal Healthcare Advocates"></span>' +
        '</a>' +
        '<div class="ml-auto flex items-center gap-4 relative">' +
          '<nav class="hidden items-center gap-4 nav:flex" aria-label="Primary">' +
            '<a class="nav-link" href="index.html#services">Services</a>' +
            '<a class="nav-link" href="index.html#who">Who we help</a>' +
            '<a class="nav-link" href="index.html#about">About</a>' +
            '<a class="nav-link" href="index.html#how">How it works</a>' +
            '<a class="nav-link" href="index.html#pricing">Pricing</a>' +
            '<a class="nav-link" href="index.html#faqs"><abbr title="Frequently asked questions">FAQs</abbr></a>' +
          '</nav>' +
          '<button type="button" class="header-icon-btn theme-orb hidden nav:inline-flex" data-theme-toggle aria-label="Switch to dark theme">' +
            '<svg class="theme-orb-ico theme-orb-ico--sun" aria-hidden="true"><use href="#i-sun"/></svg>' +
            '<svg class="theme-orb-ico theme-orb-ico--moon" aria-hidden="true"><use href="#i-moon"/></svg>' +
          '</button>' +
          '<button type="button" class="header-icon-btn nav:hidden" id="nav-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">' +
            '<svg class="icon" aria-hidden="true"><use href="#i-menu"/></svg>' +
          '</button>' +
          '<nav id="mobile-nav" class="hidden nav:hidden" aria-label="Primary (mobile)" hidden>' +
            '<ul class="flex flex-col gap-1">' +
              '<li><a class="nav-link" href="index.html#services">Services</a></li>' +
              '<li><a class="nav-link" href="index.html#who">Who we help</a></li>' +
              '<li><a class="nav-link" href="index.html#about">About Lindsey</a></li>' +
              '<li><a class="nav-link" href="index.html#how">How it works</a></li>' +
              '<li><a class="nav-link" href="index.html#pricing">Pricing</a></li>' +
              '<li><a class="nav-link" href="index.html#faqs"><abbr title="Frequently asked questions">FAQs</abbr></a></li>' +
            '</ul>' +
            '<div class="mobile-nav-theme">' +
              '<button type="button" class="theme-switch theme-switch--menu" data-theme-toggle aria-label="Switch to dark theme">' +
                '<span>Theme</span>' +
                '<span class="theme-switch-track">' +
                  '<span class="theme-switch-knob"></span>' +
                  '<svg class="theme-switch-ico theme-switch-ico--sun" aria-hidden="true"><use href="#i-sun"/></svg>' +
                  '<svg class="theme-switch-ico theme-switch-ico--moon" aria-hidden="true"><use href="#i-moon"/></svg>' +
                '</span>' +
                '<span class="sr-only theme-toggle-label">Dark theme</span>' +
              '</button>' +
            '</div>' +
          '</nav>' +
        '</div>' +
      '</div>' +
    '</header>';

  var FOOTER_HTML =
    '<footer class="site-footer on-dark">' +
      '<div class="canvas-wide py-14">' +
        '<div class="h-card grid gap-10 md:grid-cols-2 lg:grid-cols-4">' +
          '<div class="lg:col-span-1">' +
            '<img src="assets/logomarks/logos/logo-horizontal-reversed.svg" alt="Coastal Healthcare Advocates" width="265" height="80" class="p-name u-logo h-20 w-auto">' +
            '<p class="p-note meta mt-4 on-dark-faint">Understanding Benefits. Resolving Bills. Advocating for You.</p>' +
          '</div>' +
          '<nav aria-label="Site sections">' +
            '<p class="footer-col-title">Explore</p>' +
            '<ul class="flex flex-col gap-2">' +
              '<li><a href="index.html#services">Services</a></li>' +
              '<li><a href="index.html#who">Who we help</a></li>' +
              '<li><a href="index.html#about">About Lindsey</a></li>' +
              '<li><a href="index.html#how">How it works</a></li>' +
              '<li><a href="index.html#pricing">Pricing</a></li>' +
              '<li><a href="index.html#faqs"><abbr title="Frequently asked questions">FAQs</abbr></a></li>' +
            '</ul>' +
          '</nav>' +
          '<nav aria-label="Legal">' +
            '<p class="footer-col-title">Legal</p>' +
            '<ul class="flex flex-col gap-2">' +
              '<li><a href="accessibility.html">Accessibility statement</a></li>' +
              '<li><a href="privacy.html">Privacy Notice</a></li>' +
              '<li><a href="t&amp;c.html">Terms &amp; Conditions</a></li>' +
              '<li><button type="button" id="cookie-prefs" class="footer-linkish">Site preferences</button></li>' +
            '</ul>' +
          '</nav>' +
          '<div>' +
            '<p class="footer-col-title">Contact</p>' +
            '<address class="not-italic flex flex-col gap-2">' +
              '<span><a href="index.html#intake" data-tel-area="757" data-tel-line="5740771" class="p-tel">Call us</a><br>' +
                '<span class="on-dark-muted">M–F 8am–5pm ET</span></span>' +
              '<a href="index.html#intake" data-email-user="coastalhealthcareadvocates" data-email-domain="gmail.com" class="break-words">Email us</a>' +
              '<span class="on-dark-muted">Serving Hampton Roads and Southern Virginia</span>' +
            '</address>' +
            '<div class="mt-4 flex items-center gap-3">' +
              '<a href="https://www.linkedin.com/in/lindsey-hewitt-1856b5136/" rel="noopener" aria-label="Lindsey Hewitt on LinkedIn" class="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-white/60">' +
                '<svg class="icon" aria-hidden="true"><use href="#i-linkedin"/></svg>' +
              '</a>' +
              '<a href="https://www.facebook.com/profile.php?id=61590633634414" rel="noopener" aria-label="Coastal Healthcare Advocates on Facebook" class="u-url grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-white/60">' +
                '<svg class="icon" aria-hidden="true"><use href="#i-facebook"/></svg>' +
              '</a>' +
              '<a href="https://calendly.com/coastalhealthcareadvocates/30min" rel="noopener" aria-label="Book a consultation on Calendly" class="u-url grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-white/60">' +
                '<svg class="icon" aria-hidden="true"><use href="#i-calendly"/></svg>' +
              '</a>' +
            '</div>' +
          '</div>' +
          '<figure class="footer-qr">' +
            '<img src="assets/img/qr-site.svg" alt="QR code linking to coastalhealthcareadvocates.org" width="29" height="29">' +
            '<figcaption class="meta">Scan to visit online</figcaption>' +
          '</figure>' +
        '</div>' +
        '<div class="mt-12 flex flex-col gap-x-10 gap-y-6 border-t border-white/15 pt-8 md:flex-row md:flex-wrap md:items-center md:justify-between">' +
          '<div class="flex flex-wrap items-center gap-x-8 gap-y-4">' +
            '<a href="https://www.gnanow.org/" rel="noopener" class="gna-badge shrink-0" aria-label="Greater National Advocates (verified member)">' +
              '<img src="assets/img/gna-logo-white.svg" alt="Greater National Advocates (verified member)" width="361" height="49" class="block h-9 w-auto">' +
            '</a>' +
            '<button type="button" class="theme-switch" data-theme-toggle aria-label="Switch to dark theme">' +
              '<span class="theme-switch-track">' +
                '<span class="theme-switch-knob"></span>' +
                '<svg class="theme-switch-ico theme-switch-ico--sun" aria-hidden="true"><use href="#i-sun"/></svg>' +
                '<svg class="theme-switch-ico theme-switch-ico--moon" aria-hidden="true"><use href="#i-moon"/></svg>' +
              '</span>' +
              '<span class="sr-only theme-toggle-label">Dark theme</span>' +
            '</button>' +
          '</div>' +
          '<div class="meta flex flex-col gap-1 on-dark-muted">' +
            '<span>Not for medical emergencies; call 911.</span>' +
            '<span>General information, not legal or medical advice.</span>' +
            '<span>© 2026 Coastal Healthcare Advocates. All rights reserved.</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>' +
    '<div id="consent" class="consent" role="region" aria-label="Cookie choices" hidden>' +
      '<div class="consent-inner">' +
        '<p>We use privacy-friendly, cookieless analytics (Plausible) to see which pages help ' +
          'visitors. No personal or health information is ever collected. Necessary cookies only keep ' +
          'the site working.</p>' +
        '<div class="flex gap-3">' +
          '<button type="button" class="btn btn-ghost" data-consent="necessary">Necessary Only</button>' +
          '<button type="button" class="btn btn-primary" data-consent="all">Accept Analytics</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  function mount(name, html) {
    var slot = document.querySelector('[data-partial="' + name + '"]');
    if (slot) slot.outerHTML = html;
  }

  // Icons first, then the chrome that references them.
  document.body.insertAdjacentHTML('afterbegin', ICONS);
  mount('header', HEADER_HTML);
  mount('footer', FOOTER_HTML);

  // Flag the current page in the footer's Legal list.
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-footer nav[aria-label="Legal"] a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });

  /* Mobile navigation disclosure — a trimmed copy of the handler in main.js,
     which the secondary pages don't load. */
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    var setNav = function (open) {
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) {
        mobileNav.hidden = false;
        mobileNav.classList.remove('hidden');
        requestAnimationFrame(function () { mobileNav.classList.add('is-open'); });
      } else {
        mobileNav.classList.remove('is-open');
        mobileNav.hidden = true;
        mobileNav.classList.add('hidden');
      }
    };
    navToggle.addEventListener('click', function () {
      setNav(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        navToggle.focus();
      }
    });
    window.matchMedia('(min-width: 884px)').addEventListener('change', function (e) {
      if (e.matches) setNav(false);
    });
  }

  /* Slide the header out of the way once the footer scrolls into view, and
     bring it back when the footer leaves — the same gesture main.js gives
     index.html (keyed there to the closing #schedule section). The fade and
     transform live in CSS: .site-header / .site-header.header-hidden. */
  var siteHeader = document.querySelector('.site-header');
  var siteFooter = document.querySelector('.site-footer');
  if (siteHeader && siteFooter && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      function (entries) {
        siteHeader.classList.toggle('header-hidden', entries[0].isIntersecting);
      },
      { threshold: 0 }
    ).observe(siteFooter);
  }
})();
