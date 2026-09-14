// Coastal Healthcare Advocates — accessible contact lightbox.
// Opened with dialog.show(), not showModal(): showModal()'s top-layer
// ::backdrop paints above reCAPTCHA's own high-z-index challenge overlay and
// obscures it (see the comment on #contact-modal in src/input.css). So this
// hand-rolls what showModal() would otherwise give for free: a real backdrop
// element (#contact-backdrop) for the dimmed background + outside-click-to-
// close, `inert` on the rest of <body> while open, and manual Escape handling
// -- plus the focus trap, scroll-lock, and return-focus every dialog needs.
// Form validation + Netlify submit come from contact-form.js, shared with the
// inline intake form.
//
// The modal has almost no markup of its own: it clones #intake-form (the one
// authored copy, which also serves as the no-JS fallback and the form Netlify
// detects at build time) plus the inline success panel, and re-keys the form's
// id prefix from "in-" to "cf-" so the two instances coexist in one document.
// The PHI note rides along inside the form clone.

import { initContactForm } from './contact-form.js';

const dialog = document.getElementById('contact-modal');
const backdrop = document.getElementById('contact-backdrop');
const source = document.getElementById('intake-form');
if (dialog && source) {
  const rekey = (v) => (v ? v.replace(/\bin-/g, 'cf-') : v);

  const form = source.cloneNode(true);
  form.id = 'contact-form';
  // The modal supplies its own padding/scroll chrome; drop the inline card layout.
  form.classList.remove('card', 'mx-auto', 'mt-8', 'max-w-measure', 'p-6', 'sm:p-8');
  form.querySelectorAll('[id]').forEach((el) => { el.id = rekey(el.id); });
  form.querySelectorAll('[for]').forEach((el) => { el.htmlFor = rekey(el.htmlFor); });
  form.querySelectorAll('[aria-describedby]').forEach((el) => {
    el.setAttribute('aria-describedby', rekey(el.getAttribute('aria-describedby')));
  });
  // The PHI note rides along in the clone (id in- → cf-); give it the modal's top gap.
  form.querySelector('[data-phi-note]')?.classList.add('mt-3');

  // reCAPTCHA: a cloned widget iframe is dead and the cloned api.js <script>
  // won't re-run. Strip both, park the site key, and render this second widget
  // explicitly the first time the modal opens — so only the inline form's widget
  // is picked up by api.js's auto-render.
  form.querySelectorAll('script').forEach((s) => s.remove());
  const modalCaptcha = form.querySelector('.g-recaptcha');
  if (modalCaptcha) {
    modalCaptcha.dataset.pendingSitekey = modalCaptcha.getAttribute('data-sitekey') || '';
    modalCaptcha.removeAttribute('data-sitekey'); // keep api.js auto-render off the clone
    modalCaptcha.innerHTML = '';
  }
  function ensureModalCaptcha() {
    const el = form.querySelector('.g-recaptcha');
    if (!el || el.dataset.widgetId || !window.grecaptcha || !window.grecaptcha.render) return;
    try {
      el.dataset.widgetId = String(
        window.grecaptcha.render(el, { sitekey: el.dataset.pendingSitekey })
      );
    } catch {
      /* api.js not settled yet — the next open retries */
    }
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.classList.remove('sm:w-auto'); // full-width in the modal
  // Label ("Start Your Consultation") rides along in the clone — authored once on #intake-form.

  dialog.querySelector('[data-contact-form-mount]').replaceWith(form);

  // Point the dialog's description at the cloned PHI note (id exists only post-clone).
  dialog.setAttribute('aria-describedby', 'cf-phi');

  // Success panel: clone the inline one so the headline / copy live in one place.
  const successSrc = document.querySelector('[data-contact-success]');
  const success = successSrc.cloneNode(true);
  success.classList.remove('card', 'mx-auto', 'mt-8', 'max-w-measure', 'p-6');
  success.classList.add('mt-3'); // clear the modal title, which stays visible
  success.insertAdjacentHTML(
    'beforeend',
    '<p class="mt-5"><button type="button" class="btn btn-ghost" data-close-contact>Close</button></p>'
  );
  dialog.querySelector('[data-contact-success-mount]').replaceWith(success);

  // Booking-first block + title: after a send, hide the booking prompt and say so
  // in the title; a fresh open (contact.reset) restores both.
  const quickbook = dialog.querySelector('[data-quickbook]');
  const titleEl = dialog.querySelector('#cm-title');
  const titleText = titleEl?.textContent;

  const contact = initContactForm(form, {
    errorSummary: form.querySelector('[data-contact-errors]'),
    successPanel: success,
    submitBtn,
    onSuccess() {
      if (quickbook) quickbook.hidden = true;
      if (titleEl) titleEl.textContent = 'Message sent';
    },
    onReset() {
      if (quickbook) quickbook.hidden = false;
      if (titleEl) titleEl.textContent = titleText;
    },
  });

  const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // showModal() makes everything outside the dialog `inert` (unfocusable,
  // hidden from assistive tech) automatically; show() doesn't, so do it here.
  function setBackgroundInert(on) {
    for (const el of document.body.children) {
      if (el === dialog || el === backdrop) continue;
      if (on) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    }
  }

  let lastFocused = null;
  let scrollY = 0;
  // A close whose exit animation is still playing (the dialog stays [open]
  // until it ends). closeGen lets a stale animation settle without ending a
  // later close; closeTimer is the fallback if an animation never reports back.
  let closing = false;
  let closeGen = 0;
  let closeTimer = 0;

  /* ---- open / close ------------------------------------------------- */
  function openContact(trigger) {
    // Re-opened mid-exit: end that close now so the entrance replays cleanly.
    if (closing) finishClose();
    lastFocused = trigger || document.activeElement;
    // A previous send left the success panel up — start fresh.
    if (contact?.submitted) contact.reset();
    // Most triggers open the right-anchored drawer; a `data-variant="lightbox"`
    // trigger presents the same dialog as a centered lightbox instead.
    dialog.classList.toggle('is-lightbox', trigger?.dataset.variant === 'lightbox');
    contact?.setContext(trigger?.dataset.context);
    contact?.stampOpened();

    // Render (or retry rendering) the modal's reCAPTCHA once api.js is available.
    let capTries = 0;
    (function renderWhenReady() {
      if (window.grecaptcha && window.grecaptcha.render) return ensureModalCaptcha();
      if (capTries++ < 20) setTimeout(renderWhenReady, 200);
    })();

    // scroll lock
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    backdrop?.removeAttribute('hidden');
    setBackgroundInert(true);

    if (typeof dialog.show === 'function') {
      dialog.show();
    } else {
      dialog.setAttribute('open', ''); // very old browsers: degrade to inline
    }
    document.dispatchEvent(new CustomEvent('contact:open'));

    const first = dialog.querySelector('[data-quickbook]:not([hidden]) a') || dialog.querySelector('#cf-name') || dialog.querySelector(FOCUSABLE);
    first?.focus({ preventScroll: true });
  }

  function closeContact() {
    if (closing || !dialog.hasAttribute('open')) return;
    closing = true;

    // Hand the page back at once -- interactivity, scroll position, focus --
    // while the dialog plays its exit on top (.is-closing, src/input.css).
    // The page is parked exactly where it was, so releasing the lock under the
    // backdrop doesn't visibly move it. The dialog goes inert so nothing inside
    // it can take focus or clicks on the way out.
    setBackgroundInert(false);
    dialog.setAttribute('inert', '');

    // Release the scroll lock and jump straight back to where the visitor was.
    // 'instant' overrides the page's global `scroll-behavior: smooth`, which
    // would otherwise animate the page up from the parked top position.
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });

    lastFocused?.focus?.({ preventScroll: true });

    dialog.classList.add('is-closing');
    backdrop?.classList.add('is-closing');
    const gen = ++closeGen;
    const done = () => { if (gen === closeGen) finishClose(); };
    // No getAnimations() (old browsers) resolves immediately: an instant close.
    const exits = typeof dialog.getAnimations === 'function'
      ? [...dialog.getAnimations(), ...(backdrop?.getAnimations() ?? [])]
      : [];
    Promise.all(exits.map((a) => a.finished)).then(done, done);
    closeTimer = setTimeout(done, 500);
  }

  function finishClose() {
    if (!closing) return;
    closing = false;
    closeGen++;
    clearTimeout(closeTimer);

    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
    backdrop?.setAttribute('hidden', '');

    dialog.removeAttribute('inert');
    dialog.classList.remove('is-closing', 'is-lightbox');
    backdrop?.classList.remove('is-closing');
    document.dispatchEvent(new CustomEvent('contact:close'));
  }

  /* ---- wiring ----------------------------------------------------- */
  document.querySelectorAll('[data-open-contact]').forEach((btn) => {
    btn.addEventListener('click', () => openContact(btn));
  });
  dialog.querySelectorAll('[data-close-contact]').forEach((btn) => {
    btn.addEventListener('click', closeContact);
  });

  // ESC: showModal() fired a native 'cancel' event for this; show() doesn't,
  // so listen for the key directly.
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialog.open) {
      e.preventDefault();
      closeContact();
    }
  });

  // Outside click: with showModal() this was e.target === dialog (the
  // ::backdrop click target); with a real backdrop element, just listen on it.
  backdrop?.addEventListener('click', closeContact);

  // Focus trap
  dialog.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const items = [...dialog.querySelectorAll(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null || el === document.activeElement
    );
    if (!items.length) return;
    const firstEl = items[0];
    const lastEl = items[items.length - 1];
    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  });

  // Expose for other modules / debugging.
  window.chaOpenContact = openContact;
}
