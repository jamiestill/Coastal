/* Coastal Healthcare Advocates — assemble email links at runtime.

   The address never appears whole in the HTML or the JS, so crawlers that
   scan pages for "@" or "mailto:" don't collect it. Authored markup:

     <a href="#intake" data-email-user="coastalhealthcareadvocates"
        data-email-domain="gmail.com">Email us</a>

   The href and text are the no-JS fallback (a route to the contact form).
   With JS the link becomes a mailto: and its text — or the text of a
   [data-email-text] child, so an icon beside it survives — becomes the
   address, with a <wbr> before the "@" so it can wrap on narrow screens.

   A plain <script defer> in <head>: it runs once parsing is done, after
   partials.js has injected the footer. contact-form.js calls
   window.chaEmailLinks(root) for markup it adds later. */
(function () {
  'use strict';

  function build(root) {
    (root || document).querySelectorAll('a[data-email-user]').forEach(function (a) {
      var user = a.getAttribute('data-email-user');
      var domain = a.getAttribute('data-email-domain');
      if (!user || !domain) return;
      var at = String.fromCharCode(64);
      a.href = 'mailto:' + user + at + domain;
      var label = a.querySelector('[data-email-text]') || a;
      label.textContent = user;
      label.appendChild(document.createElement('wbr'));
      label.appendChild(document.createTextNode(at + domain));
      a.removeAttribute('data-email-user');
      a.removeAttribute('data-email-domain');
    });
  }

  window.chaEmailLinks = build;
  build(document);
})();
