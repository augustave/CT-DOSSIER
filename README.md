# README — FOUNDER Dossier Microsite (No API)

A minimal-interactive microsite that answers high-signal fellowship/investor questions (starting with “Who are three people you’d recruit regardless of what you do?”), then lets evaluators **fold open implications**, **slide between strata**, and **generate a preformatted inquiry**—all **without any backend or API**.

## What this is

This site is a **curated interrogation surface**:

**Answer → Implication → Evidence → Inquiry**

It’s designed for contexts like South Park Commons where taste, leverage, and systems-thinking matter more than word count.

## Core experience

The interaction model is **origami + drawers**:

* **Fold**: open/close panels inside a module (WHY / IMPLICATIONS / EVIDENCE / STRESS TEST).
* **Slide**: move between full-width strata modules vertically.
* **Snap**: click giant index numbers to jump instantly to a module.
* **Friction**: scrolling feels heavy, like moving physical panels.

### The “game loop” (minimal interactive)

1. Select module from the Manifest
2. Read the minimal answer (one screen)
3. Fold open IMPLICATIONS (microtype)
4. Fold open EVIDENCE (links)
5. RUN INTERPRETATION (deterministic mapping)
6. INTERROGATE (copy message / mailto / download)

## Information architecture

* **Module 00** — Gate / Index (Manifest)
* **Module 01** — Thesis
* **Module 02** — Three People I’d Recruit (SPC answer)
* **Module 03** — What This Says About Me (preloaded interpretation output)
* **Module 04** — What Company Would I Build (archetypes + wedges)
* **Module 05** — Inquiry Panel (no API outputs)
* **Module 06** — Proof / Artifacts

## Default content shipped

### Module 02 — “Three People I’d Recruit”

* **Michael Levin (Tufts)** — self-organizing systems, coherence, repair, control layers
* **Chase Hughes** — human behavior under uncertainty, adoption, negotiation reality
* **Kelly Johnson (Skunk Works)** — execution under constraint, tempo, shipping discipline

**Why together:** coherence (system), alignment (human), shipping (execution).

### Module 03 — “What This Says About Me”

Preloaded output labels the founder archetype as **Coherence + Tempo Founder**, lists:

* Superpowers
* Tensions (neutral framing)
* Counter-balances (behaviors)

### Module 04 — “Company Shapes”

Preloaded mapping: **Control-Stack for the Physical World**, including:

* 6 numbered archetype tiles
* 2 concrete wedge examples
* shared “first 30 days test” format

## Art direction (required)

**style_guide.project_identity**

* Name: **FOUNDER**
* Visual archetype: **Editorial Brutalism / Swiss International Archive**
* Philosophy: **“The list is the narrative. Data is poetry. Organize the chaos into monumental bands of color.”**
* Mood: Curatorial / Monumental / Hyper-Functional / Typographic

**Color system is structural**

* `#5E7CFF` hyperlink_blue (header/active stratum)
* `#F2EFE4` archive_cream (lists/data stratum)
* `#050505` void_black (media anchor only)
* `#8F6F50` raw_clay (grounding / physical categories)

**Typography: “The Intellectual Trio”**

* “the_shout” = neo-grotesque sans, medium-bold, tight tracking, huge headers
* “the_voice” = sharp display serif for feature titles
* “the_whisper” = system monospace for micro lists (8–10pt)

**Mandates**

* If the font size is comfortable, it’s wrong (either huge or tiny).
* No shadows. No decorative color. Color defines containers.
* No photography unless inside the black void stratum.
* Dense lists, numbered indexes, strict grid trap.

## Constraints (non-negotiable)

### No backend / no API

* No external AI calls, no chat, no server-side storage.
* No accounts, logins, or database.
* No server-side form submission.

### Inquiry must still feel “two-way”

The Inquiry Panel must output:

* Copy-to-clipboard message
* `mailto:` email draft with prefilled subject/body
* Local `.txt` download generated in-browser

### Minimal interactive only

* Interactions are limited to folding, sliding, snapping, and copying.
* No complex animations, no “playful” UI widgets. This is a dossier, not a toy.

### Language constraints

* Avoid “risk” framing in the UI/copy. Use **tensions + counter-balances**.

## Tech notes

### Allowed implementations

* **Single-file static**: `index.html` + `style.css` + `app.js`
* **Static framework export**: Astro or Next.js static export (still no API)

### Client-side only utilities

* Clipboard API for copy
* Blob download for `.txt`
* `VITE_CONTACT_EMAIL` for enabling the mailto draft action

### Local setup

1. Copy `.env.example` to `.env`
2. Set `VITE_CONTACT_EMAIL` to the destination address for inquiry drafts
3. Run `npm install`
4. Run `npm run build`, `npm run typecheck`, and `npm test -- --run`

## Accessibility requirements

* Keyboard navigable folds and snaps
* ARIA labels for toggles and drawers
* High contrast maintained across strata
* Reduced-motion friendly (animations degrade gracefully)

## Performance targets

* Small JS bundle, deterministic logic
* Lazy-load noncritical media
* Fast first paint; content readable before interactions

## Deployment

Any static host:

* GitHub Pages
* Netlify
* Vercel (static)
* Your existing domain / CDN

## How to extend

Add new fellowship questions as new numbered modules:

* Keep the same structure: Answer + WHY + IMPLICATIONS + EVIDENCE + STRESS TEST
* Update the Manifest index
* Add deterministic mappings (no AI) if the module affects interpretation outputs
