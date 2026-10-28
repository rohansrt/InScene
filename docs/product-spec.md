# InScene Website V1 — Product & Interface Specification

Owner: Agent 1 (Research & Product Design). Hand-off to Agent 2 (Frontend).

## 1. Sitemap

```
/                     Home
/products             Products (catalog)
  ?category=police|school
  &grade=6-8|9-10|11-12        (school only, default 6-8)
  &strand=academic|non-academic (school only, optional)
  &sim=<slug>                    (any page: opens that simulation's preview modal)
/reach-out            Reach Out
*                     Not found → links back Home / Products
Global dialogs: Simulation Preview (+ Coming Soon state), Play a Demo (+ Coming Soon state)
```

## 2. Global chrome

- **Header** (sticky, 64px): logo (official mark + "InScene" wordmark) → `/`; nav **Home | Products | Reach Out** with active indicator; **Play a Demo** primary button far right. Below `md`: logo + Play a Demo (compact) + menu button opening a sheet.
- **Footer**: "InScene by Anagat AI Solutions", tagline, Home/Products/Reach Out links, `founder@anagat.net` mailto, © current year.

## 3. Pages

### Home
1. **Hero** — eyebrow "AI-powered scenario learning" (product category from the brief), H1 *Step Into the Situation.*, lead copy, CTAs *Explore Simulations* (→ `/products`) and *How It Works* (→ `#how-it-works`, smooth scroll). Right: `home.hero` media (placeholder) with the doorway motif. Below: audience line "Built for police training institutions and schools (Grades 6–12)".
2. **How InScene Works** (`#how-it-works`) — four steps, each with a line icon, number, title and one sentence. Labelled as the learning approach, not shipped features.
3. **Explore Our Training Experiences** — two category cards (`home.police-category`, `home.school-category`) with counts derived from data (5 / 30), a one-line intro and a link to `/products?category=…`.
4. **Featured Simulations** — four real simulations (2 police, 2 school across bands) in horizontal featured cards; each opens the preview modal.
5. **Why Scenario-Based Learning?** — three qualitative points (practise safely, see consequences, reflect) and a note that content is reviewed by subject experts before deployment. No statistics.
6. **Final CTA** — *Ready to step inside?* + *Explore Simulations* / *Reach Out*.

### Products
- Intro (H1 "Simulation catalog", one-line lead).
- **Category tabs**: Police Training | School Training (tablist).
- School only: **grade-band tabs** (Grades 6–8 | 9–10 | 11–12) + **strand chips** (All · Academic · Non-academic).
- Result line: "10 simulations · Grades 9–10" (`aria-live="polite"`).
- Police only: review note ("Scenarios are proposed designs pending review by experienced police trainers and jurisdiction-specific SOPs").
- Grid of `SimulationCard`s rendered from `src/data/simulations.ts`.
- Empty state (cannot occur with current data, kept for safety).
- All state lives in the URL query (no reloads; refresh/back/forward safe).

### Reach Out
- H1 *Let's build better learning experiences.* + lead inviting institutions, schools and collaborators.
- Primary card: general email `founder@anagat.net` with *Email the Founders* (mailto) and copy-to-clipboard.
- Two founder cards (initial monogram — no invented photos): name, role, phone (Rohan only, `tel:`), LinkedIn slot (non-clickable "Profile link coming soon" until `linkedinUrl` is set in `src/config/contact.ts`).
- No contact form (no backend).

## 4. Component inventory

| Area | Component | Notes |
| --- | --- | --- |
| layout | `SiteHeader`, `MobileMenu`, `SiteFooter`, `Layout`, `Container`, `SkipLink`, `ScrollToTop`/route focus | |
| ui | `Button`/`ButtonLink`, `SegmentedTabs`, `Chip`, `Badge`, `Dialog`, `Logo`, `Reveal` | Dialog handles focus trap, scroll lock, Esc, backdrop |
| simulation | `ScenarioImage`, `SimulationCard`, `FeaturedSimulationCard`, `SimulationModal`, `LevelSelector`, `ComingSoonPanel`, `SimulationIcon` | |
| home | `Hero`, `HowItWorks`, `CategoryShowcase`, `FeaturedSimulations`, `WhyScenarioLearning`, `FinalCta` | |
| demo | `DemoDialog` | category choice → links to catalog; Play Demo → Coming Soon |
| context | `SimulationModalProvider` (URL `?sim=`), `DemoProvider` | |

## 5. Simulation card spec
See design-system §6. Required fields: image (by `imageKey`), title, summary, category pill, grade band (school), level labels, *Explore simulation* action. Optional (only when documented): police subtitle, area/track, duration (with "proposed" marker when the source says so).

## 6. Modal interaction spec
Header media → eyebrow (category · grade/track) → title → police subtitle or school mission.
Sections: **The Situation** (situation, police scene setting, key characters, sample quote / school mission) → **How It Plays** (numbered flow; police: five decision points + possible outcomes; school: interaction design note) → **What You'll Learn** (outcomes; school: debrief & assessment) → **Simulation Levels** (Basic/Advanced tabs; documented text or "Level details coming soon") → guardrail / review note → sticky footer with meta + **Play Now** → Coming Soon state (*Back to simulation*, *Close*).

## 7. Responsive rules
- `<640`: single-column everything; modal as full-height sheet; nav sheet; featured cards vertical; tabs full-width and horizontally scrollable if needed (grade tabs fit at 320px).
- `640–1023`: 2-column catalog; featured cards vertical in 2 columns.
- `≥1024`: 3-column catalog; featured cards 2×2 (horizontal from ≥1280); hero split 6/6.

## 8. Image placeholder inventory
38 placements total — see `docs/image-manifest.json`:
- `home.hero` (4:3)
- `home.police-category`, `home.school-category` (16:9)
- `simulation.<slug>` × 35 (16:9) — reused by card, featured card and modal header.
