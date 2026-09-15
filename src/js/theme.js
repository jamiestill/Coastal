/* Coastal Healthcare Advocates — light/dark theme.
   Loaded blocking in <head> so the stored choice applies before first paint
   (CSS custom properties + the CSS-swapped logo follow the [data-theme] attr).
   The page follows the device's light/dark setting unless the visitor picks
   one with the toggle. That pick is kept (localStorage, with the time it was
   made) for 8 hours; after that the device setting applies again. Not an ES
   module: it must run synchronously. */
(function () {
  var KEY = 'cha-theme';
  var TTL = 8 * 60 * 60 * 1000; // how long a toggled pick lasts
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  // The pick from the last 8 hours, or null. An older pick (or an unreadable
  // value, such as the bare 'light'/'dark' earlier builds stored) is removed.
  function stored() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var saved = null;
      try { saved = JSON.parse(raw); } catch (e) {}
      var age = saved ? Date.now() - saved.at : NaN;
      if (age >= 0 && age < TTL && (saved.theme === 'light' || saved.theme === 'dark')) {
        return saved.theme;
      }
      localStorage.removeItem(KEY);
    } catch (e) {}
    return null;
  }
  function save(theme) {
    try { localStorage.setItem(KEY, JSON.stringify({ theme: theme, at: Date.now() })); } catch (e) {}
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

  // 2. Wire the toggles (mobile menu + footer) once the header and footer exist.
  //    Every switch mirrors the one state; its look follows aria-pressed.
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    if (!btns.length) return;
    function sync() {
      var isDark = effective() === 'dark';
      btns.forEach(function (btn) {
        btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        btn.setAttribute('aria-pressed', String(isDark));
        var label = btn.querySelector('.theme-toggle-label');
        if (label) label.textContent = isDark ? 'Light theme' : 'Dark theme';
      });
    }
    sync();
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = effective() === 'dark' ? 'light' : 'dark';
        save(next);
        crossfade();
        apply(next);
        sync();
      });
    });
    // Track OS changes only while the visitor hasn't made an explicit choice.
    mq.addEventListener('change', function () {
      if (!stored()) { apply(null); sync(); }
    });
  });
})();
