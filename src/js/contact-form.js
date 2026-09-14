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
  const errIds = ['name', 'email', 'phone', 'consent', 'recaptcha'].map((k) => `${prefix}-${k}`);

  // Tie each field to its error span, so a screen reader announces the message
  // whenever focus lands on an invalid field (not only via the error summary).
  errIds.forEach((id) => {
    const input = document.getElementById(id);
    if (!input || !document.getElementById(`${id}-err`)) return;
    const ids = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (!ids.includes(`${id}-err`)) ids.push(`${id}-err`);
    input.setAttribute('aria-describedby', ids.join(' '));
  });

  // Message length: a visible "n of 600 characters" count, plus a polite screen-reader note
  // only at 50, 20 and 0 characters left (not on every keystroke).
  const messageField = form.elements.message;
  const countEl = document.getElementById(`${prefix}-message-count`);
  const countLive = document.getElementById(`${prefix}-message-count-live`);
  function updateCount() {
    if (!messageField || !countEl) return;
    const max = Number(messageField.getAttribute('maxlength')) || 600;
    const used = messageField.value.length;
    const left = max - used;
    countEl.textContent = `${used} of ${max} characters`;
    countEl.classList.toggle('is-near', left <= 50);
    if (countLive && [50, 20, 0].includes(left)) {
      countLive.textContent = left === 0 ? 'Character limit reached.' : `${left} characters left.`;
    }
  }
  messageField?.addEventListener('input', updateCount);
  updateCount();

  // Preferred contact method: a ticked method needs its matching detail.
  const prefers = (method) => !!form.querySelector(`input[name="preferred"][value="${method}"]:checked`);

  // Filling in an email or phone ticks its matching method; clearing it unticks,
  // so an emptied field can't leave a stale preference that fails validation.
  // Only an empty ↔ filled transition touches the box, so a visitor who unticks
  // one isn't overruled on every keystroke. Autofill is why this listens so
  // widely: Safari and some password managers fire `input` but not `change`, and
  // some extensions set the value with no event at all — so it also re-syncs
  // when focus moves within the form and just before validation.
  const contactPairs = [['email', 'Email'], ['phone', 'Phone']]
    .map(([field, method]) => ({
      input: form.elements[field],
      box: form.querySelector(`input[name="preferred"][value="${method}"]`),
    }))
    .filter((p) => p.input && p.box);
  contactPairs.forEach((p) => {
    p.filled = !!p.input.value.trim();
  });
  function syncPreferred() {
    contactPairs.forEach((p) => {
      const filled = !!p.input.value.trim();
      if (filled !== p.filled) p.box.checked = filled;
      p.filled = filled;
    });
  }
  contactPairs.forEach((p) => {
    p.input.addEventListener('input', syncPreferred);
    p.input.addEventListener('change', syncPreferred);
  });
  form.addEventListener('focusin', syncPreferred);

  /* ---- reCAPTCHA v2 (Netlify) ----------------------------------- */
  // Netlify's post-processing swaps <div data-netlify-recaptcha> for a real
  // .g-recaptcha widget and injects Google's api.js at deploy time. None of that
  // happens on `npm run dev`, so every helper below degrades to a no-op when the
  // widget or the grecaptcha global is absent, and validation simply skips it.
  function captchaWidget() {
    return form.querySelector('.g-recaptcha');
  }
  function captchaActive() {
    return !!captchaWidget() && !!window.grecaptcha;
  }
  function captchaId() {
    const raw = captchaWidget()?.dataset.widgetId;
    return raw === undefined || raw === '' ? undefined : Number(raw);
  }
  // The modal clone carries data-pending-sitekey until modal.js renders it and
  // stamps data-widget-id. Until then it has no token of its own — don't let
  // getResponse() fall through to the inline widget's id.
  function captchaPending() {
    const el = captchaWidget();
    return !!el && el.hasAttribute('data-pending-sitekey') && !el.dataset.widgetId;
  }
  function captchaResponse() {
    if (!captchaActive() || captchaPending()) return '';
    try {
      return window.grecaptcha.getResponse(captchaId()) || '';
    } catch {
      return '';
    }
  }
  function resetCaptcha() {
    if (!captchaActive()) return;
    try {
      window.grecaptcha.reset(captchaId());
    } catch {
      /* not rendered yet — nothing to reset */
    }
  }

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
  function markInvalid(id) {
    document.getElementById(id)?.setAttribute('aria-invalid', 'true');
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
    syncPreferred(); // catch an autofill that fired no events
    errIds.forEach(clearError);

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const consent = form.elements.consent.checked;

    if (!name) errors.push(setError(`${prefix}-name`, 'Please enter your name.'));
    if (email && !EMAIL_RE.test(email))
      errors.push(setError(`${prefix}-email`, 'That email address doesn’t look right.'));
    if (!email && !phone) {
      errors.push(setError(`${prefix}-phone`, 'Please give us an email or a phone number.'));
      markInvalid(`${prefix}-email`);
    }
    if (prefers('Phone') && !phone && !errors.some((er) => er.id === `${prefix}-phone`))
      errors.push(setError(`${prefix}-phone`, 'You chose phone as your contact method. Please add a phone number, or untick Phone.'));
    if (prefers('Email') && !email && !errors.some((er) => er.id === `${prefix}-email`))
      errors.push(setError(`${prefix}-email`, 'You chose email as your contact method. Please add an email address, or untick Email.'));
    if (!consent)
      errors.push(setError(`${prefix}-consent`, 'Please confirm you’ve read the Privacy Notice.'));
    if (captchaActive() && !captchaResponse())
      errors.push(setError(`${prefix}-recaptcha`, 'Please tick the “I’m not a robot” box.'));

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

  // Re-check a flagged field when the visitor leaves it: clear the error only once
  // the value is actually fixed, so tabbing through never wipes a live error.
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function recheck(el) {
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const hasContact = !!(email || phone);
    const emailOk = !email || EMAIL_RE.test(email);
    switch (el.name) {
      case 'name':
        if (el.value.trim()) clearError(el.id);
        break;
      case 'email':
      case 'phone':
      case 'preferred':
        if (hasContact && (!prefers('Phone') || phone)) clearError(`${prefix}-phone`);
        if (hasContact && emailOk && (!prefers('Email') || email)) clearError(`${prefix}-email`);
        break;
      case 'consent':
        if (el.checked) clearError(el.id);
        break;
    }
  }
  form.querySelectorAll('input, textarea').forEach((el) => {
    const evt = el.type === 'checkbox' ? 'change' : 'blur';
    el.addEventListener(evt, () => {
      if (el.getAttribute('aria-invalid') === 'true' || ['email', 'phone', 'preferred'].includes(el.name)) recheck(el);
    });
  });

  /* ---- submit → Netlify Forms ----------------------------------- */
  const MIN_FILL_MS = 2000;
  let deferredSubmit = null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: bots fill the hidden field — drop silently.
    if (form.elements.company && form.elements.company.value !== '') return;

    // Time trap: a person using autofill can beat 2 s too, so instead of
    // silently discarding, validate now and hold the send until the window has
    // passed (bots rarely wait; people see "Sending…" for a moment).
    const elapsed = Date.now() - Number(openedAtField.value || 0);
    if (elapsed < MIN_FILL_MS) {
      if (!validate() || deferredSubmit) return;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }
      deferredSubmit = setTimeout(() => {
        deferredSubmit = null;
        if (submitBtn) submitBtn.disabled = false;
        form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true }));
      }, MIN_FILL_MS - elapsed + 50);
      return;
    }

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
      opts.onSuccess?.();
      window.chaTrack?.('contact_submitted'); // no field data
    } catch (err) {
      resetCaptcha(); // the token is single-use — hand the visitor a fresh challenge
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
    /** Whether the success panel is currently showing. */
    get submitted() {
      return form.hidden && !!successPanel && !successPanel.hidden;
    },
    /** Whether the visitor has typed or chosen anything (the privacy tick aside). */
    get dirty() {
      return [...form.elements].some((el) => {
        if (['consent', 'company', 'g-recaptcha-response'].includes(el.name)) return false;
        if (el.type === 'checkbox' || el.type === 'radio') return el.checked !== el.defaultChecked;
        if (el.tagName === 'SELECT') {
          const def = [...el.options].findIndex((o) => o.defaultSelected);
          return el.selectedIndex !== (def === -1 ? 0 : def);
        }
        if (el.tagName !== 'TEXTAREA' && el.tagName !== 'INPUT') return false;
        if (['hidden', 'submit', 'button'].includes(el.type)) return false;
        return el.value.trim() !== el.defaultValue.trim();
      });
    },
    /** Return to a blank, visible form, errors cleared (the modal calls this on open and close). */
    reset() {
      if (deferredSubmit) {
        // A held (time-trapped) send never went out — hand back a live button.
        clearTimeout(deferredSubmit);
        deferredSubmit = null;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
        }
      }
      form.reset();
      contactPairs.forEach((p) => {
        p.filled = false;
      });
      updateCount();
      errIds.forEach(clearError);
      resetCaptcha();
      if (errorSummary) errorSummary.hidden = true;
      if (successPanel) successPanel.hidden = true;
      form.hidden = false;
      opts.onReset?.();
    },
    /** Show the success state without a submit (the no-JS /thanks landing). */
    showSuccess() {
      form.hidden = true;
      if (successPanel) successPanel.hidden = false;
    },
  };
}

// Inline intake form: self-initialise on import when it's present on the page.
const inlineForm = document.getElementById('intake-form');
if (inlineForm) {
  const inline = initContactForm(inlineForm);
  // A native (no-JS) POST lands on /thanks, which Netlify serves as index.html.
  // If scripts are running on that URL, confirm the send instead of showing a
  // blank form that invites a duplicate submission.
  if (inline && location.pathname.replace(/\/$/, '') === '/thanks') {
    inline.showSuccess();
    document.getElementById('intake')?.scrollIntoView({ block: 'start' });
  }
}
