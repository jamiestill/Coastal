# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

Marketing website for **Coastal Healthcare Advocates** — a solo patient-advocacy practice
(Lindsey Hewitt; based in Virginia Beach, VA, serving Hampton Roads and Southern Virginia). The static site lives at the repo root
(`index.html` plus the legal / 404 pages); the brief, audience research, brand assets, and
reference imagery remain alongside it. `creative/Creative Brief.md` is the original spec.

## Build & local dev

- **Stack:** hand-authored static HTML + TailwindCSS, deployed on **Netlify** — Netlify Forms
  backs the intake form, `netlify.toml` redirects proxy Plausible analytics, and `netlify.toml`
  carries the security + cache headers. Netlify is the only host (no GitHub Pages).
- `netlify.toml` publishes the repo root (`publish = "."`), so it also 404s the working files
  that would otherwise be public: the `.md` docs, `creative/`, `Inspiration/`, `swag/`, `src/`,
  `scripts/`, `tools/`, the dot-folders and the package/lock/config files. Add a rule there
  whenever you add a new top-level file or folder that isn't part of the site.
- Run `npm install` once (Node ≥ 20). Then `npm run dev` for Tailwind `--watch` while editing
  `src/input.css`, or `npm run build` for the minified one-shot. Netlify runs `npm run build`.
- `assets/css/site.css` is **generated** — git-ignored, never hand-edit it. Change
  `src/input.css` / `tailwind.config.js` and rebuild.
- `assets/js/*.js` is likewise **generated** — git-ignored, never hand-edit it. The hand-authored
  source lives in `src/js/*.js`; `scripts/build-js.js` (Terser) minifies it into `assets/js/` as
  part of `npm run build` (also runs once, unminified-in-shape but still built, under `npm run
  dev`, so local testing has real files to load). Run `npm run build:js` after editing a file in
  `src/js/` if you're not running `npm run dev`. `modal.js`'s import of `contact-form.js` gets its
  cache-busting `?v=` hash patched in by `scripts/version-assets.js` same as the `<script>` tags —
  that regex has to tolerate Terser's minified output (no space after `from`).
- No test suite or linter.

## Forms & spam protection

`#intake-form` in `index.html` is the one authored form (Netlify detects it at build
time); `modal.js` clones it into the lightbox and re-keys ids `in-` → `cf-`. Shared
behaviour — inline validation, submit, success/error states — lives in
`contact-form.js`. Three spam layers, though only the first two are currently live:

- **Honeypot** — hidden `company` field (`data-netlify-honeypot="company"`, hidden by
  `.hp-field` in `src/input.css`); `contact-form.js` also drops any submit that fills it.
- **Time-trap** — `contact-form.js` rejects submits faster than 2 s after the form (or
  modal) opened.
- **reCAPTCHA v2** ("I'm not a robot") — **currently disabled**: the `<div
  data-netlify-recaptcha="true">` field in `#intake-form` (`index.html`, inside
  `#in-recaptcha`) is commented out, so Netlify never injects the widget and
  `contact-form.js`'s `captchaActive()` check is always false, same as it degrades under
  `npm run dev`. To re-enable, just uncomment that block — no JS changes needed. When
  live: Netlify injects Google's `api.js` + widget **at deploy time only**, so the widget
  is absent under `npm run dev` and on any non-Netlify preview; `contact-form.js` /
  `modal.js` no-op cleanly when it's missing. The modal's cloned widget is stripped and
  re-rendered with `grecaptcha.render()` on first open. CSP (`<meta>` in `index.html` **and**
  the `/*` header in `netlify.toml`) stays opened for `google.com/recaptcha` +
  `gstatic.com/recaptcha` on `script-src` / `frame-src` regardless, ready for re-enabling.

The reCAPTCHA **secret** key is not in the repo — it's private and lives only in Netlify.
The **site** key is public (it ships client-side in the rendered widget regardless), so it's
recorded here for reference:

```
SITE_RECAPTCHA_KEY=6LcAJLUtAAAAAPsKWFDO_zI4YHpDEPeh6CEUxJZB
```

In Netlify → Site configuration → Environment variables, set `SITE_RECAPTCHA_KEY` (the value
above; scopes: Builds + Runtime) and `SITE_RECAPTCHA_SECRET` (secret key, private; scope:
Runtime — not recorded here). Generate the pair at `google.com/recaptcha/admin` as
**reCAPTCHA v2 → checkbox**, listing the production domain and the `*.netlify.app` deploy
domain. Without both vars Netlify skips widget injection and form POSTs 400. Netlify verifies
`g-recaptcha-response` server-side; the AJAX submit sends the whole `FormData`, so the token
rides along. Docs: `docs.netlify.com/manage/forms/spam-filters/`. If the key pair is ever
rotated, update both this value and the Netlify env var together.

## Working in the shell

- `t&c.html` contains an ampersand — always quote the path: `"t&c.html"`.
- The secondary pages (`accessibility.html`, `privacy.html`, `t&c.html`,
  `financial-responsibility-agreement.html`, `style-guide.html`, `404.html`) load `site.css` and
  get their header and footer from `src/js/partials.js` (`<div data-partial="header|footer">`).
  `index.html` keeps its own inline header/footer, which `partials.js` says is canonical — keep
  the two in step. `t&c.html` is **complete** (real company name, phone, city/region only — no street address, the
  domain `coastalhealthcareadvocates.org`, last updated 2026-09-01). `accessibility.html` is
  **complete** (status: partially conformant with WCAG 2.1 AA; move to "Conformant" only after an
  independent audit). `privacy.html` has the known details filled in; what still needs counsel
  sits in dashed `.todo-flag` blocks. The agreement page is a draft with `[confirm: …]` markers.
- `npm run build` rewrites the `?v=` hashes in every HTML page (`scripts/version-assets.js`), so a
  build alone shows those pages as modified in `git status`.
- **Never write the email address literally in a site page or `src/js/`.** Author
  `<a href="#intake" data-email-user="coastalhealthcareadvocates" data-email-domain="gmail.com">Email us</a>`
  (`index.html#intake` on secondary pages); `src/js/email.js` — loaded with `defer` in every page's
  `<head>` — turns it into the `mailto:` link at runtime so address-harvesting crawlers miss it. The
  href/text are the no-JS fallback; put `data-email-text` on a child to keep an icon beside it. JS
  that injects a link later calls `window.chaEmailLinks(root)`. The JSON-LD omits `email` on
  purpose. The PDFs (`src/pdf/`) still print the address.
- **The phone number gets the same treatment** — never write it literally (or as a `tel:` href) in a
  site page or `src/js/`. Author `<a href="#intake" data-tel-area="757" data-tel-line="5740771">Call us</a>`;
  `email.js` builds the `tel:` link and the "(757) 574-0771" text (on a `data-tel-text` child if
  there is one, so "Call " survives). The JSON-LD omits `telephone` on purpose (a local-SEO trade
  the client chose); the print footer in `src/input.css` splits the number across CSS strings; the
  PDFs still print it.
- `src/js/sound.js` (also `defer` in every page's `<head>`) plays a Web Audio click on every
  trusted click of a `button`, `.btn`, `[role="button"]`, submit input or `summary`. No audio file.
  It is silent under `prefers-reduced-motion` or when `localStorage.sound === 'off'`.
- The impeccable design hook (`.claude/settings.local.json`) runs
  `.claude/skills/impeccable/scripts/impeccable hook` after every Edit/Write and again on Stop.
  It is a design-QA pass over UI files; expect it to fire whenever you edit HTML/CSS.
- `.gitignore` covers `node_modules/`, the generated `assets/css/site.css` and `assets/js/*.js`,
  `.DS_Store` and `.netlify`. No `.DS_Store` files are tracked — keep it that way.

## Brand identity — source of truth: `assets/logomarks/README.txt`

The mark is the "Advocate Beacon" (a lighthouse in a shield). Logo type is Tenor Sans +
Ysabeau 500, outlined. Palette (the brand's own hex values — everything is built from these):

| Navy | Sky | Cyan | Seagrass | Coral | Lantern | Midnight | Paper | Sand | Deep-tone-alt shield |
|---|---|---|---|---|---|---|---|---|---|
| `#0F1E4A` | `#4FACFE` | `#00F2FE` | `#0BA678` | `#FE1E1A` | `#E07A00` | `#0A0F24` | `#F5FBFF` | `#FFC93C` | `#2E3F72` |

- `assets/logomarks/logos/` — mark + wordmark in 4 forms (horizontal / stacked / wordmark /
  logotype) × 5 colourways (primary / dark / one-colour / reversed / deep-tone-alt), each as SVG
  plus 512/1024/2048px PNG.
- `assets/logomarks/marks/` — the mark alone in the same 5 colourways, plus favicons and
  `favicon-primary.ico` / `favicon-dark.ico`.
- Favicon files use a deliberately different, simplified geometry for 16–48px. Do not regenerate
  them from the full mark. Min sizes and clear space are in the README.
- If you rasterise any brand SVG yourself, use a real browser engine (Chromium, resvg, Inkscape).
  cairosvg silently drops `<mask>` and returns a blank shield with no warning.
- `assets/gna-logo*.svg` is the Greater National Advocates badge required in the site footer.

## Where the other content lives

- `assets/` — `Hero Image.png`, `Lindsey-Hewitt-Headshot.{png,jpeg}` (the bio photo).
- `assets/docs/` — the three linked PDFs (`Lindsey Profile.pdf`, `CHA_Pricing_Sheet.pdf`,
  `Coastal-Financial-Responsibility-Agreement-DRAFT.pdf`). They are **generated** tagged PDF/UA-1
  files — edit the HTML in `src/pdf/` and run `npm run build:pdfs` (needs WeasyPrint ≥ 66, e.g.
  `brew install weasyprint`; not part of the Netlify build, so commit the regenerated PDF). Validate
  with veraPDF `-f ua1`. Keep real semantics in the sources (scoped `<th>`, lists, alt text) and
  decoration in CSS so it becomes artifacts. `src/pdf/fonts/` holds static Ysabeau instances — the
  site's Ysabeau is a variable font and fails PDF/UA's glyph-width check. The agreement PDF's text
  mirrors `financial-responsibility-agreement.html`; change both together.
- `creative/` — the brief plus the two research docs; `Coastal Brand Guidelines.html` is a saved
  claude.ai artifact export (carries the artifact's own page chrome), so
  `assets/logomarks/README.txt` remains the authoritative brand spec.
- `inspiration/` — client-supplied reference screenshots and `siteoutline.xlsx`.
- `swag/` — merch photos. Not site assets.

## The site to be built — from `creative/Creative Brief.md`

Single-page site. Sections in order: **Services** (Insurance Claim Denial Appeals, Medical Bill
Negotiation, EOB Analysis, Medicare / Medicaid Claims Support, Debt Resolution / Financial
Assistance, Services for Professionals) · **Who we help** · **About Lindsey** (bio + photo) ·
**How it works** (4 steps) · **FAQs** · **Intake Form** · **Schedule Consultation**. Footer:
accessibility statement, T&C, LinkedIn + Facebook, GNA badge.

Hard requirements from the brief:

- TailwindCSS; static hosting on GitHub Pages / Netlify.
- WCAG 2.1 AA and W3C AA; readable for older visitors; calm, reassuring, low-distraction tone.
- A CTA visible at all times, plus a CTA pinned to the bottom of the viewport on scroll.
- Contact is a lightbox popup webform — needs an autoresponder and entries saved to a database.
- Cookie-consent challenge + analytics; SEO best practices; treat submitted health details as
  PHI (the brief's "HIP" means HIPAA-aware).
- Icons: clean line icons (inline SVG sprite, 1.75px round strokes). The brief originally asked for
  hand-drawn doodle icons; that was tried and dropped (brief updated 2026-09-14) — don't reintroduce it.
- Bio layout reference the client likes: the employee-bio page on arntzen.no.

The homepage must open with **two entry paths, not one funnel** — person-in-crisis (services /
how it works / cost) and caregiver-or-referrer (credentials / who this is for / contact). Both
research docs land on this as the central IA decision, and it drives most section-level choices.
A related constant: visitors don't know the category exists, so the page has to explain what a
patient advocate *is* before it can sell one, and answer "why pay a human instead of a free AI
appeal tool."

Finalized hero / value-card / bio / pricing copy is in `creative/Creative Brief.md` §8 — use it
verbatim rather than rewriting. `creative/audience-personas.md` and
`creative/site objectives by segment.md` hold the research behind the two-audience IA. Note: the
hero copy says "licensed advocate," but patient advocacy is an unregulated field and Lindsey
holds certifications, not a license — confirm wording before shipping.

Contact: Coastal Healthcare Advocates · coastalhealthcareadvocates@gmail.com · (757) 574-0771 (M–F 8am–5pm ET) ·
coastalhealthcareadvocates.org.

## Design skills and config

- `.claude/skills/` vendors a set of design skills (`design`, `design-system`, `brand`,
  `impeccable`, `ui-styling`, `ui-ux-pro-max`, `frontend-design`, `banner-design`, `slides`).
  `web-design-guidelines` is a symlink into `.agents/skills/` and is version-pinned in
  `skills-lock.json`.
- `impeccable` is **not** symlinked: `.claude/skills/impeccable/` and `.agents/skills/impeccable/`
  are two separate, non-identical copies (Claude flavour vs. Codex flavour). Editing one does not
  change the other.
- `.claude/agents/` holds the impeccable sub-agents (asset producer, documenter, finish
  reviewer, manual-edit applier).
- `.codex/hooks.json` mirrors the impeccable hook for OpenAI Codex, pointed at the `.agents/`
  copy — keep it in sync with `.claude/settings.local.json` if you change the hook.
