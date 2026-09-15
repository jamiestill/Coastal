/* Coastal Healthcare Advocates — assemble email and phone links at runtime.

   Neither the address nor the phone number appears whole in the HTML or the
   JS, so crawlers that scan pages for "@", "mailto:", "tel:" or a ten-digit
   number don't collect them. Authored markup:

     <a href="#intake" data-email-user="info"
        data-email-domain="coastalhealthcareadvocates.org">Email us</a>
     <a href="#intake" data-tel-area="757" data-tel-line="5740771">Call us</a>

   The href and text are the no-JS fallback (a route to the contact form).
   With JS an email link becomes a mailto: and its text — or the text of a
   [data-email-text] child, so an icon beside it survives — becomes the
   address, with a <wbr> before the "@" so it can wrap on narrow screens.
   A phone link becomes a tel: and its text — or a [data-tel-text] child's,
   so "Call " before it survives — becomes "(757) 574-0771".

   A plain <script defer> in <head>: it runs once parsing is done, after
   partials.js has injected the footer. contact-form.js calls
   window.chaEmailLinks(root), which builds both kinds, for markup it adds
   later. */
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
    (root || document).querySelectorAll('a[data-tel-area]').forEach(function (a) {
      var area = a.getAttribute('data-tel-area');
      var line = a.getAttribute('data-tel-line');
      if (!area || !line) return;
      a.href = 'tel:+1' + area + line;
      var label = a.querySelector('[data-tel-text]') || a;
      label.textContent = '(' + area + ') ' + line.slice(0, 3) + '-' + line.slice(3);
      a.removeAttribute('data-tel-area');
      a.removeAttribute('data-tel-line');
    });
  }

  window.chaEmailLinks = build;
  build(document);
})();
