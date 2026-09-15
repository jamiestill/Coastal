# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: the person in crisis.** An adult facing a denied insurance claim, a confusing or
inflated medical bill, medical debt, or a new diagnosis with coverage questions. They usually
arrive stressed and short on time, often searching right after a denial letter or a bad
appointment. They distrust "the system" and often don't know independent patient advocacy
exists. Their job: find out, fast, whether a real, qualified person can take this off their
plate, what it costs, and how to start.

**Secondary: the family caregiver.** An adult child or spouse researching for a parent,
partner or relative who can't manage it themselves. Often researching at night and comparing
options. They need to know the family is kept in the loop, and how it works when the person
paying isn't the person receiving care.

**Secondary, high lifetime value: professional referrers.** Elder-law and other attorneys,
geriatric care managers, discharge planners, social workers, financial planners and
clinicians. Their own credibility rides on the referral. They scan for credentials and clear
scope, and want a direct referral contact.

**Behavioural segment: the post-denial searcher.** Narrow, urgent intent ("how to appeal a
denied claim"). They are weighing a paid human advocate against free AI appeal-letter tools
(e.g. Counterforce Health, Fight Health Insurance, Claimable).

**Not design targets for now:** press and prospective hires or subcontractors.

Sources: `creative/audience-personas.md`, `creative/Creative Brief.md` §2.

## Product Purpose

Coastal Healthcare Advocates is a solo, independent patient-advocacy practice run by Lindsey
Hewitt. It handles the insurance and billing work patients face alone: appealing denied
claims, auditing bills and EOBs, negotiating balances, explaining benefits, supporting
Medicare/Medicaid claims, and resolving medical debt.

The website exists to:
1. Explain the category, since most visitors don't know what a patient advocate is.
2. Turn a crisis visit into a free-consultation booking.
3. Give professional partners the credential and referral signals they need to send clients.

Success: consultation requests and calls from the right people, and referrals from
professionals.

## Positioning

18 years working *inside* the systems clients are fighting: insurance claims, medical
collections and accounts receivable at Sentara Health, the Medical College of Virginia, UVA
and affiliates, Chesapeake Regional and Bon Secours Maryview. Before that came nearly five
years as a Deputy Clerk of Court.

Against free AI appeal tools, the difference is a local, accountable person who:
- phones the insurer and the provider,
- negotiates,
- judges complex or multi-provider cases,
- and manages the case over weeks through every reply and appeal level.

A generated letter can't do those things. The advocate works only for the client, never for
the hospital or the insurer.

## Operating Context

- **Service area:** based in Virginia Beach, VA, serving Hampton Roads and Southern Virginia.
  Always use that exact phrase for the service area.
- **Engagement flow:**
  1. Free 20–30 minute phone or video consultation.
  2. Document collection: bills, EOBs, denial letters, plan documents.
  3. Written review and action plan covering steps, likely timeline and cost.
  4. Negotiation, appeals and follow-up until resolution.
- **Paperwork:** every client signs a Service Agreement and a Financial Responsibility
  Agreement (`financial-responsibility-agreement.html`) before any paid work starts.
- **Payment:** most advocacy isn't covered by insurance and is paid directly by the client.
  Payment plans may be available.
- **Contact:** coastalhealthcareadvocates@gmail.com · (757) 574-0771 (M–F 8am–5pm ET) ·
  coastalhealthcareadvocates.org. Calendly booking:
  `calendly.com/coastalhealthcareadvocates/30min`.

## Capabilities and Constraints

- **Scope is insurance and billing only.** In scope: claim denial appeals, medical bill
  review and negotiation, EOB analysis, benefits explanation, Medicare/Medicaid claims
  support, debt resolution and financial-assistance programs, and services for referring
  professionals. **Out of scope:** clinical advice, care coordination, appointment management
  and legal advice. Copy must not imply otherwise.
  - The brief's value-card copy still mentions appointments and "care coordination". The
    homepage was brought in line with this scope on 2026-09-14; don't reintroduce that wording.
- **Pricing** (brief §8, `assets/docs/CHA_Pricing_Sheet.pdf`; these are starting points,
  adjusted for complexity):

  | Service | Fee |
  |---|---|
  | Initial consultation | Free |
  | Hourly | $85/hour, in 15-minute increments |
  | Bill review/audit | $125–$200 |
  | Insurance claim appeal | $175–$300 |
  | Benefits explanation session | $75 |
  | Provider negotiation | $125–$250 |
  | Single-issue package | $225 (up to 3 hrs) |
  | Monthly support plan | $375/month (up to 5 hrs) |

- **Health information:** the contact form must never collect diagnoses, treatment details
  or SSNs. Sensitive documents are exchanged through a secure channel after first contact.
  Treat submissions as HIPAA-aware. Not for emergencies; direct those to 911.
- **Contact paths:** a lightbox and drawer contact form (Netlify Forms, with an autoresponder),
  a phone number, and Calendly. Analytics require consent: Plausible, cookieless.
- **Stack** (existing): hand-authored static HTML + TailwindCSS, hosted on Netlify. See
  `CLAUDE.md`.
- **Legal pages:** `t&c.html` and `accessibility.html` are complete. `privacy.html` is still
  boilerplate with placeholders.

## Brand Commitments

- **Name:** Coastal Healthcare Advocates. **Slogan:** "Understanding Benefits. Resolving
  Bills. Advocating for You."
- **Advocate title:** Lindsey Hewitt, Patient Advocate / Insurance & Billing Advocate.
- **Never call Lindsey "licensed".** Patient advocacy is unregulated and her credentials are
  certifications. Use "experienced" or "certified", and name the real credentials:
  - Certified Professional Collection Specialist (covering FDCPA compliance)
  - Virginia Certified Mediator
  - Notary Public

  The brief's hero subhead and one value card still say "licensed advocate". Don't use that
  wording.
- **Voice:** calm, plain-language, reassuring, never salesy or alarmist. Use "your parent" or
  "your loved one" when speaking to caregivers.
- **Identity:** the "Advocate Beacon" mark (a lighthouse in a shield) and the brand palette.
  `assets/logomarks/README.txt` is the authoritative spec.
- **Icons:** clean line icons only. The brief's hand-drawn/doodle icon request was tried and
  dropped on 2026-09-14.
- **Footer requirements:** accessibility statement, Terms & Conditions, LinkedIn and Facebook
  links, and the Greater National Advocates (GNA) member badge.
- **CTA wording is set by the client:**

  | Where | Label |
  |---|---|
  | Consultation buttons (hero, How it works, closing band) | "Schedule a Free Consultation" |
  | Crisis entry-path card | "Let us help you" |
  | Referrer entry-path card | "Contact us about your referral" |
  | About section referral link | "Contact about a referral" |
  | Services referral link | "Talk about referrals" |
  | Form submit | "Start Your Consultation" |
  | Calendly buttons (contact dialog, success panel) | "Book a time on Calendly" |
  | Persistent tab | "Get Started" |

  The contact dialog's title repeats the label of whichever button opened it.

  Don't rename these without asking.
- **Bio layout reference** the client likes: arntzen.no employee bio pages.

## Evidence on Hand

- **Bio and credentials:** `creative/Creative Brief.md` §8 and `assets/Lindsey Profile.pdf`.
- **Headshot:** `assets/img/lindsey-*`.
- **GNA membership:** verified; badge at `assets/img/gna-logo-white.svg`, links to gnanow.org.
- **Pricing sheet:** `assets/docs/CHA_Pricing_Sheet.pdf`.
- **Draft agreement:** `assets/docs/Coastal-Financial-Responsibility-Agreement-DRAFT.pdf`.
- **Absent:** no testimonials, client reviews, case studies, outcome statistics, press
  coverage or association listings (e.g. no BCPA certification). Future work must not
  fabricate or imply any of these.

## Product Principles

1. **Explain before selling.** Say what a patient advocate is, and why a person rather than a
   free tool, before asking for anything.
2. **A real person, reachable immediately.** The phone number and a free consultation should
   always be one step away, and Lindsey should be visibly the person doing the work.
3. **Honest about scope, credentials and cost.** Only claim what is true: insurance and billing
   work, real certifications, published fees with a written agreement first.
4. **Two audiences, two paths.** People in crisis and caregivers/referrers arrive with
   different questions. Serve both without forcing one funnel.
5. **Protect people's health information.** Never ask for health details before a secure
   channel exists.

## Accessibility & Inclusion

- **Standard:** WCAG 2.1 AA required (brief §7).
- **Older readers:** a core audience. Keep text large and readable (18px body), language
  plain, the pace calm and distractions low.
- **Mobile:** a mobile version is required. Many crisis visitors search on their phones.
- **Motion:** respect reduced-motion preferences, and never make comprehension depend on
  animation.
