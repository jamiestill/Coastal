// Coastal Healthcare Advocates — persistent bottom CTA bar.
// Reveals after the hero; hides over the intake / schedule / footer region and
// while the contact dialog is open. Dismissible for the session.

const bar = document.getElementById('sticky-cta');
if (bar) {
  const sentinel = document.getElementById('hero-sentinel');
  const endZones = ['#intake', '#schedule', 'footer']
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);

  const DISMISS_KEY = 'cha-cta-dismissed';
  let dismissed = false;
  try {
    dismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch (_) {}

  let pastHero = false;
  let inEndZone = false;
  let modalOpen = false;

  function render() {
    const show = pastHero && !inEndZone && !modalOpen && !dismissed;
    bar.hidden = !show;
    // allow the transition to run after 'hidden' is cleared
    requestAnimationFrame(() => bar.classList.toggle('is-visible', show));
  }

  bar.querySelector('.sticky-dismiss')?.addEventListener('click', () => {
    dismissed = true;
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch (_) {}
    render();
  });

  document.addEventListener('contact:open', () => {
    modalOpen = true;
    render();
  });
  document.addEventListener('contact:close', () => {
    modalOpen = false;
    render();
  });

  if ('IntersectionObserver' in window && sentinel) {
    new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        render();
      },
      { rootMargin: '0px 0px -100% 0px' }
    ).observe(sentinel);

    if (endZones.length) {
      const endObserver = new IntersectionObserver(
        (entries) => {
          const anyVisible = entries.some((e) => e.isIntersecting);
          // recompute across all zones, not just the changed ones
          inEndZone =
            anyVisible ||
            endZones.some((z) => {
              const r = z.getBoundingClientRect();
              return r.top < window.innerHeight && r.bottom > 0;
            });
          render();
        },
        { threshold: 0.01 }
      );
      endZones.forEach((z) => endObserver.observe(z));
    }
  } else {
    // Fallback: throttled scroll check.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const heroBottom = sentinel ? sentinel.getBoundingClientRect().top : 600;
        pastHero = heroBottom < 0;
        inEndZone = endZones.some((z) => {
          const r = z.getBoundingClientRect();
          return r.top < window.innerHeight && r.bottom > 0;
        });
        render();
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}
