---
name: Coastal Healthcare Advocates
description: A calm, readable single-page site that guides people through insurance and billing trouble toward one real advocate.
colors:
  harbor-navy: "#0F1E4A"
  beacon-sky: "#4FACFE"
  beacon-cyan: "#00F2FE"
  seagrass: "#0BA678"
  lantern: "#E07A00"
  sand: "#FFC93C"
  coral: "#FE1E1A"
  midnight: "#0A0F24"
  paper: "#F5FBFF"
  deep-tone: "#2E3F72"
  sky-ink: "#1F74C4"
  seagrass-ink: "#087A58"
  lantern-ink: "#A85A00"
  coral-ink: "#C4140F"
  link-blue: "#0B5FA5"
  ground: "#FEFEFE"
  surface: "#FDFEFF"
  ink-soft: "#3C4A73"
  line: "#DDE4F2"
  line-soft: "#EAEFF9"
  tint-wash: "#EAF3FF"
  night-surface: "#101A3A"
  night-ink: "#EAF0FF"
  night-ink-soft: "#AEC0EA"
  night-line: "#25315C"
  night-tint-wash: "#16234A"
  night-line-soft: "#1B274A"
  panel-tint: "#CFE6FF"
  beacon-edge: "#3F89D1"
typography:
  display:
    fontFamily: "Questrial, ui-sans-serif, 'Century Gothic', 'Avenir Next', system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.15rem + 2.7vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Questrial, ui-sans-serif, 'Century Gothic', 'Avenir Next', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.3rem + 0.9vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.005em"
  title:
    fontFamily: "Questrial, ui-sans-serif, 'Century Gothic', 'Avenir Next', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.9vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.3
  title-sm:
    fontFamily: "Questrial, ui-sans-serif, 'Century Gothic', 'Avenir Next', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.35
  lede:
    fontFamily: "Ysabeau, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Ysabeau, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Ysabeau, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.01em"
  label:
    fontFamily: "Questrial, ui-sans-serif, 'Century Gothic', 'Avenir Next', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.06em"
  figure:
    fontFamily: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "1rem"
    fontWeight: 400
    letterSpacing: "0.01em"
    fontFeature: "'tnum' 1"
  numeral:
    fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif"
    fontSize: "2.75rem"
    fontWeight: 500
    lineHeight: 1
  row-title:
    fontFamily: "Questrial, ui-sans-serif, 'Century Gothic', 'Avenir Next', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.35
  caption:
    fontFamily: "Ysabeau, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  label-sm:
    fontFamily: "Questrial, ui-sans-serif, 'Century Gothic', 'Avenir Next', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  overline:
    fontFamily: "Questrial, ui-sans-serif, 'Century Gothic', 'Avenir Next', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.14em"
  logo:
    fontFamily: "'Tenor Sans', ui-sans-serif, 'Gill Sans', 'Trebuchet MS', system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 400
    letterSpacing: "0.04em"
rounded:
  field: "8px"
  tile: "10px"
  card: "12px"
  panel-inner: "15px"
  panel: "22px"
  pill: "999px"
spacing:
  gutter: "24px"
  canvas-pad: "24px"
  canvas-pad-wide: "32px"
  section: "clamp(2.25rem, 1.5rem + 3.25vw, 4rem)"
  section-tight: "clamp(2rem, 1.4rem + 2vw, 3rem)"
components:
  button-primary:
    backgroundColor: "{colors.harbor-navy}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.card}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.harbor-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.card}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.tint-wash}"
  button-beacon:
    backgroundColor: "{colors.beacon-sky}"
    textColor: "{colors.harbor-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.card}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-beacon-hover:
    backgroundColor: "{colors.harbor-navy}"
    textColor: "{colors.paper}"
  button-on-dark:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.harbor-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.card}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.harbor-navy}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0.7rem 0.8rem"
    height: "48px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
  tile:
    backgroundColor: "{colors.tint-wash}"
    rounded: "{rounded.tile}"
  step-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "0.5rem"
  drawer-tab:
    backgroundColor: "{colors.beacon-sky}"
    textColor: "{colors.harbor-navy}"
    typography: "{typography.label}"
  site-footer:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.paper}"
---

# Design System: Coastal Healthcare Advocates

## Overview

**Creative North Star: "The Harbor Light"**

A harbor light doesn't shout. It stands steady on a dark coast so a boat can find its way in.
This system does the same for someone holding a denial letter. Harbor Navy is the ground and
the voice, and a single Beacon Sky accent marks the way: the rule under a heading, the icons,
the Get Started tab. The page moves at an unhurried pace, with large readable type, generous
section breathing room and one clear next step at a time. The brand mark, a lighthouse inside
a shield, is where the metaphor comes from, and every surface should feel like it belongs
under that light.

The character is warm and plainspoken rather than corporate. Surfaces are pale and quiet,
edged with hairline borders, and warmed by soft tints of the supporting palette (Seagrass,
Lantern, Sand, Coral) instead of large saturated fills. Depth is used sparingly: most
things sit flat, and a soft neutral lift is reserved for photographs, the pinned step
cards, and hover feedback. Motion is gentle and continuous rather than a single moment: the
hero steadies as the beacon comes up once per session, content rises in as it scrolls into
view, the How-it-works thread draws itself and then marches slowly while on screen, the step
cards rest at a slight hand-pinned tilt, and the beacon lights once when a message is sent.

This is explicitly **not** an insurer or fintech interface: no dashboards, stat tiles,
countdown urgency, or aggressive conversion chrome. The visitor is stressed and often older.
The design earns trust by being calm, legible and honest.

**Key Characteristics:**
- Harbor Navy ground and ink with one guiding Beacon Sky accent
- Large, readable type: 18px Ysabeau body, Questrial headings, balanced line wrapping
- Pale surfaces, hairline borders, soft supporting tints; saturated colour only in small doses
- Soft lift used sparingly, and only as neutral near-black shadow
- Gentle, continuous motion (scroll rise-ins, a marching thread, pinned tilt); reduced motion keeps colour and opacity feedback
- Full light and dark themes driven by semantic tokens

**The Calm Motion Rule.** Motion moves one way and never demands attention: things rise in, draw on, or march slowly, and loops pause when off screen. Nothing flashes, bounces, or blocks reading, and reduced motion keeps only colour and opacity changes.

## Colors

A calm coastal palette: deep navy and a clear sky blue carry the system, while four warmer
brand colours appear only as gentle supporting tints.

### Primary
- **Harbor Navy** (`harbor-navy`): headings and body ink on light grounds, the primary CTA
  fill, the focus ring on light grounds, and the navy "Book a free call" band. It is also
  the logo's anchor colour.
- **Beacon Sky** (`beacon-sky`): the guiding accent. Used for the accent rule under section
  headings, line icons, the path-card and Get Started tab fills (with Harbor Navy text),
  the focus ring on dark grounds, and link and CTA colour in dark theme. On light grounds
  it is a *mark* colour, never a text colour (2.4:1).
- **Beacon Cyan** (`beacon-cyan`): the brightest glint. Appears only in the hero atmosphere
  glow and the reversed logo heart.

### Secondary
- **Link Blue** (`link-blue`): inline prose links on light grounds. It is a darkened Beacon
  Sky that clears 6.5:1.
- **Sky Ink** (`sky-ink`): Beacon Sky's contrast-safe step for icons and numerals that carry
  meaning on light grounds.

### Tertiary
Supporting tints, used as pale washes, step accents and small marks:
- **Seagrass** (`seagrass`), ink step **Seagrass Ink** (`seagrass-ink`): the second
  How-it-works step and the fee-agreement check mark.
- **Lantern** (`lantern`), ink step **Lantern Ink** (`lantern-ink`): the third step accent.
- **Sand** (`sand`): the warmest wash (18% mix) in tinted card cycles.
- **Coral** (`coral`), ink step **Coral Ink** (`coral-ink`): the fourth step accent and error
  borders on form fields. The required-field marker is Ink, so Coral means "error" in forms.
- **Deep Tone** (`deep-tone`): the alternate muted shield and the line colour inside the
  dark-theme drawer.

### Neutral
- **Ground** (`ground`): page background, light theme.
- **Surface** (`surface`): cards, form fields, tables and alternating section bands.
- **Paper** (`paper`): text on Harbor Navy and Midnight grounds, and fill for on-dark buttons.
- **Ink Soft** (`ink-soft`): secondary text, table column headers, hints, form-field
  borders (8.6:1).
- **Line** (`line`) / **Line Soft** (`line-soft`): hairline borders and dividers. Line Soft
  separates table rows and quieter section edges.
- **Tint Wash** (`tint-wash`): tiles, the callout, the pricing group rows and
  ghost-button hover.
- **Midnight** (`midnight`): the footer ground in both themes, and the dark-theme page ground.
- **Night Surface / Night Ink / Night Ink Soft / Night Line**: dark-theme equivalents of
  Surface, Ink, Ink Soft and Line.
- **Night Tint Wash** (`night-tint-wash`) / **Night Line Soft** (`night-line-soft`): dark-theme
  Tint Wash and Line Soft.
- **Panel Tint** (`panel-tint`): the hover and tag background inside the dark-theme drawer and
  mobile menu, which sit on a Beacon Sky ground.
- **Beacon Edge** (`beacon-edge`): Harbor Navy mixed 25% into Beacon Sky, the top border of the
  phone-width CTA bar.

### Named Rules
**The One Beacon Rule.** Beacon Sky guides; it never reads. Use it for rules, icons, fills
behind Harbor Navy text and dark-ground accents. Any text or meaningful mark on a light ground
uses Link Blue or Sky Ink instead.

**The Supporting Tints Rule.** Seagrass, Lantern, Sand and Coral appear only as pale washes
(9–18% mixed into Surface), step accents and small marks. They are never large fills, section
grounds, or text on light grounds. Where they must carry meaning, use their `-ink` steps.

**The Semantic Token Rule.** Components never hard-code light or dark values. Every theme
difference lives in the root token set (`--bg`, `--surface`, `--ink`, `--cta-bg`, `--panel-*`
and so on). In dark theme the contact drawer and mobile menu invert to a Beacon Sky ground
with a Harbor Navy CTA.

## Typography

**Display Font:** Questrial (with Century Gothic, Avenir Next, system-ui)
**Body Font:** Ysabeau (with ui-sans-serif, system-ui, Segoe UI, Roboto)
**Label/Mono Font:** IBM Plex Mono for figures only. Cormorant Garamond appears as an accent
serif for numerals and pricing row names.

**Character:** Questrial's open, round geometry gives headings a friendly, level voice with
no weight shouting. Ysabeau's humanist warmth keeps long passages easy on older eyes. The
two small accents add tactile precision: a mono face for money, and an italic serif for step
numbers.

### Hierarchy
- **Display** (400, clamp 1.75–3rem, 1.12): the hero headline only.
- **Headline** (400, clamp 1.5–1.75rem, 1.25): section headings. Each carries an 8rem, 2px
  Beacon Sky rule 1.5rem below it; the navy booking band's heading omits it.
- **Title** (400, clamp 1.25–1.5rem, 1.3): path-card headings, FAQ questions, success
  message headings.
- **Title Small** (400, 1.25rem, 1.35): headings for services, "Who we help" items, steps,
  value items and the callout. Tracking resets to 0 inside cards.
- **Lede** (400, 1.3125rem, 1.45, Ink Soft, max 60ch): the introduction under the hero and
  intake headings.
- **Body** (400, 1.125rem, 1.6): all running copy. Prose blocks cap at 62ch, legal and FAQ
  answers at 68ch.
- **Body Small** (400, 0.9375rem): the tagline, bylines, captions and supporting meta.
- **Label** (400, 0.9375rem, 0.06em, uppercase): button text. Nav links use the same face at
  0.875–1rem in sentence case. Table and credential column headers go smaller (0.75–0.8125rem)
  with wider tracking.
- **Figure** (IBM Plex Mono 400, tabular): prices and phone numbers.
- **Numeral** (Cormorant Garamond 500 italic, 2.75rem): the How-it-works step numbers, each
  tinted with its step's ink colour.
- **Row Title** (1.0625rem): pricing row names (set in Cormorant Garamond 500), the hero phone
  link and the crisis-card reassurance line (Questrial).
- **Caption** (Ysabeau, 0.875rem): field hints, the privacy note, price units and error text.
  This is the smallest running text.
- **Label Small** (Questrial, 0.8125rem, 0.08em, uppercase): pricing and credential column
  headers, footer column titles.
- **Overline** (Questrial, 0.75rem, 0.1–0.14em, uppercase): pricing group rows, legal table
  headers and the stacked "Fee:" label. Only for one-to-three-word labels.
- **Logo** (Tenor Sans 400, 0.04em, uppercase): the logotype face. On the site it only
  appears as the logo artwork (outlined SVG) and the style-guide specimen; never use it for
  headings or copy.

### Named Rules
**The Readable-First Rule.** Body text never drops below 1.125rem, and supporting text never
below 0.875rem. Headings balance their line breaks and paragraphs wrap to avoid orphans. Older
readers are a core audience, so legibility outranks density.

**The Figures-in-Mono Rule.** IBM Plex Mono is reserved for real figures: prices and phone
numbers. It is never a stylistic costume for labels or headings.

**The Level Voice Rule.** Every heading is Questrial 400. Hierarchy comes from size and space,
never from bold weights. Questrial ships one weight, so never request faux bold.

## Layout

A single, long page built from full-width section bands. Each band centres a reading column
of **1000px max** with 24px side padding (32px from 480px). The header and footer use a
wider **1180px** column. Section bands alternate between Ground and Surface, separated by
Line Soft hairlines, with fluid vertical padding (the `section` / `section-tight` spacing
tokens).

Grids are simple and collapse early:
- **Services:** two columns of hairline-divided rows from 768px, one column below.
- **Who we help:** a two-column list from 640px.
- **Entry paths:** two cards side by side from 480px.
- **FAQs:** a sticky 16rem aside beside the accordion from 900px.
- **About:** a sticky portrait rail (18rem, 22rem from 1024px) beside the bio from 700px.
  Between 450px and 699px the portrait floats right; below 450px everything stacks.
- **Hero:** text beside a framed illustration. Below 500px the illustration hides and the
  text stands alone.

The sticky header's height (logo height + 2rem + 1px) is one token, `--header-h`. Scroll
padding and every sticky offset derive from it. The logo is 3.25rem tall on phones, about 5.5rem
from 480px and 6.25rem from 1024px. Breakpoints are 480 / 768 / 1024 / 1200px, with
purpose-specific steps at 500, 640, 700 and 900px.

**The One Column of Attention Rule.** Content never spreads wider than the 1000px reading
column, and no decision point shows more than a handful of equal options. The persistent CTA
(right-edge tab, a full-width bottom bar under 480px) is the only floating element, and it
tucks away once the intake form is on screen.

## Elevation & Depth

Mostly flat. Structure comes from hairline borders and tonal washes. A soft neutral lift is
used sparingly: on framed photographs, the pinned How-it-works cards, the drawer tab and
floating layers, and as a hover response on service tiles. Shadows are always near-black
(Midnight at low alpha), never chromatic. In dark theme shadows fade into the ground and
borders carry the separation.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 1px 2px rgba(10,15,36,.06), 0 4px 12px rgba(10,15,36,.06)`): cards
  at rest.
- **Lift** (`box-shadow: 0 2px 8px rgba(10,15,36,.08), 0 12px 28px rgba(10,15,36,.10)`):
  framed photos, step cards and tile hover.
- **Header scrolled** (`box-shadow: 0 4px 16px rgba(10,15,36,.07)`): added once the page
  leaves the top.
- **Floating layer** (`box-shadow: 0 18px 44px -14px rgba(10,15,36,.32)`): the mobile menu
  panel.
- **Edge tab** (`box-shadow: -2px 2px 16px rgba(10,15,36,.22)`): the persistent CTA.

### Named Rules
**The Soft Lift Rule.** Surfaces are flat at rest unless they are a photograph, a pinned card
or a floating layer. Everything else gains elevation only as feedback. Lifts are neutral and
soft, never coloured glows.

## Shapes

Gently rounded and friendly, never pill-shaped except for true circles.
- **Cards, buttons and photo frames:** 12px corners.
- **Tiles:** 10px.
- **Form fields and notes:** 8px.
- **Step cards:** a white 22px frame around a 15px tinted inner panel.
- **Circles** (999px) are reserved for the header call and menu buttons, the modal close
  button, social links, byline portraits and the theme switch.

Borders are 1px hairlines. Only error states use 2px, in Coral.

Icons are a hand-authored inline SVG sprite on a 24px grid: 1.75px strokes (2px for small UI
glyphs such as plus, close and check), round caps and joins, drawn in `currentColor`. They are
clean and upright; the hand-drawn doodle style was tried and rejected. Social marks are the
only filled icons.

Photographs sit in 12px frames with a hairline and the Lift shadow. The one exception is
the "What is a patient advocate?" figure, which is feathered with a soft radial mask. Path
cards use a photo under a heavy Surface wash (68–90%) so body copy keeps its contrast.

## Components

### Buttons
Warm and plainspoken: large, calm targets that clearly say what happens next.
- **Shape:** gently rounded (12px). Minimum height 48px, uppercase Questrial label with
  0.06em tracking, 0.75rem × 1.4rem padding.
- **Primary:** Harbor Navy fill with Paper text. In dark theme it flips to a Beacon Sky fill
  with Harbor Navy text.
- **Hover / Focus:** a 1px upward lift on hover, dipping 1px on press. Primary deepens to
  Midnight. Focus is a 3px outline offset 2px, in Harbor Navy on light grounds and Beacon Sky
  on dark ones.
- **Ghost:** transparent with a Harbor Navy border; hover fills with Tint Wash.
- **Beacon (path cards):** Beacon Sky fill with Harbor Navy text at rest. It deepens to
  Harbor Navy on hover (lightens to Paper in dark theme). Labels wrap inside half-width cards.
- **On dark:** a Paper fill, or a ghost with a 55% Paper border, on the navy band.

### Cards / Containers
- **Corner Style:** 12px.
- **Background:** Surface. Tinted panels (Beacon Sky, Seagrass, Lantern and Coral mixed
  9–12% into Surface) are reserved for the How-it-works step cards.
- **Shadow Strategy:** Rest shadow; see Elevation.
- **Border:** 1px Line.
- **Internal Padding:** 1.5–1.75rem (2rem for the intake form from 480px).
- **Callout:** Tint Wash ground, hairline border, no shadow, 1.75–2rem padding.

### Inputs / Fields
- **Style:** Surface fill, 1px Ink Soft border, 8px corners, 48px minimum height, 1rem text.
  Labels are persistent Questrial 0.9375rem above the field, with hints in Ink Soft below.
- **Focus:** the border darkens to Ink, plus the global 3px focus ring.
- **Error / Disabled:** a 2px Coral border, an error message in Ink with a Coral ▲ marker,
  and a Coral-bordered error summary that links to each field. Required fields carry an
  Ink asterisk. The message box shows a character count that darkens in the last 50. The privacy note sits in a Tint Wash box above the fields.

### Navigation
- **Desktop (from 768px):** six sentence-case Questrial links (0.9375rem) in the sticky,
  translucent header (92% ground with a light blur). Hover and keyboard focus wipe a 2px
  Beacon Sky underline in from the left, and the current section holds it.
- **Call button:** a 44px circular phone button beside the nav (Sky Ink icon), showing the
  number as text from 1024px. The phone number is always one tap away.
- **Mobile:** a 44px circular menu button opens a compact panel under it, scaling in from
  the top right: a 15px-rounded panel with 8px-rounded link rows and a Tint Wash hover. The panel uses the
  `--panel-*` tokens (a Beacon Sky ground in dark theme).
- **Header behaviour:** gains the scrolled shadow once the page leaves the top. It slides
  away near the closing booking band and returns on any upward scroll or keyboard focus.

### How-it-works step cards (signature)
Four pinned note cards on a faintly ruled "notebook" ground, joined by a dashed Beacon Sky
thread that draws itself in once and then marches slowly while on screen. Each card is a
Surface frame (22px, Lift shadow) around a tinted inner panel. A line-icon pushpin
straddles the top edge. The steps take the Beacon Sky, Seagrass, Lantern and Coral accents
in order, with the italic Cormorant numeral in each accent's ink step. From 768px the cards
alternate left and right, tilted ±2.5°, and straighten and scale to 1.03 on hover.

### Entry-path cards (signature)
Two equal cards: "I need help right now." and "I'm helping someone else." Each has a calm
full-bleed photograph under a Surface wash (the photo drops to 50% opacity in dark theme and
is removed when the visitor prefers more contrast). Inside: a Title heading, one sentence,
quiet underlined links, and a Beacon CTA pinned to the bottom.

### Pricing table
A bordered, 12px-rounded table. Uppercase Ink Soft column headers, Tint Wash group rows with
wide tracking, service names in Cormorant Garamond 500, and fees right-aligned in IBM Plex
Mono. Below 40rem each service stacks into its own block with a visible "Fee:" label, keeping
its table semantics.

### FAQ accordion
Hairline-divided rows. Each question is a full-width Title-sized button with a plus that
turns to a minus with a half turn. Answers open by animating the grid row, in Ink Soft at a
68ch max width.

### Message sent: "the light comes on" (signature)
The site's one delight moment. When a contact form sends successfully, the success panel opens
with the Advocate Beacon mark (the primary colourway, or the dark one in dark theme, at 3.5rem).
Its light comes up behind it: a soft Beacon Sky glow blooms, one slow beam of light sweeps
round, and it settles to a steady glow. It happens once per message, never loops, and never
delays the confirmation text or the Calendly button. The mark itself is never animated or
altered; the light is drawn behind it. Reduced motion: the glow simply fades in.

**The Earned Light Rule.** The beacon's light is reserved for the moment someone reaches out.
Don't reuse it as page decoration, a loading spinner or a hover effect, or it stops meaning
"you've been heard".

### Persistent CTA ("Get Started")
A Beacon Sky tab fixed to the right edge with vertical uppercase text, rounded on its inner
corners. Below 480px it becomes a full-width bar pinned to the bottom of the screen. It hides
when the intake form comes into view, and while the consent banner is showing on phones.

## Do's and Don'ts

### Do:
- **Do** keep Harbor Navy as ink and the primary CTA, and Beacon Sky as the single guiding
  accent (The One Beacon Rule).
- **Do** use the `-ink` steps (Sky Ink, Seagrass Ink, Lantern Ink, Coral Ink) whenever an
  accent carries text or meaning on a light ground.
- **Do** set running copy at 1.125rem Ysabeau with 1.6 line-height, capped at 62–68ch.
- **Do** keep buttons at least 48px tall and icon buttons at least 44px, and give every
  control a 3px focus ring (Harbor Navy on light, Beacon Sky on dark).
- **Do** frame photographs with 12px corners, a hairline and the Lift shadow.
- **Do** draw new icons into the existing sprite: 24px grid, 1.75px round strokes,
  `currentColor`.
- **Do** define every light/dark difference as a semantic token in the root and dark blocks.
- **Do** give reduced-motion visitors the same state changes, with colour and opacity only.

### Don't:
- **Don't** build anything that reads like an insurer or fintech product: no dashboards,
  hero-metric stat tiles, countdown or scarcity urgency, or aggressive conversion chrome.
- **Don't** use Beacon Sky, Seagrass, Lantern or Coral as text on light grounds, or as large
  fills and section grounds (The Supporting Tints Rule).
- **Don't** use coloured or glowing shadows. Elevation is always neutral near-black and soft.
- **Don't** reintroduce hand-drawn or doodle icon treatments. That style was tried and dropped.
- **Don't** bold Questrial headings or request weights the fonts don't ship.
- **Don't** use IBM Plex Mono for anything except prices and phone numbers.
- **Don't** add a second floating CTA, or let the persistent tab cover the intake form or
  the consent banner.
