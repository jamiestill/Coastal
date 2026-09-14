/* Coastal Healthcare Advocates — a soft click when a button is pressed.

   Synthesised with the Web Audio API, so there is no audio file to download:
   a very short band-passed noise transient (the "tick") over a quick, falling
   sine (the "body"), like tapping a wooden key. Pitch and filter drift a few
   percent on every press so repeated clicks feel played, not looped.

   Plays on `click`, so mouse, touch and keyboard (Enter / Space) all sound.
   Covers <button>, .btn links, [role="button"], submit inputs and <summary>;
   disabled controls and script-fired clicks stay silent. The audio context is
   created on the first press (browsers only allow audio after a gesture) and
   warmed on pointerdown so the first click isn't late.

   Silent when the visitor prefers reduced motion, or when localStorage
   "sound" is "off" (the hook for a future on/off control).

   A plain <script defer> in <head>, beside email.js. */
(function () {
  'use strict';

  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;

  var TARGETS = 'button, .btn, [role="button"], input[type="submit"], input[type="button"], summary';
  var VOLUME = 0.9; // peaks around -22 dBFS: present on laptop and phone speakers, never loud
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  var ctx = null;
  var out = null;
  var noise = null;
  var lastAt = 0;

  function muted() {
    if (reduce.matches) return true;
    try { return localStorage.getItem('sound') === 'off'; } catch (e) { return false; }
  }

  function target(e) {
    var el = e.target && e.target.closest ? e.target.closest(TARGETS) : null;
    if (!el || el.disabled || el.getAttribute('aria-disabled') === 'true') return null;
    return el;
  }

  function setup() {
    if (ctx) return ctx;
    try { ctx = new AC(); } catch (e) { return null; }

    // A gentle compressor keeps a flurry of presses from stacking into a clip.
    var comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -12;
    comp.knee.value = 6;
    comp.ratio.value = 8;
    comp.attack.value = 0.002;
    comp.release.value = 0.08;
    out = ctx.createGain();
    out.gain.value = VOLUME;
    out.connect(comp).connect(ctx.destination);

    // One reusable 60ms buffer of white noise for the transient.
    var len = Math.floor(ctx.sampleRate * 0.06);
    noise = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = noise.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return ctx;
  }

  function envelope(param, t, peak, attack, decay) {
    param.setValueAtTime(0.0001, t);
    param.exponentialRampToValueAtTime(peak, t + attack);
    param.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  function voice(c) {
    var t = c.currentTime + 0.002;
    var drift = 0.96 + Math.random() * 0.08;

    var tick = c.createBufferSource();
    tick.buffer = noise;
    var band = c.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 2300 * drift;
    band.Q.value = 1.3;
    var tickGain = c.createGain();
    envelope(tickGain.gain, t, 0.5, 0.001, 0.022);
    tick.connect(band).connect(tickGain).connect(out);
    tick.start(t);
    tick.stop(t + 0.05);

    var body = c.createOscillator();
    body.type = 'sine';
    body.frequency.setValueAtTime(540 * drift, t);
    body.frequency.exponentialRampToValueAtTime(360 * drift, t + 0.045);
    var bodyGain = c.createGain();
    envelope(bodyGain.gain, t, 0.16, 0.002, 0.05);
    body.connect(bodyGain).connect(out);
    body.start(t);
    body.stop(t + 0.08);
  }

  function play() {
    var c = setup();
    if (!c) return;
    if (c.state === 'running') {
      voice(c);
    } else {
      c.resume().then(function () {
        if (c.state === 'running') voice(c);
      }, function () {});
    }
  }

  // Warm the context during the press so the click lands on release.
  document.addEventListener('pointerdown', function (e) {
    if (muted() || !target(e)) return;
    var c = setup();
    if (c && c.state !== 'running') c.resume().catch(function () {});
  }, true);

  // Capture phase: sounds even if a handler stops the click from bubbling.
  document.addEventListener('click', function (e) {
    if (!e.isTrusted || muted() || !target(e)) return;
    var now = performance.now();
    if (now - lastAt < 40) return; // one sound per press, even if two elements match
    lastAt = now;
    play();
  }, true);
})();
