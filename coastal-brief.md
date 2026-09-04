# Website brief

# 1. Summary

Trying to close the gap: the person who understands your body and the entity that decides whether your care gets paid for are almost never the same person, and neither one is fully on your side. A doctor treats you but doesn't own your bill. An insurer processes your claim but doesn't examine you. Somewhere in that gap sits a mountain of paperwork, jargon, deadlines, and adversarial incentives that the average patient — especially one who is sick, scared, elderly, or newly bankrupt from a diagnosis — has no training and no time to navigate. Advocates fill that gap on the patient's behalf: reading the fine print, fighting the denial, coordinating specialists, negotiating the bill, or simply explaining what's happening in plain language.

### The problem, in one paragraph

The U.S. healthcare and insurance system is too fragmented, too adversarial, and too complex for an individual patient to navigate alone at the exact moment — a diagnosis, an ER visit, a denied claim, an aging parent's decline — when they have the least capacity to do so; care decisions, coverage rules, billing codes, and appeals deadlines are scattered across providers, insurers, and government programs that don't talk to each other and don't share the patient's incentives, leaving people to either accept a denial, overpay a bill, miss a benefit they qualified for, or lose critical time chasing down someone who can actually explain what's happening and fight for a better outcome — which is precisely the vacuum that independent advocates, advocacy marketplaces, billing-dispute specialists, AI appeal generators, employer-sponsored navigators, and nonprofit patient-assistance funds have all sprung up to fill.

# 2. Background

## Primary: the patient/client in crisis

**Who:** An adult facing a new diagnosis, a denied insurance claim, mounting medical debt, or a chronic/complex condition they can no longer manage alone.

**State of mind on arrival:** Stressed, time-pressured, often searching reactively right after a bad appointment or a denial letter. Low trust in "the system." They often don't know this job (independent patient advocate) exists—the site may be their first exposure to the category.

**What they want from the site, in order:**

1. Fast confirmation that a real, credentialed human will take this off their plate
2. A plain-language explanation of what an advocate actually *does* (most visitors won't know)
3. Transparent pricing or at least a fee structure — cost is a top objection in this category
4. A low-friction way to start — a phone number or short consult booking, not a long intake form

**Questions the site must answer:** What exactly do you do for someone like me? How much does this cost? Are you legitimate / who certifies you? How fast can we actually talk?

## Secondary: the family caregiver (often the real visitor, not the "client")

**Who:** An adult child or spouse researching on behalf of a parent, partner, or relative who can't navigate this themselves — aging, cognitively impaired, too sick, or simply overwhelmed.

**State of mind:** Guilt and urgency mixed together; often researching quietly at night; comparing several options before committing; wants to feel like they're being a good advocate themselves before hiring one.

**What they want:** Eldercare-specific language (not just "patient," but "your parent" / "your loved one"); explicit reassurance that communication includes the family, not only the person receiving care; proof via testimonials or case studies; clarity on how the relationship works when the person paying isn't the person being treated.

## Secondary, high lifetime value: professional referral sources

**Who:** Physicians, hospital discharge planners, oncology social workers, elder-law attorneys, financial planners, geriatric care managers — people who refer clients as part of their own practice and stake their own credibility on the referral.

**State of mind:** Scanning quickly for credibility signals, not reading deeply. Evaluating whether a referral reflects well on them.

**What they want:** Credentials front and center (e.g., Board Certified Patient Advocate), clear scope-of-practice (what an advocate can and can't do relative to a lawyer or clinician), a simple direct-contact path for referrals, ideally a one-pager they can hand to their own clients.

## Behavioral segment worth designing for separately: the post-denial searcher

**Who:** Someone who just received a specific denial letter or medical bill and is searching narrowly — "how to appeal a health insurance denial," "won't pay for \[procedure]."

**State of mind:** High urgency, narrow intent, comparing a paid human advocate against free AI appeal-letter tools (Counterforce Health, Fight Health Insurance, Claimable) that now rank for the same searches.

**What they need to see within seconds:** Whether this service covers their specific problem, and why a paid human beats a free AI tool for their situation (complex/high-stakes claims, ongoing case management, someone who can call the insurer on their behalf — not just draft a letter).

## Lower priority, not primary design targets for now

- **Media / industry press** — relevant for credibility later, not a homepage design target.
- **Prospective employees/subcontractor advocates** — only matters once/if Coastal grows beyond a solo practice; no dedicated careers path needed at launch.

## Implication for IA

Homepage needs at least two clear entry paths in the first screen — one for the person in crisis (services + how it works + cost) and one for the caregiver/referrer (credentials + "who this is for" + contact) — rather than a single generic funnel, since the two groups arrive with different questions and different tolerance for reading before acting.

# 3. Core Objectives

**Convert an anxious, skeptical stranger into a paying or referred client, in an unregulated category most visitors have never heard of.** Unlike most service industries, the site has to do category education (what is a "patient advocate" and why would I pay one) before it can do persuasion — so a meaningful share of every homepage's job is legitimizing the *category*, not just the company.

## By business model

**Independent/boutique practices** (Umbra, Patient Advocators, CHAT, Concierge Health Advocacy, Emry, Stepping Stone) — Coastal's direct comparables

- Primary: book a paid consultation or intake call
- Secondary: rank for local + crisis-intent search ("patient advocate near me," "help with denied insurance claim")
- Secondary: get listed/found via association directories (APHA, NAHAC) and referral partners, since word-of-mouth and professional referral drive more volume than cold search in this niche
- Constant pressure: prove legitimacy in a field with no licensing requirement — credentials, certifications, and specificity about services do the work a regulator would elsewhere

**Aging life care / elder advocacy firms** — same as above, plus:

- Reassure the *paying* decision-maker (adult child) who isn't the *service recipient* (parent)
- Convert relationship-based referrals from elder-law attorneys, geriatric care managers, senior living communities

**Tech-enabled marketplaces** (Solace, GNA, AdvoConnection)

- Two-sided goal: acquire patients on one side, recruit and vet advocates on the other
- Increasingly: get positioned as insurance-covered/reimbursable (Solace's "Covered by Medicare" push) to remove the price objection that sinks independent practices
- Scale via SEO and content rather than any single advocate's local reputation

**Medical billing & claims advocacy firms**

- Convert on a narrow, high-urgency moment (a specific bill or denial), often with contingency pricing ("we only get paid if we save you money") as the trust-lowering mechanism
- Compete against DIY negotiation guides and the AI tools below

**AI-driven appeal tools** (Counterforce Health, Fight Health Insurance, Claimable)

- Land grab: free or low-cost tool drives mass consumer adoption and data/case volume
- Increasingly pivoting to B2B2C — Claimable now sells an enterprise version to pharma manufacturers and health systems, using consumer traffic as the proof of concept
- Compete directly with human advocates on cost and speed, forcing human-staffed firms to differentiate on complexity, ongoing case management, and things a generated letter can't do

**Enterprise navigation platforms** (Health Advocate, Quantum Health, Accolade, Included Health)

- Real customer is the employer/health plan buying a benefit, not the end patient — site exists to win B2B sales cycles and RFPs, with employee-facing UX as a retention/renewal feature
- Not a direct competitor for Coastal's site goals, but sets the "professional, all-in-one" visual bar that smaller players get compared against

**Associations & certification bodies** (APHA, NAHAC, PACB)

- Recruit and retain dues-paying members
- Protect the value of a credential (BCPA, etc.) by controlling who can claim it
- Maintain the directory that independent practices depend on for referral traffic

**Nonprofits** (Patient Advocate Foundation, Medicare Rights Center, PAN Foundation, Family Reach, Triage Cancer, National Health Council)

- Donor and grant-funder acquisition
- Program enrollment (financial assistance, counseling, case management) at zero cost to the patient
- Policy visibility / coalition presence (National Health Council in particular)

## Implication for Coastal

The site's job is closer to the independent-practice list than to the enterprise or nonprofit ones: it needs to (1) legitimize the category for a first-time visitor, (2) convert a crisis visit into a consult booking, and (3) build the credential/referral signals that let professional partners send business with confidence — while explicitly answering the "why pay a human instead of using a free AI appeal tool" objection that didn't exist for this category five years ago.

# 4. Project scope and deliverables

Site needs to be beautiful, simple, and easy to read for older visitors. Branding to be attention-getting but not distracting; should be calming and reassuring. Should stand out from competition. Keep a clear call to action visible at all times for easy contact for services. A lightbox popup with a webform for more information is the best way to get in touch with the company. Need a personable bio for Lindsey Hewitt. The CTA should follow the user as they scroll down to the bottom, where the form is also located.

# 5. Site structure


**Header Links**

**One Page Map**

***Services***
- Insurance Claim Denial Appeals
- Medical Bill Negotiation
- EOB Analysis
- Medicare / Medicaid Claims Support
- Debt Resolution / Financial Assistance
- Services for Professionals

***Who we help***

***About Lindsey***
- Bio / photo

***How it works***
- Step 1: Free Consultation
- Step 2: Document Collection
- Step 3: Review & Action Plan
- Step 4: Negotiation & Follow-Up

***FAQs***
- What does a patient advocate do?
- How much does it cost?
- My claim was denied. Can you still help?
- Is my information confidential?

***Intake Form***
- Schedule Consultation

**Footer links**

- Press
- Accessibility statement
- Sustainability statement
- T&C’s
- LinkedIn and Facebook

# 6. Design preferences

***Icons***
Use Google Icons, then make look handdrawn

***Sites we like and why***

https://www.arntzen.no/en/employees/amalie-arnesen
Goof example of a bio to emulate for Lindsey; also like the simple footer and iconography


# 7. Functional Requirements

- Use TailwindCSS
- Site will be hosted on Githib/netlify
- Site needs to have an ability to submit a contact us form with an autoresponder and enteries recorded in a database
- Site needs tracking and a cookie challenge
- Need a privacy policy and terms and conditions.
- Site needs WCAG 2.1 Level AA 
- Site needs W3C AA
- Site needs a mobile version
- The site should be built with best SEO practices

# 8. Content

## Hero
- Headline: Don't navigste the maze alone.
- Subhead: A licensed advocate to navigate diagnoses, claims, and denials on your behalf.

## Value Cards
### *Your guide through the healthcare system*
- We chart the course through appointments, bills, and denied claims
### *Someone in your corner, before the crisis hits*
- Independent advocacy for the medical and insurance decisions that can't wait
### *Clarity when healthcare gets confusing*
- A licensed advocate to navigate diagnoses, claims, and denials on your behalf
### *Healthcare has a lot of fine print. We read it*
- Insurance appeals, billing disputes, and care coordination — handled

## Bio

### Lindsey Hewitt, Insurance & Billing Advocate

Lindsey Hewitt brings 27 years of experience in medical billing, insurance claims, and accounts receivable to her work as a patient advocate — expertise built from inside the very system her clients are trying to navigate.

For more than 18 years, Lindsey worked directly with insurance claims and medical collections for major healthcare systems, including Sentara Health Systems, the Medical College of Virginia, the University of Virginia and affiliates, Chesapeake Regional Medical Center, and Bon Secours Maryview Medical Center. Her day-to-day work has included verifying patient eligibility, tracking down denials and payment delays, correcting billing and coding errors, and writing the detailed, evidence-backed appeals that get rejected claims paid — the exact work most patients find themselves facing for the first time, alone, after a diagnosis or a denial letter.

Before entering healthcare, Lindsey spent nearly five years as a Deputy Clerk of Court, filing and managing civil, criminal, and family court cases. That background sharpened the same skills she brings to advocacy today: meticulous case management, procedural precision, and the persistence to move a complicated file through a slow-moving system.

Lindsey is a Certified Professional Collection Specialist, certified under the Fair Debt Collection Practices Act (FDCPA), a Virginia Certified Mediator, and a Notary Public. She has also trained, coached, and quality-assured teams of collection specialists — experience that gives her a practiced eye for spotting exactly where a claim or a bill has gone wrong, and how to fix it.

Based in Virginia Beach, Lindsey understands both sides of the insurance and billing process: how claims are supposed to work, and everywhere they tend to break down.

