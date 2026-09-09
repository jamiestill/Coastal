/* Coastal Healthcare Advocates — shared header + footer for the secondary
   pages (legal pages, 404). index.html keeps its own inline copy, which is
   the canonical source these strings are kept in step with.

   Not an ES module and meant to be loaded with a plain <script> tag near the
   end of <body>: it injects synchronously, before DOMContentLoaded, so
   theme.js can wire #theme-toggle and there is no flash of missing chrome.

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
      '<symbol id="i-sun" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.6c2.5 0 4.5 2 4.4 4.5 0 2.4-2 4.4-4.5 4.3-2.4 0-4.4-2-4.3-4.5 0-2.4 2-4.3 4.4-4.3Z"/><path d="M12 2.6v2.4M12 19v2.4M4.6 4.7l1.7 1.7M17.7 17.7l1.7 1.7M2.6 12H5M19 12h2.4M4.6 19.4l1.7-1.7M17.7 6.4l1.7-1.7"/></g></symbol>' +
      '<symbol id="i-moon" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" d="M20 14.2A8.3 8.3 0 0 1 9.7 4a8.4 8.4 0 1 0 10.3 10.2Z"/></symbol>' +
    '</svg>';

  var HEADER_HTML =
    '<header class="site-header">' +
      '<div class="canvas-wide flex items-center gap-4 py-4">' +
        '<a href="index.html#top" class="flex items-center" aria-label="Coastal Healthcare Advocates — home">' +
          '<span class="brand-logo" role="img" aria-label="Coastal Healthcare Advocates"></span>' +
        '</a>' +
        '<div class="ml-auto flex items-center gap-4">' +
          '<nav class="hidden items-center gap-6 lg:flex" aria-label="Primary">' +
            '<a class="nav-link" href="index.html#services">Services</a>' +
            '<a class="nav-link" href="index.html#who">Who we help</a>' +
            '<a class="nav-link" href="index.html#about">About</a>' +
            '<a class="nav-link" href="index.html#how">How it works</a>' +
            '<a class="nav-link" href="index.html#pricing">Pricing</a>' +
            '<a class="nav-link" href="index.html#faqs">FAQs</a>' +
          '</nav>' +
          '<button type="button" class="header-icon-btn lg:hidden" id="nav-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">' +
            '<svg class="icon" aria-hidden="true"><use href="#i-menu"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<nav id="mobile-nav" class="canvas-wide hidden pb-4 lg:hidden" aria-label="Primary (mobile)" hidden>' +
        '<ul class="flex flex-col gap-1 border-t border-line pt-3">' +
          '<li><a class="nav-link block py-2" href="index.html#services">Services</a></li>' +
          '<li><a class="nav-link block py-2" href="index.html#who">Who we help</a></li>' +
          '<li><a class="nav-link block py-2" href="index.html#about">About Lindsey</a></li>' +
          '<li><a class="nav-link block py-2" href="index.html#how">How it works</a></li>' +
          '<li><a class="nav-link block py-2" href="index.html#pricing">Pricing</a></li>' +
          '<li><a class="nav-link block py-2" href="index.html#faqs">FAQs</a></li>' +
        '</ul>' +
      '</nav>' +
    '</header>';

  var FOOTER_HTML =
    '<footer class="site-footer on-dark">' +
      '<div class="canvas-wide py-14">' +
        '<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">' +
          '<div class="lg:col-span-1">' +
            '<img src="assets/logomarks/logos/logo-horizontal-reversed.svg" alt="Coastal Healthcare Advocates" width="212" height="64" class="h-16 w-auto">' +
            '<p class="meta mt-4" style="color:rgba(245,251,255,.7)">Understanding Benefits. Resolving Bills. Advocating for You.</p>' +
          '</div>' +
          '<nav aria-label="Site sections">' +
            '<p class="footer-col-title">Explore</p>' +
            '<ul class="flex flex-col gap-2">' +
              '<li><a href="index.html#services">Services</a></li>' +
              '<li><a href="index.html#who">Who we help</a></li>' +
              '<li><a href="index.html#about">About Lindsey</a></li>' +
              '<li><a href="index.html#how">How it works</a></li>' +
              '<li><a href="index.html#pricing">Pricing</a></li>' +
              '<li><a href="index.html#faqs">FAQs</a></li>' +
            '</ul>' +
          '</nav>' +
          '<nav aria-label="Legal">' +
            '<p class="footer-col-title">Legal</p>' +
            '<ul class="flex flex-col gap-2">' +
              '<li><a href="accessibility.html">Accessibility statement</a></li>' +
              '<li><a href="privacy.html">Privacy Notice</a></li>' +
              '<li><a href="t&amp;c.html">Terms &amp; Conditions</a></li>' +
              '<li><a href="financial-responsibility-agreement.html">Financial Responsibility Agreement</a></li>' +
              '<li><button type="button" id="cookie-prefs" class="footer-linkish">Cookie preferences</button></li>' +
            '</ul>' +
          '</nav>' +
          '<div>' +
            '<p class="footer-col-title">Contact</p>' +
            '<address class="not-italic flex flex-col gap-2">' +
              '<a href="tel:+17575740771" class="num">757-574-0771</a>' +
              '<a href="mailto:coastalhealthcareadvocates@gmail.com" class="break-words">coastalhealthcareadvocates@gmail.com</a>' +
              '<span style="color:rgba(245,251,255,.72)">Virginia Beach &amp; Hampton Roads, VA</span>' +
            '</address>' +
            '<div class="mt-4 flex items-center gap-3">' +
              '<a href="https://www.linkedin.com/in/lindsey-hewitt-1856b5136/" rel="noopener" aria-label="Lindsey Hewitt on LinkedIn" class="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-white/60">' +
                '<svg class="icon" aria-hidden="true"><use href="#i-linkedin"/></svg>' +
              '</a>' +
              '<a href="https://www.facebook.com/profile.php?id=61590633634414" rel="noopener" aria-label="Coastal Healthcare Advocates on Facebook" class="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-white/60">' +
                '<svg class="icon" aria-hidden="true"><use href="#i-facebook"/></svg>' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mt-12 flex flex-col gap-x-10 gap-y-6 border-t border-white/15 pt-8 md:flex-row md:flex-wrap md:items-center md:justify-between">' +
          '<div class="flex flex-wrap items-center gap-x-8 gap-y-4">' +
            '<a href="https://www.gnanow.org/" rel="noopener" class="gna-badge shrink-0" aria-label="Greater National Advocates — verified member">' +
              '<img src="assets/img/gna-logo-white.svg" alt="Greater National Advocates — verified member" width="361" height="49" class="block h-9 w-auto">' +
            '</a>' +
            '<button type="button" id="theme-toggle" class="theme-switch" aria-label="Switch to dark theme">' +
              '<span class="theme-switch-track">' +
                '<span class="theme-switch-knob">' +
                  '<svg class="theme-switch-ico theme-icon-light" aria-hidden="true"><use href="#i-sun"/></svg>' +
                  '<svg class="theme-switch-ico theme-icon-dark" aria-hidden="true"><use href="#i-moon"/></svg>' +
                '</span>' +
              '</span>' +
              '<span class="sr-only theme-toggle-label">Dark theme</span>' +
            '</button>' +
          '</div>' +
          '<div class="meta flex flex-col gap-1" style="color:rgba(245,251,255,.72)">' +
            '<span>Not for medical emergencies — call 911.</span>' +
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
          '<button type="button" class="btn btn-ghost" data-consent="necessary">Necessary only</button>' +
          '<button type="button" class="btn btn-primary" data-consent="all">Accept analytics</button>' +
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
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) {
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
