// Coastal Healthcare Advocates — shared contact-form behaviour.
// Inline validation, honeypot + time-trap, Netlify Forms submit, and
// success / error states. This module self-initialises the inline #intake-form
// on import, and modal.js imports it to wire the lightbox's cloned copy. The
// form still submits natively to /thanks when JavaScript is unavailable.

export function initContactForm(form, opts = {}) {
  if (!form) return null;

  const errorSummary = opts.errorSummary || form.querySelector('[data-contact-errors]');
  const successPanel =
    opts.successPanel || form.parentElement?.querySelector('[data-contact-success]');
  const submitBtn = opts.submitBtn || form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn ? submitBtn.textContent : 'Send message';

  const contextField = form.querySelector('input[name="context"]');
  const pageField = form.querySelector('input[name="page"]');

  let openedAtField = form.querySelector('input[name="opened_at"]');
  if (!openedAtField) {
    openedAtField = document.createElement('input');
    openedAtField.type = 'hidden';
    openedAtField.name = 'opened_at';
    form.appendChild(openedAtField);
  }
  openedAtField.value = String(Date.now());
  if (pageField) pageField.value = location.pathname;

  // Field-id prefix, e.g. "cf" (modal) or "in" (inline).
  const prefix = (form.elements.name?.id || 'cf-name').replace(/-name$/, '');
  const errIds = ['name', 'email', 'phone', 'consent'].map((k) => `${prefix}-${k}`);

  /* ---- validation ------------------------------------------------- */
  function setError(id, message) {
    const input = document.getElementById(id);
    const err = document.getElementById(`${id}-err`);
    if (input) input.setAttribute('aria-invalid', 'true');
    if (err) {
      err.textContent = message;
      err.hidden = false;
    }
    return { id, message };
  }
  function clearError(id) {
    const input = document.getElementById(id);
    const err = document.getElementById(`${id}-err`);
    if (input) input.removeAttribute('aria-invalid');
    if (err) {
      err.textContent = '';
      err.hidden = true;
    }
  }

  function validate() {
    const errors = [];
    errIds.forEach(clearError);

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const consent = form.elements.consent.checked;

    if (!name) errors.push(setError(`${prefix}-name`, 'Please enter your name.'));
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push(setError(`${prefix}-email`, 'That email address doesn’t look right.'));
    if (!email && !phone)
      errors.push(setError(`${prefix}-phone`, 'Please give us an email or a phone number.'));
    if (!consent)
      errors.push(setError(`${prefix}-consent`, 'Please confirm you’ve read the Privacy Notice.'));

    if (errors.length && errorSummary) {
      errorSummary.innerHTML =
        '<strong>Please check the form:</strong><ul style="margin:.4rem 0 0;padding-left:1.1rem">' +
        errors.map((er) => `<li><a href="#${er.id}">${er.message}</a></li>`).join('') +
        '</ul>';
      errorSummary.hidden = false;
      errorSummary.setAttribute('tabindex', '-1');
      errorSummary.focus();
      errorSummary.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', (ev) => {
          ev.preventDefault();
          document.getElementById(a.getAttribute('href').slice(1))?.focus();
        });
      });
    } else if (errorSummary) {
      errorSummary.hidden = true;
    }
    return errors.length === 0;
  }

  form.querySelectorAll('input, textarea').forEach((el) => {
    el.addEventListener('blur', () => {
      if (el.id) clearError(el.id);
    });
  });

  /* ---- submit → Netlify Forms ----------------------------------- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot + time trap (bots fill hidden fields / submit instantly).
    if (form.elements.company && form.elements.company.value !== '') return;
    if (Date.now() - Number(openedAtField.value || 0) < 2000) return;

    if (!validate()) return;

    if (submitBtn) {
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    const data = new FormData(form);
    const body = new URLSearchParams();
    for (const [k, v] of data.entries()) body.append(k, v);

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.hidden = true;
      if (errorSummary) errorSummary.hidden = true;
      if (successPanel) {
        successPanel.hidden = false;
        successPanel.setAttribute('tabindex', '-1');
        successPanel.focus();
      }
      window.chaTrack?.('contact_submitted'); // no field data
    } catch (err) {
      if (errorSummary) {
        errorSummary.innerHTML =
          'Something went wrong sending your message. Please call ' +
          '<a href="tel:+17575740771">757-574-0771</a> or email ' +
          '<a href="mailto:coastalhealthcareadvocates@gmail.com">coastalhealthcareadvocates@gmail.com</a>.';
        errorSummary.hidden = false;
        errorSummary.setAttribute('tabindex', '-1');
        errorSummary.focus();
      }
    } finally {
      if (submitBtn) {
        submitBtn.removeAttribute('aria-busy');
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
    }
  });

  return {
    form,
    validate,
    /** Re-baseline the time-trap (call when a modal opens). */
    stampOpened() {
      openedAtField.value = String(Date.now());
    },
    /** Set the hidden context field (crisis / referrer). */
    setContext(ctx) {
      if (contextField) contextField.value = ctx || 'crisis';
    },
  };
}

// Inline intake form: self-initialise on import when it's present on the page.
const inlineForm = document.getElementById('intake-form');
if (inlineForm) initContactForm(inlineForm);
