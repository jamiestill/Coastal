# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

Marketing website for **Coastal Healthcare Advocates** — a solo patient-advocacy practice
(Lindsey Hewitt; Virginia Beach / Hampton Roads, VA). The static site lives at the repo root
(`index.html` plus the legal / 404 pages); the brief, audience research, brand assets, and
reference imagery remain alongside it. `creative/Creative Brief.md` is the original spec.

## Build & local dev

- **Stack:** hand-authored static HTML + TailwindCSS, deployed on **Netlify** — Netlify Forms
  backs the intake form, `netlify.toml` redirects proxy Plausible analytics, and `netlify.toml`
  carries the security + cache headers. Netlify is the only host (no GitHub Pages).
- Run `npm install` once (Node ≥ 20). Then `npm run dev` for Tailwind `--watch` while editing
  `src/input.css`, or `npm run build` for the minified one-shot. Netlify runs `npm run build`.
- `assets/css/site.css` is **generated** — git-ignored, never hand-edit it. Change
  `src/input.css` / `tailwind.config.js` and rebuild.
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
- `accessibility.html`, `privacy.html`, `t&c.html` are standalone, unstyled files that open
  directly in a browser. `t&c.html` is **complete** — real company name, phone, mailing address,
  the domain `coastalhealthcareadvocates.org`, dated 2026-09-01 (it does contain a "Virgina
  Beach" typo). `accessibility.html` and `privacy.html` are still boilerplate with `__________`
  placeholders, including the company name.
- The impeccable design hook (`.claude/settings.local.json`) runs
  `.claude/skills/impeccable/scripts/impeccable hook` after every Edit/Write and again on Stop.
  It is a design-QA pass over UI files; expect it to fire whenever you edit HTML/CSS.
- `.gitignore` covers `node_modules/` and the generated `assets/css/site.css`. Six `.DS_Store`
  files were tracked before it existed and still are — don't add more.

## Brand identity — source of truth: `assets/logomarks/README.txt`

The mark is the "Advocate Beacon" (a lighthouse in a shield). Logo type is Tenor Sans +
Ysabeau 500, outlined. Palette (the brand's own hex values — everything is built from these):

| Navy | Sky | Cyan | Seagrass | Coral | Lantern | Midnight | Paper | Sand | Deep-tone-alt shield |
|---|---|---|---|---|---|---|---|---|---|
| `#0F1E4A` | `#4FACFE` | `#00F2FE` | `#0BA678` | `#FE1E1A` | `#E07A00` | `#0A0F24` | `#F5FBFF` | `#FFC93C` | `#2E3F72` |

- `assets/logomarks/logos/` — mark + wordmark in 4 forms (horizontal / stacked / wordmark /
  logotype) × 5 colourways (primary / dark / one-colour / reversed / deep-tone-alt), each as SVG
  plus 512/1024/2048px PNG. Note the README undercounts here: it says four colourways and PNG
  only. Trust the directory listing for inventory, the README for usage rules.
- `assets/logomarks/marks/` — the mark alone in the same 5 colourways, plus favicons and
  `favicon-primary.ico` / `favicon-dark.ico`.
- Favicon files use a deliberately different, simplified geometry for 16–48px. Do not regenerate
  them from the full mark. Min sizes and clear space are in the README.
- If you rasterise any brand SVG yourself, use a real browser engine (Chromium, resvg, Inkscape).
  cairosvg silently drops `<mask>` and returns a blank shield with no warning.
- `assets/gna-logo*.svg` is the Greater National Advocates badge required in the site footer.

## Where the other content lives

- `assets/` — `Hero Image.png`, `Lindsey-Hewitt-Headshot.{png,jpeg}` (the bio photo),
  `Lindsey Profile.pdf`, `CHA_Pricing_Sheet.pdf`.
- `creative/` — the brief plus the two research docs; `Coastal Style Guide.html` is a saved
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
- Icons: Google Material Icons restyled to look hand-drawn (doodle style).
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

Contact: Coastal Healthcare Advocates · coastalhealthcareadvocates@gmail.com · 757-574-0771 ·
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
