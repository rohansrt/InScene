# InScene Design System — Website V1

Owner: Agent 1 (Research & Product Design). Implemented in `src/styles/index.css` (Tailwind v4 `@theme` tokens) and the components under `src/components/`.

## 1. Reference research (summary)

Six sites were inspected live (raw HTML + CSS for Linear, Vercel, Stripe and Labster; text-only structure for Axon VR and VirTra). Patterns adopted — none of their graphics, copy or layouts were copied:

| Source | Pattern adopted |
| --- | --- |
| Linear | Sticky 64px translucent nav (white 80% + 20px blur + hairline border), Inter Variable, tight display tracking, ease-out-cubic motion at 100/250ms, three-step shadow scale |
| Vercel | Nav that gains its border only after scroll, `text-wrap: balance` on headlines, layered soft shadows, `motion-reduce` guards |
| Stripe | Navy-tinted (not black) shadows, restrained light-weight hierarchy, bento-like section rhythm |
| Labster catalog | Single-select discipline control + secondary filters, result count above the grid, 2-line clamped descriptions, metadata chips (duration, discipline, level), whole card as one target. **Avoided** its `href="#"` filters, out-of-sync result counter and empty tag slots |
| Axon VR / VirTra | Audience cards (image + heading + one line) as the entry point into professional training; non-graphic, respectful public-safety imagery |

### Card concept comparison

| Concept | Strengths | Weaknesses for a 35-card filterable catalog |
| --- | --- | --- |
| 1. Cinematic editorial (16:9 image, title, blurb, chips, action) | Scannable, carries metadata, identical on mobile/desktop | Needs strong imagery (mitigated by branded placeholders) |
| 2. Minimal SaaS (thumbnail, fine border, type-led) | Fastest scan, lightest | Undersells an immersive product; 35 near-identical tiles blur together |
| 3. Immersive scene (text over image) | Most dramatic | Contrast/legibility risk, little room for metadata, noisy when repeated |
| 4. Horizontal featured (image left, detail right) | Ideal for showcasing | Wastes space in a grid; collapses to concept 1 on mobile anyway |

**Decision:** Concept 1's 16:9 editorial image on a Concept 2 surface (white card, hairline border, type-led body) for every catalog card. Concept 4 is used only for the four homepage *Featured Simulations*, and collapses to the vertical card below `md`. Concept 3 (text over image) is reserved for the two homepage category cards, where text sits on a solid panel below the image rather than over it, keeping contrast safe.

## 2. Brand personality

Calm, credible, precise, humane. InScene speaks to police academies and schools: it should feel like a well-funded learning-technology company — not a game, not a coaching centre, not an LMS. Confidence comes from whitespace and typography, not effects.

## 3. Colour tokens

Three brand colours, used consistently; everything else is neutral.

| Token | Value | Use |
| --- | --- | --- |
| `navy` | `#10243A` | Headings, primary text, dark surfaces (Coming Soon panel accent), Police category tint |
| `blue` | `#2563EB` | Primary actions, links, focus ring, active states |
| `blue-700` | `#1D4ED8` | Primary hover / pressed |
| `blue-50` | `#EEF3FE` | Active chip background, info callouts |
| `teal` | `#12B8A6` | Decorative accents, School category tint, success dots — **never text on white** (≈2.5:1) |
| `teal-700` | `#0B7A6F` | Teal text on white (≈5.2:1) |
| `teal-50` | `#E8F8F6` | Teal tint backgrounds |
| `ink-600` | `#475569` | Body text |
| `ink-500` | `#64748B` | Secondary text / metadata |
| `line` | `#E4E9F0` | Borders, dividers |
| `surface` | `#F7F9FC` | Off-white section bands, image placeholders |
| `white` | `#FFFFFF` | Page background (white-first) |

Shadows are navy-tinted: `xs 0 1px 2px rgb(16 36 58 / .06)`, `card 0 1px 2px rgb(16 36 58 / .04), 0 0 0 1px rgb(16 36 58 / .06)`, `lift 0 12px 32px -8px rgb(16 36 58 / .16)`, `modal 0 24px 64px -12px rgb(16 36 58 / .28)`.

No large dark backgrounds; the only gradients are soft blue→teal tints inside image placeholders and the hero mark.

## 4. Typography

Inter Variable (self-hosted via `@fontsource-variable/inter`, OFL). `font-feature-settings: "cv11", "ss01"` for a cleaner single-storey feel.

| Role | Size | Weight | Tracking | Line height |
| --- | --- | --- | --- | --- |
| Display (hero H1) | `clamp(2.6rem, 4.2vw + 1rem, 4.75rem)` | 650 | −0.04em | 1.02 |
| H2 section | `clamp(2rem, 2.2vw + 1.2rem, 3rem)` | 640 | −0.032em | 1.08 |
| H3 card / modal title | 1.125rem (card) / `clamp(1.5rem, 2vw + 1rem, 2rem)` (modal) | 620 | −0.015em | 1.25 |
| Lead | 1.125–1.25rem | 400 | −0.005em | 1.6 |
| Body | 1rem (0.9375rem in cards) | 400 | 0 | 1.65 |
| Eyebrow | 0.75rem uppercase | 600 | 0.08em | 1 |
| Meta / chip | 0.75–0.8125rem | 500–550 | 0 | 1 |

Headlines use `text-wrap: balance`; paragraphs `text-wrap: pretty`; max line length ≈ 60ch.

## 5. Grid, spacing, radius

- Container: `max-width: 1200px`, gutters 20px (mobile) / 24px (sm) / 32px (lg).
- Spacing scale: Tailwind 4px base; sections use 96–128px vertical padding on desktop, 64–80px on mobile.
- Catalog grid: 1 / 2 / 3 columns at `<640 / ≥640 / ≥1024`, gap 24px (20px mobile).
- Radius: 8px controls & buttons, 12px segmented track & chips container, 16px cards, 20px modal, 24px hero media.

## 6. Components

**Buttons** — height 44px (40px `sm`), radius 10px, 0.9375rem/550. Primary: blue fill, white text, hover blue-700, subtle inset highlight. Secondary: white, hairline border, navy text, hover surface. Ghost: text-only blue. All have a 2px blue focus ring with 2px offset.

**Segmented control** (category, grade band, level) — grey track (`surface` + `line` border), 4px padding, 12px radius; options 36–40px high, 8px radius; selected option is white with `card` shadow and navy text. Category and grade selectors use `role="tablist"` because they swap the grid panel; level selector uses tabs controlling the level panel. Arrow/Home/End keys move selection.

**Filter chips** (Academic / Non-academic) — 32px, pill, hairline border; active = `blue-50` fill, blue text and border; `aria-pressed`.

**Simulation card** (anatomy, top→bottom):
1. 16:9 media (`ScenarioImage`) with gentle 1.04 zoom on hover; category pill top-left on the image.
2. Meta row: area/track · grade band (school) · duration.
3. Title (H3, 1.125rem, 2-line clamp).
4. Summary (0.9375rem, 3-line clamp; police shows its verbatim subtitle as an eyebrow line above).
5. Footer: level labels (Basic · Advanced) left, "Explore simulation →" action right.
The whole card is one `<button>` with an accessible name; hover lifts 2px with `lift` shadow; equal heights via flex column + `mt-auto` footer.

**Modal** — `role="dialog"`, `aria-modal`, labelled by title. Max-width 880px, radius 20px, `modal` shadow, navy 50% backdrop with 4px blur. Opens with 200ms fade + 0.98→1 scale + 8px rise; closes on Esc, ✕, or backdrop click. On `<640px` it becomes a full-height bottom sheet with inner scroll. Sticky footer holds metadata and the **Play Now** CTA. Focus moves into the dialog, is trapped, and returns to the triggering card on close; body scroll is locked with scrollbar compensation to avoid layout shift. The open simulation is mirrored to `?sim=<slug>` so Back closes the modal and links are shareable.

**Coming Soon panel** — replaces the modal body in place (no route change): mark, "Your next learning experience is on its way.", "Interactive simulations are coming soon to InScene.", actions *Back to simulation* and *Close*.

## 7. Iconography

Lucide, 1.5–1.75px stroke, 16/20/24px sizes, always paired with text or `aria-hidden`. Each simulation has an icon used only inside its placeholder artwork.

## 8. Image treatment

- Cards: 16:9. Modal header crops the same 16:9 artwork to 2:1 on mobile and 21:8 on ≥sm via `object-fit: cover` — keep key action in the central ~60% × 70%. Featured cards are 16:9 below xl and fill the card height at ≥xl.
- Category cards: 16:9. Hero: 4:3 on desktop, 16:11 below lg.
- All media sits in a fixed-ratio container (`aspect-ratio`), so placeholders and final art are interchangeable without layout shift.
- Placeholders: a soft brand-tinted gradient (navy→blue for Police, blue→teal for School), a faint 24px grid, layered "scene frame" rectangles echoing the doorway mark, and the simulation's icon. Each carries `data-image-key`; in development builds the key is also printed on the placeholder.
- Final artwork direction (Agent 3): premium cinematic editorial 2.5D illustration, palette restricted to navy/blue/teal + neutrals, no text, no insignia, non-graphic.

## 9. Motion

Durations 150ms (hover colour), 200ms (enter), 250ms (card lift/zoom); easing `cubic-bezier(.215,.61,.355,1)`. Section content fades up 12px once on scroll into view. Everything transform-based is disabled under `prefers-reduced-motion: reduce` (opacity only, no smooth scroll).

## 10. Responsive breakpoints

`sm 640` · `md 768` · `lg 1024` · `xl 1280`. Nav collapses to a menu button below `md`; the mobile menu is a full-width sheet with the three links and the Play a Demo CTA. No horizontal scroll at 320px.

## 11. Accessibility baseline

Semantic landmarks (`header`, `nav`, `main`, `footer`), skip link, one H1 per page, visible focus everywhere, colour never the only cue (active states also change weight/shadow), 4.5:1 text contrast, `aria-live` result count on Products, route-change focus to `main` and per-route `<title>`.
