# Content Gap Report — Website V1

Source documents:
- **Police:** *InScene Police Training Scenario Library* (13 pp.) — 5 scenarios.
- **School:** *YOPPI Scenario Learning for Schools* (31 pp.) — 30 scenario concepts.

All 35 simulations are imported into `src/data/simulations/police.ts` and `src/data/simulations/school.ts`. Every scenario carries a `sourceReference` (document, code, pages). This report lists what the sources do **not** provide, and how the site handles each gap. Nothing in the list below was invented to fill it.

## Import summary

| Category | Grade band | Academic | Non-academic | Total |
| --- | --- | --- | --- | --- |
| Police Training | — | — | — | 5 |
| School Training | Grades 6–8 | 5 (A1–A5) | 5 (N1–N5) | 10 |
| School Training | Grades 9–10 | 5 (A6–A10) | 5 (N6–N10) | 10 |
| School Training | Grades 11–12 | 5 (A11–A15) | 5 (N11–N15) | 10 |
| **All** | | | | **35** |

Each school scenario belongs to exactly one grade band in the source. The data model still allows several bands (`gradeBands: GradeBand[]`).

## Gaps and how they are handled

| # | Gap | Affects | Handling on the site |
| --- | --- | --- | --- |
| 1 | **No Basic/Advanced levels are defined for school scenarios.** The school PDF uses grade-band interaction targets, not levels. | All 30 school scenarios | Both levels are modelled as `availability: "planned"` with no description, following the website brief. Cards show the Basic/Advanced labels. The modal shows "Details coming soon" for each level. **Needs a product decision:** keep levels for school, or replace them with the grade-band depth model. |
| 2 | Police durations for scenarios 03–05 are labelled "proposed" in the source. | Domestic Safety Call, Digital Payment Fraud Report, Crash at a Busy Junction | Shown with "(proposed)". The catalog note explains that these durations are illustrative. |
| 3 | School "target length" and "about N interaction points" are flexible design targets, not measured durations. | All school | Labelled "Target length". The complexity line is shown verbatim. The catalog note says these are flexible targets. |
| 4 | **No short card blurbs exist** in either source. | All 35 | `summary` is a one- or two-sentence condensation of each source's opening situation, adding no new facts. Police cards also show the verbatim subtitle. |
| 5 | School scenarios have no named characters, quotes, decision-point names or branch-outcome lists. | All school | Not shown. School modals use the documented learner mission, interaction design, debrief and guardrails instead. |
| 6 | Police assessment weights are "conceptual design aids". The PDF advises keeping detailed decision design internal. | All police | Weights are **not** shown publicly. Only decision-point names and possible outcomes appear in the modal. |
| 7 | Police subtitles, tracks and durations for 01–02 came from a screenshot. Detailed narratives are "proposed". | Fair Exam March, Complaint at the Front Desk | Every police modal shows a "Proposed design — procedural review required" note. |
| 8 | No images exist. The police PDF has visual briefs; the school PDF has none. | All 38 placements | Branded placeholders are shown. Scenario-specific prompts are in `docs/image-manifest.json`. See the README for the generation blocker. |
| 9 | Founder LinkedIn URLs were not supplied. | Reach Out | A non-clickable "LinkedIn profile coming soon" placeholder is shown. Set `linkedinUrl` in `src/config/contact.ts` when the URLs are available. |
| 10 | Amit Kumar's phone number was not supplied. | Reach Out | No phone is shown for Amit. |
| 11 | No official curriculum or board alignment is given ("align to the selected board syllabus"). | School, especially A3, A6, A11 | No alignment is claimed. The modal guardrail note says a teacher or subject-matter expert must validate content. |
| 12 | School PDF is branded "YOPPI". | School | The site presents these scenarios under InScene, as the brief directs. **Confirm** that YOPPI content may be published under the InScene brand. |
| 13 | No live/playable simulations or demo exist. | Play Now / Play a Demo | Both lead to a Coming Soon state. Nothing implies a playable product. |

## Items requiring subject-matter validation before deployment

- **Police (all five):** review with experienced Indian police trainers and jurisdiction-specific SOPs. This includes complaint-handling procedure (02), domestic-response mandatory actions and referral pathways (03), and cybercrime reporting channels (04).
- **School science (A1–A3, A6, A8, A11, A13):** teacher review of data coherence and terminology. A11 requires chemically coherent titration data.
- **School finance (N11, N12):** align with reputable investor-education material. The scenarios must not be presented as financial advice.
- **School safety (A2, N1, N4):** check the safety messaging against school policy and local road rules.
- **Naming (N15):** the title reads "The College Fest, One Night Left", but the situation describes a *school* festival for Grades 11–12. The title is kept verbatim from the source. Confirm the intended wording.
