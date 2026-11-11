# Career Simulator (trial build)

A playable, self-contained career discovery journey for ages 12–20, at `/career`. Everything runs in the browser; answers are saved to `localStorage` (key `inscene.career.v1`, state `v: 2`; saved `v: 1` journeys are migrated on load). No backend.

Two parts: a **required core profile** (the first Passport stamp), then **optional simulations** the student picks from, each earning its own stamp and updating the profile.

## Routes

| Route | What it is |
| --- | --- |
| `/career` | Front page. Before the core is done: intro, steps, empty Passport. After: Passport stamps, profile snapshot and the simulation picker |
| `/career/play` | Core profile: welcome → Quick Start → Career Profile results (the stage is kept in state, so a refresh resumes) |
| `/career/rain-ready` | Rain Ready simulation: team → mission → reflect → results. Redirects to `/career/play` until the core is done |
| `/career/passport` | Career Passport: stamps, shape, shortlist, skills shown, Ward Plan, next steps |
| `/career/school` | School / counsellor view with **sample data** |

The catalog lists it under **Products → Career Simulator** (`src/data/simulations/career.ts`) as separate cards: **Career Profile** first, marked Required · Start here (`careerStep: 'required'`, plays `/career/play`), then **Rain Ready** and the five upcoming missions, marked Optional (`careerStep: 'optional'`). "Play Now" uses the `playPath` field; the five upcoming missions are previews only.

## The journey

**Core profile (required, about 10 min)**

1. **Welcome (1 min)**: nickname + level (Class 7–8 Explorer, 9–10 Investigator, 11–12 Planner, College Pro).
2. **Quick Start (6 min)**: 9 This-or-That pairs → 12 swipe cards (😍 / 🙂 / 🙅 / 🌱 never tried) with 3 Myth-or-Fact bonuses → top 3 of 9 values → career worlds already known → level-specific "looking ahead" chips. A live hexagon shows the shape forming.
3. **Career Profile results (3 min)**: hexagon, 10-world Career Map, 3 suggestions + 1 Wildcard, each with reasons, plus "what we don't know yet". Finishing Quick Start sets `coreDoneAt` and earns the **Career Profile** stamp. The page ends with the simulation picker.

**Simulations (optional, any order)**

Rain Ready (~15 min) is playable; the five others are listed as coming soon. Opening one sets `missionStage`; reaching its results sets `missionDoneAt` and earns its stamp.

1. **Meet the team (2 min)**: career previews for an environmental scientist, an urban planner and a civil engineer.
2. **Mission (18 steps)**: Investigate (contour map, choose 2 of 4 evidence cards, cause) → Listen (residents, rank needs, Salim bhai's Diwali request) → Design (₹50 lakh budget across 7 fixes with live water map, rain maths as 4 choices) → Test (monsoon replay, plot twist) → Present (town hall). A mood check follows each part. Three meters (flood risk, budget, trust) show before → after.
   - **Rain maths**: the rule is shown, and there are 4 answers. A wrong pick is crossed out with a hint about the slip (e.g. "that's 50 × 40"), and the student tries again until they get it right.
   - **Present**: nothing to type. The Ward Plan is built from earlier choices (`wardPlan()` in `engine/mission.ts`): the headline is the fix that cut the most risk, and the trade-off and open questions come from the plan. Residents react in the order the student ranked them (`townHall()`), then Mr Joseph gives his verdict (`verdict()`).
3. **Reflect (2 min)**: "Would you do more of this?" per role, plus what surprised you.
4. **Results (5 min), in three layers**: Snapshot → Why we think so → Go deeper (compare, routes for the level, next-step plan, mission replay, collected words and facts).

The profile shown everywhere (core results, front page, Passport) includes mission signals once `missionDoneAt` is set, and shows the core-only shape as a dashed "before". Status reads "Starting profile" (core only) or "Getting clearer" (core + a simulation).

## How suggestions are made (`src/career/engine/profile.ts`)

Rules-based and explainable. Signals add weight to six themes (Make, Discover, Create, Help, Lead, Organise, a plain-English RIASEC adaptation):

| Signal | Weight |
| --- | --- |
| This-or-That pick | +1 |
| Activity card: love / maybe / not for me | +2 / +0.75 / −1 (split across the card's themes); "never tried" = 0 and is tracked as unexplored |
| Favourite subject | +0.5 |
| Mission choices (map reading, Salim choice, safety-first ranking, etc.) | ≈ +1 |
| Mood after each mission part | +3 love · +1.5 hard-but-interesting · +1.2 okay · −1.5 not my thing |
| "Would you do more of this?" | +3 yes · +1 maybe · −1.5 no |

Themes are normalised to the student's own strongest theme, so the hexagon shows a shape, never a score. Each career has 2–3 ordered themes, values and a world. Career score = weighted theme average + 0.12 per shared value + a small bonus for loved cards in the same world + (after the mission) how the matching role felt.

Shortlist rules: the top 3 must span at least 2 worlds. The **Wildcard** comes from a world the student did not mark as known, and shares one of their top themes. Each card gets different evidence where possible. No percentages are shown anywhere. Confidence is shown as "Starting profile" (core only) or "Getting clearer" (after a simulation).

## Mission model (`src/career/engine/mission.ts`)

Three zones (Market Road 70, School underpass 80, Lake View Lane 90 base risk). Each fix lowers zone risk per unit and costs ₹ lakh. The twist adds a blockage (+15 Market, +10 School); the student's response removes some or all of it. If the twist costs more than the budget left, the least protective units are cut and the student is shown what was dropped. Skills (using evidence, thinking about people, working within limits, seeing the big picture) are scored 0–3, each with written proof. Seeing the big picture checks: the person ranked first ends up safe, the plan mixes quick and lasting fixes, and no zone is left knee-deep or worse. Skills also appear in the Passport.

## Content

- Careers, routes and next steps: `src/career/data/`. Routes are general Indian pathways and always come with "check the official site".
- The catalogue has 52 careers across the 10 worlds. It covers India's large hiring paths (engineering, medicine and pharmacy, banking and CA,
  government and defence, teaching, hospitality, logistics, skilled trades) and newer or global roles (AI, chip design, product, UX,
  sustainability, digital marketing, video creation). A simulation of 5,000 random students puts every career in someone's top 3, and no
  single career is the top suggestion more than about 8% of the time.
- Fun facts (`data/facts.ts`) were checked before adding. Dropped: the NCO-2015 occupation count (unconfirmed). Mumbai's monsoon fact says "most", with no percentage.
- Theme colours come from the validated dataviz palette, and always appear with a label and icon.

## Porting to the live player

The live `/play` app is a server-driven step engine (`/api/story-runs/:id/answer` with kinds `continue | choice | multi | numeric | sort | rank | reflect`). Most mission steps map directly: hotspots → `multi`, evidence → `multi` (max 2), cause / salim / twist → `choice`, rank → `rank`, calc → `choice` (with retry), reflect → `reflect`; Present is a `continue` beat sequence. New kinds needed: **swipe card**, **budget allocation**, **map hotspot** (as a visual for `multi`) and **mood check**. The profile engine and results can run server-side unchanged (pure functions).

## Before launch

- Review with career counsellors (routes, careers, wording for each level).
- Legal review for children's data under India's DPDP Act 2023 (parental consent, limits on behavioural tracking) before storing anything server-side.
- Hindi version (the language switch is a placeholder).
- Replace the sample school data with real aggregates.

## Testing

```
npm run dev
npm run test:career                      # desktop, Investigator
VIEWPORT=mobile LEVEL=planner npm run test:career
```
Screenshots go to `qa-artifacts/career/` (git-ignored).
