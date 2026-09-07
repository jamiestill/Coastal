// Coastal Healthcare Advocates — nav disclosure, FAQ accordion, anchor focus.
// No framework. Loaded as <script type="module"> (deferred).

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* -------------------------------------------------------------------------
   Mobile navigation disclosure
   ---------------------------------------------------------------------- */
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (navToggle && mobileNav) {
  const setNav = (open) => {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      mobileNav.hidden = false;
      mobileNav.classList.remove('hidden');
      // next frame, so the reveal transition actually runs from its start state
      requestAnimationFrame(() => mobileNav.classList.add('is-open'));
    } else {
      mobileNav.classList.remove('is-open');
      mobileNav.hidden = true;
      mobileNav.classList.add('hidden');
    }
  };

  navToggle.addEventListener('click', () => {
    setNav(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close after choosing a destination, or on Escape.
  mobileNav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setNav(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      setNav(false);
      navToggle.focus();
    }
  });
  // Reset when leaving the mobile breakpoint.
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches) setNav(false);
  });
}

/* -------------------------------------------------------------------------
   FAQ accordion  (<button aria-expanded aria-controls> + panel[hidden])
   ---------------------------------------------------------------------- */
document.querySelectorAll('.faq-trigger').forEach((trigger) => {
  const panel = document.getElementById(trigger.getAttribute('aria-controls'));
  if (!panel) return;
  trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!open));
    panel.hidden = open;
  });
});

/* -------------------------------------------------------------------------
   Move focus to the target region after in-page navigation, so keyboard
   and screen-reader users land where sighted users' eyes go.
   ---------------------------------------------------------------------- */
function focusTarget(hash) {
  if (!hash || hash === '#') return;
  const el = document.querySelector(hash);
  if (!el) return;
  const hadTabindex = el.hasAttribute('tabindex');
  if (!hadTabindex) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  if (!hadTabindex) {
    el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true });
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    if (hash.length < 2) return;
    const el = document.querySelector(hash);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    history.pushState(null, '', hash);
    // Wait a frame so scroll starts before focus (avoids a focus-jump fight).
    requestAnimationFrame(() => focusTarget(hash));
  });
});

/* -------------------------------------------------------------------------
   Slide the sticky header out of the way as the visitor nears the end of
   the page — the closing CTA and footer become the focus, and the nav has
   nothing left to scroll to. Reveal it again on any upward scroll.
   ---------------------------------------------------------------------- */
const header = document.querySelector('.site-header');
const tail = document.querySelector('#schedule') || document.querySelector('footer');

if (header && tail) {
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const goingUp = y < lastY - 2;
    lastY = y;
    // Distance from the viewport bottom to the top of the closing region.
    const gap = tail.getBoundingClientRect().top - window.innerHeight;
    const nearTail = gap < window.innerHeight * 0.45;
    header.classList.toggle('header-hidden', nearTail && !goingUp);
  };

  update();
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );
}
