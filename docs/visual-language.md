# InScene Visual Language v1.0
## Framed Reality — Art Direction + Simulation Visual Grammar

**Status:** Proposed art-direction extension to the existing InScene website design system.  
**Purpose:** Keep all site illustrations, scenario thumbnails, in-simulation environments, characters, decision interfaces and future motion assets visually consistent.  
**Intended users:** Designers, image-generation tools, developers and Claude in VS Code.  
**Source alignment:** `docs/design-system.md`, `docs/image-manifest.json`, `src/styles/index.css`, `src/components/simulation/ScenarioImage.tsx`, `src/assets/index.ts` in the InScene repository.

---

## 1. Core creative direction

**Name:** Framed Reality.  
**One-line definition:** Grounded cinematic 2.5D illustrations of meaningful human decisions, presented through precise, quiet interfaces.

InScene is about stepping into a situation, making a decision and observing consequences. Visually, the brand should move from a **frame** (a contained view of a situation) into a **scene** (a navigable setting), then into a **decision** (an accessible UI action), and finally a **reflection** (clear, constructive feedback). The rectangular doorway/figure symbol in the brand is the core motif: use recurring off-centre frames, foreground/background layers, open sightlines and deliberate negative space, not literal glowing portals in every image.

Brand qualities: **calm, credible, humane, observant, contemporary, India-grounded, quietly immersive**.

Avoid: stock photography, glossy corporate renders, mobile-game illustration, anime/cartoon styling, clay-toy characters, sci-fi holograms, blue neon, dramatic law-enforcement imagery, generic AI robots or brains.

### Stylization index

- People: **7/10 realism**, natural proportions and believable gestures; softened skin/material rendering, not photographs.
- Environments: **8/10 realism**, recognisable streets, classrooms, offices and homes with readable spatial logic.
- Lighting: **7/10 cinematic**, soft diffuse daylight and selective rim illumination, not harsh spotlights.
- Depth: **6/10**, layered space and atmospheric distance, not tilted toy-like isometric maps.
- Overall saturation: **3–4/10**, restrained with brand-colour accents.

**Art direction decision:** Prefer a **grounded editorial 2.5D scene** (eye-level or modest three-quarter camera) over pure isometric artwork. Isometric or top-down views can be used intentionally for maps, layouts and spatial-analysis tasks, not as the default for emotional dialogue scenes.

---

## 2. Palette and surface logic

Keep the existing web tokens; do not rebrand the site.

| Colour | Hex | Purpose |
|---|---|---|
| Deep navy | `#10243A` | Primary structure, foreground depth, police emphasis, dark headings |
| Action blue | `#2563EB` | Decisions, interactivity, active selection and focused visual accents |
| Teal | `#12B8A6` | Learning, exploration, school emphasis and supportive visual accents |
| Canvas white | `#FFFFFF` | Website surfaces, major UI backgrounds |
| Mist | `#F7F9FC` | Airy background, daylight haze, neutral cards |
| Slate | `#475569` | Supporting copy, furniture and subdued materials |
| Line | `#E4E9F0` | Separators, scene control outlines |

**Important:** The palette governs composition and graphical treatment, **not the literal colour of all real-world objects**. Keep Indian skin tones natural, uniforms plausible but unbranded, vegetation naturally muted, roads and walls believable. Do not paint every person blue/teal to enforce the palette.

Use contrast and framing to direct attention. Do not use colour alone to signal correctness or risk. Colours used for feedback must meet accessibility requirements and be accompanied by text/icon cues.

### Audience variations within one system

- **Police / professional:** 60% navy/slate, 25% off-white/cool neutral, 15% blue/teal detail. Slightly lower saturation; mature, documentary-like atmosphere. Generic insignia-free khaki-inspired uniforms where appropriate.
- **Schools 6–8:** brighter daylight, somewhat more teal, tangible objects and clearer separation of interactive props. Not childish.
- **Schools 9–10:** balanced blue/teal with richer spatial context, social interaction and analytical clues.
- **Schools 11–12:** more restrained and sophisticated, slightly more navy/slate, mature lighting and dilemmas.

All segments share **the same rendering style, shading, human proportions, perspective and UI**.

---

## 3. Rules for website imagery

### Composition

1. Tell **one decision story per image**. The viewer should understand the learner's role, the environment and the relevant tension within two seconds.
2. Use **1–4 prominent people**, natural body language, emotionally believable but never theatrical facial expressions. Background crowds may be simplified.
3. Keep the decisive gesture, faces and relevant object in the **central 60% horizontal and 70% vertical area** to survive modal cropping.
4. Use **soft upper-left key light**, cool fill, mild atmospheric depth, subtle painterly grain and clean silhouettes.
5. Leave negative space around the focal action. Use a clear foreground / action / background hierarchy.
6. Keep generated artwork **free of text, interface elements, logo marks, labels, numbers and signage**; implement all labels and interactions separately in HTML/CSS.

### Image families

| Family | Purpose | Format | Camera |
|---|---|---|---|
| Home hero | Brand concept: entering a scenario | 4:3 (desktop), safe for 16:11 | Slight three-quarter perspective; spacious |
| Audience category | Police / schools product grouping | 16:9 | Eye-level or controlled wide shot |
| Scenario card | Recognisable situation and learner's role | 16:9 | Strong focal action, readable at small size |
| Scenario opening still | Establish setting before a choice | 16:9 | Wide establishing view |
| Dialogue view | A specific human interaction | 16:9 or responsive scene viewport | Eye-level medium shot; eye-lines consistent |
| Evidence/detail view | Inspect a physical/digital clue | Scene crop or dedicated asset | Close-up; informative, not decorative |
| Result/debrief | Explain consequence without shame | UI-native, optional scene still | Calm, explanatory |

**Website exports:** Hero `1600×1200`; cards `1600×900` with `800×450` derivatives. WebP, sRGB. Keep the same filename/image registry convention in the existing repository.

---

## 4. Simulation art architecture — critical distinction

A beautiful flat card image is **not** a functioning simulation. Treat marketing imagery and playable-scene assets differently.

### Layered scene stack

1. **Environment backdrop** — fixed camera and perspective for a scene; can be a raster WebP.
2. **Character layer** — reusable identity-consistent individuals with pose/expression variants and transparent backgrounds where practical.
3. **Object/evidence layer** — separate selectable props: phone, notebook, map, traffic barrier, beaker, puddle, etc.
4. **Interaction layer** — real accessible HTML/SVG hotspots, hover/selection/focus states, dialogue choices and indicators.
5. **Narrative layer** — scene heading, time, dialogue, choices, consequences and debrief, rendered as editable text, **never baked into AI imagery**.

On desktop, a good starting composition is **~65% scene / 35% decision panel**. On mobile, place scene above the interaction panel or use a bottom sheet. Avoid putting paragraphs on top of busy imagery.

### Camera grammar

- **FRAME A — Establish:** wide scene, context and actors. The learner understands where they are.
- **FRAME B — Engage:** medium shot that makes dialogue and social dynamics clear.
- **FRAME C — Inspect:** close detail of a clue or consequence, with spatial context preserved.

Use at most these three camera families per decision sequence in v1. Any alternate angles must maintain layout, direction of light and character continuity.

### Character continuity

For recurring characters, create a **character bible**: approximate age range, skin tone, hairstyle, wardrobe, proportions, temperament and two or three signature visual details. Generate one approved neutral reference pose, then reuse that visual reference for every angle, reaction and scene. Across branches, do not change clothing, hairstyle, body proportions or accessories unless the story specifically requires it.

### Animation and transitions

- Scene fade/cross-dissolve: **250–400ms**.
- Hotspot highlight: subtle **150–200ms** outline/opacity.
- Dialogue / choice panel: **180–250ms** fade or 8–12px translate.
- Avoid shaking, strobing, action-game health bars and panic-inducing effects.
- Provide reduced-motion support.

### Feedback representation

Show **what changed and why**, not a gamified right/wrong flash. E.g. _"Traffic access improved; communication with the organiser remains unresolved."_ Use a short timeline and reasoned feedback alongside selected choices. Do not imply legal/operational scoring is authoritative without subject-matter validation.

---

## 5. Signature motifs

Use these lightly and consistently, never all at once:

- **The frame:** thin softly rounded rectangular outlines, spatial windows, receding planes; derived from the InScene doorway mark.
- **Selective blue focus:** a small blue focal cue near the current decision point, but not a sci-fi glow.
- **Quiet grid:** 24px faint grid as a website or placeholder texture only; do not overlay grids on people or dialogue.
- **Evidence spotlight:** subtle local contrast/focus on an inspectable item; not a neon target ring.
- **Spatial continuity:** background architecture and prop positions remain stable while decisions change.

The consistent motif is **framing a decision**, not adding ornamental decorations.

---

## 6. Two sample scene briefs

### A. Police — Fair Exam March

**Learner role:** responding police officer.  
**Goal:** assess a peaceful march and coordinate safe access, communication and de-escalation.

- **Opening frame:** wide Indian city junction in soft daylight. Police officer speaks to a student organiser; blank placards and distant traffic establish context. Officer's posture is open, non-aggressive.
- **Engagement frame:** medium two-person shot, officer and organiser at an honest conversational distance. Other marchers remain subdued in background.
- **Inspection frame:** relevant road access and a distant emergency vehicle approach, for the player to consider movement and safety.
- **Interactive props:** organiser, street access lane, colleague radio, witness/commuter, traffic scene.
- **Do not depict:** weapons, visible force, identifiable real insignia, angry stereotypes, violent crowd or invented legal directives.

### B. Schools 6–8 — The Disappearing Puddle

**Learner role:** junior investigator.  
**Goal:** compare evaporation under different observable conditions and choose a fair test.

- **Opening frame:** bright Indian school playground after rain, one puddle in sun and one beneath a shady tree. The visual relationship must be spatially obvious.
- **Engagement frame:** learner notices sunlight, shade and airflow clues. Grounded realistic-stylized art, inviting without being cartoonish.
- **Inspection frame:** close views of the two puddles and a small test/observation surface.
- **Interactive props:** puddle A, puddle B, tree canopy, sun/shade indicator, test-variable selectors (implemented in UI).
- **Do not depict:** arbitrary scientific outcomes or misleading measurements; represent all numbers and factual explanations in editable UI only.

---

## 7. Reusable master image prompt

Copy the following as the fixed style suffix for any scene-specific prompt:

> Render as a premium grounded cinematic 2.5D editorial illustration for InScene, a modern scenario-learning platform. Realistic but gently stylised human proportions and authentic Indian environments; believable expressions and purposeful gestures; refined painterly-vector surfaces, light tactile grain, soft atmospheric separation and restrained layered depth. Eye-level to modest three-quarter camera angle unless an inspection/map view requires otherwise. Soft diffuse daylight from upper left, cool ambient fill, subtle natural rim lighting. Clear foreground-action-background hierarchy, readable silhouettes, generous visual breathing room. Deep navy #10243A, action blue #2563EB, teal #12B8A6, off-white #F7F9FC and natural subdued material colours, with natural varied skin tones; controlled low-to-moderate saturation. One understandable real-world decision at the focal point. Keep crucial faces/props inside the central 60% width and 70% height for responsive crops. The image must feel part of one cohesive illustrator-led series. No baked-in text or UI.

**Negative prompt / constraints:**

> No readable text, numbers, logos, watermarks, real insignia, real people or brand marks. No anime, children's-book artwork, caricatures, toy-like clay style, sci-fi elements, robots, holograms, glowing AI brains, cyberpunk neon, dramatic lens flares, weapon-focused imagery, gore, humiliation, oversaturated colours, overfilled crowds, excessive blur, broken anatomy, distorted hands or warped faces. No inset interface screenshots or split panels unless specifically requested.

### Prompt format

```
SCENARIO: [canonical slug/title]
AUDIENCE: [police | school 6–8 | school 9–10 | school 11–12]
LEARNING OBJECTIVE: [what learner practises]
SCENE STATE: [where, when, what has happened; only canonical details]
LEARNER ROLE: [who is the learner?]
MAIN ACTION: [one moment of decision]
CHARACTERS: [IDs from character bible + pose/emotion]
CAMERA: [establish | engage | inspect]
COMPOSITION: [focal action, key props, central safe zone, negative space]
LIGHT: [soft upper-left daylight; narrative-specific setting variation]
OUTPUT: [4:3 hero | 16:9 thumbnail | layered background | isolated character | isolated prop]
STYLE: [paste fixed master style suffix]
EXCLUSIONS: [paste negative prompt]
```

Example: For the `fair-exam-march` card, set MAIN ACTION to 'a calm officer listens to the student organiser while leaving room for a clear route through the junction'; CAMERA to 'establish'; OUTPUT to '16:9 thumbnail'.

---

## 8. Production workflow & acceptance gate

**Phase 1 — lock the look with three masters**: Generate `home.hero`, `simulation.fair-exam-march` and `simulation.the-disappearing-puddle`. Compare them side by side at card size; adjust until all three clearly look like one family. Approve one style reference and lock the prompt suffix before batch generation.

**Phase 2 — build reusable libraries**: Produce environment plates, recurring characters with expression variations, common props, and UI overlays; make a small sample of each interactive state.

**Phase 3 — integrate existing 38 image slots**: Reuse the canonical `docs/image-manifest.json` prompts and semantic keys. Register finished media in `src/assets/index.ts`, export WebP at both widths, review modal crops. **Do not blindly generate 38 images before validating the first three.**

**Phase 4 — develop the playable scene system**: Keep state, dialogue, scoring rationale, evidence and hotspots in code/data. Use still art for atmosphere, but dynamic learner choices must be functioning UI. Validate with police and school subject-matter experts where needed.

### Acceptance checklist

- [ ] Believable Indian setting; age-appropriate subjects and culturally respectful details.
- [ ] Character identity and spatial layout are consistent across shots/branches.
- [ ] Palette, materials, lighting and perspective match the approved master series.
- [ ] Readable at 320px thumbnail width; central action survives wide and narrow crops.
- [ ] Exactly one meaningful focal action; uncluttered and calm.
- [ ] No baked text, logos, numbers, insignia, disturbing content or unverified procedural cues.
- [ ] Interactive cues exist as real UI, not just visual suggestions inside artwork.
- [ ] Proper `alt` descriptions, loading strategy and reduced-motion support.
- [ ] Follows canonical scenario objectives and content rather than hallucinated actions/outcomes.

---

## 9. Claude / VS Code implementation instruction

Paste into Claude in the InScene repository:

> Treat `InScene_Visual_Language_v1.md` as the proposed canonical art direction while retaining the existing website design tokens and all existing route/content functionality. Compare it with `docs/design-system.md` and `docs/image-manifest.json`. Do not replace the colour palette, typography or simulation data. Add a succinct `docs/visual-language.md` with the agreed camera grammar, layered-scene asset model, character bible template and production checklist. Extend the image manifest only where needed to distinguish marketing composites from interactive scene assets. Make no claims that the simulations are playable. First create an asset audit and identify the three initial image-generation briefs (`home.hero`, `simulation.fair-exam-march`, `simulation.the-disappearing-puddle`); do not generate placeholder final assets or alter visual components without approval. Keep filenames, image keys, GitHub Pages base paths and existing responsive crop behaviour intact.

**Versioning:** Update this guide once the first three master images are approved, then lock v1.0 for production. Revise only with documented decisions.
