// Coastal Healthcare Advocates — accessible contact lightbox.
// Native <dialog> for ESC / backdrop / top-layer; adds focus trap, scroll-lock,
// and return-focus. Form validation + Netlify submit come from contact-form.js,
// shared with the inline intake form.
//
// The modal has no form markup of its own: it clones #intake-form (the one
// authored copy, which also serves as the no-JS fallback and the form Netlify
// detects at build time) and re-keys its id prefix from "in-" to "cf-" so the
// two instances coexist in one document.

import { initContactForm } from './contact-form.js';

const dialog = document.getElementById('contact-modal');
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
  // The modal prints its own PHI note (#cm-phi) above the form.
  form.querySelector('[data-phi-note]')?.remove();

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.id = 'cf-submit';
  submitBtn.classList.remove('sm:w-auto'); // full-width in the modal
  submitBtn.textContent = 'Connect and start the conversation';

  dialog.querySelector('[data-contact-form-mount]').replaceWith(form);

  const contact = initContactForm(form, {
    errorSummary: form.querySelector('[data-contact-errors]'),
    successPanel: dialog.querySelector('[data-contact-success]'),
    submitBtn,
  });

  const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  let lastFocused = null;
  let scrollY = 0;

  /* ---- open / close ------------------------------------------------- */
  function openContact(trigger) {
    lastFocused = trigger || document.activeElement;
    contact?.setContext(trigger?.dataset.context);
    contact?.stampOpened();

    // scroll lock
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', ''); // very old browsers: degrade to inline
    }
    document.dispatchEvent(new CustomEvent('contact:open'));

    const first = dialog.querySelector('#cf-name') || dialog.querySelector(FOCUSABLE);
    first?.focus();
  }

  function closeContact() {
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);

    document.dispatchEvent(new CustomEvent('contact:close'));
    lastFocused?.focus?.();
  }

  /* ---- wiring ----------------------------------------------------- */
  document.querySelectorAll('[data-open-contact]').forEach((btn) => {
    btn.addEventListener('click', () => openContact(btn));
  });
  dialog.querySelectorAll('[data-close-contact]').forEach((btn) => {
    btn.addEventListener('click', closeContact);
  });

  // ESC (native 'cancel') → run our cleanup
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeContact();
  });

  // Backdrop click (event target is the dialog element itself)
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeContact();
  });

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
