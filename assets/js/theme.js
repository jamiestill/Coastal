/* Coastal Healthcare Advocates — light/dark theme.
   Loaded blocking in <head> so the stored choice applies before first paint
   (CSS custom properties + the CSS-swapped logo follow the [data-theme] attr).
   Not an ES module: it must run synchronously. */
(function () {
  var KEY = 'cha-theme';
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function effective() {
    var s = stored();
    return s === 'light' || s === 'dark' ? s : (mq.matches ? 'dark' : 'light');
  }
  function apply(choice) {
    if (choice === 'light' || choice === 'dark') root.setAttribute('data-theme', choice);
    else root.removeAttribute('data-theme'); // follow the OS
  }

  // 1. Apply the stored choice immediately (no flash), and mark JS on.
  apply(stored());
  root.classList.add('js');

  // The hero's one authored entrance runs once per browsing session. Deciding it
  // here — before <body> paints — avoids any flash of the pre-animation state.
  try {
    if (!sessionStorage.getItem('cha-hero-seen')) {
      root.classList.add('hero-intro');
      sessionStorage.setItem('cha-hero-seen', '1');
    }
  } catch (e) {}

  // Smooth the light/dark change like dusk falling — bounded, and only ever on
  // an explicit toggle, never on load.
  var themeTimer;
  function crossfade() {
    root.classList.add('theme-transition');
    clearTimeout(themeTimer);
    themeTimer = setTimeout(function () {
      root.classList.remove('theme-transition');
    }, 320);
  }

  // 2. Wire the toggle once the header exists.
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var label = btn.querySelector('.theme-toggle-label');
    function sync() {
      var isDark = effective() === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('aria-pressed', String(isDark));
      if (label) label.textContent = isDark ? 'Light theme' : 'Dark theme';
    }
    sync();
    btn.addEventListener('click', function () {
      var next = effective() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      crossfade();
      apply(next);
      sync();
    });
    // Track OS changes only while the visitor hasn't made an explicit choice.
    mq.addEventListener('change', function () {
      if (!stored()) { apply(null); sync(); }
    });
  });
})();
