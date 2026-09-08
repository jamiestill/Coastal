# Coastal Healthcare Advocates — website

Single-page marketing site built per `creative/Creative Brief.md`. Static files, no server.
Serene / calm / elegant light theme; WCAG 2.1 AA; hand-drawn SVG icons; Tailwind CSS.

## Files

| Path | What |
|---|---|
| `index.html` | The one-page site: header, two-path hero, value cards (§8 verbatim), "what is an advocate" + "why a human not an AI tool", Services (6), Who we help, About Lindsey (bio verbatim, + profile-PDF link), How it works (4), Pricing (§8 rates, as a 3-group table + pricing-sheet PDF link), FAQs (4), Intake (contact form embedded inline), Schedule, Footer (light/dark toggle lives here). Inline SVG icon sprite, 3× JSON-LD blocks. |
| `accessibility.html`, `privacy.html`, `t&c.html` | Legal pages, restyled to match. `t&c.html` content is complete (typo `Virgina`→`Virginia` fixed). `accessibility` + `privacy` have known data filled and lawyer-only content in dashed **TODO** blocks. |
| `financial-responsibility-agreement.html` | Client fee/payment agreement, restyled to match the other legal pages (`legal-prose`, shared header/footer). **Draft** — Schedule A prices are placeholders and `[confirm: …]` markers need Lindsey/Jamie decisions or an attorney; `noindex`. Links the printable PDF. Linked from the Pricing-section note and the footer Legal list on `index.html`. |
| `404.html` | Branded not-found page. |
| `src/input.css` → `assets/css/site.css` | Source + **committed** build output. `site.css` is the only stylesheet the pages load. |
| `tailwind.config.js` | Brand palette, 5 font families, 9-col grid, type scale. |
| `assets/js/*.js` | `theme.js` (light/dark toggle in footer, loaded blocking in `<head>` — no flash), `main.js` (nav + FAQ + anchor focus + header retreat near footer), `contact-form.js` (shared validation + Netlify submit), `modal.js` (contact dialog, uses `contact-form.js`), `intake-form.js` (inline intake form, uses `contact-form.js`), `sticky-cta.js`, `consent.js`. No framework. |
| `assets/fonts/*.woff2` | Self-hosted latin subsets (Tenor Sans, Cormorant Garamond, Questrial, Ysabeau, IBM Plex Mono). |
| `assets/img/*.jpg` | Derivatives of `Hero Image.png` and the headshot (sips; EXIF stripped). |
| `assets/*.pdf` | Client-facing PDFs in the Coastal house style: `Lindsey Profile.pdf`, `CHA_Pricing_Sheet.pdf`, and `Coastal-Financial-Responsibility-Agreement-DRAFT.pdf` (rebuilt from `src/input.css` tokens via a print HTML + Brave headless `--print-to-pdf`; still a draft). |
| `robots.txt`, `sitemap.xml`, `site.webmanifest`, `favicon.ico`, `apple-touch-icon.png` | SEO / PWA basics. |
| `netlify.toml` | `publish = "."`, security headers/CSP, Plausible proxy redirects, safety-net CSS rebuild. |
| `tools/tailwindcss` | Standalone Tailwind v3.4.17 binary (gitignored). |

## Build

No Node required.

```sh
# one-time: fetch the binary if tools/tailwindcss is missing
curl -sL -o tools/tailwindcss \
  https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-macos-arm64
chmod +x tools/tailwindcss

# dev
./tools/tailwindcss -i src/input.css -o assets/css/site.css --watch
python3 -m http.server 8000        # then open http://localhost:8000/

# release — commit the output
./tools/tailwindcss -i src/input.css -o assets/css/site.css --minify
```

## Deploy

Push to GitHub Pages (serves `assets/css/site.css` as committed — no CI) or Netlify (`netlify.toml`
re-builds the CSS and applies the security headers + Plausible proxy).

## Verified

- All 5 pages pass the W3C Nu HTML validator with **0 errors**.
- One `<h1>`, no heading-level skips, landmarks present, every image has `alt`, every form control
  has a label, dialog has `aria-modal` + labelled title, buttons/links all have accessible names.
- Contrast: body/headings ~16:1; secondary text 7–9:1; navy-on-sand CTA 10.5:1; all light-on-navy
  footer/CTA/sticky text ≥ 9:1. Sky/Cyan/Seagrass/Coral used for icons/fills only.
- Keyboard: FAQ accordion, mobile nav, and the contact modal (focus trap, ESC, backdrop click,
  return focus, scroll lock) all work; `prefers-reduced-motion` honored.
- No console errors, no CSP violations in-browser.
- `script-src 'self'` (no inline JS). `style-src 'self' 'unsafe-inline'` (small inline style
  attributes; tighten later by moving them to classes if desired).

## Before launch — outstanding (needs the client / a lawyer / accounts)

1. **Contact form backend.** Two forms post to **Netlify Forms** under the same `intake` name
   (`data-netlify`, honeypot, 2s time-trap, JS validation): the inline form in the Intake section
   and the lightbox for the scattered CTAs. Both native-submit to `/thanks` without JS. On the
   first Netlify deploy:
   - confirm the form shows under *Forms* in the dashboard;
   - set a **notification email** to Lindsey and a **verified-sender autoresponder** to the
     submitter (Netlify email notification, or a small Netlify Function);
   - standard Netlify Forms has **no HIPAA BAA** — the form copy already steers clinical detail to
     a phone call; if PHI must flow through it, move to a BAA-covered processor.
2. **Analytics.** `consent.js` loads **Plausible** only after "Accept analytics", proxied through
   this origin (`netlify.toml`). Create the Plausible site for `coastalhealthcareadvocates.org`
   (or self-host Plausible/Umami and adjust the proxy).
3. **`privacy.html`** — the dashed TODO blocks (HIPAA / Business Associate status, retention
   periods, sub-processor list, Virginia CDPA process) need real legal content.
4. **`accessibility.html`** — set the conformance status (start "Partially conformant" until an
   independent audit passes), fill any known limitations.
5. **Real URLs** — footer + JSON-LD `sameAs` currently point at bare `linkedin.com` / `facebook.com`
   / `gnanow.org`. Replace with the real LinkedIn, Facebook, and GNA member-profile links, and add
   a Google Business Profile.
11. **GNA logo asset** — `assets/gna-logo.svg` is an incomplete export: only the mark plus the
    letters "Grea…" are drawn (there's a literal `<!-- continue… -->` placeholder in the file).
    The footer uses `assets/gna-logo-white.svg` — the complete `assets/gna-logo-w-tagline.svg`
    lockup recoloured all-white — placed directly on the Midnight footer (no light chip).
    If GNA supplies an official single-colour white lockup, swap it in.
12. **Dark mode** — full theme via `:root[data-theme]` using the style guide's dark tokens, with a
    toggle in the footer; defaults to the visitor's OS setting. The logo swaps by CSS (`--brand-logo`),
    so `logo-horizontal-dark.svg` must stay alongside `logo-horizontal-primary.svg`.
6. **Street address** — the public site + JSON-LD show city/region only; the full street address
   lives in `t&c.html` where it's contractually needed. Confirm that's acceptable.
7. **OG image** — `og-image.png` (1200×630) referenced in `<head>` is **not yet generated**.
   Create one (logo + slogan on Paper) with a real browser/resvg/Inkscape and drop it at the root.
8. **Photography** — the provided hero illustration and headshot, plus two full-bleed photos
   behind the hero entry-path cards, both by Age Cymru (unsplash.com/@agecymru):
   `assets/img/path-crisis-1280.jpg` (conversation over coffee) and
   `assets/img/path-referrer-1280.jpg` (carer guiding seniors through paperwork). Unsplash License, no
   attribution required; credited in an `index.html` comment as courtesy. `sips`-cropped to
   1280×520, EXIF stripped. Applied as a decorative full-bleed CSS `::before` on `.path-card`
   under a heavy `--surface` wash (68→90%) so navy body copy keeps ~8–10:1 contrast (see
   `src/input.css`); dimmed in dark mode, hidden under `prefers-contrast: more`.
9. **Bio wording** — hero subhead + value card 3 now say **"a certified advocate"** (was
   "licensed") per your call; the bio itself is unchanged §8 verbatim.
10. Consider a `git mv "t&c.html" terms.html` later — the `&` needs URL-encoding everywhere
    (`sitemap.xml` uses `t%26c.html`). Kept as-is for now per `CLAUDE.md`.
