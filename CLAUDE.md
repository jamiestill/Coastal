# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

Pre-build creative and brand workspace for the **Coastal Healthcare Advocates** marketing
website — a solo patient-advocacy practice (Lindsey Hewitt; Virginia Beach / Hampton Roads, VA).
**The website itself has not been built yet.** What exists now is the brief, audience research,
brand identity assets, reference imagery, and legal-page drafts.

There is no build system, package manager, or test suite — no build, lint, or test command
exists to run. `creative/Creative Brief.md` is the spec for the site that is to be built.

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
- There is no `.gitignore`, and six `.DS_Store` files are already tracked. Don't add more.

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
